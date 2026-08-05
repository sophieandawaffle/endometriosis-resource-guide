import { createHash, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'

/**
 * The review page is protected by one long secret in the URL. On first visit
 * we swap it for an httpOnly cookie and redirect to a clean /review, so the
 * key stops travelling in the address bar, browser history, and referrers.
 */

export const REVIEW_COOKIE = 'endo_review'

function digest(value: string) {
  return createHash('sha256').update(value).digest()
}

/** Constant-time compare, so the key can't be guessed a character at a time. */
export function keyMatches(candidate: string | undefined | null) {
  const expected = process.env.REVIEW_KEY
  if (!expected || !candidate) return false
  return timingSafeEqual(digest(candidate), digest(expected))
}

export function reviewConfigured() {
  return Boolean(process.env.REVIEW_KEY)
}

export async function hasReviewAccess() {
  const store = await cookies()
  return keyMatches(store.get(REVIEW_COOKIE)?.value)
}

export async function grantReviewAccess(key: string) {
  const store = await cookies()
  store.set(REVIEW_COOKIE, key, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 180, // six months
  })
}
