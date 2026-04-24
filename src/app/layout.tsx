import type { Metadata } from 'next'
import { Merriweather } from 'next/font/google'
import './globals.css'

const merriweather = Merriweather({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-merriweather',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SkillUp — Peer-to-Peer Learning Platform',
  description: 'Exchange skills with fellow students using SkillCoin. 1 SkillCoin = 1,000 UZS.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={merriweather.variable}>
      <body>{children}</body>
    </html>
  )
}
