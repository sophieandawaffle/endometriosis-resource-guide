import { SectionHeader } from './section-header'
import { ContentList } from './content-list'
import { Callout } from './callout'

const DONT_SAY_ITEMS = [
  { text: '"At least it\'s not cancer."' },
  { text: '"My periods are painful too."' },
  { text: '"Have you tried yoga / acupuncture / cutting out gluten?" (unless they asked)' },
  { text: '"You don\'t look sick."' },
  { text: '"Maybe it\'ll get better when you have kids." (This is a myth and causes harm.)' },
  { text: '"It\'s just a bad period."' },
  { text: '"Everyone gets cramps."' },
  { text: '"You\'re too young to have that much pain."' },
]

const DO_SAY_ITEMS = [
  { text: '"I believe you."' },
  { text: '"That sounds really hard."' },
  { text: '"What do you need right now?"' },
  { text: '"I\'m here if you want to talk — or if you don\'t want to talk."' },
  { text: '"Is there anything I can do to make today easier?"' },
  { text: '"You don\'t have to explain or justify how you feel."' },
  { text: '"I\'ve been doing some reading — I want to understand better."' },
]

const FAQ_ITEMS = [
  {
    text: 'Is endometriosis hereditary?',
    note: 'There is a genetic component. If a first-degree relative has endo, you are 7x more likely to develop it.',
  },
  {
    text: 'Can endometriosis be cured?',
    note: 'No. It can be managed through hormonal therapies, surgery, and lifestyle changes — but there is currently no cure.',
  },
  {
    text: 'Does pregnancy cure endometriosis?',
    note: 'No. This is a common myth. Pregnancy may temporarily relieve symptoms for some, but it is not a treatment.',
  },
  {
    text: 'Can men have endometriosis?',
    note: 'It is extremely rare, but yes — it has been documented in people assigned male at birth in very rare cases.',
  },
  {
    text: 'Why does it take so long to diagnose?',
    note: 'Historically dismissed as "bad periods", endo is only diagnosable via laparoscopy (surgery). Lack of awareness delays diagnosis.',
  },
]

export function MiscAdvice() {
  return (
    <section id="misc" className="scroll-mt-16 py-12 md:py-16 border-b border-border">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <SectionHeader
          label="FAQs and general guidance"
          title="Misc / General Advice"
          description="For frequently asked questions and anything that didn't fit neatly into the other categories."
        />

        <div className="space-y-10">
          <div>
            <h3 className="text-[11px] font-mono tracking-[0.25em] uppercase text-muted-foreground mb-4 pb-3 border-b border-border">
              Things NOT to say
            </h3>
            <ContentList items={DONT_SAY_ITEMS} />
          </div>

          <div>
            <h3 className="text-[11px] font-mono tracking-[0.25em] uppercase text-muted-foreground mb-4 pb-3 border-b border-border">
              Things that actually help to hear
            </h3>
            <ContentList items={DO_SAY_ITEMS} />
          </div>

          <Callout variant="warning">
            <p className="font-semibold text-foreground mb-2">On the "pregnancy cure" myth</p>
            <p>
              Suggesting pregnancy as a treatment for endometriosis is harmful. Many people with endo struggle with
              infertility, and the implication that they should just &quot;get pregnant&quot; is painful and inaccurate.
              It may provide temporary hormonal relief for some, but symptoms typically return.
            </p>
          </Callout>

          <div>
            <h3 className="text-[11px] font-mono tracking-[0.25em] uppercase text-muted-foreground mb-4 pb-3 border-b border-border">
              Frequently asked questions
            </h3>
            <ContentList items={FAQ_ITEMS} />
          </div>
        </div>
      </div>
    </section>
  )
}
