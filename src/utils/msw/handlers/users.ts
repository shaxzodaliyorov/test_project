import { http, HttpResponse } from 'msw'
import type { DefaultBodyType, HttpResponseResolver, PathParams } from 'msw'
import { PERMISSIONS } from '@/constants/permissions'
import type { Role } from '@/types/role'
import {
  findRowByEmail,
  findRowById,
  insertRow,
  listUsersPaged,
  nextNumericId,
  removeRow,
  rowToUser,
  updateRow,
} from '@/utils/msw/demo-users-store'
import { getUserFromAuthHeader } from '@/utils/msw/handlers/auth'
import { mswLatency } from '@/utils/msw/msw-latency'

function parseIntParam(value: string | null, fallback: number): number {
  const n = Number.parseInt(value ?? '', 10)
  return Number.isFinite(n) ? n : fallback
}

function isRoleArray(v: unknown): v is Role[] {
  return (
    Array.isArray(v) &&
    v.every((x) => x === 'admin' || x === 'user') &&
    v.length > 0
  )
}

function passwordMeetsPolicy(p: string): boolean {
  if (p.length < 8) return false
  if (!/[A-Z]/.test(p)) return false
  const specials = `!@#$%^&*()_+-=[]{};':"|,.<>?/~\``
  return [...p].some((c) => specials.includes(c))
}

async function updateUserFromRequest(
  request: Request,
  params: PathParams,
): Promise<Response> {
  const user = getUserFromAuthHeader(request.headers.get('authorization'))
  if (!user) {
    return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
  if (!user.permissions.includes(PERMISSIONS.USERS_WRITE)) {
    return HttpResponse.json({ message: 'Forbidden' }, { status: 403 })
  }
  const id = String(params.id)
  const existing = findRowById(id)
  if (!existing) {
    return HttpResponse.json({ message: 'Not found' }, { status: 404 })
  }
  const body = (await request.json()) as {
    email?: string
    name?: string
    password?: string
    roles?: unknown
  }
  const patch: Partial<{
    email: string
    name: string
    password: string
    roles: Role[]
  }> = {}
  if (typeof body.email === 'string') {
    const next = body.email.trim()
    if (next && next.toLowerCase() !== existing.email.toLowerCase()) {
      if (findRowByEmail(next)) {
        return HttpResponse.json(
          { message: 'Email already in use' },
          { status: 409 },
        )
      }
      patch.email = next
    }
  }
  if (typeof body.name === 'string') {
    const next = body.name.trim()
    if (next) patch.name = next
  }
  if (typeof body.password === 'string' && body.password.length > 0) {
    if (!passwordMeetsPolicy(body.password)) {
      return HttpResponse.json(
        {
          message:
            'Password must be at least 8 characters with one uppercase and one special character',
        },
        { status: 400 },
      )
    }
    patch.password = body.password
  }
  if (body.roles !== undefined) {
    if (!isRoleArray(body.roles)) {
      return HttpResponse.json(
        { message: 'roles must be a non-empty array of admin|user' },
        { status: 400 },
      )
    }
    patch.roles = body.roles
  }
  if (Object.keys(patch).length === 0) {
    return HttpResponse.json(rowToUser(existing))
  }
  updateRow(id, patch)
  const row = findRowById(id)
  return HttpResponse.json(row ? rowToUser(row) : null)
}

const putOrPatchUser: HttpResponseResolver<
  PathParams<'id'>,
  DefaultBodyType
> = async ({ request, params }) => {
  await mswLatency()
  return updateUserFromRequest(request, params)
}

export const usersHandlers = [
  http.get('/api/users', async ({ request }) => {
    await mswLatency()
    const user = getUserFromAuthHeader(request.headers.get('authorization'))
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    if (!user.permissions.includes(PERMISSIONS.USERS_READ)) {
      return HttpResponse.json({ message: 'Forbidden' }, { status: 403 })
    }
    const url = new URL(request.url)
    const page = Math.max(1, parseIntParam(url.searchParams.get('page'), 1))
    const pageSize = Math.min(
      100,
      Math.max(1, parseIntParam(url.searchParams.get('pageSize'), 10)),
    )
    const search = url.searchParams.get('search') ?? ''
    const { items, total } = listUsersPaged(search, page, pageSize, user.id)
    return HttpResponse.json({ items, total, page, pageSize })
  }),

  http.post('/api/users', async ({ request }) => {
    await mswLatency()
    const user = getUserFromAuthHeader(request.headers.get('authorization'))
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    if (!user.permissions.includes(PERMISSIONS.USERS_WRITE)) {
      return HttpResponse.json({ message: 'Forbidden' }, { status: 403 })
    }
    const body = (await request.json()) as {
      email?: string
      name?: string
      password?: string
      roles?: unknown
    }
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const password =
      typeof body.password === 'string' ? body.password : undefined
    if (!email || !name || !password) {
      return HttpResponse.json(
        { message: 'email, name, and password are required' },
        { status: 400 },
      )
    }
    if (!isRoleArray(body.roles)) {
      return HttpResponse.json(
        { message: 'roles must be a non-empty array of admin|user' },
        { status: 400 },
      )
    }
    if (body.roles.includes('admin')) {
      return HttpResponse.json(
        { message: 'Admin role cannot be assigned to new users' },
        { status: 400 },
      )
    }
    if (!passwordMeetsPolicy(password)) {
      return HttpResponse.json(
        {
          message:
            'Password must be at least 8 characters with one uppercase and one special character',
        },
        { status: 400 },
      )
    }
    if (findRowByEmail(email)) {
      return HttpResponse.json(
        { message: 'Email already in use' },
        { status: 409 },
      )
    }
    const id = nextNumericId()
    insertRow({
      id,
      email,
      name,
      password,
      roles: body.roles,
    })
    const row = findRowById(id)
    return HttpResponse.json(row ? rowToUser(row) : null, { status: 201 })
  }),

  http.put('/api/users/:id', putOrPatchUser),
  http.patch('/api/users/:id', putOrPatchUser),

  http.delete('/api/users/:id', async ({ request, params }) => {
    await mswLatency()
    const user = getUserFromAuthHeader(request.headers.get('authorization'))
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    if (!user.permissions.includes(PERMISSIONS.USERS_WRITE)) {
      return HttpResponse.json({ message: 'Forbidden' }, { status: 403 })
    }
    const id = String(params.id)
    if (id === user.id) {
      return HttpResponse.json(
        { message: 'You cannot delete your own account' },
        { status: 403 },
      )
    }
    if (!findRowById(id)) {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    }
    removeRow(id)
    return new HttpResponse(null, { status: 204 })
  }),
]
