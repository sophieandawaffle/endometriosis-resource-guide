import type { Metadata } from 'next'

import { FilterList } from '@/components/filter-list'
import { PageHeader } from '@/components/page-header'
import { PageNav } from '@/components/page-nav'
import { SuggestBanner } from '@/components/suggest-banner'
import { SPEND_TIPS } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Things to spend money on',
  description:
    'Gifts and spends that genuinely help people with endometriosis, sorted by cost.',
}

export default function SpendMoneyPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:px-10 md:py-14">
      <PageHeader
        eyebrow="Things to spend money on"
        title="THINGS TO BUY"
        intro="Pick a budget. Tap a card to see what it’s for."
      />

      <div className="mt-6 border border-border border-l-4 border-l-[var(--endo-red)] bg-card p-4">
        <p className="text-[13px] leading-relaxed text-muted-foreground">
          Always check with people before buying them something — they may not want or need it,
          or already have it. Nothing here works for everyone.
        </p>
      </div>

      <div className="mt-8">
        <FilterList
          items={SPEND_TIPS}
          filterKey="cost"
          filters={['Low', 'Medium', 'High']}
          labelSuffix="cost"
          badgeKey="category"
          allLabel="All ideas"
        />
      </div>

      <div className="mt-12 space-y-12">
        <SuggestBanner
          heading="Bought something brilliant?"
          body="Tell us what was worth the money and we’ll add it to the list."
        />
        <PageNav current="/spend-money" />
      </div>
    </div>
  )
}
