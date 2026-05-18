import type { CurrencyCode } from '@/constants/currencies'

/** Mock kurslar: kanonik qiymatlar USD sentlarida. */
export const USD_TO_UZS_MOCK = 12_650
export const USD_TO_RUB_MOCK = 92

/** USD sentlarini tanlangan valyutaning kichik birligiga (sent / tiyin / …) o‘tkazadi. */
export function convertUsdCentsToDisplayCurrency(
  usdCents: number,
  target: CurrencyCode,
): number {
  const dollars = usdCents / 100
  if (target === 'USD') return usdCents
  if (target === 'UZS') return Math.round(dollars * USD_TO_UZS_MOCK * 100)
  if (target === 'RUB') return Math.round(dollars * USD_TO_RUB_MOCK * 100)
  return usdCents
}
