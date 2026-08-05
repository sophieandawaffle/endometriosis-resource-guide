import type { PublishedEntry } from './sections'

/**
 * The suggestion inbox is a private GitHub repo: one issue per submission.
 * No database, no monthly bill, and nothing personal ever lands in the public
 * site repo. Publishing an approved suggestion appends it to
 * data/published.json in the site repo, which triggers a Vercel deploy.
 */

// Read lazily rather than at module scope: the bundler can inline a
// module-level process.env access at build time, freezing in whatever the
// value was when the build ran. GITHUB_API_URL is overridable so the flow
// can be exercised against a stub.
const api = () => process.env.GITHUB_API_URL || 'https://api.github.com'
const inboxRepo = () => process.env.INBOX_REPO || 'sophieandawaffle/endo-suggestions-inbox'
const siteRepo = () => process.env.SITE_REPO || 'sophieandawaffle/endometriosis-resource-guide'
const siteBranch = () => process.env.SITE_BRANCH || 'main'

const PUBLISHED_PATH = 'data/published.json'

export type Status = 'pending' | 'published' | 'rejected'

export interface Submission {
  number: number
  status: Status
  createdAt: string
  message: string
  name: string
  email: string
  topic: string
  url: string
}

export function inboxConfigured() {
  return Boolean(process.env.GITHUB_TOKEN)
}

async function gh(path: string, init: RequestInit = {}) {
  const token = process.env.GITHUB_TOKEN
  if (!token) throw new Error('GITHUB_TOKEN is not set')

  const response = await fetch(`${api()}${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      ...init.headers,
    },
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`GitHub ${init.method || 'GET'} ${path} failed: ${response.status} ${detail}`)
  }

  return response.json()
}

// --- submissions -----------------------------------------------------------

const FENCE = '```json'

function encodeBody(input: Omit<Submission, 'number' | 'status' | 'createdAt' | 'url'>) {
  return [
    input.message,
    '',
    '---',
    '',
    `**From:** ${input.name || 'Anonymous'}`,
    `**Reply to:** ${input.email || 'Not given'}`,
    `**Section they picked:** ${input.topic || 'Not specified'}`,
    '',
    '<!-- structured copy, do not edit by hand -->',
    FENCE,
    JSON.stringify(input, null, 2),
    '```',
  ].join('\n')
}

function decodeBody(body: string) {
  const match = body?.match(/```json\n([\s\S]*?)\n```/)
  if (match) {
    try {
      return JSON.parse(match[1]) as Record<string, string>
    } catch {
      // fall through to the plain-text reading below
    }
  }
  return { message: (body || '').split('\n---\n')[0].trim(), name: '', email: '', topic: '' }
}

function statusFromLabels(labels: { name: string }[]): Status {
  const names = labels.map((label) => label.name)
  if (names.includes('published')) return 'published'
  if (names.includes('rejected')) return 'rejected'
  return 'pending'
}

export async function createSubmission(input: {
  message: string
  name: string
  email: string
  topic: string
}): Promise<number> {
  const title = input.message.replace(/\s+/g, ' ').slice(0, 70) || 'New suggestion'

  const issue = await gh(`/repos/${inboxRepo()}/issues`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      body: encodeBody(input),
      labels: ['pending'],
    }),
  })

  return issue.number as number
}

interface GitHubIssue {
  number: number
  body: string | null
  created_at: string
  html_url: string
  labels: { name: string }[]
  pull_request?: unknown
}

export async function listSubmissions(): Promise<Submission[]> {
  const issues: GitHubIssue[] = await gh(
    `/repos/${inboxRepo()}/issues?state=all&per_page=100&sort=created`,
  )

  return issues
    .filter((issue) => !issue.pull_request)
    .map((issue) => {
      const decoded = decodeBody(issue.body || '')
      return {
        number: issue.number,
        status: statusFromLabels(issue.labels || []),
        createdAt: issue.created_at,
        message: decoded.message || '',
        name: decoded.name || '',
        email: decoded.email || '',
        topic: decoded.topic || '',
        url: issue.html_url,
      }
    })
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
}

export async function setStatus(issueNumber: number, status: Status, note?: string) {
  await gh(`/repos/${inboxRepo()}/issues/${issueNumber}`, {
    method: 'PATCH',
    body: JSON.stringify({
      labels: [status],
      state: status === 'pending' ? 'open' : 'closed',
      state_reason: status === 'rejected' ? 'not_planned' : 'completed',
    }),
  })

  if (note) {
    await gh(`/repos/${inboxRepo()}/issues/${issueNumber}/comments`, {
      method: 'POST',
      body: JSON.stringify({ body: note }),
    })
  }
}

// --- publishing ------------------------------------------------------------

export async function readPublished(): Promise<{ entries: PublishedEntry[]; sha: string }> {
  const file = await gh(
    `/repos/${siteRepo()}/contents/${PUBLISHED_PATH}?ref=${encodeURIComponent(siteBranch())}`,
  )
  const decoded = Buffer.from(file.content, 'base64').toString('utf8')
  return { entries: JSON.parse(decoded) as PublishedEntry[], sha: file.sha as string }
}

/**
 * Appends an approved suggestion to data/published.json on the site repo.
 * Vercel picks the commit up and redeploys, so the tip is live in ~a minute.
 */
export async function publishEntry(entry: PublishedEntry) {
  const { entries, sha } = await readPublished()

  if (entries.some((existing) => existing.id === entry.id)) {
    return { alreadyPublished: true }
  }

  const next = [...entries, entry]

  await gh(`/repos/${siteRepo()}/contents/${PUBLISHED_PATH}`, {
    method: 'PUT',
    body: JSON.stringify({
      message: `Publish suggestion #${entry.id}: ${entry.title.slice(0, 60)}`,
      content: Buffer.from(`${JSON.stringify(next, null, 2)}\n`).toString('base64'),
      sha,
      branch: siteBranch(),
    }),
  })

  return { alreadyPublished: false }
}

export async function unpublishEntry(id: number) {
  const { entries, sha } = await readPublished()
  const next = entries.filter((entry) => entry.id !== id)

  if (next.length === entries.length) return

  await gh(`/repos/${siteRepo()}/contents/${PUBLISHED_PATH}`, {
    method: 'PUT',
    body: JSON.stringify({
      message: `Unpublish suggestion #${id}`,
      content: Buffer.from(`${JSON.stringify(next, null, 2)}\n`).toString('base64'),
      sha,
      branch: siteBranch(),
    }),
  })
}
