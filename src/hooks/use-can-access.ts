import { useAuthStore } from '@/hooks/auth-store'
import { hasPermission } from '@/utils/rbac-utils'

export function useCanAccess(permission: string): boolean {
  const user = useAuthStore((s) => s.user)
  return hasPermission(user, permission)
}
