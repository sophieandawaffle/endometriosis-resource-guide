import { SectionHeader } from './section-header'

// Data from Notion export: THINGS TO SPEND MONEY ON CSV
const SPEND_ITEMS = [
  {
    item: 'Anti-inflammatory foods',
    category: 'Food',
    cost: 'Low',
    info: 'Everyone is different, but some typical anti-inflammatory foods include fish, leafy greens, berries, flaxseeds, turmeric, ginger, olive oil, nuts',
  },
  {
    item: 'Hot water bottle',
    category: 'Pain relief',
    cost: 'Low',
    info: '',
  },
  {
    item: 'Electrolytes',
    category: 'Food',
    cost: 'Low',
    info: '',
  },
  {
    item: 'Surgery care package (donation-based via EndoBuddies)',
    category: 'Items',
    cost: 'Low',
    info: 'Order a pre-made care package via Endo Buddies (UK) here: https://endobuddies.com/product/surgery-care-package/ (note - order well ahead of time).',
    href: 'https://endobuddies.com/product/surgery-care-package/',
  },
  {
    item: 'Post-surgery recovery basket (DIY option)',
    category: 'Items',
    cost: 'Medium',
    info: 'Peppermint tea, comfy pyjamas, compression socks, sleep mask, ear plugs, face mask, hot water bottle, electrolytes, silk pillowcase or sheets, snacks',
  },
  {
    item: 'Wearable heating pad',
    category: 'Pain relief',
    cost: 'Medium',
    info: '',
  },
  {
    item: 'Doordash/Deliveroo/Uber Eats vouchers',
    category: 'Food',
    cost: 'Medium',
    info: 'Helpful during a flare when you physically can\'t cook.',
  },
  {
    item: 'TENS machine',
    category: 'Pain relief',
    cost: 'Medium',
    info: '',
  },
  {
    item: 'Donate to surgery GoFundMe\'s',
    category: 'Donations',
    cost: 'Medium',
    info: 'Especially for people without access to the NHS',
  },
  {
    item: 'Subscription to symptom or period tracker apps',
    category: 'Healthcare',
    cost: 'Medium',
    info: 'Tracking symptoms is often one of the ways we\'re able to get doctors to take us seriously.',
  },
  {
    item: 'Pelvic floor / hip mobility physiotherapy',
    category: 'Healthcare',
    cost: 'High',
    info: 'People with endo are more likely to have a hyperactive pelvic floor and tightness in the hips, which can contribute to pain and symptoms. Physio can help relieve them!',
  },
  {
    item: 'High-cost supplements',
    category: 'Healthcare',
    cost: 'High',
    info: 'Cover the cost of their usual supplements/vitamins for a month.',
  },
  {
    item: 'Hot tub',
    category: 'Pain relief',
    cost: 'High',
    info: 'No need to wait for a hot bath to run!',
  },
  {
    item: 'Therapy',
    category: 'Healthcare',
    cost: 'High',
    info: 'Mental health care is so important and often overlooked. An endo/chronic illness specialist therapist can help.',
  },
  {
    item: 'Sound bath meditation',
    category: 'Relaxation',
    cost: 'High, Medium',
    info: 'Extremely calming, can help reduce stress which contributes to flare-ups',
  },
  {
    item: 'Reiki healing session',
    category: 'Relaxation',
    cost: 'High',
    info: 'Deep relaxation and stress-relief potential',
  },
  {
    item: 'Organic underwear',
    category: 'Items',
    cost: 'High',
    info: 'Reduce exposure of toxins to the pelvic area and increase comfort',
  },
]

const costColors: Record<string, string> = {
  Low: 'text-green-700 bg-green-50 border-green-200',
  Medium: 'text-yellow-700 bg-yellow-50 border-yellow-200',
  High: 'text-red-700 bg-red-50 border-red-200',
  'High, Medium': 'text-orange-700 bg-orange-50 border-orange-200',
}

export function SpendMoney() {
  return (
    <section id="spend-money" className="scroll-mt-16 py-12 md:py-16 border-b border-border">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <SectionHeader
          label="Things to Spend Money On"
          title="THINGS TO SPEND MONEY ON"
        />

        <p className="text-sm text-muted-foreground leading-relaxed mb-8 italic">
          Note: always check with people before buying them something - they may not want or need it, or already have it - and everything won&apos;t work for everyone.
        </p>

        <div className="space-y-3">
          {SPEND_ITEMS.map((item, i) => (
            <div key={i} className="flex gap-4 items-start border border-border bg-card p-4">
              <span className="font-mono text-[10px] text-muted-foreground shrink-0 w-5 text-right pt-1">
                {i + 1}.
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start gap-2">
                  <p className="text-sm text-foreground leading-relaxed flex-1">{item.item}</p>
                  <div className="flex gap-2 shrink-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider border px-2 py-0.5 text-muted-foreground border-border">
                      {item.category}
                    </span>
                    <span className={`text-[10px] font-mono uppercase tracking-wider border px-2 py-0.5 ${costColors[item.cost] ?? costColors['Medium']}`}>
                      {item.cost}
                    </span>
                  </div>
                </div>
                {item.info && (
                  <p className="mt-1.5 text-[11px] font-mono text-muted-foreground leading-relaxed">
                    {item.href ? (
                      <>
                        {item.info.split(item.href)[0]}
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="underline decoration-[var(--endo-red)] underline-offset-2 hover:text-[var(--endo-red)]">{item.href}</a>
                        {item.info.split(item.href)[1]}
                      </>
                    ) : item.info}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
