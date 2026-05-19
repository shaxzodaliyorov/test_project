import type { Permission } from '@/constants/permissions'
import type { Role } from '@/types/role'

export type AppRouteHandle = {
  roles?: Role[]
  permissions?: readonly Permission[]
  /** i18n key for `document.title` (e.g. `nav:dashboard`). */
  documentTitleKey?: string
}
