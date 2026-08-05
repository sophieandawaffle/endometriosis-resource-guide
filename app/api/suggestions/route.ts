import { NextResponse } from 'next/server'

import { createSubmission, inboxConfigured } from '@/lib/inbox'
import { notifyNewSuggestion } from '@/lib/notify'

const fallbackInbox = () => process.env.SUGGESTIONS_TO || 'lucy.aitchison3@gmail.com'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const LIMITS = {
  message: 5000,
  name: 100,
  email: 200,
  topic: 80,
}

// Best-effort per-instance rate limit: 5 submissions per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > MAX_PER_WINDOW
}

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }

  const body = (payload ?? {}) as Record<string, unknown>

  // Honeypot — bots fill hidden fields, humans don't. Fake success.
  if (clean(body.website, 200)) {
    return NextResponse.json({ ok: true })
  }

  const message = clean(body.message, LIMITS.message)
  const name = clean(body.name, LIMITS.name)
  const email = clean(body.email, LIMITS.email)
  const topic = clean(body.topic, LIMITS.topic)

  if (message.length < 2) {
    return NextResponse.json(
      { ok: false, error: 'Please write your suggestion first.' },
      { status: 400 },
    )
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: 'That email address doesn’t look right.' },
      { status: 400 },
    )
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: 'That’s a lot of suggestions — try again in a little while.' },
      { status: 429 },
    )
  }

  // Last-resort escape hatch, built server-side so the inbox address stays
  // out of the client bundle until a submission actually needs it.
  const mailto =
    `mailto:${fallbackInbox()}` +
    `?subject=${encodeURIComponent(`ENDO guide suggestion${topic ? ` — ${topic}` : ''}`)}` +
    `&body=${encodeURIComponent(
      [message, '', `From: ${name || 'Anonymous'}`, `Reply to: ${email || 'Not given'}`].join('\n'),
    )}`

  if (!inboxConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        mailto,
        error: 'The suggestion box isn’t switched on yet.',
      },
      { status: 503 },
    )
  }

  try {
    await createSubmission({ message, name, email, topic })
  } catch (error) {
    console.error('Failed to file the suggestion:', error)
    return NextResponse.json(
      { ok: false, mailto, error: 'We couldn’t save that just now. Please try again.' },
      { status: 502 },
    )
  }

  // The email is a courtesy nudge; a failure here must not lose the
  // suggestion, which is already safely in the inbox.
  const origin = new URL(request.url).origin
  await notifyNewSuggestion({ message, topic, reviewUrl: `${origin}/review` })

  return NextResponse.json({ ok: true })
}
