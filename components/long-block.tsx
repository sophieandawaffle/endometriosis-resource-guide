import type { LongBlock as LongBlockData } from '@/lib/content'

/**
 * Long-form text, collapsed by default. Nobody has to read the legal detail
 * unless they choose to.
 */
export function LongBlock({ block }: { block: LongBlockData }) {
  return (
    <details className="group border border-border bg-card transition-colors open:border-[var(--endo-red)]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 [&::-webkit-details-marker]:hidden">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground">
          {block.title}
        </span>
        <span
          aria-hidden="true"
          className="shrink-0 select-none font-mono text-sm leading-none text-[var(--endo-red)] transition-transform duration-150 group-open:rotate-45"
        >
          +
        </span>
      </summary>

      <div className="space-y-4 border-t border-border p-4">
        {block.body.map((paragraph, i) => (
          <p key={i} className="max-w-2xl text-[13px] leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>
    </details>
  )
}
