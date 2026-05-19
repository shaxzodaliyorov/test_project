import { Flex } from 'antd'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/hooks/auth-store'
import { useCompactLayout } from '@/hooks/use-compact-layout'
import { PATHS } from '@/routes/paths'
import { postLoginPath } from '@/utils/post-login-path'
import { guestLayoutShell } from './guest-layout.styles'

export function GuestLayout() {
  const isCompact = useCompactLayout()
  const token = useAuthStore((s) => s.token)
  const user = useAuthStore((s) => s.user)
  if (token && user) return <Navigate to={postLoginPath(user)} replace />
  if (token) return <Navigate to={PATHS.DASHBOARD} replace />

  return (
    <Flex vertical style={guestLayoutShell(isCompact)}>
      <Outlet />
    </Flex>
  )
}
