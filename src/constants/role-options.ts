import type { TFunction } from 'i18next'
import type { Role } from '@/types/role'

const ROLE_ORDER: readonly Role[] = [
  'admin',
  'payment',
  'reports',
  'users',
]

export const VALID_ROLE_SLUGS = new Set<Role>(ROLE_ORDER)

const ROLE_LABEL_KEY: Record<Role, string> = {
  admin: 'users:roleAdmin',
  payment: 'users:rolePayment',
  reports: 'users:roleReports',
  users: 'users:roleUsers',
}

function getRoleSelectOptions(
  t: TFunction,
): { label: string; value: Role }[] {
  return ROLE_ORDER.map((value) => ({
    value,
    label: t(ROLE_LABEL_KEY[value]),
  }))
}

export function getAssignableRoleSelectOptions(
  t: TFunction,
): { label: string; value: Role }[] {
  return getRoleSelectOptions(t).filter((o) => o.value !== 'admin')
}

export const ROLE_OPTIONS_MSW: { label: string; value: Role }[] = [
  { label: 'Admin', value: 'admin' },
  { label: 'Payments', value: 'payment' },
  { label: 'Reports', value: 'reports' },
  { label: 'Users', value: 'users' },
]
