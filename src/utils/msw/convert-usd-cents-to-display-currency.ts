import type { CurrencyCode } from '@/constants/currencies'

const USD_TO_UZS_MOCK = 12_650
const USD_TO_RUB_MOCK = 92

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
