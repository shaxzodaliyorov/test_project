import type { CurrencyCode } from '@/constants/currencies'
import type { UiLocale } from '@/constants/ui-languages'
import { normalizeCurrencySpacing } from '@/utils/format-currency'

export function formatSampleAmount(
  locale: UiLocale,
  currency: CurrencyCode,
): string {
  const amount = 1_234_567.89
  const map: Record<UiLocale, string> = {
    uz: 'uz-UZ',
    ru: 'ru-RU',
    en: 'en-US',
  }
  try {
    return normalizeCurrencySpacing(
      new Intl.NumberFormat(map[locale], {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
        currencyDisplay: 'narrowSymbol',
      }).format(amount),
    )
  } catch {
    return normalizeCurrencySpacing(`${amount.toFixed(0)} ${currency}`)
  }
}
