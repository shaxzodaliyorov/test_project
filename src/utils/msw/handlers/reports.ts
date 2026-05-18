import { http, HttpResponse } from 'msw'
import type {
  ReportCategoryRow,
  ReportDailyPoint,
  ReportHourlyRow,
  ReportMerchantRow,
  ReportMonthlyRow,
  ReportTableSection,
  ReportsOverviewResponse,
  ReportsTableResponse,
} from '@/types/reports'
import { PERMISSIONS } from '@/constants/permissions'
import { getUserFromAuthHeader } from '@/utils/msw/handlers/auth'
import { mswLatency } from '@/utils/msw/msw-latency'
import { seriesDaily, seriesRevenueByMonth } from '@/utils/msw/demo-report-series'

function categoryBreakdown(rows: number): ReportCategoryRow[] {
  const labels = [
    'Electronics',
    'Fashion',
    'Food',
    'Services',
    'Transport',
    'Health',
    'Home',
    'Sports',
    'Books',
    'Music',
    'Games',
    'Finance',
    'Education',
    'B2B',
    'Gov',
  ]
  const out: ReportCategoryRow[] = []
  for (let i = 0; i < rows; i += 1) {
    const amountCents = 250_000 + ((i * 17_311 + 900) % 4_200_000)
    const transactionCount = 12 + ((i * 41) % 800)
    out.push({
      category: `${labels[i % labels.length]} · #${i + 1}`,
      transactionCount,
      amountCents,
      sharePercent: 0,
    })
  }
  const sum = out.reduce((s, r) => s + r.amountCents, 0) || 1
  for (const r of out) {
    r.sharePercent = Math.round((r.amountCents / sum) * 1000) / 10
  }
  return out
}

function topMerchants(rows: number): ReportMerchantRow[] {
  const names = [
    'Acme Cloud',
    'Globex Retail',
    'Initech Billing',
    'Umbrella Labs',
    'Stark Industries EU',
    'Wayne Logistics',
    'Hooli Payments',
    'Soylent Goods',
    'Massive Dynamic',
    'Vehement Capital',
  ]
  return Array.from({ length: rows }, (_, i) => ({
    merchant: `${names[i % names.length]} — region ${(i % 4) + 1}`,
    orders: 80 + ((i * 23) % 1500),
    revenueCents: 900_000 + ((i * 88_777) % 12_000_000),
    refundsCents: ((i * 3111) % 180_000) * 100,
  }))
}

function hourlyBuckets(hours: number): ReportHourlyRow[] {
  const base = new Date(Date.UTC(2025, 4, 18, 0, 0, 0))
  return Array.from({ length: hours }, (_, i) => {
    const d = new Date(base.getTime() + i * 3600 * 1000)
    return {
      hour: d.toISOString(),
      volume: 200 + ((i * 37) % 1800),
      latencyMs: 42 + ((i * 3) % 95),
    }
  })
}

type ReportsBundle = {
  revenueByMonth: ReportMonthlyRow[]
  dailyTrend: ReportDailyPoint[]
  byCategory: ReportCategoryRow[]
  topMerchants: ReportMerchantRow[]
  hourly: ReportHourlyRow[]
  overview: ReportsOverviewResponse
}

function buildReportsBundle(range: string | null): ReportsBundle {
  const monthCount = range === '12m' ? 12 : range === '30d' ? 6 : 18
  const revenueByMonth = seriesRevenueByMonth(monthCount)
  const dailyTrend = range === '30d' ? seriesDaily(62) : seriesDaily(45)
  const byCategory = categoryBreakdown(56)
  const topMerchantsList = topMerchants(42)
  const hourly = hourlyBuckets(48)

  const labels = revenueByMonth.map((r) => r.month)
  const data = revenueByMonth.map((r) => r.amount)
  const netSeries = revenueByMonth.map((r) =>
    Math.round(r.amount * (0.88 + (r.amount % 7) * 0.000_001)),
  )

  const totalGrossCents = dailyTrend.reduce((s, d) => s + d.grossCents, 0)
  const totalOrders = dailyTrend.reduce((s, d) => s + d.orders, 0)

  const overview: ReportsOverviewResponse = {
    summary: {
      totalGrossCents,
      totalNetCents: Math.round(totalGrossCents * 0.89),
      totalOrders,
      avgOrderValueCents: totalOrders ? Math.round(totalGrossCents / totalOrders) : 0,
      periodLabel: range === '12m' ? '12 months' : range === '30d' ? '30 days' : '18 months',
    },
    chart: {
      labels,
      datasets: [
        { label: 'Daromad (brutto)', data },
        { label: 'Daromad (netto)', data: netSeries },
      ],
    },
  }

  return {
    revenueByMonth,
    dailyTrend,
    byCategory,
    topMerchants: topMerchantsList,
    hourly,
    overview,
  }
}

function norm(s: string): string {
  return s.trim().toLowerCase()
}

function includesField(haystack: string, needle: string): boolean {
  if (!needle) return true
  return haystack.toLowerCase().includes(needle)
}

function parsePositiveInt(raw: string | null, fallback: number, max: number): number {
  const n = Number.parseInt(raw ?? '', 10)
  if (Number.isNaN(n) || n < 1) return fallback
  return Math.min(Math.floor(n), max)
}

function filterMonthly(rows: ReportMonthlyRow[], search: string): ReportMonthlyRow[] {
  const q = norm(search)
  if (!q) return rows
  return rows.filter((r) => includesField(r.month, q))
}

function filterDaily(rows: ReportDailyPoint[], search: string): ReportDailyPoint[] {
  const q = norm(search)
  if (!q) return rows
  return rows.filter(
    (r) => includesField(r.day, q) || includesField(String(r.orders), q),
  )
}

function filterCategories(rows: ReportCategoryRow[], search: string): ReportCategoryRow[] {
  const q = norm(search)
  if (!q) return rows
  return rows.filter(
    (r) => includesField(r.category, q) || includesField(String(r.transactionCount), q),
  )
}

function filterMerchants(rows: ReportMerchantRow[], search: string): ReportMerchantRow[] {
  const q = norm(search)
  if (!q) return rows
  return rows.filter(
    (r) => includesField(r.merchant, q) || includesField(String(r.orders), q),
  )
}

function filterHourly(rows: ReportHourlyRow[], search: string): ReportHourlyRow[] {
  const q = norm(search)
  if (!q) return rows
  return rows.filter(
    (r) =>
      includesField(r.hour, q) ||
      includesField(String(r.volume), q) ||
      includesField(String(r.latencyMs), q),
  )
}

const TABLE_SECTIONS: ReportTableSection[] = [
  'monthly',
  'daily',
  'categories',
  'merchants',
  'hourly',
]

function isTableSection(s: string | null): s is ReportTableSection {
  return s !== null && (TABLE_SECTIONS as string[]).includes(s)
}

export const reportsHandlers = [
  http.get('/api/reports', async ({ request }) => {
    await mswLatency()
    const user = getUserFromAuthHeader(request.headers.get('authorization'))
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    if (!user.permissions.includes(PERMISSIONS.REPORTS_READ)) {
      return HttpResponse.json({ message: 'Forbidden' }, { status: 403 })
    }

    const url = new URL(request.url)
    const range = url.searchParams.get('range')
    const part = url.searchParams.get('part') ?? 'overview'

    const bundle = buildReportsBundle(range)

    if (part === 'overview') {
      const body: ReportsOverviewResponse = bundle.overview
      return HttpResponse.json(body)
    }

    if (part === 'table') {
      const sectionRaw = url.searchParams.get('section')
      if (!isTableSection(sectionRaw)) {
        return HttpResponse.json(
          { message: 'Invalid or missing section' },
          { status: 400 },
        )
      }
      const section = sectionRaw

      const pageSize = parsePositiveInt(url.searchParams.get('pageSize'), 10, 100)
      const search = url.searchParams.get('search') ?? ''

      let rows: unknown[] = []
      switch (section) {
        case 'monthly':
          rows = filterMonthly(bundle.revenueByMonth, search)
          break
        case 'daily':
          rows = filterDaily(bundle.dailyTrend, search)
          break
        case 'categories':
          rows = filterCategories(bundle.byCategory, search)
          break
        case 'merchants':
          rows = filterMerchants(bundle.topMerchants, search)
          break
        case 'hourly':
          rows = filterHourly(bundle.hourly, search)
          break
        default:
          break
      }

      const total = rows.length
      const maxPage = Math.max(1, Math.ceil(total / pageSize) || 1)
      const page = Math.min(
        parsePositiveInt(url.searchParams.get('page'), 1, maxPage),
        maxPage,
      )
      const start = (page - 1) * pageSize
      const slice = rows.slice(start, start + pageSize)

      const payload: ReportsTableResponse =
        section === 'monthly'
          ? { section, items: slice as ReportMonthlyRow[], total, page, pageSize }
          : section === 'daily'
            ? { section, items: slice as ReportDailyPoint[], total, page, pageSize }
            : section === 'categories'
              ? { section, items: slice as ReportCategoryRow[], total, page, pageSize }
              : section === 'merchants'
                ? { section, items: slice as ReportMerchantRow[], total, page, pageSize }
                : { section, items: slice as ReportHourlyRow[], total, page, pageSize }

      return HttpResponse.json(payload)
    }

    return HttpResponse.json({ message: 'Invalid part' }, { status: 400 })
  }),
]
