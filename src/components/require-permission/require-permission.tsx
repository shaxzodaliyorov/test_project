import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useCanAccess } from '@/hooks/use-can-access'
import { PATHS } from '@/routes/paths'

type RequirePermissionProps = {
  permission: string
  children: ReactNode
  /** When denied; default is forbidden (403). */
  redirectTo?: string
}

export function RequirePermission({
  permission,
  children,
  redirectTo = PATHS.FORBIDDEN,
}: RequirePermissionProps) {
  const allowed = useCanAccess(permission)
  if (!allowed) return <Navigate to={redirectTo} replace />
  return children
}
