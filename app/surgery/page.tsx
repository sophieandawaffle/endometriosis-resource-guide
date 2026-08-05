import type { Metadata } from 'next'
import Link from 'next/link'

import { PageHeader } from '@/components/page-header'
import { PageNav } from '@/components/page-nav'
import { SuggestBanner } from '@/components/suggest-banner'
import { TipCard } from '@/components/tip-card'
import { SURGERY_AFTER, SURGERY_BEFORE } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Surgery support',
  description:
    'How to support someone with endometriosis before, during and after surgery.',
}

const STAGES = [
  { key: 'before', label: 'Before surgery', tips: SURGERY_BEFORE },
  { key: 'after', label: 'During & after surgery', tips: SURGERY_AFTER },
]

export default function SurgeryPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:px-10 md:py-14">
      <PageHeader
        eyebrow="Surgery support"
        title="SURGERY"
        intro="Not all of this applies to every person. Check in with them personally to see what they actually want help with."
      />

      <div className="mt-8 space-y-10">
        {STAGES.map((stage) => (
          <section key={stage.key}>
            <div className="mb-4 flex items-baseline justify-between border-b border-border pb-3">
              <h2 className="font-display text-2xl uppercase leading-none text-foreground">
                {stage.label}
              </h2>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {stage.tips.length} {stage.tips.length === 1 ? 'idea' : 'ideas'}
              </span>
            </div>
            <div className="space-y-3">
              {stage.tips.map((tip, i) => (
                <TipCard key={tip.title} tip={tip} index={i} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-10 border border-border bg-card p-6">
        <h2 className="font-display text-xl uppercase leading-none text-foreground">
          🔎 Surgery research: where to start
        </h2>
        <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-muted-foreground">
          The research section has a report, a film, and a channel worth an evening of your time.
        </p>
        <Link
          href="/resources"
          className="mt-4 inline-flex border border-border bg-background px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground transition-colors hover:border-[var(--endo-red)] hover:text-[var(--endo-red)]"
        >
          Go to research →
        </Link>
      </section>

      <div className="mt-12 space-y-12">
        <SuggestBanner
          heading="Been through surgery?"
          body="Tell us what you wish people had done for you before or after. It’s the section people most often arrive here looking for."
        />
        <PageNav current="/surgery" />
      </div>
    </div>
  )
}
