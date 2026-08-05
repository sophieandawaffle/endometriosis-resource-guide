export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-0">
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <span
              className="font-display text-3xl tracking-widest uppercase"
              style={{ color: 'var(--endo-red)' }}
            >
              ENDO
            </span>
            <p className="mt-2 text-[11px] font-mono text-muted-foreground tracking-wide uppercase">
              A guide by a woman with endometriosis
            </p>
          </div>

          <div className="text-[11px] font-mono text-muted-foreground md:text-right">
            <p>Last updated: 4th August 2026</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
