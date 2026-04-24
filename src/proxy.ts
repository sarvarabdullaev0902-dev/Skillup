import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['uz', 'ru', 'en']
const defaultLocale = 'uz'

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language') ?? ''
  if (acceptLanguage.includes('ru')) return 'ru'
  if (acceptLanguage.includes('en') && !acceptLanguage.includes('uz')) return 'en'
  return defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
