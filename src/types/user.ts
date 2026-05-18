import type { CurrencyCode } from '@/constants/currencies'
import type { Permission } from '@/constants/permissions'
import type { UiLocale } from '@/constants/ui-languages'
import type { Role } from '@/types/role'

export type User = {
  id: string
  email: string
  name: string
  roles: Role[]
  permissions: readonly Permission[]
  preferredLocale: UiLocale
  preferredCurrency: CurrencyCode
}
