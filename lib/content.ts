// Single source of truth for site content + navigation.
// Every tip is a short, scannable title with the longer explanation tucked
// into `detail`, so pages stay clickable instead of wall-of-text.

export type Effort = 'Low' | 'Medium' | 'High'
export type Cost = 'Low' | 'Medium' | 'High'

export interface Tip {
  title: string
  detail?: string
  href?: string
  linkLabel?: string
  tag?: string
}

export interface NavItem {
  label: string
  href: string
}

export const LAST_UPDATED = '4th August 2026'

export const NAV_ITEMS: NavItem[] = [
  { label: 'Start here', href: '/start-here' },
  { label: 'Free help', href: '/free-support' },
  { label: 'Things to buy', href: '/spend-money' },
  { label: 'Surgery', href: '/surgery' },
  { label: 'At work', href: '/at-work' },
  { label: 'Advice', href: '/advice' },
  { label: 'Research', href: '/resources' },
]

export interface SectionCardMeta {
  href: string
  emoji: string
  title: string
  blurb: string
  meta: string
}

export const SECTION_CARDS: SectionCardMeta[] = [
  {
    href: '/start-here',
    emoji: '👋',
    title: 'Start here',
    blurb: 'What this guide is, and what endometriosis actually is.',
    meta: '1 min read',
  },
  {
    href: '/free-support',
    emoji: '💛',
    title: 'Free ways to help',
    blurb: 'Acts of service that cost nothing. Sorted by effort.',
    meta: '10 ideas',
  },
  {
    href: '/spend-money',
    emoji: '🎁',
    title: 'Things to spend money on',
    blurb: 'Gifts and spends that genuinely help. Sorted by cost.',
    meta: '17 ideas',
  },
  {
    href: '/surgery',
    emoji: '🏥',
    title: 'Surgery support',
    blurb: 'How to show up before, during and after an operation.',
    meta: '6 ideas',
  },
  {
    href: '/at-work',
    emoji: '💼',
    title: 'Endo at work',
    blurb: 'For employers and colleagues. Includes your legal duties.',
    meta: '9 ideas + the law',
  },
  {
    href: '/advice',
    emoji: '💬',
    title: 'General advice',
    blurb: 'The big ones, and everything that fits nowhere else.',
    meta: '3 ideas',
  },
  {
    href: '/resources',
    emoji: '📚',
    title: 'Research',
    blurb: 'One thing to read, watch, and listen to. No homework.',
    meta: 'Links out',
  },
]

// ---------------------------------------------------------------------------
// FREE SUPPORT — data from the Notion export: FREE SUPPORT CSV
// ---------------------------------------------------------------------------

export interface FreeTip extends Tip {
  effort: Effort
}

export const FREE_TIPS: FreeTip[] = [
  {
    title: 'Check in (text or call)',
    effort: 'Low',
  },
  {
    title: 'Offer to help booking appointments',
    effort: 'Low',
  },
  {
    title: 'Eat anti-inflammatory or gluten-free when you’re together',
    effort: 'Low',
    detail:
      'Especially for roommates and partners. Even if it’s only sometimes — accommodate their dietary needs and let them know they’re not a burden.',
  },
  {
    title: 'Be present during a flare-up',
    effort: 'Medium',
    detail:
      'Make sure they’re able to stay hydrated, eat something, and rest without having to worry.',
  },
  {
    title: 'Offer massages',
    effort: 'Medium',
  },
  {
    title: 'Research endometriosis in your own time',
    effort: 'Medium',
    detail:
      'Constantly explaining the condition can get exhausting. Take the burden off them by researching yourself — podcasts, news, studies, endo creators online.',
  },
  {
    title: 'Drive them to appointments, the ER, and surgery',
    effort: 'Medium',
    detail:
      'Many people end up travelling alone and in pain. This can make a huge difference practically and mentally.',
  },
  {
    title: 'Offer to do their household chores during flare-ups',
    effort: 'Medium',
  },
  {
    title: 'Offer to attend appointments with them',
    effort: 'Medium',
    detail:
      'It can be exhausting to constantly advocate for yourself — many people find it easier when they have a loved one by their side.',
  },
  {
    title: 'Stay by their side post-op',
    effort: 'High',
    detail:
      'Recovery can be unpredictable and we don’t know how long we’ll need support for after surgery. Taking that worry away lets us focus on recovery without stress.',
  },
]

// ---------------------------------------------------------------------------
// THINGS TO SPEND MONEY ON — Notion export: THINGS TO SPEND MONEY ON CSV
// ---------------------------------------------------------------------------

export interface SpendTip extends Tip {
  cost: Cost
  category: string
}

export const SPEND_TIPS: SpendTip[] = [
  {
    title: 'Anti-inflammatory foods',
    category: 'Food',
    cost: 'Low',
    detail:
      'Everyone is different, but some typical anti-inflammatory foods include fish, leafy greens, berries, flaxseeds, turmeric, ginger, olive oil and nuts.',
  },
  { title: 'Hot water bottle', category: 'Pain relief', cost: 'Low' },
  { title: 'Electrolytes', category: 'Food', cost: 'Low' },
  {
    title: 'Surgery care package',
    category: 'Items',
    cost: 'Low',
    detail:
      'Donation-based. Order a pre-made care package via Endo Buddies (UK) — note, order well ahead of time.',
    href: 'https://endobuddies.com/product/surgery-care-package/',
    linkLabel: 'Order from Endo Buddies',
  },
  {
    title: 'Post-surgery recovery basket (DIY)',
    category: 'Items',
    cost: 'Medium',
    detail:
      'Peppermint tea, comfy pyjamas, compression socks, sleep mask, ear plugs, face mask, hot water bottle, electrolytes, silk pillowcase or sheets, snacks.',
  },
  { title: 'Wearable heating pad', category: 'Pain relief', cost: 'Medium' },
  {
    title: 'Deliveroo / Uber Eats / DoorDash vouchers',
    category: 'Food',
    cost: 'Medium',
    detail: 'Helpful during a flare when you physically can’t cook.',
  },
  { title: 'TENS machine', category: 'Pain relief', cost: 'Medium' },
  {
    title: 'Donate to surgery GoFundMes',
    category: 'Donations',
    cost: 'Medium',
    detail: 'Especially for people without access to the NHS.',
  },
  {
    title: 'Subscription to a symptom or period tracker app',
    category: 'Healthcare',
    cost: 'Medium',
    detail:
      'Tracking symptoms is often one of the ways we’re able to get doctors to take us seriously.',
  },
  {
    title: 'Sound bath meditation',
    category: 'Relaxation',
    cost: 'Medium',
    detail:
      'Extremely calming, and can help reduce stress which contributes to flare-ups. Prices vary from medium to high.',
  },
  {
    title: 'Pelvic floor / hip mobility physiotherapy',
    category: 'Healthcare',
    cost: 'High',
    detail:
      'People with endo are more likely to have a hyperactive pelvic floor and tightness in the hips, which can contribute to pain and symptoms. Physio can help relieve them.',
  },
  {
    title: 'High-cost supplements',
    category: 'Healthcare',
    cost: 'High',
    detail: 'Cover the cost of their usual supplements or vitamins for a month.',
  },
  {
    title: 'Hot tub',
    category: 'Pain relief',
    cost: 'High',
    detail: 'No need to wait for a hot bath to run.',
  },
  {
    title: 'Therapy',
    category: 'Healthcare',
    cost: 'High',
    detail:
      'Mental health care is so important and often overlooked. An endo or chronic illness specialist therapist can help.',
  },
  {
    title: 'Reiki healing session',
    category: 'Relaxation',
    cost: 'High',
    detail: 'Deep relaxation and stress-relief potential.',
  },
  {
    title: 'Organic underwear',
    category: 'Items',
    cost: 'High',
    detail: 'Reduces exposure of toxins to the pelvic area and increases comfort.',
  },
]

// ---------------------------------------------------------------------------
// SURGERY
// ---------------------------------------------------------------------------

export const SURGERY_BEFORE: Tip[] = [
  {
    title: 'Research what the surgery involves',
  },
  {
    title: 'Research excision specialists in your area',
  },
  {
    title: 'Learn what kind of surgery they’re having',
    detail:
      'Excision, ablation, and so on. Don’t make them explain everything to you — it’s exhausting.',
  },
  {
    title: 'Offer to meal prep or cook for them during recovery',
  },
  {
    title: 'Travel with them if they have to fly for surgery',
  },
]

export const SURGERY_AFTER: Tip[] = [
  {
    title: 'Offer to look after their pets, kids, or home',
    detail: 'During the surgery itself and the hospital stay.',
  },
]

// ---------------------------------------------------------------------------
// ENDO AT WORK
// ---------------------------------------------------------------------------

export const WORK_TIPS: Tip[] = [
  {
    title: 'Know the impact',
    detail:
      'There are some key stats about endometriosis in the workplace worth being aware of before you set policy.',
  },
  {
    title: 'Make guilt-free sick leave the standard',
    detail:
      'Sickness policies should treat endo-related absence as linked to a health condition, not as strikes against an attendance record.',
  },
  {
    title: 'Ask what they need from you as an employer',
  },
  {
    title: 'Allow flexible working hours where possible',
  },
  {
    title: 'Accommodate dietary needs',
    detail: 'At corporate lunches and dinners, and with office snacks.',
  },
  {
    title: 'Sign up for the Endometriosis Friendly Employer Scheme (UK)',
    href: 'https://www.endometriosis-uk.org/endometriosis-friendly-employer-scheme',
    linkLabel: 'Endometriosis UK scheme',
  },
  {
    title: 'Give the option to work from home on flare days',
  },
  {
    title: 'Show understanding around time off for medical appointments',
  },
  {
    title: 'Provide free period products in your workplace',
    detail:
      'Organic period care brand TOTM offers a 10% discount on all its products to organisations committing to be Endometriosis Friendly Employers. In addition, 1% of its online sales are donated to Endometriosis UK.',
  },
]

export interface LongBlock {
  title: string
  body: string[]
}

export const WORK_LONG_BLOCKS: LongBlock[] = [
  {
    title: 'Your legal duties in the US',
    body: [
      'FMLA can give eligible employees unpaid, job-protected leave for a serious health condition, and the ADA can require reasonable accommodations where the condition substantially limits a major life activity. Eligibility rules apply, so it’s worth checking against your employer’s size and your hours.',
    ],
  },
  {
    title: 'Your legal duties in the UK',
    body: [
      'Endometriosis is not automatically a disability under the Equality Act 2010, but it can meet the legal definition where symptoms have a substantial, long-term adverse effect on normal day-to-day activities. Fluctuating or episodic conditions still count if the overall impact is substantial.',
      'Where it qualifies, employers have a legal duty to make reasonable adjustments, including for absence or sickness records linked to the condition. A 2026 Employment Appeal Tribunal case, Pal v Accenture UK, confirmed endometriosis can amount to a disability and trigger that duty, including around performance management.',
      'Worth flagging the difference between two things people confuse: a reasonable adjustment (a legal duty if you meet the disability test) and a flexible working request, which is a separate, weaker right. Every employee can request flexible working, but employers only have to consider it reasonably, not grant it.',
    ],
  },
  {
    title: 'The Endometriosis Friendly Employer scheme',
    body: [
      'Endometriosis UK runs an Endometriosis Friendly Employer scheme where organisations pledge to build a supportive culture across leadership, stigma, and communication. Signed-up employers appoint Endometriosis Champions who are trained by the charity to raise awareness and give practical support to colleagues.',
      'Members already range from NHS trusts and ambulance services to universities, councils, and firms like Capgemini and Azets.',
    ],
  },
]

// ---------------------------------------------------------------------------
// GENERAL ADVICE
// ---------------------------------------------------------------------------

export const ADVICE_TIPS: Tip[] = [
  {
    title: 'Listen, and validate the pain',
    detail:
      'This is the number one thing you can do. Everything else on this site is a distant second.',
  },
  {
    title: 'Be flexible with plans',
    detail:
      'Let them cancel guilt-free, and accommodate their location preferences where possible — for example, travelling to them.',
  },
  {
    title: 'Offer extra support through stressful life events',
    detail:
      'Big events can cause flare-ups. Moving house is a classic, especially the carrying of heavy things.',
  },
]

// ---------------------------------------------------------------------------
// RESEARCH
// ---------------------------------------------------------------------------

export interface ResourceGroup {
  emoji: string
  label: string
  items: Tip[]
}

export const RESOURCE_GROUPS: ResourceGroup[] = [
  {
    emoji: '📖',
    label: 'To read',
    items: [
      {
        title: 'The State of Endometriosis Care Report',
        detail: 'The current statistics on endometriosis in the UK, from Endometriosis UK.',
        href: 'https://www.endometriosis-uk.org/sites/default/files/2026-02/Endometriosis%20-%20The%20State%20of%20Endometriosis%20Care%20Report.pdf',
      },
    ],
  },
  {
    emoji: '🎬',
    label: 'To watch',
    items: [
      {
        title: 'THIS IS ENDOMETRIOSIS',
        detail: '2026 BAFTA-winning short film.',
        href: 'https://www.thisisendo.com/',
      },
    ],
  },
  {
    emoji: '🎧',
    label: 'To listen',
    items: [
      {
        title: 'The Spoonie Diaries',
        detail: 'YouTube channel covering endometriosis experiences.',
        href: 'https://www.youtube.com/@thespooniesociety',
      },
    ],
  },
  {
    emoji: '👣',
    label: 'To follow',
    items: [],
  },
]
