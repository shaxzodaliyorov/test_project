import { http, HttpResponse } from 'msw'
import type { CurrencyCode } from '@/constants/currencies'
import type { UiLocale } from '@/constants/ui-languages'
import type { User } from '@/types/user'
import {
  findRowById,
  getDemoPasswordRecord,
  rowToUser,
  updateRow,
} from '@/utils/msw/demo-users-store'
import { buildMockJwt, parseMockJwtPayload } from '@/utils/mock-jwt'
import { mswLatency } from '@/utils/msw/msw-latency'

export function getUserFromAuthHeader(auth: string | null): User | null {
  if (!auth?.startsWith('Bearer ')) return null
  const raw = auth.slice('Bearer '.length)

  if (raw.startsWith('mock.')) {
    const id = raw.slice('mock.'.length)
    const row = findRowById(id)
    return row ? rowToUser(row) : null
  }

  const payload = parseMockJwtPayload(raw)
  if (!payload) return null
  const row = findRowById(payload.sub)
  return row ? rowToUser(row) : null
}

function tokenForUser(user: User): string {
  return buildMockJwt(user)
}

export const authHandlers = [
  http.post('/api/auth/login', async ({ request }) => {
    await mswLatency()
    const body = (await request.json()) as { email?: string; password?: string }
    const record = getDemoPasswordRecord(body.email ?? '')
    if (!record || record.password !== body.password) {
      return HttpResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 },
      )
    }
    return HttpResponse.json({
      token: tokenForUser(record.user),
      user: record.user,
    })
  }),
  http.get('/api/auth/me', async ({ request }) => {
    await mswLatency()
    const user = getUserFromAuthHeader(request.headers.get('authorization'))
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    return HttpResponse.json(user)
  }),
  http.patch('/api/auth/me/preferences', async ({ request }) => {
    await mswLatency()
    const user = getUserFromAuthHeader(request.headers.get('authorization'))
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    const body = (await request.json()) as {
      preferredCurrency?: unknown
      preferredLocale?: unknown
    }
    const patch: {
      preferredCurrency?: CurrencyCode
      preferredLocale?: UiLocale
    } = {}
    if (typeof body.preferredCurrency === 'string') {
      if (body.preferredCurrency === 'UZS' || body.preferredCurrency === 'USD' || body.preferredCurrency === 'RUB') {
        patch.preferredCurrency = body.preferredCurrency
      }
    }
    if (typeof body.preferredLocale === 'string') {
      if (body.preferredLocale === 'uz' || body.preferredLocale === 'ru' || body.preferredLocale === 'en') {
        patch.preferredLocale = body.preferredLocale
      }
    }
    if (!patch.preferredCurrency && !patch.preferredLocale) {
      return HttpResponse.json(
        { message: 'No valid preferredCurrency or preferredLocale' },
        { status: 400 },
      )
    }
    updateRow(user.id, patch)
    const row = findRowById(user.id)
    return HttpResponse.json(row ? rowToUser(row) : user)
  }),
]
