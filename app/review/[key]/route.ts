import { NextResponse } from 'next/server'

import { REVIEW_COOKIE, keyMatches } from '@/lib/review-auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * The secret link. Visiting /review/<key> trades the key for an httpOnly
 * cookie and bounces to /review, so the secret stops showing up in the
 * address bar, browser history, or any referrer header.
 */
export async function GET(request: Request, context: { params: Promise<{ key: string }> }) {
  const { key } = await context.params

  if (!keyMatches(key)) {
    return new NextResponse('Not found', { status: 404 })
  }

  const response = NextResponse.redirect(new URL('/review', request.url))

  response.cookies.set(REVIEW_COOKIE, key, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 180, // six months
  })

  return response
}
