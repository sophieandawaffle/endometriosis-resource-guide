import { SectionHeader } from './section-header'

const MISC_ITEMS = [
  {
    text: <>The <strong>number one thing</strong> you can do is to simply listen and validate pain.</>,
  },
  {
    text: <>Be <strong>flexible</strong> with plans - let them cancel guilt-free, and accommodate their location preferences where possible (e.g. travel to them)</>,
  },
  {
    text: <>Offer extra support through stressful life events that can cause flare ups (e.g. moving house, especially carrying heavy things)</>,
  },
]

export function MiscAdvice() {
  return (
    <section id="misc" className="scroll-mt-16 py-12 md:py-16 border-b border-border">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <SectionHeader
          label="Misc / FAQs / General Advice"
          title="MISC / GENERAL ADVICE"
          description="For FAQs and anything that didn't fit in to the above."
        />

        <div className="mt-8 space-y-3">
          {MISC_ITEMS.map((item, i) => (
            <div key={i} className="flex gap-4 items-start border border-border bg-card p-4">
              <span className="font-mono text-[10px] text-muted-foreground shrink-0 w-5 text-right pt-1">
                {i + 1}.
              </span>
              <p className="text-sm text-foreground leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
