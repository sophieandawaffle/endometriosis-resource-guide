import { SectionHeader } from './section-header'

export function SurgerySupport() {
  return (
    <section id="surgery" className="scroll-mt-16 py-12 md:py-16 border-b border-border">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <SectionHeader
          label="Surgery Support"
          title="SURGERY"
          description="This won't all be applicable to every person, but these are a variety of tips that could help your loved one with endo. Make sure to check in with them personally to see what they actually want and would appreciate help with."
        />

        <div className="space-y-10 mt-8">
          <div>
            <h3 className="text-[11px] font-mono tracking-[0.25em] uppercase text-muted-foreground mb-4 pb-3 border-b border-border">
              Before Surgery
            </h3>
            <div className="space-y-3">
              {[
                'Research what the surgery',
                'Research excision specialists in your area',
                'Learn what kind of surgery they\'re having (excision, ablation, etc) - don\'t make them explain everything to you (its exhausting)',
                'Offer to meal prep or cook for them during recovery',
                'Travel with them if they have to fly for surgery',
              ].map((text, i) => (
                <div key={i} className="flex gap-4 items-start border border-border bg-card p-4">
                  <span className="font-mono text-[10px] text-muted-foreground shrink-0 w-5 text-right pt-1">{i + 1}.</span>
                  <p className="text-sm text-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-mono tracking-[0.25em] uppercase text-muted-foreground mb-4 pb-3 border-b border-border">
              During / After Surgery
            </h3>
            <div className="space-y-3">
              {[
                'Offer to look after their pets, kids, or home during their surgery and hospital stay',
              ].map((text, i) => (
                <div key={i} className="flex gap-4 items-start border border-border bg-card p-4">
                  <span className="font-mono text-[10px] text-muted-foreground shrink-0 w-5 text-right pt-1">{i + 1}.</span>
                  <p className="text-sm text-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
