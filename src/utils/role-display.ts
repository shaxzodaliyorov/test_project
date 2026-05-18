import type { Role } from '@/types/role'

export const ROLE_LABEL_KEY: Record<Role, string> = {
  admin: 'users:roleAdmin',
  payment: 'users:rolePayment',
  reports: 'users:roleReports',
  users: 'users:roleUsers',
}

export function roleTagColor(role: Role): string | undefined {
  if (role === 'admin') return 'blue'
  if (role === 'payment') return 'green'
  if (role === 'reports') return 'gold'
  if (role === 'users') return 'purple'
  return undefined
}
