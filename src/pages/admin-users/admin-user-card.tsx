import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import type { TFunction } from 'i18next'
import { Button, Card, Space, Tag, Typography, theme } from 'antd'
import type { User } from '@/types/user'
import {
  adminUserCardActionButton,
  adminUserCardActions,
  adminUserCardBody,
  adminUserCardHeaderMain,
  adminUserCardHeaderRow,
  adminUserCardIndex,
  adminUserCardRolesLabel,
  adminUserCardStack,
  adminUserCardSubtitle,
  adminUserCardTag,
  adminUserCardTitle,
  adminUserCardWidth,
} from './admin-user-card.styles'

import { ROLE_LABEL_KEY, roleTagColor } from '@/utils/role-display'

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
      style={adminUserCardWidth}
      styles={{ body: adminUserCardBody(token) }}
    >
      <div style={adminUserCardStack(token)}>
        <div style={adminUserCardHeaderRow}>
          <div style={adminUserCardHeaderMain}>
            <Typography.Text strong style={adminUserCardTitle}>
              {user.name}
            </Typography.Text>
            <Typography.Text type="secondary" style={adminUserCardSubtitle}>
              {user.email}
            </Typography.Text>
          </div>
          <Typography.Text type="secondary" style={adminUserCardIndex}>
            #{index}
          </Typography.Text>
        </div>

        <div>
          <Typography.Text type="secondary" style={adminUserCardRolesLabel}>
            {t('users:columnRoles')}
          </Typography.Text>
          <Space size={[4, 4]} wrap>
            {user.roles.length === 0 ? (
              <Tag color="default" style={adminUserCardTag}>
                {t('users:noRoleTag')}
              </Tag>
            ) : (
              user.roles.map((r) => (
                <Tag key={r} color={roleTagColor(r)} style={adminUserCardTag}>
                  {t(ROLE_LABEL_KEY[r])}
                </Tag>
              ))
            )}
          </Space>
        </div>

        {canWrite ? (
          <Space size={8} style={adminUserCardActions}>
            <Button
              type="default"
              size="small"
              icon={<EditOutlined />}
              onClick={onEdit}
              style={adminUserCardActionButton}
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
              style={adminUserCardActionButton}
            >
              {t('users:delete')}
            </Button>
          </Space>
        ) : null}
      </div>
    </Card>
  )
}
