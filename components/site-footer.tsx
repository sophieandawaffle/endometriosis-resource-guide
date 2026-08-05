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

          <div className="text-[11px] font-mono text-muted-foreground space-y-1 md:text-right">
            <p>Last updated: 4th August 2026</p>
            <p>
              Built from real community responses.{' '}
              <span className="text-foreground">Not medical advice.</span>
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-[11px] font-mono text-muted-foreground leading-relaxed max-w-2xl">
            The information in this guide is intended for educational purposes only and should not be taken
            as medical advice. Always consult a qualified healthcare professional for medical guidance.
            Endometriosis is a serious medical condition requiring proper clinical care.
          </p>
        </div>
      </div>
    </footer>
  )
}
