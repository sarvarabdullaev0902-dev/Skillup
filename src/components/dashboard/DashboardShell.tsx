'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  ShoppingBag,
  CalendarDays,
  Wallet,
  BookOpen,
  Settings,
  Menu,
  X,
  CheckCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { CURRENT_USER } from '@/lib/data'
import { formatPrice } from '@/lib/format'
import type { Dictionary } from '@/lib/dictionaries'

type Locale = 'uz' | 'ru' | 'en'

interface NavItem {
  key: keyof Dictionary['nav']
  icon: React.ElementType
  href: string
  available: boolean
}

interface DashboardShellProps {
  dict: Dictionary
  locale: string
  children: React.ReactNode
}

export default function DashboardShell({ dict, locale, children }: DashboardShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const pathname = usePathname()
  const loc = locale as Locale

  const navItems: NavItem[] = [
    { key: 'dashboard',   icon: LayoutDashboard, href: `/${locale}/dashboard`,         available: true  },
    { key: 'orders',      icon: ShoppingBag,     href: '#',                            available: false },
    { key: 'sessions',    icon: CalendarDays,    href: '#',                            available: false },
    { key: 'wallet',      icon: Wallet,          href: `/${locale}/dashboard/wallet`,  available: true  },
    { key: 'myServices',  icon: BookOpen,        href: '#',                            available: false },
    { key: 'settings',    icon: Settings,        href: '#',                            available: false },
  ]

  const facultyLabel =
    loc === 'uz' ? CURRENT_USER.faculty_uz
    : loc === 'ru' ? CURRENT_USER.faculty_ru
    : CURRENT_USER.faculty_en

  const balance = formatPrice(CURRENT_USER.balance_coins, locale)

  function isActive(href: string) {
    if (href === '#') return false
    if (href === `/${locale}/dashboard`) return pathname === `/${locale}/dashboard`
    return pathname.startsWith(href)
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* User card */}
      <div className="border-b border-navy/10 p-5">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CURRENT_USER.avatar}
            alt={CURRENT_USER.display_name}
            width={44}
            height={44}
            className="shrink-0 rounded-full object-cover ring-2 ring-cream-dark"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="truncate text-sm font-semibold text-navy">
                {CURRENT_USER.display_name}
              </span>
              <CheckCircle size={13} className="shrink-0 text-gold" />
            </div>
            <p className="truncate text-xs text-navy/50">{facultyLabel}</p>
          </div>
        </div>
        <div className="mt-3 rounded-lg bg-navy/4 px-3 py-2">
          <p className="text-[10px] font-medium uppercase tracking-wide text-navy/40">
            {dict.dashboard.balance}
          </p>
          <p className="mt-0.5 text-base font-bold text-navy">{balance.coins}</p>
          <p className="text-xs text-navy/50">{balance.uzs}</p>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 space-y-0.5 p-3">
        {navItems.map(({ key, icon: Icon, href, available }) => {
          const active = isActive(href)
          const label = dict.nav[key] as string
          if (!available) {
            return (
              <div
                key={key}
                className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2.5 text-navy/30"
              >
                <Icon size={17} />
                <span className="text-sm">{label}</span>
                <span className="ml-auto rounded-full bg-navy/8 px-1.5 py-0.5 text-[10px] font-medium text-navy/40">
                  Soon
                </span>
              </div>
            )
          }
          return (
            <Link
              key={key}
              href={href}
              onClick={() => setDrawerOpen(false)}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'border-l-2 border-gold bg-gold/8 pl-[10px] text-navy'
                  : 'text-navy/60 hover:bg-navy/5 hover:text-navy'
              )}
            >
              <Icon size={17} className={active ? 'text-gold' : ''} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom balance link */}
      <div className="border-t border-navy/10 p-4">
        <Link
          href={`/${locale}/dashboard/wallet`}
          className="flex items-center gap-2 text-xs text-navy/50 hover:text-gold transition-colors"
          onClick={() => setDrawerOpen(false)}
        >
          <Wallet size={13} />
          {dict.dashboard.toWallet}
        </Link>
      </div>
    </div>
  )

  return (
    <div className="mt-16 flex min-h-[calc(100vh-64px)]">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-navy/10 bg-white lg:block">
        <div className="sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="fixed left-0 right-0 top-16 z-30 flex items-center gap-3 border-b border-navy/10 bg-white px-4 py-2.5 lg:hidden">
        <button
          onClick={() => setDrawerOpen(true)}
          className="rounded-lg p-1.5 text-navy/60 hover:bg-navy/5"
        >
          <Menu size={20} />
        </button>
        <span className="text-sm font-medium text-navy">
          {navItems.find((n) => isActive(n.href))
            ? dict.nav[navItems.find((n) => isActive(n.href))!.key] as string
            : dict.nav.dashboard as string}
        </span>
        <div className="ml-auto text-sm font-semibold text-navy">
          {balance.coins}
        </div>
      </div>

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-navy/40 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-navy/10 px-4 py-3">
              <span
                className="font-bold text-navy"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Skill<span className="text-gold">Up</span>
              </span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-navy/50 hover:text-navy"
              >
                <X size={20} />
              </button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 min-w-0 pt-12 lg:pt-0">
        {children}
      </main>
    </div>
  )
}
