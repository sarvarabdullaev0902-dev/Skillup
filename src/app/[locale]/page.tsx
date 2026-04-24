'use client'

import { motion } from 'framer-motion'
import { Search, CalendarCheck, Users, Coins, Star, BookOpen, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { use } from 'react'
import { getDictionary, hasLocale } from '@/lib/dictionaries'
import { notFound } from 'next/navigation'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

const STATS = [
  { value: '200+', key: 'students' as const, icon: Users },
  { value: '80+', key: 'skills' as const, icon: BookOpen },
  { value: '1 200+', key: 'sessions' as const, icon: CalendarCheck },
  { value: '4.8 / 5', key: 'rating' as const, icon: Star },
]

const HOW_STEPS = [
  { icon: Search, key: 'step1' as const, num: '01' },
  { icon: CalendarCheck, key: 'step2' as const, num: '02' },
  { icon: Users, key: 'step3' as const, num: '03' },
]

export default function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = use(params)
  if (!hasLocale(locale)) notFound()

  // We load the dict synchronously via `use()` after suspense resolves.
  // For a prototype with small JSON files this is perfectly fine.
  const dict = use(getDictionary(locale))

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-navy px-6 pt-24">
        {/* Background decoration */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 70% 50%, #C8A94D 0%, transparent 60%)',
          }}
        />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />

        <div className="mx-auto w-full max-w-4xl py-20 text-center">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-6 inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-gold"
          >
            {dict.hero.badge}
          </motion.span>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-4xl font-bold leading-tight tracking-tight text-cream sm:text-5xl md:text-6xl"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {dict.hero.heading}
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-cream/70 sm:text-lg"
          >
            {dict.hero.subheading}
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href={`/${locale}#skills`}
              className="group flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-navy transition-all hover:bg-gold-light"
            >
              {dict.hero.browseCta}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={`/${locale}#get-started`}
              className="rounded-full border border-cream/20 px-8 py-3.5 text-sm font-semibold text-cream transition-all hover:border-cream/50 hover:bg-cream/10"
            >
              {dict.hero.teachCta}
            </Link>
          </motion.div>

          {/* Floating coin badge */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-16 inline-flex items-center gap-3 rounded-2xl border border-gold/20 bg-navy-light/60 px-6 py-3 backdrop-blur-sm"
          >
            <Coins size={20} className="text-gold" />
            <span className="text-sm text-cream/80">
              1 SkillCoin = 1 000 UZS
            </span>
            <span className="rounded-full bg-gold/20 px-2 py-0.5 text-xs font-medium text-gold">
              10% fee
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────── */}
      <section id="how-it-works" className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <motion.span
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-gold"
            >
              {dict.howItWorks.badge}
            </motion.span>
            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl font-bold text-navy sm:text-4xl"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {dict.howItWorks.heading}
            </motion.h2>
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto mt-4 max-w-xl text-navy/60"
            >
              {dict.howItWorks.subheading}
            </motion.p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {HOW_STEPS.map(({ icon: Icon, key, num }, i) => (
              <motion.div
                key={key}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group relative rounded-2xl border border-navy/8 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="absolute right-6 top-6 font-mono text-5xl font-black text-navy/5 select-none">
                  {num}
                </span>
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
                  <Icon size={22} />
                </div>
                <h3
                  className="mb-2 text-lg font-bold text-navy"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {dict.howItWorks[key].title}
                </h3>
                <p className="text-sm leading-relaxed text-navy/60">
                  {dict.howItWorks[key].description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SkillCoin ─────────────────────────────────────── */}
      <section className="bg-navy px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <motion.span
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-gold"
              >
                {dict.skillcoin.badge}
              </motion.span>
              <motion.h2
                custom={1}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-3xl font-bold text-cream sm:text-4xl"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {dict.skillcoin.heading}
              </motion.h2>
              <motion.p
                custom={2}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-4 text-cream/60"
              >
                {dict.skillcoin.subheading}
              </motion.p>

              <motion.div
                custom={3}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-8 flex flex-col gap-3"
              >
                <div className="flex items-center gap-3 rounded-xl border border-gold/20 bg-navy-light/50 px-5 py-3">
                  <Coins size={18} className="shrink-0 text-gold" />
                  <span className="text-sm font-medium text-cream">{dict.skillcoin.rate}</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-cream/10 bg-navy-light/30 px-5 py-3">
                  <span className="text-sm text-cream/60">{dict.skillcoin.fee}</span>
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col gap-5">
              {(['earn', 'spend'] as const).map((type, i) => (
                <motion.div
                  key={type}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="rounded-2xl border border-cream/10 bg-navy-light/40 p-6"
                >
                  <h3 className="mb-2 font-semibold text-cream">
                    {dict.skillcoin[`${type}Title`]}
                  </h3>
                  <p className="text-sm text-cream/60">
                    {dict.skillcoin[`${type}Desc`]}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────── */}
      <section className="bg-cream-dark px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14 text-center text-3xl font-bold text-navy sm:text-4xl"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {dict.stats.heading}
          </motion.h2>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map(({ value, key, icon: Icon }, i) => (
              <motion.div
                key={key}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col items-center gap-3 rounded-2xl bg-white p-8 text-center shadow-sm"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <Icon size={20} />
                </div>
                <span
                  className="text-3xl font-black text-navy"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {value}
                </span>
                <span className="text-xs font-medium uppercase tracking-wide text-navy/50">
                  {dict.stats[key]}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────── */}
      <section id="get-started" className="bg-gold px-6 py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2
            className="text-3xl font-bold text-navy sm:text-4xl"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {dict.hero.heading}
          </h2>
          <p className="mt-4 text-navy/70">{dict.hero.subheading}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={`/${locale}#skills`}
              className="rounded-full bg-navy px-8 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-navy-light"
            >
              {dict.hero.browseCta}
            </Link>
            <Link
              href={`/${locale}#skills`}
              className="rounded-full border-2 border-navy/20 px-8 py-3.5 text-sm font-semibold text-navy transition-colors hover:border-navy/40"
            >
              {dict.hero.teachCta}
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  )
}
