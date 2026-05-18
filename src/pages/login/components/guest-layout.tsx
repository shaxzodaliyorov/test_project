import { Flex } from 'antd'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/hooks/auth-store'
import { PATHS } from '@/routes/paths'
import { guestLayoutShell } from './guest-layout.styles'

export function GuestLayout() {
  const token = useAuthStore((s) => s.token)
  if (token) return <Navigate to={PATHS.DASHBOARD} replace />

  return (
    <Flex vertical style={guestLayoutShell}>
      <Outlet />
    </Flex>
  )
}
