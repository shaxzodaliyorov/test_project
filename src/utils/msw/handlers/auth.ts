import { http, HttpResponse } from 'msw'
import { PERMISSIONS } from '@/constants/permissions'
import type { User } from '@/types/user'
import { buildMockJwt, parseMockJwtPayload } from '@/utils/mock-jwt'

const demoUsers: Record<string, { password: string; user: User }> = {
  'admin@test.com': {
    password: 'admin',
    user: {
      id: '1',
      email: 'admin@test.com',
      name: 'Admin',
      roles: ['admin'],
      permissions: [PERMISSIONS.DASHBOARD_READ, PERMISSIONS.USERS_READ],
    },
  },
  'user@test.com': {
    password: 'user',
    user: {
      id: '2',
      email: 'user@test.com',
      name: 'Regular',
      roles: ['user'],
      permissions: [PERMISSIONS.DASHBOARD_READ],
    },
  },
}

export function getUserFromAuthHeader(auth: string | null): User | null {
  if (!auth?.startsWith('Bearer ')) return null
  const raw = auth.slice('Bearer '.length)

  if (raw.startsWith('mock.')) {
    const id = raw.slice('mock.'.length)
    for (const { user } of Object.values(demoUsers)) {
      if (user.id === id) return user
    }
    return null
  }

  const payload = parseMockJwtPayload(raw)
  if (!payload) return null
  for (const { user } of Object.values(demoUsers)) {
    if (user.id === payload.sub) return user
  }
  return null
}

function tokenForUser(user: User): string {
  return buildMockJwt(user)
}

export const authHandlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as { email?: string; password?: string }
    const record = demoUsers[body.email ?? '']
    if (!record || record.password !== body.password) {
      return HttpResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 },
      )
    }
    return HttpResponse.json({
      token: tokenForUser(record.user),
    })
  }),
  http.get('/api/auth/me', ({ request }) => {
    const user = getUserFromAuthHeader(request.headers.get('authorization'))
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    return HttpResponse.json(user)
  }),
]
