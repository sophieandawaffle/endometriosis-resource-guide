'use client'

import { useActionState, useState } from 'react'

import type { Submission } from '@/lib/inbox'
import { PUBLISH_TARGETS, TAG_OPTIONS, findTarget } from '@/lib/sections'
import { publishAction, rejectAction, reopenAction, type ActionResult } from './actions'

const fieldClass =
  'w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--endo-red)] focus:outline-none'

const labelClass =
  'mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground'

/** Their dropdown choice on the form maps to a sensible starting section. */
const TOPIC_TO_SECTION: Record<string, string> = {
  'Free help': 'free-support',
  'Things to buy': 'spend-money',
  Surgery: 'surgery-before',
  'At work': 'at-work',
  Advice: 'advice',
  Research: 'resources-read',
}

/** Split a submission into a short title and the rest, as a starting point. */
function splitMessage(message: string) {
  const clean = message.replace(/\s+/g, ' ').trim()
  const stop = clean.search(/[.!?](\s|$)/)

  if (stop > 0 && stop <= 90) {
    return { title: clean.slice(0, stop), detail: clean.slice(stop + 1).trim() }
  }
  if (clean.length <= 90) {
    return { title: clean, detail: '' }
  }
  const cut = clean.lastIndexOf(' ', 90)
  return { title: clean.slice(0, cut > 40 ? cut : 90), detail: clean.slice(cut > 40 ? cut : 90).trim() }
}

function Result({ result }: { result: ActionResult | null }) {
  if (!result) return null
  return (
    <p
      role="status"
      className={`mt-3 border-l-4 bg-background px-3 py-2 text-[13px] ${
        result.ok ? 'border-l-[var(--endo-red)] text-foreground' : 'border-l-border text-foreground'
      }`}
    >
      {result.message}
    </p>
  )
}

function StatusBadge({ status }: { status: Submission['status'] }) {
  const styles =
    status === 'published'
      ? 'border-[var(--endo-red)] text-[var(--endo-red)]'
      : status === 'rejected'
        ? 'border-border text-muted-foreground'
        : 'border-foreground text-foreground'

  const label = status === 'published' ? 'Live' : status === 'rejected' ? 'Archived' : 'To review'

  return (
    <span
      className={`border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] ${styles}`}
    >
      {label}
    </span>
  )
}

export function SubmissionCard({ submission }: { submission: Submission }) {
  const suggested = splitMessage(submission.message)

  const [section, setSection] = useState(TOPIC_TO_SECTION[submission.topic] ?? '')
  const [publishResult, publish, publishing] = useActionState(publishAction, null)
  const [rejectResult, reject, rejecting] = useActionState(rejectAction, null)
  const [reopenResult, reopen, reopening] = useActionState(reopenAction, null)

  const target = findTarget(section)
  const date = new Date(submission.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <article className="border border-border bg-card">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <StatusBadge status={submission.status} />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            #{submission.number} · {date}
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {submission.topic || 'No section picked'}
        </span>
      </header>

      <div className="px-4 py-4">
        <p className="whitespace-pre-wrap border-l-4 border-l-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground">
          {submission.message}
        </p>

        {(submission.name || submission.email) && (
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            From: {submission.name || 'Anonymous'}
            {submission.email && (
              <>
                {' · '}
                <a href={`mailto:${submission.email}`} className="underline">
                  {submission.email}
                </a>
              </>
            )}
          </p>
        )}
      </div>

      {submission.status === 'pending' && (
        <div className="border-t border-border px-4 py-4">
          <form action={publish}>
            <input type="hidden" name="number" value={submission.number} />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor={`title-${submission.number}`} className={labelClass}>
                  Title on the site
                </label>
                <input
                  id={`title-${submission.number}`}
                  name="title"
                  defaultValue={suggested.title}
                  maxLength={200}
                  className={fieldClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor={`detail-${submission.number}`} className={labelClass}>
                  Detail — shown when someone taps the card (optional)
                </label>
                <textarea
                  id={`detail-${submission.number}`}
                  name="detail"
                  rows={3}
                  defaultValue={suggested.detail}
                  className={`${fieldClass} resize-y leading-relaxed`}
                />
              </div>

              <div>
                <label htmlFor={`section-${submission.number}`} className={labelClass}>
                  Goes in
                </label>
                <select
                  id={`section-${submission.number}`}
                  name="section"
                  value={section}
                  onChange={(event) => setSection(event.target.value)}
                  className={fieldClass}
                >
                  <option value="">Choose a section…</option>
                  {PUBLISH_TARGETS.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {target?.tag !== 'none' && target && (
                <div>
                  <label htmlFor={`tag-${submission.number}`} className={labelClass}>
                    {target.tag === 'effort' ? 'Effort' : 'Cost'}
                  </label>
                  <select
                    id={`tag-${submission.number}`}
                    name="tag"
                    defaultValue=""
                    className={fieldClass}
                  >
                    <option value="">Choose…</option>
                    {TAG_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {target?.category && (
                <div>
                  <label htmlFor={`category-${submission.number}`} className={labelClass}>
                    Category (optional)
                  </label>
                  <input
                    id={`category-${submission.number}`}
                    name="category"
                    placeholder="Food, Pain relief, Items…"
                    maxLength={40}
                    className={fieldClass}
                  />
                </div>
              )}

              <div className={target?.link ? 'sm:col-span-2' : ''}>
                <label htmlFor={`href-${submission.number}`} className={labelClass}>
                  Link {target?.link ? '' : '(optional)'}
                </label>
                <input
                  id={`href-${submission.number}`}
                  name="href"
                  type="url"
                  placeholder="https://"
                  maxLength={500}
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={publishing}
                className="bg-[var(--endo-red)] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--primary-foreground)] transition-opacity hover:opacity-85 disabled:opacity-40"
              >
                {publishing ? 'Publishing…' : 'Publish it →'}
              </button>
            </div>
          </form>

          <Result result={publishResult} />

          <form action={reject} className="mt-2">
            <input type="hidden" name="number" value={submission.number} />
            <button
              type="submit"
              disabled={rejecting}
              className="border border-border bg-background px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground disabled:opacity-40"
            >
              {rejecting ? 'Archiving…' : 'Archive'}
            </button>
          </form>
          <Result result={rejectResult} />
        </div>
      )}

      {submission.status !== 'pending' && (
        <div className="border-t border-border px-4 py-4">
          <form action={reopen}>
            <input type="hidden" name="number" value={submission.number} />
            <button
              type="submit"
              disabled={reopening}
              className="border border-border bg-background px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors hover:border-[var(--endo-red)] hover:text-[var(--endo-red)] disabled:opacity-40"
            >
              {reopening
                ? 'Moving…'
                : submission.status === 'published'
                  ? 'Take it off the site'
                  : 'Move back to review'}
            </button>
          </form>
          <Result result={reopenResult} />
        </div>
      )}
    </article>
  )
}
