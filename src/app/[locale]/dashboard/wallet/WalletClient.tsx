'use client'

import { useState, useMemo } from 'react'
import {
  Coins,
  Lock,
  TrendingUp,
  TrendingDown,
  PlusCircle,
  ArrowDownToLine,
  Percent,
  Unlock,
  Search,
  X,
  Calendar,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/format'
import { CURRENT_USER, MY_TRANSACTIONS } from '@/lib/data'
import type { Dictionary } from '@/lib/dictionaries'
import type { Transaction } from '@/lib/data'
import DashboardShell from '@/components/dashboard/DashboardShell'

type Locale = 'uz' | 'ru' | 'en'
type FilterKey = 'all' | 'topups' | 'earnings' | 'spending' | 'withdrawals'

const FILTER_TYPES: Record<FilterKey, Transaction['type'][]> = {
  all:         ['topup', 'escrow_lock', 'escrow_release', 'earn', 'fee', 'withdrawal'],
  topups:      ['topup'],
  earnings:    ['earn', 'escrow_release'],
  spending:    ['escrow_lock', 'fee'],
  withdrawals: ['withdrawal'],
}

function txIcon(type: Transaction['type']) {
  switch (type) {
    case 'topup':          return <PlusCircle     size={16} className="text-green-600" />
    case 'earn':           return <TrendingUp     size={16} className="text-green-600" />
    case 'escrow_release': return <Unlock         size={16} className="text-green-600" />
    case 'escrow_lock':    return <Lock           size={16} className="text-amber-500" />
    case 'fee':            return <Percent        size={16} className="text-navy/35"   />
    case 'withdrawal':     return <ArrowDownToLine size={16} className="text-blue-500" />
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

interface Props {
  dict: Dictionary
  locale: string
}

export default function WalletClient({ dict, locale }: Props) {
  const loc = locale as Locale
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const [query, setQuery] = useState('')
  const [modal, setModal] = useState<'topup' | 'withdraw' | null>(null)

  const balance  = formatPrice(CURRENT_USER.balance_coins,   locale)
  const escrow   = formatPrice(CURRENT_USER.locked_coins,    locale)
  const earned   = formatPrice(CURRENT_USER.lifetime_earned, locale)
  const spent    = formatPrice(CURRENT_USER.lifetime_spent,  locale)
  const net      = CURRENT_USER.lifetime_earned - CURRENT_USER.lifetime_spent
  const netFmt   = formatPrice(Math.abs(net), locale)

  const reversed = useMemo(() => [...MY_TRANSACTIONS].reverse(), [])

  const filtered = useMemo(() => {
    const types = FILTER_TYPES[activeFilter]
    return reversed.filter((tx) => {
      if (!types.includes(tx.type)) return false
      if (query.trim()) {
        const q = query.toLowerCase()
        return (
          tx.note.toLowerCase().includes(q) ||
          txLabel(tx.type, dict).toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [activeFilter, query, dict, reversed])

  const fmtDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(
      loc === 'ru' ? 'ru-RU' : loc === 'uz' ? 'uz-UZ' : 'en-US',
      { day: 'numeric', month: 'short', year: 'numeric' }
    )

  const filters: { key: FilterKey; label: string }[] = [
    { key: 'all',         label: dict.wallet.filterAll },
    { key: 'topups',      label: dict.wallet.filterTopups },
    { key: 'earnings',    label: dict.wallet.filterEarnings },
    { key: 'spending',    label: dict.wallet.filterSpending },
    { key: 'withdrawals', label: dict.wallet.filterWithdrawals },
  ]

  return (
    <DashboardShell dict={dict} locale={locale}>
      <div className="min-h-full bg-cream p-6 lg:p-8">
        <h1
          className="mb-6 text-2xl font-bold text-navy lg:text-3xl"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {dict.wallet.title}
        </h1>

        {/* ── Top cards row ──────────────────────────────── */}
        <div className="mb-6 grid gap-4 lg:grid-cols-2">

          {/* Balance card */}
          <div className="relative overflow-hidden rounded-2xl bg-navy p-6 text-cream">
            <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-5"
              style={{ background: 'radial-gradient(circle at 80% 50%, #C8A94D, transparent 70%)' }}
            />
            <p className="text-xs font-medium uppercase tracking-widest text-cream/50">
              {dict.wallet.availableBalance}
            </p>
            <p
              className="mt-2 text-4xl font-bold text-cream"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {CURRENT_USER.balance_coins}
              <span className="ml-2 text-xl font-medium text-gold">SC</span>
            </p>
            <p className="mt-1 text-sm text-cream/60">{balance.uzs}</p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setModal('topup')}
                className="flex items-center gap-2 rounded-xl bg-gold px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-gold-light"
              >
                <PlusCircle size={15} />
                {dict.wallet.topUp}
              </button>
              <button
                onClick={() => setModal('withdraw')}
                className="flex items-center gap-2 rounded-xl border border-cream/20 px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:border-cream/50 hover:bg-cream/10"
              >
                <ArrowDownToLine size={15} />
                {dict.wallet.withdraw}
              </button>
            </div>
          </div>

          {/* Right column: escrow + summary */}
          <div className="flex flex-col gap-4">
            {/* Escrow card */}
            <div className="flex items-start gap-4 rounded-2xl border border-navy/8 bg-white p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50">
                <Lock size={18} className="text-amber-500" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-navy/40">
                  {dict.wallet.inEscrow}
                </p>
                <p className="mt-1 text-xl font-bold text-navy">
                  {CURRENT_USER.locked_coins} SC
                </p>
                <p className="mt-0.5 text-xs text-navy/50">{escrow.uzs}</p>
                <p className="mt-1.5 text-xs text-navy/40">{dict.wallet.escrowNote}</p>
              </div>
            </div>

            {/* Earnings summary */}
            <div className="rounded-2xl border border-navy/8 bg-white p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-navy/40">
                {dict.wallet.earningsSummary}
              </p>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="flex justify-center">
                    <TrendingUp size={14} className="text-green-600" />
                  </div>
                  <p className="mt-1 text-base font-bold text-navy">{CURRENT_USER.lifetime_earned} SC</p>
                  <p className="text-[11px] text-navy/45">{dict.wallet.lifetimeEarned}</p>
                </div>
                <div>
                  <div className="flex justify-center">
                    <TrendingDown size={14} className="text-red-500" />
                  </div>
                  <p className="mt-1 text-base font-bold text-navy">{CURRENT_USER.lifetime_spent} SC</p>
                  <p className="text-[11px] text-navy/45">{dict.wallet.lifetimeSpent}</p>
                </div>
                <div>
                  <div className="flex justify-center">
                    <Coins size={14} className={net >= 0 ? 'text-green-600' : 'text-red-500'} />
                  </div>
                  <p className={cn('mt-1 text-base font-bold', net >= 0 ? 'text-green-600' : 'text-red-500')}>
                    {net >= 0 ? '+' : '-'}{netFmt.coins.replace(' SkillCoin', '')} SC
                  </p>
                  <p className="text-[11px] text-navy/45">{dict.wallet.net}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Transaction history ────────────────────────── */}
        <div className="rounded-2xl border border-navy/8 bg-white">
          <div className="border-b border-navy/8 p-5">
            <h2
              className="mb-4 text-lg font-bold text-navy"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {dict.wallet.transactionHistory}
            </h2>

            {/* Filter pills */}
            <div className="mb-3 flex flex-wrap gap-2">
              {filters.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={cn(
                    'rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors',
                    activeFilter === key
                      ? 'bg-navy text-cream'
                      : 'border border-navy/15 text-navy/60 hover:border-gold/50 hover:text-navy'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search size={14} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-navy/35" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={dict.wallet.searchPlaceholder}
                className="w-full rounded-xl border border-navy/12 bg-cream/60 py-2 pl-9 pr-4 text-sm text-navy placeholder-navy/35 outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/15"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/40"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Table — desktop */}
          <div className="hidden sm:block">
            {filtered.length === 0 ? (
              <p className="py-12 text-center text-sm text-navy/40">{dict.wallet.noResults}</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-navy/6 text-left">
                    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-navy/40">
                      Type
                    </th>
                    <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-navy/40">
                      Description
                    </th>
                    <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-navy/40">
                      Amount
                    </th>
                    <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-navy/40">
                      {dict.wallet.balanceAfter}
                    </th>
                    <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-navy/40">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy/5">
                  {filtered.map((tx) => {
                    const positive = tx.amount_coins > 0
                    return (
                      <tr key={tx.id} className="hover:bg-cream/40 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy/5">
                              {txIcon(tx.type)}
                            </span>
                            <span className="text-sm text-navy/70">{txLabel(tx.type, dict)}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <p className="text-sm text-navy/65">{tx.note}</p>
                          {tx.reference_id && (
                            <p className="mt-0.5 font-mono text-[10px] text-navy/30">
                              {tx.reference_id}
                            </p>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <span
                            className={cn(
                              'text-sm font-semibold tabular-nums',
                              positive ? 'text-green-600' : 'text-red-600'
                            )}
                          >
                            {positive ? '+' : ''}{tx.amount_coins} SC
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <span className="text-sm tabular-nums text-navy/60">
                            {tx.balance_after} SC
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <span className="flex items-center justify-end gap-1 text-xs text-navy/40">
                            <Calendar size={11} />
                            {fmtDate(tx.created_at)}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* List — mobile */}
          <div className="sm:hidden">
            {filtered.length === 0 ? (
              <p className="py-12 text-center text-sm text-navy/40">{dict.wallet.noResults}</p>
            ) : (
              <div className="divide-y divide-navy/5">
                {filtered.map((tx) => {
                  const positive = tx.amount_coins > 0
                  return (
                    <div key={tx.id} className="flex items-center gap-3 px-5 py-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy/5">
                        {txIcon(tx.type)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-navy">{txLabel(tx.type, dict)}</p>
                        <p className="truncate text-xs text-navy/45">{tx.note}</p>
                        <p className="mt-0.5 text-[11px] text-navy/35">{fmtDate(tx.created_at)}</p>
                      </div>
                      <div className="text-right">
                        <p className={cn('text-sm font-semibold tabular-nums', positive ? 'text-green-600' : 'text-red-600')}>
                          {positive ? '+' : ''}{tx.amount_coins} SC
                        </p>
                        <p className="text-[11px] text-navy/40">{tx.balance_after} SC</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Demo modal ─────────────────────────────────────── */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            onClick={() => setModal(null)}
          />
          <div className="relative w-full max-w-sm rounded-2xl bg-cream p-8 shadow-2xl">
            <button
              onClick={() => setModal(null)}
              className="absolute right-4 top-4 text-navy/40 hover:text-navy"
            >
              <X size={20} />
            </button>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/15">
              {modal === 'topup'
                ? <PlusCircle size={22} className="text-gold" />
                : <ArrowDownToLine size={22} className="text-gold" />}
            </div>
            <h3
              className="text-xl font-bold text-navy"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {modal === 'topup' ? dict.wallet.demoTopupTitle : dict.wallet.demoWithdrawTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-navy/65">
              {modal === 'topup' ? dict.wallet.demoTopupBody : dict.wallet.demoWithdrawBody}
            </p>
            <button
              onClick={() => setModal(null)}
              className="mt-6 w-full rounded-xl bg-navy py-3 text-sm font-semibold text-cream transition-colors hover:bg-navy-light"
            >
              {dict.wallet.modalClose}
            </button>
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
