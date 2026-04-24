import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/lib/dictionaries'
import DashboardClient from './DashboardClient'

export async function generateStaticParams() {
  return [{ locale: 'uz' }, { locale: 'ru' }, { locale: 'en' }]
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  const dict = await getDictionary(locale)
  return <DashboardClient dict={dict} locale={locale} />
}
