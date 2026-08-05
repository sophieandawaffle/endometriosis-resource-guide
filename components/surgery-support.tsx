import { SectionHeader } from './section-header'
import { ContentList } from './content-list'
import { Callout } from './callout'

const BEFORE_ITEMS = [
  {
    text: 'Offer to drive them to the hospital and pick them up — they will not be able to drive themselves home.',
  },
  {
    text: 'Help them prepare their home before they go in: fresh bedding, food stocked up, things within easy reach.',
  },
  {
    text: 'Ask if they\'d like company before they go in, or prefer quiet — surgery nerves vary hugely person to person.',
  },
  {
    text: 'Help them research their specific procedure so they know what to expect, if that\'s helpful to them.',
  },
  {
    text: 'Don\'t make them plan for your comfort — it\'s their surgery, not a social occasion.',
  },
]

const DURING_ITEMS = [
  {
    text: 'If you\'re in the waiting room, don\'t pressure them to text you updates — they\'ll be in theatre.',
  },
  {
    text: 'Wait for them or be reachable so you can collect them when they\'re discharged.',
  },
  {
    text: 'Be prepared that surgery may take longer or shorter than expected.',
  },
]

const AFTER_ITEMS = [
  {
    text: 'Recovery from laparoscopy typically takes 1–2 weeks minimum — sometimes much longer depending on the extent of the surgery.',
    note: 'Don\'t assume they\'ll be "back to normal" within a few days.',
  },
  {
    text: 'The "shoulder tip pain" from CO2 gas used in laparoscopy is real and very painful — this is normal, not a complication.',
    note: 'Peppermint tea, shoulder massages, and moving gently can help.',
  },
  {
    text: 'Cook for them, do their laundry, clean their space — the basics of life are hard post-surgery.',
  },
  {
    text: 'Don\'t make them feel guilty for resting. Rest IS the recovery.',
  },
  {
    text: 'Be aware that surgery results aren\'t always positive. Sometimes endo is more extensive than expected — or results are emotionally hard to process.',
  },
  {
    text: 'Emotional support after surgery is as important as physical — diagnosis, findings, and what it means for fertility can be a lot to absorb.',
  },
  {
    text: 'Don\'t push them to do too much too soon. "You look fine" is not a valid reason to push recovery.',
  },
  {
    text: 'Offer to attend post-op appointments if they\'d like support.',
  },
]

export function SurgerySupport() {
  return (
    <section id="surgery" className="scroll-mt-16 py-12 md:py-16 border-b border-border">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <SectionHeader
          label="Before, during, and after"
          title="Surgery Support"
          description="Things you can do to support your loved one through surgery for endometriosis — whether it's a diagnostic laparoscopy or excision surgery."
        />

        <div className="space-y-10">
          <div>
            <h3 className="text-[11px] font-mono tracking-[0.25em] uppercase text-muted-foreground mb-4 pb-3 border-b border-border">
              Before surgery
            </h3>
            <ContentList items={BEFORE_ITEMS} />
          </div>

          <div>
            <h3 className="text-[11px] font-mono tracking-[0.25em] uppercase text-muted-foreground mb-4 pb-3 border-b border-border">
              On the day
            </h3>
            <ContentList items={DURING_ITEMS} />
          </div>

          <div>
            <h3 className="text-[11px] font-mono tracking-[0.25em] uppercase text-muted-foreground mb-4 pb-3 border-b border-border">
              After surgery
            </h3>
            <ContentList items={AFTER_ITEMS} />
          </div>

          <Callout>
            <p>
              Surgery for endometriosis is not a one-time fix. Many people have multiple surgeries over their lifetime.
              Endo can regrow, and each surgery carries its own risks and recovery time. Long-term support matters.
            </p>
          </Callout>
        </div>
      </div>
    </section>
  )
}
