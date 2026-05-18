import { formatCurrencyMinorUnits } from '@/utils/format-currency'

export function formatMoney(cents: number, currencyOverride?: string) {
  return formatCurrencyMinorUnits(cents, {
    currency: currencyOverride,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })
}

export function reportsShowTotal() {
  return (total: number, range: [number, number]) =>
    total === 0 ? '0 ta' : `${range[0]}-${range[1]} / ${total}`
}
