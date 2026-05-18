import { Navigate, Outlet, useMatches } from 'react-router-dom'
import { AppShellSkeleton } from '@/components/skeletons/app-shell-skeleton'
import { useAuthStore } from '@/hooks/auth-store'
import { useAuthSession } from '@/hooks/use-auth-session'
import { useCompactLayout } from '@/hooks/use-compact-layout'
import { PATHS } from '@/routes/paths'
import type { AppRouteHandle } from '@/types/app-route-handle'
import type { User } from '@/types/user'
import type { Role } from '@/types/role'
import type { Permission } from '@/constants/permissions'
import { hasPermission } from '@/utils/rbac-utils'

function userHasRequiredRole(user: User | null, required?: Role[]): boolean {
  if (!required?.length) return true
  if (!user?.roles?.length) return false
  return required.some((r) => user.roles.includes(r))
}

function userHasAllPermissions(
  user: User | null,
  required?: readonly Permission[],
): boolean {
  if (!required?.length) return true
  if (!user) return false
  return required.every((p) => hasPermission(user, p))
}

export function ProtectedRoute() {
  const token = useAuthStore((s) => s.token)
  const user = useAuthStore((s) => s.user)
  const me = useAuthSession()
  const matches = useMatches()
  const isCompact = useCompactLayout()

  if (!token) {
    return <Navigate to={PATHS.LOGIN} replace />
  }

  const sessionUser = user ?? me.data ?? null

  if (me.isPending && !sessionUser) {
    return <AppShellSkeleton compact={isCompact} />
  }

  if (me.isError) {
    return <Navigate to={PATHS.LOGIN} replace />
  }

  const leaf = matches[matches.length - 1]
  const handle = leaf?.handle as AppRouteHandle | undefined
  const requiredPermissions = handle?.permissions
  const requiredRoles = handle?.roles

  if (!userHasAllPermissions(sessionUser, requiredPermissions)) {
    return <Navigate to={PATHS.FORBIDDEN} replace />
  }

  if (!userHasRequiredRole(sessionUser, requiredRoles)) {
    return <Navigate to={PATHS.FORBIDDEN} replace />
  }

  return <Outlet />
}
