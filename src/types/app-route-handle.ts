import type { Permission } from '@/constants/permissions'
import type { Role } from '@/types/role'

export type AppRouteHandle = {
  /** @deprecated Marshrutlar uchun `permissions` ishlating */
  roles?: Role[]
  /** Foydalanuvchida barcha ko‘rsatilgan ruxsatlar bo‘lishi kerak */
  permissions?: readonly Permission[]
}
