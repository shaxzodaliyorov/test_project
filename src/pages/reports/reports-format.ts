import { formatCurrencyMinorUnits } from '@/utils/format-currency'

export function formatMoney(cents: number, currencyOverride?: string) {
  return formatCurrencyMinorUnits(cents, {
    currency: currencyOverride,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })
}
