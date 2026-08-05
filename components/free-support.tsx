import { SectionHeader } from './section-header'

// Data from Notion export: FREE SUPPORT CSV
const FREE_ITEMS = [
  {
    text: 'Check in (text or call)',
    effort: 'Low' as const,
    whyItHelps: '',
  },
  {
    text: 'Offer to help booking appointments',
    effort: 'Low' as const,
    whyItHelps: '',
  },
  {
    text: 'Eat anti-inflammatory or gluten-free when together',
    effort: 'Low' as const,
    whyItHelps: '(esp. for roommates/partners). Even if it\'s only sometimes - accommodate their dietary needs & let them know they\'re not a burden.',
  },
  {
    text: 'Be present during a flare-up',
    effort: 'Medium' as const,
    whyItHelps: 'Make sure they\'re able to stay hydrated, eat something, and rest without having to worry',
  },
  {
    text: 'Offer massages',
    effort: 'Medium' as const,
    whyItHelps: '',
  },
  {
    text: 'Research endometriosis in your own time',
    effort: 'Medium' as const,
    whyItHelps: 'Constantly explaining the condition can get exhausting. Take the burden off of them by researching yourself (podcasts, news, studies, endo creators online)',
  },
  {
    text: 'Drive them to appointments, the ER, and surgery',
    effort: 'Medium' as const,
    whyItHelps: 'Many people end up traveling alone and in pain. This can make a huge difference practically and mentally.',
  },
  {
    text: 'Offer to do their household chores during flare-ups',
    effort: 'Medium' as const,
    whyItHelps: '',
  },
  {
    text: 'Offer to attend appointments with them',
    effort: 'Medium' as const,
    whyItHelps: 'It can be exhausting to constantly advocate for yourself - many people find it easier when they have a loved one by their side.',
  },
  {
    text: 'Stay by their side post-op',
    effort: 'High' as const,
    whyItHelps: 'Recovery can be unpredictable and we don\'t know how long we\'ll need support for after surgery. Taking the worry away from this helps let us focus on recovery without stress.',
  },
]

const EFFORT_GROUPS = ['Low', 'Medium', 'High'] as const

export function FreeSupport() {
  return (
    <section id="free-support" className="scroll-mt-16 py-12 md:py-16 border-b border-border">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <SectionHeader
          label="Free Ways to Support"
          title="FREE WAYS TO SUPPORT"
          description="These are some acts of service you can do for zero or low cost that can mean a lot to people dealing with endometriosis. Most are low to medium effort."
        />

        <div className="mt-8 space-y-10">
          {EFFORT_GROUPS.map((effort) => {
            const items = FREE_ITEMS.filter((item) => item.effort === effort)

            return (
              <div key={effort}>
                <h3 className="mb-4 border-b border-border pb-3 font-display text-2xl uppercase leading-none text-foreground">
                  {effort} effort
                </h3>
                <div className="space-y-3">
                  {items.map((item, i) => (
                    <div key={item.text} className="flex gap-4 items-start border border-border bg-card p-4">
                      <span className="font-mono text-[10px] text-muted-foreground shrink-0 w-5 text-right pt-1">
                        {i + 1}.
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground leading-relaxed">{item.text}</p>
                        {item.whyItHelps && (
                          <p className="mt-1.5 text-[11px] font-mono text-muted-foreground leading-relaxed">
                            {item.whyItHelps}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
