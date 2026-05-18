import type { Role } from '@/types/role'

export type UserFormValues = {
  firstName: string
  lastName: string
  email: string
  password?: string
  roles: Role[]
}
