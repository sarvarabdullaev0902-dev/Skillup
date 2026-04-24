import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/lib/dictionaries'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export async function generateStaticParams() {
  return [{ locale: 'uz' }, { locale: 'ru' }, { locale: 'en' }]
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()

  const dict = await getDictionary(locale)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar dict={dict} locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer dict={dict} locale={locale} />
    </div>
  )
}
