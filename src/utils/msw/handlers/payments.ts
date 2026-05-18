import { http, HttpResponse } from 'msw'
import { getUserFromAuthHeader } from '@/utils/msw/handlers/auth'
import { mswLatency } from '@/utils/msw/msw-latency'

export type MockPayment = {
  id: string
  amountCents: number
  currency: string
  status: 'pending' | 'paid' | 'failed'
  description: string
  createdAt: string
}

function parseIntParam(value: string | null, fallback: number): number {
  const n = Number.parseInt(value ?? '', 10)
  return Number.isFinite(n) ? n : fallback
}

const STATUSES: MockPayment['status'][] = ['pending', 'paid', 'failed']

function buildPayments(): MockPayment[] {
  const out: MockPayment[] = []
  for (let i = 0; i < 55; i += 1) {
    const status = STATUSES[i % STATUSES.length]
    const amountCents = 5000 + (i * 137) % 250000
    out.push({
      id: `pay-${String(i + 1).padStart(4, '0')}`,
      amountCents,
      currency: 'USD',
      status,
      description: `Mock charge #${i + 1} — ${status}`,
      createdAt: new Date(Date.UTC(2025, (i % 12) + 1, (i % 27) + 1)).toISOString(),
    })
  }
  return out
}

const ALL_PAYMENTS = buildPayments()

export const paymentsHandlers = [
  http.get('/api/payments', async ({ request }) => {
    await mswLatency()
    const user = getUserFromAuthHeader(request.headers.get('authorization'))
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    const url = new URL(request.url)
    const page = Math.max(1, parseIntParam(url.searchParams.get('page'), 1))
    const pageSize = Math.min(
      100,
      Math.max(1, parseIntParam(url.searchParams.get('pageSize'), 10)),
    )
    const statusFilter = url.searchParams.get('status')?.trim().toLowerCase()
    const q = (url.searchParams.get('search') ?? url.searchParams.get('q') ?? '')
      .trim()
      .toLowerCase()

    let filtered = [...ALL_PAYMENTS]
    if (statusFilter && STATUSES.includes(statusFilter as MockPayment['status'])) {
      filtered = filtered.filter((p) => p.status === statusFilter)
    }
    if (q) {
      filtered = filtered.filter(
        (p) =>
          p.id.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      )
    }
    const total = filtered.length
    const start = Math.max(0, (page - 1) * pageSize)
    const items = filtered.slice(start, start + pageSize)
    return HttpResponse.json({ items, total, page, pageSize })
  }),
]
