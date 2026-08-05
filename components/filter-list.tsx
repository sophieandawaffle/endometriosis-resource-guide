'use client'

import { useMemo, useState } from 'react'

import type { Tip } from '@/lib/content'
import { TipCard } from './tip-card'

interface FilterListProps<T extends Tip> {
  items: T[]
  /** Field the chips filter on, e.g. `effort` or `cost`. */
  filterKey: keyof T
  /** Chip order. Values must match the values found on `filterKey`. */
  filters: readonly string[]
  /** Appended to each chip label, e.g. `Low` + `effort`. */
  labelSuffix: string
  /** Optional per-card badge, e.g. the category of a purchase. */
  badgeKey?: keyof T
  allLabel?: string
}

export function FilterList<T extends Tip>({
  items,
  filterKey,
  filters,
  labelSuffix,
  badgeKey,
  allLabel = 'Everything',
}: FilterListProps<T>) {
  const [active, setActive] = useState<string | null>(null)

  const counts = useMemo(() => {
    const map = new Map<string, number>()
    for (const item of items) {
      const value = String(item[filterKey])
      map.set(value, (map.get(value) ?? 0) + 1)
    }
    return map
  }, [items, filterKey])

  const visible = active
    ? items.filter((item) => String(item[filterKey]) === active)
    : items

  const chip = (value: string | null, label: string, count: number) => {
    const isActive = active === value
    return (
      <button
        key={label}
        type="button"
        onClick={() => setActive(value)}
        aria-pressed={isActive}
        className={`flex items-center gap-2 border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors ${
          isActive
            ? 'border-[var(--endo-red)] bg-[var(--endo-red)] text-[var(--primary-foreground)]'
            : 'border-border bg-card text-foreground hover:border-[var(--endo-red)] hover:text-[var(--endo-red)]'
        }`}
      >
        {label}
        <span className={isActive ? 'opacity-80' : 'text-muted-foreground'}>{count}</span>
      </button>
    )
  }

  return (
    <div>
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        Filter
      </p>

      <div className="flex flex-wrap gap-2">
        {chip(null, allLabel, items.length)}
        {filters.map((value) =>
          chip(value, `${value} ${labelSuffix}`, counts.get(value) ?? 0),
        )}
      </div>

      <div className="mt-6 space-y-3">
        {visible.map((item, i) => (
          <TipCard
            key={item.title}
            tip={item}
            index={i}
            badge={badgeKey ? String(item[badgeKey]) : undefined}
          />
        ))}
      </div>
    </div>
  )
}
