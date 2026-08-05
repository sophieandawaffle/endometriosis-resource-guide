import type { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'
import { SuggestionForm } from '@/components/suggestion-form'

export const metadata: Metadata = {
  title: 'Leave a suggestion',
  description:
    'Add your own tip, comment, or correction to the endometriosis support guide. Anonymous is fine.',
}

export default function SuggestPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10 md:px-10 md:py-14">
      <PageHeader
        eyebrow="Comments & suggestions"
        title="SUGGEST"
        intro="Write one sentence or five paragraphs — whatever you’ve got. Everything else on this form is optional."
      />

      <div className="mt-8">
        <SuggestionForm />
      </div>
    </div>
  )
}
