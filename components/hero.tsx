export function Hero() {
  return (
    <header className="relative overflow-hidden border-b border-border">
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-6 md:px-10 pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="flex justify-end mb-8 md:mb-12">
          <span className="text-[10px] tracking-[0.25em] uppercase font-mono text-muted-foreground">
            LAST UPDATED: 4 AUG 2026
          </span>
        </div>

        <div className="relative mb-6 md:mb-8">
          <span
            className="block font-display text-[clamp(6rem,22vw,18rem)] leading-none tracking-tight uppercase"
            style={{ color: 'var(--endo-red)' }}
            aria-hidden="true"
          >
            ENDO
          </span>
        </div>

        <h1 className="text-xl md:text-2xl font-sans font-semibold leading-snug text-foreground max-w-2xl text-pretty mb-4">
          How to ACTUALLY help people with endometriosis (a guide)
        </h1>

        <div className="mt-8 md:mt-12 h-px bg-border" aria-hidden="true" />
      </div>
    </header>
  )
}
