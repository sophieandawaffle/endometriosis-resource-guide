'use client'

import { useState, useEffect, useRef } from 'react'

const NAV_ITEMS = [
  { label: 'Start Here', href: '#start-here' },
  { label: 'Free Support', href: '#free-support' },
  { label: 'At Work', href: '#endo-at-work' },
  { label: 'General Advice', href: '#misc' },
  { label: 'Spend Money', href: '#spend-money' },
  { label: 'Surgery', href: '#surgery' },
  { label: 'Resources', href: '#resources' },
]

export function StickyNav() {
  const [active, setActive] = useState('')
  const [visible, setVisible] = useState(false)
  const ticking = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setVisible(window.scrollY > 200)

          const sections = NAV_ITEMS.map((item) =>
            document.querySelector(item.href)
          )
          let current = ''
          sections.forEach((section, i) => {
            if (section) {
              const rect = section.getBoundingClientRect()
              if (rect.top <= 90) {
                current = NAV_ITEMS[i].href
              }
            }
          })
          setActive(current)
          ticking.current = false
        })
        ticking.current = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm transition-transform duration-200 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
      aria-label="Page sections"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
          {/* Wordmark */}
          <span
            className="font-display text-base tracking-widest uppercase mr-6 shrink-0 py-3"
            style={{ color: 'var(--endo-red)' }}
          >
            ENDO
          </span>

          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`shrink-0 py-3 px-3 text-[11px] uppercase tracking-[0.15em] font-mono border-b-2 transition-colors duration-150 ${
                active === item.href
                  ? 'border-[var(--endo-red)] text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
