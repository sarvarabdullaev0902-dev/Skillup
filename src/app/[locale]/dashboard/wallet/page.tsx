import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/lib/dictionaries'
import WalletClient from './WalletClient'

export async function generateStaticParams() {
  return [{ locale: 'uz' }, { locale: 'ru' }, { locale: 'en' }]
}

export default async function WalletPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()
  const dict = await getDictionary(locale)
  return <WalletClient dict={dict} locale={locale} />
}
