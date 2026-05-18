import { Descriptions, Typography } from 'antd'
import { useAuthStore } from '@/hooks/auth-store'

export function AccountPage() {
  const user = useAuthStore((s) => s.user)

  return (
    <>
      <Typography.Title level={2}>Account</Typography.Title>
      <Descriptions column={1} bordered size="small">
        <Descriptions.Item label="Name">{user?.name ?? '—'}</Descriptions.Item>
        <Descriptions.Item label="Email">{user?.email ?? '—'}</Descriptions.Item>
        <Descriptions.Item label="Roles">
          {user?.roles?.length ? user.roles.join(', ') : '—'}
        </Descriptions.Item>
      </Descriptions>
    </>
  )
}
