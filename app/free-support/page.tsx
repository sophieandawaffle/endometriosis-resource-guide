import type { Metadata } from 'next'

import { FilterList } from '@/components/filter-list'
import { PageHeader } from '@/components/page-header'
import { PageNav } from '@/components/page-nav'
import { SuggestBanner } from '@/components/suggest-banner'
import { FREE_TIPS } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Free ways to help',
  description:
    'Acts of service that cost nothing and mean a lot to people dealing with endometriosis, sorted by effort.',
}

export default function FreeSupportPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:px-10 md:py-14">
      <PageHeader
        eyebrow="Free ways to support"
        title="FREE HELP"
        intro="Acts of service that cost nothing and mean a lot. Filter by how much effort you can give right now, then tap any card for the why."
      />

      <div className="mt-8">
        <FilterList
          items={FREE_TIPS}
          filterKey="effort"
          filters={['Low', 'Medium', 'High']}
          labelSuffix="effort"
          allLabel="All ideas"
        />
      </div>

      <div className="mt-12 space-y-12">
        <SuggestBanner
          heading="Something that helped you?"
          body="If someone did something free that made a real difference, add it here."
        />
        <PageNav current="/free-support" />
      </div>
    </div>
  )
}
