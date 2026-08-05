import { SectionHeader } from './section-header'

interface ResourceBlockProps {
  label: string
  children: React.ReactNode
}

function ResourceBlock({ label, children }: ResourceBlockProps) {
  return (
    <div className="border border-border bg-card p-6">
      <h3 className="font-display text-base uppercase tracking-wide text-foreground mb-5 pb-4 border-b border-border">
        {label}
      </h3>
      <ul className="space-y-4">{children}</ul>
    </div>
  )
}

function ResourceItem({ num, href, text }: { num: number; href?: string; text: string }) {
  return (
    <li className="flex gap-3">
      <span className="font-mono text-[10px] text-muted-foreground shrink-0 w-5 text-right pt-0.5">
        {num}.
      </span>
      <div>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground underline decoration-[var(--endo-red)] underline-offset-3 hover:text-[var(--endo-red)] transition-colors"
          >
            {text}
          </a>
        ) : (
          <p className="text-sm text-foreground">{text}</p>
        )}
      </div>
    </li>
  )
}

export function Resources() {
  return (
    <section id="resources" className="scroll-mt-16 py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <SectionHeader
          label="Research: Where To Start"
          title="RESEARCH"
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <ResourceBlock label="📖 To read">
            <ResourceItem
              num={1}
              href="https://www.endometriosis-uk.org/sites/default/files/2026-02/Endometriosis%20-%20The%20State%20of%20Endometriosis%20Care%20Report.pdf"
              text="The current statistics on endometriosis in the UK in this report by Endometriosis UK"
            />
          </ResourceBlock>

          <ResourceBlock label="🎬 To watch">
            <ResourceItem
              num={1}
              href="https://www.thisisendo.com/"
              text="'THIS IS ENDOMETRIOSIS' (2026 BAFTA winning short film)"
            />
          </ResourceBlock>

          <ResourceBlock label="🎧 To listen">
            <ResourceItem
              num={1}
              href="https://www.youtube.com/@thespooniesociety"
              text="The Spoonie Diaries YouTube channel for endometriosis experiences"
            />
          </ResourceBlock>

          <ResourceBlock label="👣 To follow">
            {/* Notion export has an empty list item here */}
          </ResourceBlock>
        </div>
      </div>
    </section>
  )
}
