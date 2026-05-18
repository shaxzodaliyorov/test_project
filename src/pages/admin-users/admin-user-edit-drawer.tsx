import { Button, Drawer, Form, Space } from 'antd'
import type { FormInstance } from 'antd/es/form'
import { AdminUserFormFields } from './admin-user-form-fields'
import type { UserFormValues } from './admin-user-form-types'
import type { User } from '@/types/user'

export type AdminUserEditDrawerProps = {
  user: User | null
  form: FormInstance<UserFormValues>
  loading: boolean
  onClose: () => void
  onSubmit: () => void
}

export function AdminUserEditDrawer({
  user,
  form,
  loading,
  onClose,
  onSubmit,
}: AdminUserEditDrawerProps) {
  return (
    <Drawer
      title="Edit user"
      width={420}
      open={Boolean(user)}
      onClose={onClose}
      destroyOnHidden
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" loading={loading} onClick={() => void onSubmit()}>
            Save
          </Button>
        </Space>
      }
    >
      <Form<UserFormValues> form={form} layout="vertical" requiredMark>
        <AdminUserFormFields mode="edit" />
      </Form>
    </Drawer>
  )
}
