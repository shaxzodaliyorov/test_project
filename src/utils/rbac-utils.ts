import type { User } from '@/types/user'

export function hasPermission(user: User | null, permission: string): boolean {
  if (!user) return false
  return user.permissions.includes(permission as User['permissions'][number])
}
