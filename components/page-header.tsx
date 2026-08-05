import Link from 'next/link'

interface PageHeaderProps {
  eyebrow: string
  title: string
  intro?: string
}

export function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <div className="border-b border-border pb-6">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-[var(--endo-red)]"
      >
        <span aria-hidden="true">←</span> All sections
      </Link>

      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        {eyebrow}
      </p>

      <h1
        className="font-display text-[clamp(2.5rem,8vw,6rem)] uppercase leading-none tracking-tight"
        style={{ color: 'var(--endo-red)' }}
      >
        {title}
      </h1>

      {intro && (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {intro}
        </p>
      )}
    </div>
  )
}
