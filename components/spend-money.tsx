import { SectionHeader } from './section-header'
import { ContentList } from './content-list'
import { Callout } from './callout'

const LOW_COST_ITEMS = [
  {
    text: 'A quality heating pad or electric hot water bottle',
    note: 'Heat is one of the most commonly cited forms of pain relief. A wheat bag, USB electric heat pad, or microwaveable pack.',
  },
  {
    text: 'A comfortable weighted blanket',
    note: 'Many people with chronic pain find these soothing during flares.',
  },
  {
    text: 'Easy comfort foods they love — soups, snacks, foods that require no prep',
    note: 'Cooking when in pain is hard. Ready-made meals or a grocery delivery are a real gift.',
  },
  {
    text: 'Loose, comfortable clothing — oversized hoodies, soft joggers',
    note: 'Tight waistbands can be excruciating during flares. Softness matters.',
  },
  {
    text: 'Peppermint tea, ginger tea, or herbal teas they like',
    note: 'Some people find these helpful for bloating and nausea. Always check preferences first.',
  },
  {
    text: 'A cosy blanket or throw',
    note: 'Small, thoughtful, practical.',
  },
  {
    text: 'A journal or notebook if they enjoy writing',
    note: 'Many people find journalling helpful for processing a chronic illness experience.',
  },
]

const MID_COST_ITEMS = [
  {
    text: 'Pay for a cleaner for a day while they recover from surgery or a bad flare',
    note: 'This is one of the most frequently mentioned and appreciated things.',
  },
  {
    text: 'A food delivery service subscription (Deliveroo Plus, Just Eat etc.) for when cooking is impossible',
  },
  {
    text: 'A high-quality TENS machine',
    note: 'Transcutaneous electrical nerve stimulation — many people with chronic pain swear by them.',
  },
  {
    text: 'Subscription to a mindfulness or meditation app (Calm, Headspace)',
    note: 'Chronic illness takes a serious mental health toll.',
  },
  {
    text: 'Contribution towards private physiotherapy or pelvic floor therapy',
    note: 'Pelvic physiotherapy is one of the most highly recommended treatments — but not always available on the NHS.',
  },
  {
    text: 'A high-quality thermos or water bottle',
    note: 'Staying hydrated is important for managing symptoms; having a nice vessel makes it easier.',
  },
]

const HIGHER_COST_ITEMS = [
  {
    text: 'Contribution towards private consultations with an endo specialist',
    note: 'NHS waiting lists can be very long. A private appointment can be life-changing.',
  },
  {
    text: 'A spa day or massages — check with them first and ensure it\'s appropriate for their symptoms',
  },
  {
    text: 'Contribution towards a nutrient-dense meal delivery service (e.g. Mindful Chef)',
    note: 'Diet doesn\'t cure endo but eating well during recovery matters.',
  },
]

export function SpendMoney() {
  return (
    <section id="spend-money" className="scroll-mt-16 py-12 md:py-16 border-b border-border">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <SectionHeader
          label="When you want to spend money"
          title="Things to Spend Money On"
        />

        <Callout variant="warning">
          <p className="font-semibold text-foreground mb-2">Check first</p>
          <p>
            Always check with people before buying them something — they may not want or need it,
            or already have it — and everything won&apos;t work for everyone. Asking
            &quot;would this be helpful?&quot; is never a bad idea.
          </p>
        </Callout>

        <div className="mt-8 space-y-10">
          <div>
            <h3 className="text-[11px] font-mono tracking-[0.25em] uppercase text-muted-foreground mb-4 pb-3 border-b border-border">
              Low cost (under &pound;30)
            </h3>
            <ContentList items={LOW_COST_ITEMS} />
          </div>

          <div>
            <h3 className="text-[11px] font-mono tracking-[0.25em] uppercase text-muted-foreground mb-4 pb-3 border-b border-border">
              Mid range (&pound;30–&pound;150)
            </h3>
            <ContentList items={MID_COST_ITEMS} />
          </div>

          <div>
            <h3 className="text-[11px] font-mono tracking-[0.25em] uppercase text-muted-foreground mb-4 pb-3 border-b border-border">
              Higher investment (&pound;150+)
            </h3>
            <ContentList items={HIGHER_COST_ITEMS} />
          </div>
        </div>
      </div>
    </section>
  )
}
