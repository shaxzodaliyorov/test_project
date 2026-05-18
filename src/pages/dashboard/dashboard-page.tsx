import { Spin, Typography } from 'antd'
import { useAuthStore } from '@/hooks/auth-store'
import { useAuthSession } from '@/hooks/use-auth-session'

export function DashboardPage() {
  const user = useAuthStore((s) => s.user)
  const me = useAuthSession()

  if (me.isLoading) {
    return <Spin size="large" />
  }

  return (
    <>
      <Typography.Title level={2}>Dashboard</Typography.Title>
      <Typography.Paragraph>Welcome, {user?.name}</Typography.Paragraph>
    </>
  )
}
