# ENDO — how to ACTUALLY help people with endometriosis

A Next.js site with the guide split across one page per section, plus a
comments/suggestions form.

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

All the copy lives in [`lib/content.ts`](lib/content.ts) — edit the site by
editing that one file. Every tip is a short `title` with the longer bit in
`detail`, which is what keeps the pages tappable rather than readable.

## The suggestions form

`POST /api/suggestions` emails each submission to **lucy.aitchison3@gmail.com**
via [Resend](https://resend.com).

Set these environment variables (in Vercel → Project → Settings → Environment
Variables) to switch delivery on:

| Variable | Required | Default |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | — |
| `SUGGESTIONS_TO` | No | `lucy.aitchison3@gmail.com` |
| `SUGGESTIONS_FROM` | No | `ENDO guide <onboarding@resend.dev>` |

To send to a Gmail address, Resend needs a **verified sending domain** — add
one under Resend → Domains, then set `SUGGESTIONS_FROM` to an address on it,
e.g. `ENDO guide <suggestions@yourdomain.com>`. Resend's shared
`onboarding@resend.dev` sender only delivers to the email address that owns
the Resend account, so it won't work for a different inbox.

Until `RESEND_API_KEY` is set, the form still works: it shows a
"send it from your email app instead" button with the message pre-filled, so
nothing gets lost.

The route also has a honeypot field and a per-IP rate limit (5 submissions per
10 minutes).
