'use client'

import { useState } from 'react'

import { NAV_ITEMS } from '@/lib/content'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const TOPICS = ['Anything / not sure', ...NAV_ITEMS.map((item) => item.label)]

const fieldClass =
  'w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--endo-red)] focus:outline-none'

const labelClass =
  'mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground'

export function SuggestionForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [mailto, setMailto] = useState('')
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState(TOPICS[0])
  const [website, setWebsite] = useState('') // honeypot

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return

    setStatus('sending')
    setError('')
    setMailto('')

    try {
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, name, email, topic, website }),
      })

      const data = await response.json().catch(() => ({}))

      if (response.ok && data.ok) {
        setStatus('sent')
        setMessage('')
        setName('')
        setEmail('')
        setTopic(TOPICS[0])
        return
      }

      setStatus('error')
      setError(data.error || 'Something went wrong.')
      if (data.mailto) setMailto(data.mailto)
    } catch {
      setStatus('error')
      setError('Something went wrong — check your connection and try again.')
    }
  }

  if (status === 'sent') {
    return (
      <div className="border border-[var(--endo-red)] bg-card p-8 text-center">
        <p aria-hidden="true" className="text-3xl">
          💌
        </p>
        <h2 className="mt-4 font-display text-3xl uppercase leading-none text-foreground">
          Sent. Thank you.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[13px] leading-relaxed text-muted-foreground">
          Every suggestion gets read. The good ones end up on the site.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 border border-border bg-background px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors hover:border-[var(--endo-red)] hover:text-[var(--endo-red)]"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="border border-border bg-card p-6 md:p-8">
      <div>
        <label htmlFor="message" className={labelClass}>
          Your suggestion <span className="text-[var(--endo-red)]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What actually helped you? What should be on this site that isn’t?"
          className={`${fieldClass} resize-y leading-relaxed`}
        />
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          That’s the only required bit
        </p>
      </div>

      <div className="mt-6">
        <label htmlFor="topic" className={labelClass}>
          Which section? (optional)
        </label>
        <select
          id="topic"
          name="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className={fieldClass}
        >
          {TOPICS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name (optional)
          </label>
          <input
            id="name"
            name="name"
            type="text"
            maxLength={100}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Leave blank to stay anonymous"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email (optional)
          </label>
          <input
            id="email"
            name="email"
            type="email"
            maxLength={200}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Only if you want a reply"
            className={fieldClass}
          />
        </div>
      </div>

      {/* Honeypot — hidden from people, catnip for bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending' || message.trim().length < 2}
        className="mt-8 w-full bg-[var(--endo-red)] px-6 py-5 font-mono text-xs uppercase tracking-[0.25em] text-[var(--primary-foreground)] transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {status === 'sending' ? 'Sending…' : 'Send it →'}
      </button>

      {status === 'error' && (
        <div
          role="alert"
          className="mt-6 border border-[var(--endo-red)] border-l-4 bg-background p-4"
        >
          <p className="text-[13px] leading-relaxed text-foreground">{error}</p>
          {mailto && (
            <a
              href={mailto}
              className="mt-3 inline-flex border border-border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground transition-colors hover:border-[var(--endo-red)] hover:text-[var(--endo-red)]"
            >
              Send it from your email app instead ↗
            </a>
          )}
        </div>
      )}

      <p className="mt-6 text-center text-[11px] leading-relaxed text-muted-foreground">
        Suggestions go straight to a private inbox. Nothing is published without asking.
      </p>
    </form>
  )
}
