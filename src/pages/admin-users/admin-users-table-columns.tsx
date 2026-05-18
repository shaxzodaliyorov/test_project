import type { TFunction } from 'i18next'
import { Button, Space, Tag } from 'antd'
import type { TableProps } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import type { Role } from '@/types/role'
import type { User } from '@/types/user'
import { ROLE_LABEL_KEY, roleTagColor } from '@/utils/role-display'

type BuildAdminUsersColumnsArgs = {
  t: TFunction<['users', 'common']>
  page: number
  pageSize: number
  canWrite: boolean
  currentUserId: string | undefined
  onEdit: (user: User) => void
  onDelete: (user: User) => void
}

export function buildAdminUsersColumns({
  t,
  page,
  pageSize,
  canWrite,
  currentUserId,
  onEdit,
  onDelete,
}: BuildAdminUsersColumnsArgs): TableProps<User>['columns'] {
  return [
    {
      title: t('users:columnIndex'),
      key: 'index',
      width: 56,
      align: 'center' as const,
      render: (_: unknown, __: User, index: number) =>
        (page - 1) * pageSize + index + 1,
    },
    {
      title: t('users:columnName'),
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: t('users:columnEmail'),
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
    },
    {
      title: t('users:columnRoles'),
      dataIndex: 'roles',
      key: 'roles',
      render: (roles: Role[]) => (
        <Space size={[4, 4]} wrap>
          {roles.length === 0 ? (
            <Tag color="default">{t('users:noRoleTag')}</Tag>
          ) : (
            roles.map((r) => (
              <Tag key={r} color={roleTagColor(r)}>
                {t(ROLE_LABEL_KEY[r])}
              </Tag>
            ))
          )}
        </Space>
      ),
    },
    ...(canWrite
      ? [
          {
            title: t('users:columnActions'),
            key: 'actions',
            width: 160,
            fixed: 'right' as const,
            render: (_: unknown, row: User) => (
              <Space size="small">
                <Button
                  type="link"
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => onEdit(row)}
                >
                  {t('users:edit')}
                </Button>
                <Button
                  type="link"
                  size="small"
                  danger
                  disabled={row.id === currentUserId}
                  icon={<DeleteOutlined />}
                  onClick={() => onDelete(row)}
                >
                  {t('users:delete')}
                </Button>
              </Space>
            ),
          },
        ]
      : []),
  ]
}
