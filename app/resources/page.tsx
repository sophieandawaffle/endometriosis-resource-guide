import type { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'
import { PageNav } from '@/components/page-nav'
import { SuggestBanner } from '@/components/suggest-banner'
import { RESOURCE_GROUPS } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Research',
  description:
    'One thing to read, one to watch, one to listen to — where to start researching endometriosis.',
}

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:px-10 md:py-14">
      <PageHeader
        eyebrow="Research: where to start"
        title="RESEARCH"
        intro="Doing your own reading takes the burden off them. One link per category — no homework pile."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {RESOURCE_GROUPS.map((group) => (
          <section key={group.label} className="flex flex-col border border-border bg-card p-6">
            <h2 className="mb-5 flex items-center gap-2 border-b border-border pb-4 font-display text-base uppercase tracking-wide text-foreground">
              <span aria-hidden="true">{group.emoji}</span> {group.label}
            </h2>

            {group.items.length === 0 ? (
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                Nothing here yet — send us a recommendation and it goes straight on.
              </p>
            ) : (
              <ul className="space-y-4">
                {group.items.map((item) => (
                  <li key={item.title}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <span className="text-sm text-foreground underline decoration-[var(--endo-red)] underline-offset-3 transition-colors group-hover:text-[var(--endo-red)]">
                        {item.title}
                      </span>
                      <span aria-hidden="true" className="ml-1 text-[var(--endo-red)]">
                        ↗
                      </span>
                      {item.detail && (
                        <span className="mt-1 block text-[12px] leading-relaxed text-muted-foreground">
                          {item.detail}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <div className="mt-12 space-y-12">
        <SuggestBanner
          heading="Know a good one?"
          body="Books, films, podcasts, accounts worth following — send them over and they’ll go on this page."
        />
        <PageNav current="/resources" />
      </div>
    </div>
  )
}
