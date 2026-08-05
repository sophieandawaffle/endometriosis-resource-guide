# ENDO — how to ACTUALLY help people with endometriosis

A Next.js site with the guide split across one page per section, a
suggestions form, and a private review page for approving suggestions onto
the site.

## Running it

```bash
pnpm install
pnpm dev
```

## Structure

| Route | What's on it |
| --- | --- |
| `/` | Hub — the big tap-a-card index of every section |
| `/start-here` | What this is + what endo is, as expandable questions |
| `/free-support` | Free ways to help, filterable by effort |
| `/spend-money` | Things to buy, filterable by cost |
| `/surgery` | Before / during / after surgery |
| `/at-work` | Employer guide + the legal position, collapsed by default |
| `/advice` | General advice |
| `/resources` | Read / watch / listen |
| `/suggest` | The suggestions form |
| `/review` | Private — approve, edit, or archive suggestions |

Site copy lives in [`lib/content.ts`](lib/content.ts). Every tip is a short
`title` with the longer bit in `detail`, which is what keeps the pages
tappable rather than readable.

## How a suggestion becomes a tip on the site

1. Someone fills in `/suggest`.
2. `POST /api/suggestions` files it as an **issue in a private GitHub repo** —
   the inbox. Nothing personal ever touches this public repo.
3. Resend emails a heads-up with a link to the review page.
4. On `/review`, the reviewer edits the wording, picks the section and the
   effort/cost tag, and publishes.
5. Publishing appends the tip to [`data/published.json`](data/published.json)
   in this repo. Vercel redeploys and it's live in about a minute.

`lib/content.ts` merges `data/published.json` into the seed lists, so approved
suggestions appear in the right section with working filters. Archiving or
taking something down removes it from that file again.

There is no database. The inbox is GitHub issues and the published content is
a JSON file in git, so the whole thing runs on free tiers.

## Environment variables

Set these in Vercel → Project → Settings → Environment Variables.

| Variable | Required | What it does |
| --- | --- | --- |
| `GITHUB_TOKEN` | Yes | Fine-grained PAT with access to the inbox repo (Issues: read+write) and this repo (Contents: read+write). Without it the form falls back to a prefilled mailto. |
| `REVIEW_KEY` | Yes | The secret in the review link. Long and random — anyone with it can approve content. |
| `RESEND_API_KEY` | No | Turns on the new-suggestion email. Without it, suggestions are still filed; nobody gets pinged. |
| `SUGGESTIONS_TO` | No | Who gets the email. Defaults to `lucy.aitchison3@gmail.com`. |
| `SUGGESTIONS_FROM` | No | Sending address. Defaults to `ENDO guide <onboarding@resend.dev>`. |
| `INBOX_REPO` | No | Defaults to `sophieandawaffle/endo-suggestions-inbox`. |
| `SITE_REPO` | No | Defaults to `sophieandawaffle/endometriosis-resource-guide`. |
| `SITE_BRANCH` | No | Defaults to `main`. |

### The review link

Visiting `/review/<REVIEW_KEY>` swaps the key for an httpOnly cookie and
redirects to `/review`, so the secret stops appearing in the address bar,
browser history, and referrer headers. The cookie lasts six months. `/review`
returns a 404 to anyone without it, and `robots.txt` disallows the path.

To rotate the key, change `REVIEW_KEY` in Vercel and send the new link.

### Email delivery

Resend's shared `onboarding@resend.dev` sender only delivers to the email
address that owns the Resend account. So either:

- the Resend account is owned by whoever should receive the emails, or
- add a verified domain in Resend and set `SUGGESTIONS_FROM` to an address on
  it, e.g. `ENDO guide <suggestions@yourdomain.com>`.

## Spam handling

The form has a hidden honeypot field and the route rate-limits to 5
submissions per IP per 10 minutes. Nothing reaches the site without being
approved on `/review` first.
