import type { Tip } from '@/lib/content'

interface TipCardProps {
  tip: Tip
  index?: number
  badge?: string
}

function ExternalLink({ href, label }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 inline-flex items-center gap-2 border border-border bg-background px-3 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground transition-colors hover:border-[var(--endo-red)] hover:text-[var(--endo-red)]"
    >
      {label ?? 'Open link'} <span aria-hidden="true">↗</span>
    </a>
  )
}

/**
 * A single tip. When there is extra detail the whole card is a click target
 * that expands — the page stays scannable and nobody has to read what they
 * didn't ask for.
 */
export function TipCard({ tip, index, badge }: TipCardProps) {
  const number =
    typeof index === 'number' ? String(index + 1).padStart(2, '0') : undefined

  const heading = (
    <>
      {number && (
        <span className="w-6 shrink-0 pt-0.5 text-right font-mono text-[10px] text-muted-foreground">
          {number}
        </span>
      )}
      <span className="flex-1 text-sm leading-relaxed text-foreground">
        {tip.title}
        {badge && (
          <span className="ml-2 whitespace-nowrap border border-border px-1.5 py-0.5 align-middle font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
            {badge}
          </span>
        )}
      </span>
    </>
  )

  const hasMore = Boolean(tip.detail || tip.href)

  if (!hasMore) {
    return (
      <div className="flex items-start gap-4 border border-border bg-card p-4">
        {heading}
      </div>
    )
  }

  return (
    <details className="group border border-border bg-card transition-colors open:border-[var(--endo-red)]">
      <summary className="flex cursor-pointer list-none items-start gap-4 p-4 [&::-webkit-details-marker]:hidden">
        {heading}
        <span
          aria-hidden="true"
          className="shrink-0 select-none pt-0.5 font-mono text-sm leading-none text-[var(--endo-red)] transition-transform duration-150 group-open:rotate-45"
        >
          +
        </span>
      </summary>

      <div className="border-t border-border px-4 pb-4 pt-4">
        {tip.detail && (
          <p className="max-w-2xl text-[13px] leading-relaxed text-muted-foreground">
            {tip.detail}
          </p>
        )}
        {tip.href && <ExternalLink href={tip.href} label={tip.linkLabel} />}
      </div>
    </details>
  )
}
