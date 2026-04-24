import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SkillUp — Peer-to-Peer Learning Platform',
  description: 'Exchange skills with fellow students using SkillCoin. 1 SkillCoin = 1,000 UZS.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  )
}
