import type { Role } from '@/types/role'

export const ROLE_OPTIONS: { label: string; value: Role }[] = [
  { label: 'Admin', value: 'admin' },
  { label: 'To‘lovlar', value: 'payment' },
  { label: 'Hisobotlar', value: 'reports' },
  { label: 'Foydalanuvchilar', value: 'users' },
]

export const VALID_ROLE_SLUGS = new Set<Role>(ROLE_OPTIONS.map((o) => o.value))
