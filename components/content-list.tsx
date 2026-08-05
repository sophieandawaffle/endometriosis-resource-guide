interface ContentItem {
  text: string
  note?: string
  href?: string
}

interface ContentListProps {
  items: ContentItem[]
}

export function ContentList({ items }: ContentListProps) {
  return (
    <ul className="space-y-0 divide-y divide-border">
      {items.map((item, i) => (
        <li key={i} className="group flex gap-4 py-4 hover:bg-card transition-colors duration-100 px-2 -mx-2">
          <span className="font-mono text-[11px] text-muted-foreground pt-0.5 shrink-0 w-6 text-right">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="flex-1 min-w-0">
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm leading-relaxed text-foreground underline decoration-[var(--endo-red)] underline-offset-3 hover:text-[var(--endo-red)] transition-colors"
              >
                {item.text}
              </a>
            ) : (
              <p className="text-sm leading-relaxed text-foreground">{item.text}</p>
            )}
            {item.note && (
              <p className="mt-1 text-[11px] font-mono text-muted-foreground">{item.note}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
