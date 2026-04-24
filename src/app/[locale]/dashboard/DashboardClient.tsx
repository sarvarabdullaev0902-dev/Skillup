'use client'

import Link from 'next/link'
import {
  Coins,
  Lock,
  TrendingUp,
  ShoppingBag,
  MapPin,
  Clock,
  ArrowRight,
  PlusCircle,
  TrendingDown,
  Percent,
  ArrowDownToLine,
  Unlock,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/format'
import {
  CURRENT_USER,
  MY_ORDERS,
  MY_SESSIONS,
  MY_TRANSACTIONS,
  SERVICES,
  TEACHERS,
} from '@/lib/data'
import type { Dictionary } from '@/lib/dictionaries'
import type { Transaction } from '@/lib/data'
import DashboardShell from '@/components/dashboard/DashboardShell'

type Locale = 'uz' | 'ru' | 'en'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getLoc(obj: any, field: string, locale: string): string {
  return (obj[`${field}_${locale}`] ?? obj[`${field}_en`] ?? '') as string
}

function txIcon(type: Transaction['type']) {
  switch (type) {
    case 'topup':         return <PlusCircle  size={16} className="text-green-600" />
    case 'earn':          return <TrendingUp  size={16} className="text-green-600" />
    case 'escrow_release':return <Unlock      size={16} className="text-green-600" />
    case 'escrow_lock':   return <Lock        size={16} className="text-amber-500" />
    case 'fee':           return <Percent     size={16} className="text-navy/40"   />
    case 'withdrawal':    return <ArrowDownToLine size={16} className="text-blue-500" />
  }
}

function txLabel(type: Transaction['type'], dict: Dictionary): string {
  const map: Record<Transaction['type'], keyof Dictionary['wallet']> = {
    topup:          'txTopup',
    earn:           'txEarn',
    escrow_release: 'txEscrowRelease',
    escrow_lock:    'txEscrowLock',
    fee:            'txFee',
    withdrawal:     'txWithdrawal',
  }
  return dict.wallet[map[type]] as string
}

const STATUS_STYLES: Record<string, string> = {
  active:    'bg-blue-50 text-blue-700',
  pending:   'bg-amber-50 text-amber-700',
  completed: 'bg-green-50 text-green-700',
  disputed:  'bg-red-50 text-red-700',
}

function statusLabel(status: string, dict: Dictionary): string {
  const map: Record<string, keyof Dictionary['dashboard']> = {
    active:    'statusActive',
    pending:   'statusPending',
    completed: 'statusCompleted',
    disputed:  'statusDisputed',
  }
  return dict.dashboard[map[status]] as string
}

interface Props {
  dict: Dictionary
  locale: string
}

export default function DashboardClient({ dict, locale }: Props) {
  const loc = locale as Locale

  const upcomingSessions = MY_SESSIONS
    .filter((s) => s.status === 'upcoming')
    .sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime())
    .slice(0, 4)

  const activeOrders = MY_ORDERS.filter((o) => o.status === 'active' || o.status === 'pending')

  const recentTx = [...MY_TRANSACTIONS].reverse().slice(0, 5)

  const activeOrdersCount = activeOrders.length

  const balance  = formatPrice(CURRENT_USER.balance_coins,  locale)
  const escrow   = formatPrice(CURRENT_USER.locked_coins,   locale)
  const earned   = formatPrice(CURRENT_USER.lifetime_earned, locale)

  const firstName = CURRENT_USER.display_name.split(' ')[0]

  return (
    <DashboardShell dict={dict} locale={locale}>
      <div className="bg-cream min-h-full p-6 lg:p-8">

        {/* ── Header ─────────────────────────────────────── */}
        <div className="mb-8">
          <h1
            className="text-2xl font-bold text-navy lg:text-3xl"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {dict.dashboard.welcomePrefix}, {firstName}
          </h1>
        </div>

        {/* ── Stats row ──────────────────────────────────── */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            icon={<Coins size={18} className="text-gold" />}
            label={dict.dashboard.balance}
            value={balance.coins}
            sub={balance.uzs}
            bg="bg-white"
          />
          <StatCard
            icon={<Lock size={18} className="text-amber-500" />}
            label={dict.dashboard.inEscrow}
            value={escrow.coins}
            sub={dict.dashboard.escrowNote}
            bg="bg-white"
          />
          <StatCard
            icon={<TrendingUp size={18} className="text-green-600" />}
            label={dict.dashboard.lifetimeEarned}
            value={earned.coins}
            sub={earned.uzs}
            bg="bg-white"
          />
          <StatCard
            icon={<ShoppingBag size={18} className="text-navy/50" />}
            label={dict.dashboard.activeOrders}
            value={String(activeOrdersCount)}
            sub=""
            bg="bg-white"
          />
        </div>

        {/* ── Upcoming sessions ──────────────────────────── */}
        <Section
          title={dict.dashboard.upcomingSessions}
          href={`/${locale}/dashboard/sessions`}
          dict={dict}
        >
          {upcomingSessions.length === 0 ? (
            <p className="py-8 text-center text-sm text-navy/40">
              {dict.dashboard.noUpcomingSessions}
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {upcomingSessions.map((session) => {
                const order   = MY_ORDERS.find((o) => o.id === session.order_id)!
                const service = SERVICES.find((s) => s.id === order.service_id)!
                const teacher = TEACHERS.find((t) => t.id === order.teacher_id)!
                const d       = new Date(session.scheduled_at)
                const dateStr = d.toLocaleDateString(
                  loc === 'ru' ? 'ru-RU' : loc === 'uz' ? 'uz-UZ' : 'en-US',
                  { month: 'short', day: 'numeric' }
                )
                const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                const sTitle  = getLoc(service, 'title', loc)

                return (
                  <div
                    key={session.id}
                    className="rounded-2xl border border-navy/8 bg-white p-4"
                  >
                    <div className="mb-3 flex items-start justify-between gap-2">
                      <div className="rounded-xl bg-navy px-3 py-1.5 text-center">
                        <p className="text-lg font-bold leading-none text-cream">
                          {d.getDate()}
                        </p>
                        <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-cream/70">
                          {d.toLocaleDateString(loc === 'ru' ? 'ru-RU' : 'en-US', { month: 'short' })}
                        </p>
                      </div>
                      <span className="rounded-full bg-gold/10 px-2 py-0.5 text-[11px] font-medium text-gold">
                        {timeStr}
                      </span>
                    </div>
                    <p
                      className="line-clamp-2 text-sm font-semibold leading-snug text-navy"
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      {sTitle}
                    </p>
                    <p className="mt-1 text-xs text-navy/50">{teacher.display_name}</p>
                    <div className="mt-2 flex items-center gap-1 text-xs text-navy/40">
                      <MapPin size={11} />
                      <span className="truncate">{session.location.split(',')[0]}</span>
                    </div>
                    <p className="mt-2 text-[11px] text-navy/40">
                      {dateStr} · {session.sequence_num} {dict.dashboard.sessionOf} {order.num_sessions}
                    </p>
                  </div>
                )
              })}
            </div>
          )}
        </Section>

        {/* ── Active orders ──────────────────────────────── */}
        <Section
          title={dict.dashboard.activeOrdersSection}
          href={`/${locale}/dashboard/orders`}
          dict={dict}
        >
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {activeOrders.map((order) => {
              const service = SERVICES.find((s) => s.id === order.service_id)!
              const teacher = TEACHERS.find((t) => t.id === order.teacher_id)!
              const sTitle  = getLoc(service, 'title', loc)
              const progress = Math.round((order.completed_sessions / order.num_sessions) * 100)

              return (
                <Link
                  key={order.id}
                  href={`/${locale}/services/${service.id}`}
                  className="group rounded-2xl border border-navy/8 bg-white p-5 transition-shadow hover:shadow-md"
                >
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <span
                      className={cn(
                        'rounded-full px-2.5 py-0.5 text-[11px] font-medium',
                        STATUS_STYLES[order.status]
                      )}
                    >
                      {statusLabel(order.status, dict)}
                    </span>
                    <span className="text-xs text-navy/40">
                      {formatPrice(order.price_coins, locale).coins}
                    </span>
                  </div>

                  <h3
                    className="line-clamp-2 text-sm font-semibold leading-snug text-navy group-hover:text-navy-light"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {sTitle}
                  </h3>

                  <div className="mt-2 flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={teacher.avatar}
                      alt={teacher.display_name}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    <span className="text-xs text-navy/55">{teacher.display_name}</span>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] text-navy/45">
                        {order.completed_sessions} / {order.num_sessions} {dict.dashboard.sessionsCompleted}
                      </span>
                      <span className="text-[11px] font-medium text-navy/60">{progress}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-navy/8">
                      <div
                        className="h-full rounded-full bg-gold transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </Section>

        {/* ── Recent activity ────────────────────────────── */}
        <Section
          title={dict.dashboard.recentActivity}
          href={`/${locale}/dashboard/wallet`}
          dict={dict}
        >
          <div className="divide-y divide-navy/6 rounded-2xl border border-navy/8 bg-white">
            {recentTx.map((tx) => {
              const positive = tx.amount_coins > 0
              const amountStr = `${positive ? '+' : ''}${tx.amount_coins} SC`

              return (
                <div key={tx.id} className="flex items-center gap-4 px-5 py-3.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy/5">
                    {txIcon(tx.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-navy">{txLabel(tx.type, dict)}</p>
                    <p className="truncate text-xs text-navy/45">{tx.note}</p>
                  </div>
                  <div className="text-right">
                    <p className={cn('text-sm font-semibold tabular-nums', positive ? 'text-green-600' : 'text-red-600')}>
                      {amountStr}
                    </p>
                    <p className="text-[11px] text-navy/40">
                      {new Date(tx.created_at).toLocaleDateString(
                        loc === 'ru' ? 'ru-RU' : loc === 'uz' ? 'uz-UZ' : 'en-US',
                        { month: 'short', day: 'numeric' }
                      )}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-3 text-right">
            <Link
              href={`/${locale}/dashboard/wallet`}
              className="inline-flex items-center gap-1 text-sm text-gold hover:underline"
            >
              {dict.dashboard.toWallet}
              <ArrowRight size={14} />
            </Link>
          </div>
        </Section>
      </div>
    </DashboardShell>
  )
}

// ── Shared section wrapper ───────────────────────────────

function Section({
  title,
  href,
  dict,
  children,
}: {
  title: string
  href: string
  dict: Dictionary
  children: React.ReactNode
}) {
  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <h2
          className="text-lg font-bold text-navy"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {title}
        </h2>
        <Link
          href={href}
          className="flex items-center gap-1 text-sm text-navy/50 hover:text-navy transition-colors"
        >
          {dict.dashboard.viewAll}
          <ArrowRight size={14} />
        </Link>
      </div>
      {children}
    </div>
  )
}

// ── Stat card ────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  sub,
  bg,
}: {
  icon: React.ReactNode
  label: string
  value: string
  sub: string
  bg: string
}) {
  return (
    <div className={cn('rounded-2xl border border-navy/8 p-5 shadow-sm', bg)}>
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-navy/5">
        {icon}
      </div>
      <p className="text-xs font-medium uppercase tracking-wide text-navy/40">{label}</p>
      <p className="mt-1 text-xl font-bold text-navy" style={{ fontFamily: 'var(--font-serif)' }}>
        {value}
      </p>
      {sub && <p className="mt-0.5 text-xs text-navy/45 line-clamp-2">{sub}</p>}
    </div>
  )
}
