import Link from 'next/link'

import { LAST_UPDATED, NAV_ITEMS } from '@/lib/content'

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-10 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <Link
              href="/"
              className="font-display text-3xl uppercase tracking-widest"
              style={{ color: 'var(--endo-red)' }}
            >
              ENDO
            </Link>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              A guide by a woman with endometriosis
            </p>
            <Link
              href="/suggest"
              className="mt-4 inline-flex border border-border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground transition-colors hover:border-[var(--endo-red)] hover:text-[var(--endo-red)]"
            >
              Leave a suggestion →
            </Link>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-[var(--endo-red)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-8 border-t border-border pt-6 font-mono text-[11px] text-muted-foreground">
          Last updated: {LAST_UPDATED}
        </p>
      </div>
    </footer>
  )
}
