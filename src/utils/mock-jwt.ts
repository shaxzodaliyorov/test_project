import type { User } from '@/types/user'

function base64UrlEncodeJson(obj: unknown): string {
  const json = JSON.stringify(obj)
  const bytes = new TextEncoder().encode(json)
  let binary = ''
  for (const b of bytes) binary += String.fromCharCode(b)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function buildMockJwt(user: User): string {
  const header = base64UrlEncodeJson({ alg: 'HS256', typ: 'JWT' })
  const payload = base64UrlEncodeJson({
    sub: user.id,
    roles: [...user.roles],
    permissions: [...user.permissions],
    iat: Math.floor(Date.now() / 1000),
  })
  const signature = 'mock'
  return `${header}.${payload}.${signature}`
}

export type MockJwtPayload = {
  sub: string
  roles?: string[]
  permissions?: string[]
}

export function parseMockJwtPayload(token: string): MockJwtPayload | null {
  const parts = token.split('.')
  if (parts.length !== 3) return null
  try {
    const b64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const pad = (4 - (b64.length % 4)) % 4
    const json = atob(b64 + '='.repeat(pad))
    const parsed = JSON.parse(json) as Record<string, unknown>
    if (typeof parsed.sub !== 'string') return null
    const roles = Array.isArray(parsed.roles)
      ? parsed.roles.filter((r): r is string => typeof r === 'string')
      : undefined
    const permissions = Array.isArray(parsed.permissions)
      ? parsed.permissions.filter((p): p is string => typeof p === 'string')
      : undefined
    return { sub: parsed.sub, roles, permissions }
  } catch {
    return null
  }
}
