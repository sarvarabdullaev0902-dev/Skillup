'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { Dictionary } from '@/lib/dictionaries'

const locales = [
  { code: 'uz', label: 'UZ' },
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
]

interface NavbarProps {
  dict: Dictionary
  locale: string
}

export default function Navbar({ dict, locale }: NavbarProps) {
  const pathname = usePathname()

  function switchLocale(targetLocale: string) {
    const segments = pathname.split('/')
    segments[1] = targetLocale
    return segments.join('/')
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-navy/10 bg-cream/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <span
            className="text-xl font-bold tracking-tight text-navy"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Skill<span className="text-gold">Up</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href={`/${locale}#how-it-works`}
            className="text-sm font-medium text-navy/70 transition-colors hover:text-navy"
          >
            {dict.nav.howItWorks}
          </Link>
          <Link
            href={`/${locale}#skills`}
            className="text-sm font-medium text-navy/70 transition-colors hover:text-navy"
          >
            {dict.nav.skills}
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-xs font-medium">
            {locales.map((loc, i) => (
              <span key={loc.code} className="flex items-center">
                {i > 0 && <span className="mx-1 text-navy/30">|</span>}
                <Link
                  href={switchLocale(loc.code)}
                  className={cn(
                    'transition-colors',
                    loc.code === locale
                      ? 'font-bold text-gold'
                      : 'text-navy/50 hover:text-navy'
                  )}
                >
                  {loc.label}
                </Link>
              </span>
            ))}
          </div>

          <Link
            href={`/${locale}#get-started`}
            className="hidden rounded-full bg-navy px-5 py-2 text-sm font-medium text-cream transition-colors hover:bg-navy-light md:block"
          >
            {dict.nav.getStarted}
          </Link>
        </div>
      </nav>
    </header>
  )
}
