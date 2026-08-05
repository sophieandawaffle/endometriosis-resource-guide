import { SectionHeader } from './section-header'

interface ResourceItem {
  text: string
  href?: string
  note?: string
}

const TO_READ: ResourceItem[] = [
  {
    text: 'Endometriosis UK — current statistics and research (UK)',
    href: 'https://www.endometriosis-uk.org',
    note: 'The leading UK charity for endometriosis information and support.',
  },
  {
    text: 'World Endometriosis Society — global research hub',
    href: 'https://endometriosis.ca',
  },
  {
    text: '"Endometriosis: The Smart Woman\'s Guide" — essential reading on the condition',
  },
]

const TO_WATCH: ResourceItem[] = [
  {
    text: '"THIS IS ENDOMETRIOSIS" — 2026 BAFTA winning short film',
    href: 'https://www.youtube.com',
    note: 'A powerful, unflinching short documentary on living with endometriosis.',
  },
  {
    text: 'BBC Panorama: "Endometriosis — Suffering in Silence"',
    note: 'Available on BBC iPlayer.',
  },
]

const TO_LISTEN: ResourceItem[] = [
  {
    text: 'The Spoonie Diaries — YouTube channel for endometriosis experiences',
    href: 'https://www.youtube.com/@TheSpoonieChannelOfficial',
    note: 'Personal stories and practical guidance from people living with endo.',
  },
  {
    text: 'Endometriosis UK Podcast',
    href: 'https://www.endometriosis-uk.org',
    note: 'Interviews with experts, doctors, and people with endo.',
  },
]

const TO_FOLLOW: ResourceItem[] = [
  {
    text: 'Endometriosis UK',
    href: 'https://www.instagram.com/endometriosisuk',
    note: '@endometriosisuk on Instagram and TikTok',
  },
  {
    text: 'Nancy\'s Nook — Endometriosis Education (Facebook Group)',
    note: 'A large, well-moderated group for education on finding specialist excision surgeons.',
  },
  {
    text: '#endometriosis on TikTok',
    note: 'A huge community sharing real lived experience.',
  },
]

interface ResourceBlockProps {
  icon: string
  title: string
  items: ResourceItem[]
}

function ResourceBlock({ icon, title, items }: ResourceBlockProps) {
  return (
    <div className="border border-border bg-card p-6">
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border">
        <span className="font-display text-2xl" style={{ color: 'var(--endo-red)' }} aria-hidden="true">
          {icon}
        </span>
        <h3 className="font-display text-xl uppercase tracking-wide text-foreground">
          {title}
        </h3>
      </div>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="font-mono text-[10px] text-muted-foreground shrink-0 w-5 text-right pt-0.5">
              {i + 1}.
            </span>
            <div>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground underline decoration-[var(--endo-red)] underline-offset-3 hover:text-[var(--endo-red)] transition-colors"
                >
                  {item.text}
                </a>
              ) : (
                <p className="text-sm text-foreground">{item.text}</p>
              )}
              {item.note && (
                <p className="mt-1 text-[11px] font-mono text-muted-foreground">{item.note}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Resources() {
  return (
    <section id="resources" className="scroll-mt-16 py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <SectionHeader
          label="Where to start"
          title="Research"
          description="A starting point for learning more about endometriosis — for yourself, or to better understand what someone you love is going through."
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <ResourceBlock icon="READ" title="To Read" items={TO_READ} />
          <ResourceBlock icon="WATCH" title="To Watch" items={TO_WATCH} />
          <ResourceBlock icon="LISTEN" title="To Listen" items={TO_LISTEN} />
          <ResourceBlock icon="FOLLOW" title="To Follow" items={TO_FOLLOW} />
        </div>
      </div>
    </section>
  )
}
