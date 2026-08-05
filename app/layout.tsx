import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Anton, Inter, IBM_Plex_Mono } from 'next/font/google'
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
  title: 'How to ACTUALLY help people with endometriosis',
  description:
    'A guide written by a woman with endo, with suggestions from real people with endometriosis — sorted by cost and effort.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#F2F0EC',
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
