import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { inboxConfigured, listSubmissions, type Submission } from '@/lib/inbox'
import { hasReviewAccess, reviewConfigured } from '@/lib/review-auth'
import { SubmissionCard } from './submission-card'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Review suggestions',
  robots: { index: false, follow: false },
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <p className="border border-border bg-card px-4 py-6 text-center text-[13px] text-muted-foreground">
      {children}
    </p>
  )
}

function Group({
  title,
  hint,
  items,
  empty,
}: {
  title: string
  hint?: string
  items: Submission[]
  empty: string
}) {
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-baseline justify-between border-b border-border pb-3">
        <h2 className="font-display text-2xl uppercase leading-none text-foreground">{title}</h2>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {hint ?? `${items.length}`}
        </span>
      </div>

      {items.length === 0 ? (
        <Empty>{empty}</Empty>
      ) : (
        <div className="space-y-4">
          {items.map((submission) => (
            <SubmissionCard key={submission.number} submission={submission} />
          ))}
        </div>
      )}
    </section>
  )
}

export default async function ReviewPage() {
  // Without a key configured there is nothing to protect the page with, so it
  // must not render the inbox at all.
  if (!reviewConfigured() || !(await hasReviewAccess())) {
    notFound()
  }

  if (!inboxConfigured()) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-14 md:px-10">
        <h1 className="font-display text-4xl uppercase leading-none text-[var(--endo-red)]">
          Almost there
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          The review page is working, but the suggestion inbox isn’t connected yet — the site
          still needs its <code className="font-mono text-foreground">GITHUB_TOKEN</code>{' '}
          environment variable in Vercel.
        </p>
      </div>
    )
  }

  let submissions: Submission[] = []
  let error = ''

  try {
    submissions = await listSubmissions()
  } catch (caught) {
    console.error('Could not load the inbox:', caught)
    error = 'Couldn’t reach the suggestion inbox just now. Refresh in a moment.'
  }

  const pending = submissions.filter((item) => item.status === 'pending')
  const published = submissions.filter((item) => item.status === 'published')
  const rejected = submissions.filter((item) => item.status === 'rejected')

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 md:px-10 md:py-14">
      <div className="border-b border-border pb-6">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Private — for Lucy
        </p>
        <h1
          className="font-display text-[clamp(2.5rem,8vw,6rem)] uppercase leading-none tracking-tight"
          style={{ color: 'var(--endo-red)' }}
        >
          REVIEW
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Everything people have sent through the suggestion form. Edit the wording, choose where
          it goes, and publish — it’s on the site about a minute later. Archive anything that
          shouldn’t go up.
        </p>
      </div>

      {error && (
        <p role="alert" className="mt-6 border border-[var(--endo-red)] border-l-4 bg-card p-4 text-sm">
          {error}
        </p>
      )}

      <Group
        title="To review"
        hint={pending.length === 1 ? '1 waiting' : `${pending.length} waiting`}
        items={pending}
        empty="Nothing waiting. You’re all caught up."
      />

      <Group
        title="Live on the site"
        items={published}
        empty="Nothing published yet."
      />

      <Group
        title="Archived"
        items={rejected}
        empty="Nothing archived."
      />
    </div>
  )
}
