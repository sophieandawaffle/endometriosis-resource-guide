interface SectionHeaderProps {
  label: string
  title: string
  description?: string
  id?: string
}

export function SectionHeader({ label, title, description, id }: SectionHeaderProps) {
  return (
    <div id={id} className="border-b border-border pb-6 mb-8 scroll-mt-16">
      <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground mb-3">
        {label}
      </p>
      <h2
        className="font-display text-[clamp(2.5rem,8vw,6rem)] leading-none uppercase tracking-tight"
        style={{ color: 'var(--endo-red)' }}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  )
}
