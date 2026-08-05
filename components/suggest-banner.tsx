import Link from 'next/link'

export function SuggestBanner({
  heading = 'Got something to add?',
  body = 'One box, one button. Tell us what actually helped you — anonymously if you like.',
}: {
  heading?: string
  body?: string
}) {
  return (
    <section className="border border-border bg-card p-6 md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="font-display text-2xl uppercase leading-none tracking-wide text-foreground">
            {heading}
          </h2>
          <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{body}</p>
        </div>

        <Link
          href="/suggest"
          className="shrink-0 bg-[var(--endo-red)] px-6 py-4 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--primary-foreground)] transition-opacity hover:opacity-85"
        >
          Leave a suggestion →
        </Link>
      </div>
    </section>
  )
}
