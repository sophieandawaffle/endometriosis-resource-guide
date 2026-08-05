import Link from 'next/link'

import type { SectionCardMeta } from '@/lib/content'

export function SectionCard({ card }: { card: SectionCardMeta }) {
  return (
    <Link
      href={card.href}
      className="group flex flex-col justify-between border border-border bg-card p-6 transition-colors hover:border-[var(--endo-red)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--endo-red)]"
    >
      <div>
        <span aria-hidden="true" className="block text-2xl leading-none">
          {card.emoji}
        </span>
        <h2 className="mt-4 font-display text-xl uppercase leading-none tracking-wide text-foreground transition-colors group-hover:text-[var(--endo-red)]">
          {card.title}
        </h2>
        <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{card.blurb}</p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {card.meta}
        </span>
        <span
          aria-hidden="true"
          className="font-mono text-sm text-[var(--endo-red)] transition-transform duration-150 group-hover:translate-x-1"
        >
          →
        </span>
      </div>
    </Link>
  )
}
