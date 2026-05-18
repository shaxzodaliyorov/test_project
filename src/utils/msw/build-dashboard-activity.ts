import type { DashboardActivityByRange, DashboardActivityPoint } from '@/types/dashboard'
import { seriesDaily, seriesRevenueByMonth } from '@/utils/msw/demo-report-series'

const MONTH_UZ = [
  'Yan',
  'Fev',
  'Mar',
  'Apr',
  'May',
  'Iyn',
  'Iyl',
  'Avq',
  'Sen',
  'Okt',
  'Noy',
  'Dek',
] as const

export function buildDashboardActivityFromReportDemoSeries(): DashboardActivityByRange {
  const daily = seriesDaily(45)
  const week: DashboardActivityPoint[] = daily.slice(-7).map((p) => ({
    period: `${p.day.slice(8)}.${p.day.slice(5, 7)}`,
    value: p.orders,
  }))

  const monthly = seriesRevenueByMonth(12)
  const month: DashboardActivityPoint[] = monthly.map((r) => {
    const m = Number.parseInt(r.month.slice(5, 7), 10)
    const label = Number.isFinite(m) && m >= 1 && m <= 12 ? MONTH_UZ[m - 1] : r.month
    return { period: `${label} ${r.month.slice(0, 4)}`, value: r.amount }
  })

  const monthsWide = seriesRevenueByMonth(48)
  const byYear = new Map<string, number>()
  for (const r of monthsWide) {
    const y = r.month.slice(0, 4)
    byYear.set(y, (byYear.get(y) ?? 0) + r.amount)
  }
  const year: DashboardActivityPoint[] = [...byYear.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([period, value]) => ({ period, value }))

  return { week, month, year }
}
