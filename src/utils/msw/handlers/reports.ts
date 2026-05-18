import { http, HttpResponse } from 'msw'
import { getUserFromAuthHeader } from '@/utils/msw/handlers/auth'
import { mswLatency } from '@/utils/msw/msw-latency'

function seriesForRange(range: string | null): { month: string; amount: number }[] {
  if (range === '30d') {
    return Array.from({ length: 30 }, (_, i) => ({
      month: `day-${i + 1}`,
      amount: 400 + ((i * 97) % 1200),
    }))
  }
  const n = range === '12m' ? 12 : 6
  return Array.from({ length: n }, (_, i) => ({
    month: `2025-${String((i % 12) + 1).padStart(2, '0')}`,
    amount: 12000 + ((i * 1847 + 300) % 9000),
  }))
}

export const reportsHandlers = [
  http.get('/api/reports', async ({ request }) => {
    await mswLatency()
    const user = getUserFromAuthHeader(request.headers.get('authorization'))
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    const url = new URL(request.url)
    const range = url.searchParams.get('range')
    const revenueByMonth = seriesForRange(range)
    const labels = revenueByMonth.map((r) => r.month)
    const data = revenueByMonth.map((r) => r.amount)
    return HttpResponse.json({
      revenueByMonth,
      chart: {
        labels,
        datasets: [{ label: 'Revenue (mock)', data }],
      },
    })
  }),
]
