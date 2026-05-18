import type { Role } from '@/types/role'

export type UserFormValues = {
  name: string
  email: string
  password?: string
  roles: Role[]
}
