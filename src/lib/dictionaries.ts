const dictionaries = {
  uz: () => import('../messages/uz.json').then((m) => m.default),
  ru: () => import('../messages/ru.json').then((m) => m.default),
  en: () => import('../messages/en.json').then((m) => m.default),
}

export type Locale = keyof typeof dictionaries

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
