import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const TO = process.env.SUGGESTIONS_TO || 'lucy.aitchison3@gmail.com'
const FROM = process.env.SUGGESTIONS_FROM || 'ENDO guide <onboarding@resend.dev>'

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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
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

  // Prefilled mailto, built here so the inbox address stays out of the
  // client bundle until it's actually needed as a fallback.
  const mailto =
    `mailto:${TO}` +
    `?subject=${encodeURIComponent(`ENDO guide suggestion${topic ? ` — ${topic}` : ''}`)}` +
    `&body=${encodeURIComponent(
      [message, '', `From: ${name || 'Anonymous'}`, `Reply to: ${email || 'Not given'}`].join('\n'),
    )}`

  const apiKey = process.env.RESEND_API_KEY

  // No mail provider wired up yet: tell the client so it can offer the
  // "send it from your own email app" fallback instead of losing the message.
  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        mailto,
        error: 'Email delivery isn’t switched on yet.',
      },
      { status: 503 },
    )
  }

  const rows: [string, string][] = [
    ['From', name || 'Anonymous'],
    ['Reply to', email || 'Not given'],
    ['Section', topic || 'Not specified'],
  ]

  const html = `
    <div style="font-family: -apple-system, Segoe UI, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1A1A1A;">
      <p style="font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; color: #6B6560; margin: 0 0 16px;">
        New suggestion — ENDO guide
      </p>
      <div style="white-space: pre-wrap; border-left: 4px solid #E8251A; padding: 4px 0 4px 16px; margin: 0 0 24px; font-size: 15px;">
        ${escapeHtml(message)}
      </div>
      <table style="font-size: 13px; color: #6B6560; border-collapse: collapse;">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding: 2px 16px 2px 0;">${label}</td><td style="padding: 2px 0; color: #1A1A1A;">${escapeHtml(
                value,
              )}</td></tr>`,
          )
          .join('')}
      </table>
    </div>
  `

  const text = [
    'New suggestion — ENDO guide',
    '',
    message,
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
  ].join('\n')

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        subject: `ENDO guide suggestion${topic ? ` — ${topic}` : ''}`,
        html,
        text,
        ...(email ? { reply_to: email } : {}),
      }),
    })

    if (!response.ok) {
      const detail = await response.text()
      console.error('Resend rejected the suggestion email:', response.status, detail)
      return NextResponse.json(
        { ok: false, mailto, error: 'We couldn’t send that just now.' },
        { status: 502 },
      )
    }
  } catch (error) {
    console.error('Failed to send suggestion email:', error)
    return NextResponse.json(
      { ok: false, mailto, error: 'We couldn’t send that just now.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
