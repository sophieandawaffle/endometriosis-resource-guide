/**
 * Where an approved suggestion can be published. The review page turns this
 * into its "which section" dropdown, and `lib/content.ts` uses the same keys
 * to merge published items into the right list.
 */

export type TagKind = 'effort' | 'cost' | 'none'

export interface PublishTarget {
  /** Stable key stored on each published entry. Never rename these. */
  key: string
  label: string
  /** Page the item will show up on, for the "view it live" link. */
  path: string
  tag: TagKind
  /** Whether the review form offers a category field (Food, Pain relief, …). */
  category?: boolean
  /** Whether the review form nudges for a link (research items need one). */
  link?: boolean
}

export const PUBLISH_TARGETS: PublishTarget[] = [
  { key: 'free-support', label: 'Free help', path: '/free-support', tag: 'effort' },
  {
    key: 'spend-money',
    label: 'Things to buy',
    path: '/spend-money',
    tag: 'cost',
    category: true,
  },
  { key: 'surgery-before', label: 'Surgery — before', path: '/surgery', tag: 'none' },
  { key: 'surgery-after', label: 'Surgery — during & after', path: '/surgery', tag: 'none' },
  { key: 'at-work', label: 'Endo at work', path: '/at-work', tag: 'none' },
  { key: 'advice', label: 'General advice', path: '/advice', tag: 'none' },
  { key: 'resources-read', label: 'Research — to read', path: '/resources', tag: 'none', link: true },
  { key: 'resources-watch', label: 'Research — to watch', path: '/resources', tag: 'none', link: true },
  {
    key: 'resources-listen',
    label: 'Research — to listen',
    path: '/resources',
    tag: 'none',
    link: true,
  },
  {
    key: 'resources-follow',
    label: 'Research — to follow',
    path: '/resources',
    tag: 'none',
    link: true,
  },
]

export function findTarget(key: string) {
  return PUBLISH_TARGETS.find((target) => target.key === key)
}

export const TAG_OPTIONS = ['Low', 'Medium', 'High'] as const

/** One approved suggestion, as stored in `data/published.json`. */
export interface PublishedEntry {
  /** Issue number in the private inbox repo, so we never publish twice. */
  id: number
  section: string
  title: string
  detail?: string
  href?: string
  linkLabel?: string
  effort?: string
  cost?: string
  category?: string
  publishedAt: string
}
