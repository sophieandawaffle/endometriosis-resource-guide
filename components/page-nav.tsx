import Link from 'next/link'

import { NAV_ITEMS } from '@/lib/content'

/** Prev / next links so people can keep tapping through the guide. */
export function PageNav({ current }: { current: string }) {
  const index = NAV_ITEMS.findIndex((item) => item.href === current)
  const previous = index > 0 ? NAV_ITEMS[index - 1] : null
  const next = index >= 0 && index < NAV_ITEMS.length - 1 ? NAV_ITEMS[index + 1] : null

  return (
    <nav className="grid gap-4 border-t border-border pt-6 sm:grid-cols-2" aria-label="More sections">
      {previous ? (
        <Link
          href={previous.href}
          className="group border border-border bg-card p-4 transition-colors hover:border-[var(--endo-red)]"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            ← Previous
          </span>
          <span className="mt-2 block font-display text-lg uppercase leading-none text-foreground transition-colors group-hover:text-[var(--endo-red)]">
            {previous.label}
          </span>
        </Link>
      ) : (
        <span />
      )}

      {next && (
        <Link
          href={next.href}
          className="group border border-border bg-card p-4 text-right transition-colors hover:border-[var(--endo-red)] sm:col-start-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Next →
          </span>
          <span className="mt-2 block font-display text-lg uppercase leading-none text-foreground transition-colors group-hover:text-[var(--endo-red)]">
            {next.label}
          </span>
        </Link>
      )}
    </nav>
  )
}
