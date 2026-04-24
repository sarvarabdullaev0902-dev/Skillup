'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Star,
  CheckCircle,
  MapPin,
  Clock,
  Calendar,
  ChevronRight,
  Users,
  X,
  ShieldCheck,
} from 'lucide-react'
import { formatPrice } from '@/lib/format'
import { CATEGORIES } from '@/lib/data'
import type { Service, Teacher } from '@/lib/data'
import type { Dictionary } from '@/lib/dictionaries'

type Locale = 'uz' | 'ru' | 'en'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getLocalizedField(obj: any, field: string, locale: string): string {
  return (obj[`${field}_${locale}`] ?? obj[`${field}_en`] ?? '') as string
}

const LEARN_BULLETS: Record<string, string[]> = {
  s1: [
    'Structure answers using PEEL and 3-part response frameworks',
    'Develop topic-specific vocabulary for Parts 1, 2, and 3',
    'Reduce hesitation with fluency drills and pronunciation work',
    'Simulate exam conditions under time pressure',
    'Identify and correct your five most frequent grammar errors',
  ],
  s2: [
    'Set up and solve systems of linear equations using row reduction',
    'Compute determinants, inverses, and eigenvalues',
    'Understand vector spaces and linear independence',
    'Apply matrix methods to engineering problems',
    'Interpret geometric meaning behind algebraic operations',
  ],
  s3: [
    'Write Python scripts that run from the command line',
    'Work with lists, dictionaries, loops, and functions',
    'Read and write files; handle errors gracefully',
    'Use Git and GitHub for version control',
    'Build and publish a personal portfolio project',
  ],
  s4: [
    'Hold sustained conversations on everyday and academic topics',
    'Recognise and correct your most frequent grammar mistakes',
    'Expand vocabulary for university and professional contexts',
    'Write concise professional emails in Russian',
  ],
  s5: [
    'Draw and name organic compounds using IUPAC nomenclature',
    'Understand reaction mechanisms: SN1, SN2, E1, E2',
    'Solve the most common DTM organic chemistry question types',
    'Apply a process-of-elimination strategy under time pressure',
    'Build confidence with past years\' entrance exam papers',
  ],
  s6: [
    'Hold a guitar correctly and tune it by ear',
    'Play basic open chords: C, G, Am, Em, D',
    'Switch chords smoothly in common song progressions',
    'Strum simple rhythms and play your first full song',
  ],
  s7: [
    'Read and write basic German sentences (A1)',
    'Introduce yourself and describe your studies in German',
    'Draft a DAAD-style motivation letter with guided support',
    'Build a vocabulary set relevant to academic applications',
    'Navigate common application forms in German',
  ],
  s8: [
    'Set up an Instagram or Telegram channel from scratch',
    'Create a one-month content plan with limited budget',
    'Apply basic growth-hacking techniques used by Uzbek startups',
    'Understand your audience using free analytics tools',
    'Validate a business idea before spending money on it',
  ],
  s9: [
    'Navigate Figma confidently — frames, components, auto layout',
    'Design a complete mobile app screen set',
    'Build a reusable component library',
    'Create an interactive prototype to share with stakeholders',
    'Present your work as a portfolio case study',
  ],
  s10: [
    'Master all four IELTS Academic skill areas',
    'Apply band-score criteria to self-evaluate your work',
    'Write Task 1 data descriptions and Task 2 essays',
    'Navigate Listening sections 1–4 with proven annotation techniques',
    'Develop a personalised study schedule for the final 4 weeks',
  ],
  s11: [
    'Compute limits using L\'Hôpital\'s rule and substitution',
    'Differentiate and integrate standard functions',
    'Apply derivatives to optimisation problems',
    'Work through first- and second-year exam problems',
  ],
  s12: [
    'Write a clear thesis statement and develop an argument',
    'Use linking words and cohesive devices accurately',
    'Achieve lexical range without repeating yourself',
    'Plan, write, and self-edit a Task 2 essay in 40 minutes',
    'Understand what examiners look for in Band 7 writing',
  ],
}

const DEFAULT_BULLETS = [
  'Core concepts explained step by step',
  'Practice exercises with immediate feedback',
  'Personalised approach to your learning pace',
  'Study materials and resources provided',
]

interface Props {
  service: Service
  teacher: Teacher
  otherByTeacher: Service[]
  similar: Service[]
  categoryKey: string
  dict: Dictionary
  locale: string
}

export default function ServiceDetailClient({
  service,
  teacher,
  otherByTeacher,
  similar,
  categoryKey,
  dict,
  locale,
}: Props) {
  const loc = locale as Locale
  const [modalOpen, setModalOpen] = useState(false)

  const category = CATEGORIES.find((c) => c.key === categoryKey) ?? null
  const price = formatPrice(service.price_coins, locale)
  const title = getLocalizedField(service, 'title', loc)
  const description = getLocalizedField(service, 'description', loc)
  const bio = getLocalizedField(teacher, 'bio', loc)
  const categoryLabel = category ? getLocalizedField(category, 'label', loc) : service.category
  const CategoryIcon = category?.icon

  const bullets = LEARN_BULLETS[service.id] ?? DEFAULT_BULLETS

  const joinedYear = new Date(teacher.joined_at).toLocaleDateString(
    loc === 'ru' ? 'ru-RU' : loc === 'uz' ? 'uz-UZ' : 'en-US',
    { month: 'long', year: 'numeric' }
  )

  return (
    <div className="min-h-screen bg-cream pt-20 pb-24">
      <div className="mx-auto max-w-5xl px-6">

        {/* ── Breadcrumb ─────────────────────────────────── */}
        <nav className="flex items-center gap-2 py-5 text-sm text-navy/50">
          <Link href={`/${locale}/browse`} className="hover:text-navy">
            {dict.service.breadcrumbBrowse}
          </Link>
          <ChevronRight size={14} />
          {CategoryIcon && <CategoryIcon size={13} />}
          <span>{categoryLabel}</span>
          <ChevronRight size={14} />
          <span className="line-clamp-1 text-navy/80">{title}</span>
        </nav>

        {/* ── Hero grid ──────────────────────────────────── */}
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">

          {/* Left: content */}
          <div>
            {/* Category pill */}
            {CategoryIcon && (
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                <CategoryIcon size={12} />
                {categoryLabel}
              </span>
            )}

            <h1
              className="text-3xl font-bold leading-tight text-navy sm:text-4xl"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {title}
            </h1>

            <p className="mt-5 leading-relaxed text-navy/65">{description}</p>

            {/* Quick meta */}
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-navy/60">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {service.num_sessions} {dict.service.totalSessions.toLowerCase()}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {service.session_duration_min} {dict.service.minutes}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} />
                {dict.browse.offline}
              </span>
            </div>

            {/* ── About teacher ────────────────────────── */}
            <section className="mt-12">
              <h2
                className="mb-5 text-xl font-bold text-navy"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {dict.service.aboutTeacher}
              </h2>

              <div className="flex items-start gap-4">
                <Image
                  src={teacher.avatar}
                  alt={teacher.display_name}
                  width={64}
                  height={64}
                  className="shrink-0 rounded-full object-cover ring-2 ring-cream-dark"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-navy">{teacher.display_name}</span>
                    {teacher.verified && (
                      <CheckCircle size={15} className="text-gold" />
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-navy/50">{teacher.faculty}</p>
                </div>
              </div>

              <p className="mt-4 leading-relaxed text-navy/65">{bio}</p>

              <div className="mt-5 flex flex-wrap gap-6 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-wide text-navy/40">
                    {dict.service.rating}
                  </p>
                  <div className="mt-1 flex items-center gap-1">
                    <Star size={14} className="fill-gold text-gold" />
                    <span className="font-semibold text-navy">{teacher.rating.toFixed(1)}</span>
                    <span className="text-navy/50">({teacher.rating_count})</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-navy/40">
                    {dict.service.sessionsTaught}
                  </p>
                  <p className="mt-1 font-semibold text-navy">{teacher.sessions_taught}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-navy/40">
                    {dict.service.memberSince}
                  </p>
                  <p className="mt-1 font-semibold text-navy">{joinedYear}</p>
                </div>
              </div>
            </section>

            {/* ── What you'll learn ────────────────────── */}
            <section className="mt-12">
              <h2
                className="mb-5 text-xl font-bold text-navy"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {dict.service.whatYoullLearn}
              </h2>
              <ul className="space-y-3">
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-xs font-bold text-gold">
                      {i + 1}
                    </span>
                    <span className="text-navy/70">{b}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* ── Session structure ────────────────────── */}
            <section className="mt-12">
              <h2
                className="mb-5 text-xl font-bold text-navy"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {dict.service.sessionStructure}
              </h2>
              <div className="relative pl-6">
                <div className="absolute left-2.5 top-2 h-[calc(100%-16px)] w-px bg-navy/10" />
                {Array.from({ length: service.num_sessions }).map((_, i) => (
                  <div key={i} className="relative mb-4 flex items-center gap-4">
                    <div className="absolute -left-6 flex h-5 w-5 items-center justify-center rounded-full border-2 border-cream bg-navy text-[10px] font-bold text-cream">
                      {i + 1}
                    </div>
                    <div className="flex-1 rounded-xl border border-navy/8 bg-white px-4 py-3">
                      <span className="text-sm font-medium text-navy">
                        {dict.service.session} {i + 1}
                      </span>
                      <span className="ml-2 text-xs text-navy/45">
                        {service.session_duration_min} {dict.service.minutes}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Location ─────────────────────────────── */}
            <section className="mt-12">
              <h2
                className="mb-4 text-xl font-bold text-navy"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {dict.service.locationTitle}
              </h2>
              <div className="flex items-start gap-3 rounded-2xl border border-navy/8 bg-white p-5">
                <MapPin size={18} className="mt-0.5 shrink-0 text-gold" />
                <div>
                  <p className="font-medium text-navy">{service.location}</p>
                  <p className="mt-1 text-sm text-navy/50">{dict.service.locationNote}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Right: sticky booking card */}
          <div className="lg:relative">
            <div className="lg:sticky lg:top-28">
              <BookingCard
                price={price}
                service={service}
                dict={dict}
                onBook={() => setModalOpen(true)}
              />
            </div>
          </div>
        </div>

        {/* ── Other by teacher ───────────────────────────── */}
        {otherByTeacher.length > 0 && (
          <RelatedSection
            title={dict.service.otherByTeacher}
            services={otherByTeacher}
            locale={locale}
            loc={loc}
          />
        )}

        {/* ── Similar services ───────────────────────────── */}
        {similar.length > 0 && (
          <RelatedSection
            title={dict.service.similarServices}
            services={similar}
            locale={locale}
            loc={loc}
          />
        )}
      </div>

      {/* ── Demo modal ─────────────────────────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative w-full max-w-sm rounded-2xl bg-cream p-8 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-4 top-4 text-navy/40 hover:text-navy"
            >
              <X size={20} />
            </button>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/15">
              <Calendar size={22} className="text-gold" />
            </div>
            <h3
              className="text-xl font-bold text-navy"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {dict.service.demoModalTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-navy/65">
              {dict.service.demoModalBody}
            </p>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-6 w-full rounded-xl bg-navy py-3 text-sm font-semibold text-cream transition-colors hover:bg-navy-light"
            >
              {dict.service.demoModalClose}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Booking card ─────────────────────────────────────────

function BookingCard({
  price,
  service,
  dict,
  onBook,
}: {
  price: ReturnType<typeof formatPrice>
  service: Service
  dict: Dictionary
  onBook: () => void
}) {
  return (
    <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
      <div>
        <p className="text-3xl font-bold text-navy">{price.coins}</p>
        <p className="mt-0.5 text-sm text-navy/50">{price.uzs}</p>
      </div>

      <div className="mt-5 space-y-3 text-sm text-navy/65">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} />
            {dict.service.totalSessions}
          </span>
          <span className="font-medium text-navy">{service.num_sessions}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {dict.service.duration}
          </span>
          <span className="font-medium text-navy">
            {service.session_duration_min} {dict.service.minutes}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} />
            {dict.service.format}
          </span>
          <span className="font-medium text-navy">{dict.browse.offline}</span>
        </div>
        <div className="flex items-start gap-1.5 text-navy/50">
          <MapPin size={14} className="mt-0.5 shrink-0" />
          <span>{service.location}</span>
        </div>
      </div>

      <button
        onClick={onBook}
        className="mt-6 w-full rounded-xl bg-navy py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-navy-light active:scale-[0.98]"
      >
        {dict.service.bookNow}
      </button>

      <div className="mt-4 flex items-start gap-2 text-xs text-navy/45">
        <ShieldCheck size={14} className="mt-0.5 shrink-0 text-gold/70" />
        <span>{dict.service.escrowNotice}</span>
      </div>
    </div>
  )
}

// ── Related services row ─────────────────────────────────

function RelatedSection({
  title,
  services,
  locale,
  loc,
}: {
  title: string
  services: Service[]
  locale: string
  loc: Locale
}) {
  return (
    <section className="mt-16">
      <h2
        className="mb-6 text-xl font-bold text-navy"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const price = formatPrice(s.price_coins, locale)
          const sTitle = getLocalizedField(s, 'title', loc)
          return (
            <Link
              key={s.id}
              href={`/${locale}/services/${s.id}`}
              className="group rounded-2xl border border-navy/8 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-md"
            >
              <h3
                className="line-clamp-2 text-sm font-semibold leading-snug text-navy group-hover:text-navy-light"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {sTitle}
              </h3>
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <p className="text-base font-bold text-navy">{price.coins}</p>
                  <p className="text-xs text-navy/45">{price.uzs}</p>
                </div>
                <span className="flex items-center gap-1 text-xs text-navy/50">
                  <Users size={11} />
                  {s.num_sessions} × {s.session_duration_min}m
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
