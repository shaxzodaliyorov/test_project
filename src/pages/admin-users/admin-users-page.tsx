import { useQuery } from '@tanstack/react-query'
import { Table, Typography } from 'antd'
import { apiGet } from '@/utils/http-client'

type UserRow = { id: string; email: string; name: string }

export function AdminUsersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => apiGet<UserRow[]>('/api/users'),
  })

  return (
    <>
      <Typography.Title level={2}>Users</Typography.Title>
      <Table<UserRow>
        rowKey="id"
        loading={isLoading}
        dataSource={data}
        columns={[
          { title: 'Name', dataIndex: 'name' },
          { title: 'Email', dataIndex: 'email' },
        ]}
      />
    </>
  )
}
