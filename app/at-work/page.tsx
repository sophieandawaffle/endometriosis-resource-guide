import type { Metadata } from 'next'

import { LongBlock } from '@/components/long-block'
import { PageHeader } from '@/components/page-header'
import { PageNav } from '@/components/page-nav'
import { SuggestBanner } from '@/components/suggest-banner'
import { TipCard } from '@/components/tip-card'
import { WORK_LONG_BLOCKS, WORK_TIPS } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Endo at work',
  description:
    'Practical ways employers and colleagues can support someone with endometriosis, plus the legal position in the UK and US.',
}

export default function AtWorkPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:px-10 md:py-14">
      <PageHeader
        eyebrow="Endo at work"
        title="AT WORK"
        intro="For employers and colleagues. Nine things you can change, and the legal bit underneath if you need it."
      />

      <section className="mt-8">
        <div className="mb-4 flex items-baseline justify-between border-b border-border pb-3">
          <h2 className="font-display text-2xl uppercase leading-none text-foreground">
            What you can do
          </h2>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {WORK_TIPS.length} ideas
          </span>
        </div>
        <div className="space-y-3">
          {WORK_TIPS.map((tip, i) => (
            <TipCard key={tip.title} tip={tip} index={i} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-baseline justify-between border-b border-border pb-3">
          <h2 className="font-display text-2xl uppercase leading-none text-foreground">
            Know the law
          </h2>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Tap to open
          </span>
        </div>
        <div className="space-y-3">
          {WORK_LONG_BLOCKS.map((block) => (
            <LongBlock key={block.title} block={block} />
          ))}
        </div>
        <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
          General information, not legal advice — check your own situation with a professional.
        </p>
      </section>

      <div className="mt-12 space-y-12">
        <SuggestBanner
          heading="Work somewhere that gets it right?"
          body="Share the policy or adjustment that made the difference, so other employers can copy it."
        />
        <PageNav current="/at-work" />
      </div>
    </div>
  )
}
