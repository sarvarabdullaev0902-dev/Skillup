'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Star, MapPin, Clock, CheckCircle, SlidersHorizontal, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/format'
import { CATEGORIES, SERVICES, TEACHERS } from '@/lib/data'
import type { Dictionary } from '@/lib/dictionaries'

type Locale = 'uz' | 'ru' | 'en'

interface BrowseClientProps {
  dict: Dictionary
  locale: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getLocalizedField(obj: any, field: string, locale: string): string {
  return (obj[`${field}_${locale}`] ?? obj[`${field}_en`] ?? '') as string
}

export default function BrowseClient({ dict, locale }: BrowseClientProps) {
  const loc = locale as Locale
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [query, setQuery] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const filtered = useMemo(() => {
    let result = SERVICES

    if (activeCategory !== 'all') {
      result = result.filter((s) => s.category === activeCategory)
    }

    if (query.trim()) {
      const q = query.toLowerCase()
      result = result.filter((s) => {
        const title = getLocalizedField(s, 'title', loc).toLowerCase()
        const teacher = TEACHERS.find((t) => t.id === s.teacher_id)
        const teacherName = teacher?.display_name.toLowerCase() ?? ''
        return title.includes(q) || teacherName.includes(q)
      })
    }

    return result
  }, [activeCategory, query, loc])

  return (
    <div className="min-h-screen bg-cream pt-20">
      {/* ── Page header ─────────────────────────────────── */}
      <div className="sticky top-16 z-30 border-b border-navy/8 bg-cream/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <h1
            className="text-2xl font-bold text-navy"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {dict.browse.title}
          </h1>

          {/* Search */}
          <div className="relative mt-4">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-navy/40"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={dict.browse.searchPlaceholder}
              className="w-full rounded-xl border border-navy/12 bg-white py-3 pl-11 pr-4 text-sm text-navy placeholder-navy/35 outline-none transition-all focus:border-gold/60 focus:ring-2 focus:ring-gold/15"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-navy/40 hover:text-navy/70"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category pills — desktop */}
          <div className="mt-4 hidden gap-2 overflow-x-auto pb-1 md:flex">
            <CategoryPills
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              dict={dict}
              locale={loc}
            />
          </div>
        </div>
      </div>

      {/* ── Main grid ───────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        {filtered.length === 0 ? (
          <EmptyState dict={dict} />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((service) => {
              const teacher = TEACHERS.find((t) => t.id === service.teacher_id)
              if (!teacher) return null
              const price = formatPrice(service.price_coins, locale)
              const title = getLocalizedField(service, 'title', loc)
              const description = getLocalizedField(service, 'description', loc)
              const category = CATEGORIES.find((c) => c.key === service.category)
              const categoryLabel = category
                ? getLocalizedField(category, 'label', loc)
                : service.category
              const CategoryIcon = category?.icon

              return (
                <Link
                  key={service.id}
                  href={`/${locale}/services/${service.id}`}
                  className="group flex flex-col rounded-2xl border border-navy/8 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-md"
                >
                  {/* Teacher row */}
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={teacher.avatar}
                      alt={teacher.display_name}
                      width={40}
                      height={40}
                      className="shrink-0 rounded-full object-cover ring-2 ring-cream-dark"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate text-sm font-medium text-navy">
                          {teacher.display_name}
                        </span>
                        {teacher.verified && (
                          <CheckCircle
                            size={13}
                            className="shrink-0 text-gold"
                            aria-label={dict.browse.verified}
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-navy/50">
                        <Star size={11} className="fill-gold text-gold" />
                        <span>{teacher.rating.toFixed(1)}</span>
                        <span>({teacher.rating_count})</span>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h2
                    className="mt-4 line-clamp-2 text-base font-bold leading-snug text-navy group-hover:text-navy-light"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {title}
                  </h2>

                  {/* Description */}
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-navy/55">
                    {description}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {CategoryIcon && (
                      <span className="flex items-center gap-1 rounded-full bg-cream-dark px-2.5 py-1 text-xs font-medium text-navy/70">
                        <CategoryIcon size={11} />
                        {categoryLabel}
                      </span>
                    )}
                    <span className="flex items-center gap-1 rounded-full bg-cream-dark px-2.5 py-1 text-xs text-navy/60">
                      <MapPin size={11} />
                      {service.location.split(',')[0]}
                    </span>
                  </div>

                  {/* Footer row */}
                  <div className="mt-auto flex items-end justify-between pt-5">
                    <div>
                      <p className="text-lg font-bold text-navy">{price.coins}</p>
                      <p className="text-xs text-navy/45">{price.uzs}</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-navy/50">
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {service.num_sessions} × {service.session_duration_min}{' '}
                        {dict.browse.minutes}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Mobile sticky filter bar ────────────────────── */}
      <div className="fixed bottom-0 inset-x-0 z-40 border-t border-navy/10 bg-cream/95 px-6 py-3 backdrop-blur-sm md:hidden">
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy py-3 text-sm font-medium text-cream"
        >
          <SlidersHorizontal size={15} />
          {activeCategory === 'all'
            ? dict.browse.allCategories
            : CATEGORIES.find((c) => c.key === activeCategory)
                ? getLocalizedField(
                    CATEGORIES.find((c) => c.key === activeCategory)!,
                    'label',
                    loc
                  )
                : activeCategory}
        </button>
      </div>

      {/* ── Mobile drawer ───────────────────────────────── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-navy/50 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute bottom-0 inset-x-0 rounded-t-2xl bg-cream p-6 pb-10">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-semibold text-navy">Kategoriyalar</span>
              <button onClick={() => setDrawerOpen(false)}>
                <X size={20} className="text-navy/60" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <CategoryPills
                activeCategory={activeCategory}
                setActiveCategory={(c) => {
                  setActiveCategory(c)
                  setDrawerOpen(false)
                }}
                dict={dict}
                locale={loc}
                vertical
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Shared category pills ────────────────────────────────

function CategoryPills({
  activeCategory,
  setActiveCategory,
  dict,
  locale,
  vertical = false,
}: {
  activeCategory: string
  setActiveCategory: (key: string) => void
  dict: Dictionary
  locale: 'uz' | 'ru' | 'en'
  vertical?: boolean
}) {
  const pillClass = (active: boolean) =>
    cn(
      'flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors',
      active
        ? 'bg-navy text-cream'
        : 'border border-navy/15 bg-white text-navy/70 hover:border-gold/50 hover:text-navy',
      vertical && 'w-full justify-start'
    )

  return (
    <>
      <button
        onClick={() => setActiveCategory('all')}
        className={pillClass(activeCategory === 'all')}
      >
        {dict.browse.allCategories}
      </button>
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon
        const label =
          locale === 'uz' ? cat.label_uz : locale === 'ru' ? cat.label_ru : cat.label_en
        return (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={pillClass(activeCategory === cat.key)}
          >
            <Icon size={13} />
            {label}
          </button>
        )
      })}
    </>
  )
}

// ── Empty state ──────────────────────────────────────────

function EmptyState({ dict }: { dict: Dictionary }) {
  return (
    <div className="flex flex-col items-center py-24 text-center">
      <Search size={36} className="mb-4 text-gold/60" />
      <p className="text-lg font-semibold text-navy">{dict.browse.noResults}</p>
      <p className="mt-2 text-sm text-navy/50">{dict.browse.noResultsHint}</p>
    </div>
  )
}
