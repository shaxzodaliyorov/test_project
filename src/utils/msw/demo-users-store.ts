import { PERMISSIONS } from '@/constants/permissions'
import type { Permission } from '@/constants/permissions'
import type { Role } from '@/types/role'
import type { User } from '@/types/user'

export type DemoRow = {
  id: string
  email: string
  name: string
  password: string
  roles: Role[]
}

function permissionsForRoles(roles: Role[]): readonly Permission[] {
  if (!roles?.length) return []
  const set = new Set<Permission>()
  if (roles.includes('admin')) {
    for (const p of Object.values(PERMISSIONS)) {
      set.add(p)
    }
    return [...set] as readonly Permission[]
  }
  const usersOnly = roles.length === 1 && roles[0] === 'users'
  if (!usersOnly) {
    set.add(PERMISSIONS.DASHBOARD_READ)
  }
  for (const r of roles) {
    if (r === 'users') {
      set.add(PERMISSIONS.USERS_READ)
      set.add(PERMISSIONS.USERS_WRITE)
    }
    if (r === 'payment') set.add(PERMISSIONS.PAYMENTS_READ)
    if (r === 'reports') set.add(PERMISSIONS.REPORTS_READ)
  }
  return [...set] as readonly Permission[]
}

export function rowToUser(row: DemoRow): User {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    roles: row.roles,
    permissions: permissionsForRoles(row.roles),
  }
}

const rows: DemoRow[] = [
  {
    id: '1',
    email: 'admin@test.com',
    name: 'Admin Demo',
    password: 'Admin@123',
    roles: ['admin', 'payment', 'reports'],
  },
  {
    id: '2',
    email: 'user@test.com',
    name: 'No-role User',
    password: 'User@1234',
    roles: [],
  },
  {
    id: '3',
    email: 'payment@test.com',
    name: 'Payment User',
    password: 'Payment@1',
    roles: ['payment'],
  },
  {
    id: '4',
    email: 'reports@test.com',
    name: 'Reports User',
    password: 'Reports@1',
    roles: ['reports'],
  },
  {
    id: '5',
    email: 'usersonly@test.com',
    name: 'Users Only',
    password: 'Users@123',
    roles: ['users'],
  },
]

export function findRowById(id: string): DemoRow | undefined {
  return rows.find((r) => r.id === id)
}

export function findRowByEmail(email: string): DemoRow | undefined {
  const q = email.trim().toLowerCase()
  return rows.find((r) => r.email.toLowerCase() === q)
}

export function getDemoPasswordRecord(email: string) {
  const row = findRowByEmail(email)
  if (!row) return undefined
  return { password: row.password, user: rowToUser(row) }
}

export function listUsersPaged(
  search: string,
  page: number,
  pageSize: number,
  excludeUserId?: string,
): { items: User[]; total: number } {
  const q = search.trim().toLowerCase()
  let filtered = q
    ? rows.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q),
      )
    : [...rows]
  if (excludeUserId) {
    filtered = filtered.filter((r) => r.id !== excludeUserId)
  }
  const total = filtered.length
  const start = Math.max(0, (page - 1) * pageSize)
  const slice = filtered.slice(start, start + pageSize).map(rowToUser)
  return { items: slice, total }
}

export function insertRow(row: DemoRow): void {
  rows.push(row)
}

export function updateRow(
  id: string,
  patch: Partial<Pick<DemoRow, 'email' | 'name' | 'password' | 'roles'>>,
): boolean {
  const i = rows.findIndex((r) => r.id === id)
  if (i === -1) return false
  rows[i] = { ...rows[i], ...patch }
  return true
}

export function removeRow(id: string): boolean {
  const i = rows.findIndex((r) => r.id === id)
  if (i === -1) return false
  rows.splice(i, 1)
  return true
}

export function nextNumericId(): string {
  const max = rows.reduce((m, r) => {
    const n = Number.parseInt(r.id, 10)
    return Number.isFinite(n) ? Math.max(m, n) : m
  }, 0)
  return String(max + 1)
}
