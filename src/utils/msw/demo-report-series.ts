import type { ReportDailyPoint, ReportMonthlyRow } from '@/types/reports'

export function seriesRevenueByMonth(count: number): ReportMonthlyRow[] {
  const out: ReportMonthlyRow[] = []
  const end = new Date(Date.UTC(2025, 4, 1))
  for (let k = 0; k < count; k += 1) {
    const d = new Date(end)
    d.setUTCMonth(d.getUTCMonth() - (count - 1 - k))
    const y = d.getUTCFullYear()
    const m = d.getUTCMonth() + 1
    out.push({
      month: `${y}-${String(m).padStart(2, '0')}`,
      amount: 500_000 + ((k * 73_211 + 12_000) % 4_800_000),
    })
  }
  return out
}

export function seriesDaily(days: number): ReportDailyPoint[] {
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(Date.UTC(2025, 3, 1 + i))
    const gross = 12_000 + ((i * 941 + 200) % 28_000)
    const net = Math.round(gross * (0.91 + (i % 5) * 0.015))
    return {
      day: d.toISOString().slice(0, 10),
      grossCents: gross * 100,
      netCents: net * 100,
      orders: 40 + ((i * 13) % 220),
    }
  })
}
