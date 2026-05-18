import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import type { TFunction } from 'i18next'
import { Button, Card, Space, Tag, Typography, theme } from 'antd'
import type { Role } from '@/types/role'
import type { User } from '@/types/user'

const ROLE_LABEL_KEY: Record<Role, string> = {
  admin: 'users:roleAdmin',
  payment: 'users:rolePayment',
  reports: 'users:roleReports',
  users: 'users:roleUsers',
}

function roleTagColor(role: Role): string | undefined {
  if (role === 'admin') return 'blue'
  if (role === 'payment') return 'green'
  if (role === 'reports') return 'gold'
  if (role === 'users') return 'purple'
  return undefined
}

type AdminUserCardProps = {
  user: User
  index: number
  canWrite: boolean
  isSelf: boolean
  onEdit: () => void
  onDelete: () => void
  t: TFunction<['users', 'common']>
}

export function AdminUserCard({
  user,
  index,
  canWrite,
  isSelf,
  onEdit,
  onDelete,
  t,
}: AdminUserCardProps) {
  const { token } = theme.useToken()

  return (
    <Card
      size="small"
      variant="outlined"
      style={{ width: '100%' }}
      styles={{
        body: {
          padding: token.paddingSM,
          background: token.colorFillQuaternary,
        },
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: token.marginXS,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 8,
          }}
        >
          <div style={{ minWidth: 0, flex: 1 }}>
            <Typography.Text
              strong
              style={{
                display: 'block',
                fontSize: 14,
                lineHeight: 1.3,
                color: 'var(--text-h)',
              }}
            >
              {user.name}
            </Typography.Text>
            <Typography.Text
              type="secondary"
              style={{
                display: 'block',
                fontSize: 11,
                lineHeight: 1.35,
                marginTop: 2,
                wordBreak: 'break-word',
              }}
            >
              {user.email}
            </Typography.Text>
          </div>
          <Typography.Text
            type="secondary"
            style={{ fontSize: 11, flexShrink: 0 }}
          >
            #{index}
          </Typography.Text>
        </div>

        <div>
          <Typography.Text
            type="secondary"
            style={{ fontSize: 10, display: 'block', marginBottom: 4 }}
          >
            {t('users:columnRoles')}
          </Typography.Text>
          <Space size={[4, 4]} wrap>
            {user.roles.length === 0 ? (
              <Tag color="default" style={{ margin: 0, fontSize: 11 }}>
                {t('users:noRoleTag')}
              </Tag>
            ) : (
              user.roles.map((r) => (
                <Tag
                  key={r}
                  color={roleTagColor(r)}
                  style={{ margin: 0, fontSize: 11 }}
                >
                  {t(ROLE_LABEL_KEY[r])}
                </Tag>
              ))
            )}
          </Space>
        </div>

        {canWrite ? (
          <Space size={8} style={{ marginTop: 4 }}>
            <Button
              type="default"
              size="small"
              icon={<EditOutlined />}
              onClick={onEdit}
              style={{ fontSize: 12 }}
            >
              {t('users:edit')}
            </Button>
            <Button
              type="default"
              size="small"
              danger
              disabled={isSelf}
              icon={<DeleteOutlined />}
              onClick={onDelete}
              style={{ fontSize: 12 }}
            >
              {t('users:delete')}
            </Button>
          </Space>
        ) : null}
      </div>
    </Card>
  )
}
