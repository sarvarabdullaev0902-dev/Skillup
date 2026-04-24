import Link from 'next/link'
import type { Dictionary } from '@/lib/dictionaries'

interface FooterProps {
  dict: Dictionary
  locale: string
}

export default function Footer({ dict, locale }: FooterProps) {
  return (
    <footer className="border-t border-navy/10 bg-navy py-12 text-cream/70">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div>
            <Link href={`/${locale}`}>
              <span
                className="text-lg font-bold tracking-tight text-cream"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Skill<span className="text-gold">Up</span>
              </span>
            </Link>
            <p className="mt-1 text-sm">{dict.footer.tagline}</p>
          </div>

          <p className="text-xs text-cream/40">
            © {new Date().getFullYear()} SkillUp. {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
