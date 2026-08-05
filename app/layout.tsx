import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Anton, Inter, IBM_Plex_Mono } from 'next/font/google'

import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import './globals.css'

const _anton = Anton({
  subsets: ['latin'],
  weight: '400',
})

const _inter = Inter({
  subsets: ['latin'],
})

const _ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: {
    default: 'How to ACTUALLY help people with endometriosis',
    template: '%s — ENDO guide',
  },
  description:
    'A guide written by a woman with endo, with suggestions from real people with endometriosis — sorted by cost and effort.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#F2F0EC',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-[var(--endo-red)] focus:px-4 focus:py-2 focus:font-mono focus:text-[11px] focus:uppercase focus:tracking-[0.15em] focus:text-[var(--primary-foreground)]"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
