import { PERMISSIONS } from '@/constants/permissions'
import { PATHS } from '@/routes/paths'
import type { User } from '@/types/user'
import { hasPermission } from '@/utils/rbac-utils'

export function postLoginPath(user: User): string {
  if (hasPermission(user, PERMISSIONS.DASHBOARD_READ)) return PATHS.DASHBOARD
  if (hasPermission(user, PERMISSIONS.USERS_READ)) return PATHS.USERS
  if (hasPermission(user, PERMISSIONS.PAYMENTS_READ)) return PATHS.PAYMENTS
  if (hasPermission(user, PERMISSIONS.REPORTS_READ)) return PATHS.REPORTS
  return PATHS.SETTINGS
}
