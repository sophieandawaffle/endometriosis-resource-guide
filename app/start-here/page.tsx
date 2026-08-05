import type { Metadata } from 'next'
import Link from 'next/link'

import { PageHeader } from '@/components/page-header'
import { PageNav } from '@/components/page-nav'
import { SuggestBanner } from '@/components/suggest-banner'
import { LAST_UPDATED, SECTION_CARDS } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Start here',
  description: 'What this guide is, who made it, and what endometriosis actually is.',
}

const FACTS = [
  {
    q: 'Where did this come from?',
    a: 'I asked my TikTok community one question: how do you ACTUALLY help someone with endometriosis? Hundreds of comments came in. This site is what they said, sorted so you can filter by cost and effort.',
  },
  {
    q: 'Who wrote it?',
    a: 'A woman with endo, using suggestions from real people with endometriosis.',
  },
  {
    q: 'Do I have to do all of it?',
    a: 'No. By no means are you expected to do ALL of these things — doing what you’re able to do is enough.',
  },
  {
    q: 'Will these things fix it?',
    a: 'No. None of these things are cures or guaranteed to help. This is simply a guide to encourage thoughtfulness and consideration.',
  },
]

export default function StartHerePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:px-10 md:py-14">
      <PageHeader
        eyebrow="Start here"
        title="START HERE"
        intro="The short version, in four questions. Tap any of them to open."
      />

      <div className="mt-8 space-y-3">
        {FACTS.map((fact) => (
          <details
            key={fact.q}
            className="group border border-border bg-card transition-colors open:border-[var(--endo-red)]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 [&::-webkit-details-marker]:hidden">
              <span className="text-sm font-semibold leading-relaxed text-foreground">
                {fact.q}
              </span>
              <span
                aria-hidden="true"
                className="shrink-0 select-none font-mono text-sm leading-none text-[var(--endo-red)] transition-transform duration-150 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="max-w-2xl border-t border-border p-4 text-[13px] leading-relaxed text-muted-foreground">
              {fact.a}
            </p>
          </details>
        ))}
      </div>

      <section className="mt-12 border border-border border-l-4 border-l-[var(--endo-red)] bg-card p-6">
        <h2 className="font-display text-2xl uppercase leading-none text-foreground">
          What is endometriosis?
        </h2>
        <p className="mt-4 max-w-2xl text-[13px] leading-relaxed text-muted-foreground">
          In short: a condition where tissue similar to the lining of the womb grows in other
          places, such as the ovaries and fallopian tubes. It can cause severe pain, fatigue and
          fertility problems, it fluctuates, and it takes years to diagnose. It is not
          &ldquo;just a bad period&rdquo;.
        </p>
        <a
          href="https://www.nhs.uk/conditions/endometriosis/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex border border-border bg-background px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground transition-colors hover:border-[var(--endo-red)] hover:text-[var(--endo-red)]"
        >
          Read the NHS definition ↗
        </a>
      </section>

      <section className="mt-12">
        <h2 className="mb-6 border-b border-border pb-4 font-display text-2xl uppercase leading-none tracking-wide text-foreground">
          Where do you want to go?
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {SECTION_CARDS.filter((card) => card.href !== '/start-here').map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex items-center justify-between gap-4 border border-border bg-card p-4 transition-colors hover:border-[var(--endo-red)]"
            >
              <span className="flex items-center gap-3">
                <span aria-hidden="true" className="text-lg">
                  {card.emoji}
                </span>
                <span className="text-sm text-foreground">{card.title}</span>
              </span>
              <span
                aria-hidden="true"
                className="font-mono text-sm text-[var(--endo-red)] transition-transform duration-150 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Last updated: {LAST_UPDATED}
      </p>

      <div className="mt-12 space-y-12">
        <SuggestBanner />
        <PageNav current="/start-here" />
      </div>
    </div>
  )
}
