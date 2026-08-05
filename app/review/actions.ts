'use server'

import { revalidatePath } from 'next/cache'

import { publishEntry, setStatus, unpublishEntry } from '@/lib/inbox'
import { hasReviewAccess } from '@/lib/review-auth'
import { findTarget, type PublishedEntry } from '@/lib/sections'

export interface ActionResult {
  ok: boolean
  message: string
}

/**
 * Server actions are public endpoints, so every one of these re-checks the
 * review cookie rather than trusting that the page rendered.
 */
async function guard() {
  if (!(await hasReviewAccess())) {
    throw new Error('Not authorised')
  }
}

function field(formData: FormData, name: string, max = 2000) {
  const value = formData.get(name)
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function publishAction(
  _previous: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  await guard()

  const id = Number(formData.get('number'))
  const section = field(formData, 'section', 40)
  const title = field(formData, 'title', 200)
  const detail = field(formData, 'detail')
  const href = field(formData, 'href', 500)
  const tag = field(formData, 'tag', 20)
  const category = field(formData, 'category', 40)

  if (!Number.isInteger(id) || id <= 0) {
    return { ok: false, message: 'Something went wrong reading that suggestion.' }
  }

  const target = findTarget(section)
  if (!target) {
    return { ok: false, message: 'Pick which section it belongs in first.' }
  }

  if (title.length < 2) {
    return { ok: false, message: 'Give it a short title before publishing.' }
  }

  if (target.tag !== 'none' && !tag) {
    return {
      ok: false,
      message: target.tag === 'effort' ? 'Pick an effort level.' : 'Pick a cost level.',
    }
  }

  if (href && !/^https?:\/\//i.test(href)) {
    return { ok: false, message: 'Links need to start with http:// or https://' }
  }

  const entry: PublishedEntry = {
    id,
    section,
    title,
    publishedAt: new Date().toISOString(),
    ...(detail ? { detail } : {}),
    ...(href ? { href } : {}),
    ...(target.tag === 'effort' ? { effort: tag } : {}),
    ...(target.tag === 'cost' ? { cost: tag } : {}),
    ...(target.category && category ? { category } : {}),
  }

  try {
    const result = await publishEntry(entry)
    await setStatus(id, 'published', `Published to **${target.label}** as “${title}”.`)

    revalidatePath('/review')
    revalidatePath(target.path)

    return {
      ok: true,
      message: result.alreadyPublished
        ? 'That one was already live.'
        : `Published to ${target.label}. It’ll be on the site in about a minute.`,
    }
  } catch (error) {
    console.error('Publish failed:', error)
    return { ok: false, message: 'Couldn’t publish that — try again in a moment.' }
  }
}

export async function rejectAction(
  _previous: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  await guard()

  const id = Number(formData.get('number'))
  if (!Number.isInteger(id) || id <= 0) {
    return { ok: false, message: 'Something went wrong reading that suggestion.' }
  }

  try {
    await unpublishEntry(id)
    await setStatus(id, 'rejected')
    revalidatePath('/review')
    return { ok: true, message: 'Archived. You can bring it back any time.' }
  } catch (error) {
    console.error('Reject failed:', error)
    return { ok: false, message: 'Couldn’t archive that — try again in a moment.' }
  }
}

export async function reopenAction(
  _previous: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  await guard()

  const id = Number(formData.get('number'))
  if (!Number.isInteger(id) || id <= 0) {
    return { ok: false, message: 'Something went wrong reading that suggestion.' }
  }

  try {
    await unpublishEntry(id)
    await setStatus(id, 'pending')
    revalidatePath('/review')
    return { ok: true, message: 'Back in the to-review pile.' }
  } catch (error) {
    console.error('Reopen failed:', error)
    return { ok: false, message: 'Couldn’t move that back — try again in a moment.' }
  }
}
