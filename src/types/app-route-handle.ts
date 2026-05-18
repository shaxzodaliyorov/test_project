import type { Permission } from '@/constants/permissions'
import type { Role } from '@/types/role'

export type AppRouteHandle = {
  roles?: Role[]
  permissions?: readonly Permission[]
}
