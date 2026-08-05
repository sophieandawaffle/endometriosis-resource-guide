import { SectionHeader } from './section-header'
import { ContentList } from './content-list'
import { Callout } from './callout'

const EMPLOYER_ITEMS = [
  {
    text: 'Offer flexible working hours — endo symptoms are unpredictable and don\'t follow a 9-5 schedule.',
  },
  {
    text: 'Allow working from home on bad days so they can manage symptoms more comfortably.',
  },
  {
    text: 'Don\'t penalise them for sick days related to their condition. Look into how endo might qualify as a disability under your local legislation.',
    note: 'In the UK, endometriosis may be covered under the Equality Act 2010.',
  },
  {
    text: 'Have a private conversation to understand their needs — don\'t make them explain in a group or public setting.',
  },
  {
    text: 'Ensure there\'s easy access to a private, comfortable space if they need to rest or take medication.',
  },
  {
    text: 'Be aware that some medications cause brain fog, fatigue, or other side effects that may affect performance.',
  },
  {
    text: 'Consider period/menstrual leave or "pain days" as part of your HR policy.',
  },
  {
    text: 'Don\'t assume they\'re "fine" if they look fine. Many people mask their symptoms to appear professional.',
  },
]

const COLLEAGUE_ITEMS = [
  {
    text: 'Don\'t comment on how often they\'re absent or how much time off they take.',
  },
  {
    text: 'Don\'t ask invasive questions about their condition unless they\'ve opened up to you.',
  },
  {
    text: 'Cover for them when they\'re struggling — as you would for any colleague with a health condition.',
  },
  {
    text: 'Normalise the conversation around period pain and chronic illness in the workplace.',
  },
  {
    text: 'If they share their diagnosis with you, keep it confidential unless they\'ve said otherwise.',
  },
]

export function EndoAtWork() {
  return (
    <section id="endo-at-work" className="scroll-mt-16 py-12 md:py-16 border-b border-border">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <SectionHeader
          label="For employers and colleagues"
          title="Endo at Work"
          description="If you're an employer of someone with endometriosis, or have a colleague with endo, these are some ways to help and useful things to know."
        />

        <div className="space-y-10">
          <div>
            <h3 className="text-[11px] font-mono tracking-[0.25em] uppercase text-muted-foreground mb-4 pb-3 border-b border-border">
              If you are an employer
            </h3>
            <ContentList items={EMPLOYER_ITEMS} />
          </div>

          <div>
            <h3 className="text-[11px] font-mono tracking-[0.25em] uppercase text-muted-foreground mb-4 pb-3 border-b border-border">
              If you are a colleague
            </h3>
            <ContentList items={COLLEAGUE_ITEMS} />
          </div>

          <Callout variant="note">
            <p>
              Endometriosis can be classified as a disability under the UK Equality Act 2010 if it has a
              substantial and long-term effect on day-to-day activities. Employers have a duty to make
              reasonable adjustments.
            </p>
          </Callout>
        </div>
      </div>
    </section>
  )
}
