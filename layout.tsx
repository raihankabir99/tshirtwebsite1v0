import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://atelier-mono.vercel.app'),
  title: {
    default: 'ATELIER MONO — Wear the Design. Live the Idea.',
    template: '%s · ATELIER MONO',
  },
  description:
    'A design-led studio. Original designs made across apparel, accessories and lifestyle goods — produced on demand and shipped worldwide.',
  keywords: [
    'print on demand',
    'design-led fashion',
    'premium streetwear',
    'graphic apparel',
    'made on demand',
    'international shipping',
  ],
  openGraph: {
    title: 'ATELIER MONO — Wear the Design. Live the Idea.',
    description:
      'Original designs made across apparel, accessories and lifestyle goods — produced on demand, shipped worldwide.',
    type: 'website',
    locale: 'en_EU',
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} bg-background`}
    >
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
