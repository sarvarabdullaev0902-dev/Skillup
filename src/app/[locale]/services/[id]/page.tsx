import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/lib/dictionaries'
import {
  getService,
  getTeacher,
  getServicesByTeacher,
  getServicesByCategory,
} from '@/lib/data'
import ServiceDetailClient from './ServiceDetailClient'

export async function generateStaticParams() {
  const { SERVICES } = await import('@/lib/data')
  const locales = ['uz', 'ru', 'en']
  return locales.flatMap((locale) =>
    SERVICES.map((s) => ({ locale, id: s.id }))
  )
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { locale, id } = await params
  if (!hasLocale(locale)) notFound()

  const service = getService(id)
  if (!service) notFound()

  const teacher = getTeacher(service.teacher_id)
  if (!teacher) notFound()

  const dict = await getDictionary(locale)

  const otherByTeacher = getServicesByTeacher(service.teacher_id)
    .filter((s) => s.id !== id)
    .slice(0, 3)

  const similar = getServicesByCategory(service.category)
    .filter((s) => s.id !== id && s.teacher_id !== service.teacher_id)
    .slice(0, 3)

  return (
    <ServiceDetailClient
      service={service}
      teacher={teacher}
      otherByTeacher={otherByTeacher}
      similar={similar}
      categoryKey={service.category}
      dict={dict}
      locale={locale}
    />
  )
}
