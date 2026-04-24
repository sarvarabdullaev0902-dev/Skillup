'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Star,
  Users,
  CalendarCheck,
  Coins,
  Clock,
  ShieldCheck,
  TrendingUp,
  ChevronDown,
  X,
  CheckCircle2,
  ArrowDown,
} from 'lucide-react'
import Link from 'next/link'
import type { Dictionary } from '@/lib/dictionaries'
import { TEACHERS } from '@/lib/data'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

interface Props {
  dict: Dictionary
  locale: string
}

const STORY_TEACHERS = ['t1', 't2', 't3']

const STORY_QUOTES: Record<string, Record<string, string>> = {
  t1: {
    uz: "SkillUp orqali 3 oy ichida 89 SkillCoin ishladim — bu mening uy kiramimga qo'shimcha daromad. Jadvalim o'zimda.",
    ru: "За 3 месяца через SkillUp я заработал 89 SkillCoin — это дополнительный доход при гибком графике.",
    en: "In 3 months on SkillUp I earned 89 SkillCoin — meaningful extra income and the schedule is completely mine.",
  },
  t2: {
    uz: "Matematika bo'yicha dars berish menga mavzularni yanada chuqurroq tushunishga yordam berdi. Escrow tizimi xavfsiz his qildiradi.",
    ru: "Преподавание математики помогло мне самой глубже понять материал. Эскроу даёт ощущение полной безопасности.",
    en: "Teaching maths has deepened my own understanding. The escrow system means I never have to chase a payment.",
  },
  t3: {
    uz: "Python darslarimga talabalar juda tez topildi. Platforma sodda va to'lov muammosiz.",
    ru: "На мои Python-курсы студенты нашлись очень быстро. Платформа простая, оплата — без проблем.",
    en: "Students for my Python sessions booked within days of listing. The platform is clean and payments just work.",
  },
}

export default function BecomeTutorClient({ dict, locale }: Props) {
  const t = dict.tutor
  const [modalOpen, setModalOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number>(0)

  const storyTeachers = STORY_TEACHERS.map((id) =>
    TEACHERS.find((tea) => tea.id === id)!
  )

  const stats = [
    { value: t.stat1Value, label: t.stat1Label, icon: Coins },
    { value: t.stat2Value, label: t.stat2Label, icon: Users },
    { value: t.stat3Value, label: t.stat3Label, icon: CalendarCheck },
    { value: t.stat4Value, label: t.stat4Label, icon: Star },
  ]

  const howSteps = [
    { title: t.how1Title, desc: t.how1Desc, num: '01' },
    { title: t.how2Title, desc: t.how2Desc, num: '02' },
    { title: t.how3Title, desc: t.how3Desc, num: '03' },
    { title: t.how4Title, desc: t.how4Desc, num: '04' },
  ]

  const benefits = [
    { title: t.benefit1Title, desc: t.benefit1Desc, icon: Clock },
    { title: t.benefit2Title, desc: t.benefit2Desc, icon: ShieldCheck },
    { title: t.benefit3Title, desc: t.benefit3Desc, icon: TrendingUp },
    { title: t.benefit4Title, desc: t.benefit4Desc, icon: Users },
  ]

  const faqs = [
    { q: t.faq1Q, a: t.faq1A },
    { q: t.faq2Q, a: t.faq2A },
    { q: t.faq3Q, a: t.faq3A },
    { q: t.faq4Q, a: t.faq4A },
    { q: t.faq5Q, a: t.faq5A },
  ]

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-navy px-6 pt-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 60%, #C8A94D 0%, transparent 55%)',
          }}
        />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />

        <div className="mx-auto w-full max-w-4xl py-16 text-center">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-6 inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-gold"
          >
            {t.badge}
          </motion.span>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-4xl font-bold leading-tight tracking-tight text-cream sm:text-5xl md:text-6xl"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {t.heading}
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-cream/70 sm:text-lg"
          >
            {t.subheading}
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <button
              onClick={() => setModalOpen(true)}
              className="group flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-navy transition-all hover:bg-gold-light"
            >
              {t.heroCta}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <Link
              href={`/${locale}/browse`}
              className="rounded-full border border-cream/20 px-8 py-3.5 text-sm font-semibold text-cream transition-all hover:border-cream/50 hover:bg-cream/10"
            >
              {dict.nav.skills}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Strip ───────────────────────────────────── */}
      <section className="border-b border-navy/10 bg-cream-dark px-6 py-14">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map(({ value, label, icon: Icon }, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col items-center gap-2 text-center"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold">
                <Icon size={18} />
              </div>
              <span
                className="text-2xl font-black text-navy"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {value}
              </span>
              <span className="text-xs font-medium uppercase tracking-wide text-navy/50">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────── */}
      <section id="how-it-works" className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14 text-center text-3xl font-bold text-navy sm:text-4xl"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {t.howHeading}
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-4">
            {howSteps.map((step, i) => (
              <motion.div
                key={step.num}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative rounded-2xl border border-navy/8 bg-white p-7 shadow-sm"
              >
                <span className="absolute right-5 top-5 font-mono text-5xl font-black text-navy/5 select-none">
                  {step.num}
                </span>
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold text-sm font-bold">
                  {step.num}
                </div>
                <h3
                  className="mb-2 text-base font-bold text-navy"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-navy/60">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Teach ─────────────────────────────────────── */}
      <section className="bg-navy px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14 text-center text-3xl font-bold text-cream sm:text-4xl"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {t.whyHeading}
          </motion.h2>

          <div className="grid gap-10 lg:grid-cols-2">
            {/* Benefits */}
            <div className="grid gap-5 sm:grid-cols-2">
              {benefits.map(({ title, desc, icon: Icon }, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="rounded-2xl border border-cream/10 bg-navy-light/40 p-6"
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold">
                    <Icon size={18} />
                  </div>
                  <h3 className="mb-1.5 font-semibold text-cream">{title}</h3>
                  <p className="text-sm leading-relaxed text-cream/60">{desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Escrow flow diagram */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center rounded-2xl border border-cream/10 bg-navy-light/30 p-8"
            >
              <p className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-gold">
                {t.escrowTitle}
              </p>
              <div className="flex w-full max-w-xs flex-col items-center gap-2">
                {[t.escrowStep1, t.escrowStep2, t.escrowStep3, t.escrowStep4].map(
                  (label, i) => (
                    <div key={i} className="flex w-full flex-col items-center gap-2">
                      <div
                        className={`w-full rounded-xl px-5 py-3.5 text-center text-sm font-medium ${
                          i === 3
                            ? 'bg-gold text-navy'
                            : 'border border-cream/15 bg-navy/50 text-cream'
                        }`}
                      >
                        {label}
                      </div>
                      {i < 3 && (
                        <ArrowDown size={16} className="text-cream/30" />
                      )}
                    </div>
                  )
                )}
              </div>
              <p className="mt-8 text-center text-xs text-cream/40">
                {dict.service.escrowNotice}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Tutor Stories ─────────────────────────────────── */}
      <section className="bg-cream-dark px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl font-bold text-navy sm:text-4xl"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {t.storiesHeading}
            </motion.h2>
            <motion.p
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-3 text-navy/60"
            >
              {t.storiesSub}
            </motion.p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {storyTeachers.map((teacher, i) => {
              const quote = STORY_QUOTES[teacher.id]?.[locale] ?? STORY_QUOTES[teacher.id]?.en ?? ''
              return (
                <motion.div
                  key={teacher.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-col rounded-2xl bg-white p-7 shadow-sm"
                >
                  <div className="mb-5 flex items-center gap-1">
                    {[...Array(5)].map((_, s) => (
                      <Star
                        key={s}
                        size={14}
                        className={s < Math.floor(teacher.rating) ? 'fill-gold text-gold' : 'fill-navy/10 text-navy/10'}
                      />
                    ))}
                    <span className="ml-1.5 text-xs text-navy/50">{teacher.rating}</span>
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-navy/70 italic">
                    &ldquo;{quote}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3 border-t border-navy/8 pt-5">
                    <img
                      src={teacher.avatar}
                      alt={teacher.display_name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-navy">{teacher.display_name}</p>
                      <p className="text-xs text-navy/50">{teacher.faculty}</p>
                    </div>
                    {teacher.verified && (
                      <CheckCircle2 size={14} className="ml-auto shrink-0 text-gold" />
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className="bg-cream px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-10 text-center text-3xl font-bold text-navy sm:text-4xl"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {t.faqHeading}
          </motion.h2>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="overflow-hidden rounded-2xl border border-navy/10 bg-white"
              >
                <button
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                >
                  <span className="pr-4 text-sm font-semibold text-navy">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-navy/40 transition-transform duration-200 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-navy/60">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────── */}
      <section className="bg-gold px-6 py-20">
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
            {t.ctaHeading}
          </h2>
          <p className="mt-4 text-navy/70">{t.ctaSub}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => setModalOpen(true)}
              className="group flex items-center gap-2 rounded-full bg-navy px-8 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-navy-light"
            >
              {t.ctaButton}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <Link
              href={`/${locale}/browse`}
              className="rounded-full border-2 border-navy/20 px-8 py-3.5 text-sm font-semibold text-navy transition-colors hover:border-navy/40"
            >
              {dict.nav.skills}
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Demo Modal ────────────────────────────────────── */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/60 px-4 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute right-4 top-4 rounded-full p-1.5 text-navy/40 transition-colors hover:bg-navy/5 hover:text-navy"
              >
                <X size={18} />
              </button>
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                <Coins size={22} />
              </div>
              <h3
                className="mb-2 text-xl font-bold text-navy"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {t.demoModalTitle}
              </h3>
              <p className="text-sm leading-relaxed text-navy/60">{t.demoModalBody}</p>
              <button
                onClick={() => setModalOpen(false)}
                className="mt-6 w-full rounded-full bg-navy py-3 text-sm font-semibold text-cream transition-colors hover:bg-navy-light"
              >
                {t.demoModalClose}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
