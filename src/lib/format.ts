export interface FormattedPrice {
  coins: string
  uzs: string
  combined: string
}

export function formatPrice(coins: number, locale: string): FormattedPrice {
  const uzsValue = coins * 1000

  const uzsFormatted = new Intl.NumberFormat(
    locale === 'ru' ? 'ru-RU' : locale === 'en' ? 'en-US' : 'uz-UZ',
    { maximumFractionDigits: 0 }
  ).format(uzsValue)

  if (locale === 'uz') {
    return {
      coins: `${coins} SkillCoin`,
      uzs: `${uzsFormatted} so'm`,
      combined: `${coins} SkillCoin · ${uzsFormatted} so'm`,
    }
  }
  if (locale === 'ru') {
    return {
      coins: `${coins} SkillCoin`,
      uzs: `${uzsFormatted} сум`,
      combined: `${coins} SkillCoin · ${uzsFormatted} сум`,
    }
  }
  return {
    coins: `${coins} SkillCoin`,
    uzs: `${uzsFormatted} UZS`,
    combined: `${coins} SkillCoin · ${uzsFormatted} UZS`,
  }
}
