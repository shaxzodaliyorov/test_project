import type { Permission } from '@/constants/permissions'
import type { Role } from '@/types/role'

export type User = {
  id: string
  email: string
  name: string
  roles: Role[]
  permissions: readonly Permission[]
}
