'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { NAV_ITEMS } from '@/lib/content'

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <div className="flex h-14 items-center justify-between gap-4">
          <Link
            href="/"
            className="shrink-0 font-display text-base uppercase tracking-widest"
            style={{ color: 'var(--endo-red)' }}
            onClick={() => setOpen(false)}
          >
            ENDO
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0 lg:flex" aria-label="Sections">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`border-b-2 px-3 py-4 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors duration-150 ${
                    active
                      ? 'border-[var(--endo-red)] text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/suggest"
              className="shrink-0 bg-[var(--endo-red)] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--primary-foreground)] transition-opacity hover:opacity-85"
              onClick={() => setOpen(false)}
            >
              + Suggest
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="flex items-center gap-2 border border-border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground lg:hidden"
            >
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-border bg-background lg:hidden"
          aria-label="Sections"
        >
          <div className="mx-auto max-w-5xl px-6 md:px-10">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between border-b border-border py-4 font-mono text-xs uppercase tracking-[0.15em] ${
                    active ? 'text-[var(--endo-red)]' : 'text-foreground'
                  }`}
                >
                  {item.label}
                  <span aria-hidden="true" className="text-muted-foreground">
                    →
                  </span>
                </Link>
              )
            })}
          </div>
        </nav>
      )}
    </header>
  )
}
