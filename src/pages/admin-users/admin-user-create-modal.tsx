import { Form, Modal } from 'antd'
import type { FormInstance } from 'antd/es/form'
import { AdminUserFormFields } from './admin-user-form-fields'
import type { UserFormValues } from '@/types/admin-user-form'

export type AdminUserCreateModalProps = {
  open: boolean
  form: FormInstance<UserFormValues>
  confirmLoading: boolean
  onCancel: () => void
  onSubmit: () => void
}

export function AdminUserCreateModal({
  open,
  form,
  confirmLoading,
  onCancel,
  onSubmit,
}: AdminUserCreateModalProps) {
  return (
    <Modal
      title="New user"
      open={open}
      onCancel={onCancel}
      okText="Create"
      confirmLoading={confirmLoading}
      onOk={() => void onSubmit()}
      destroyOnHidden
      width={480}
    >
      <Form<UserFormValues> form={form} layout="vertical" requiredMark>
        <AdminUserFormFields mode="create" />
      </Form>
    </Modal>
  )
}
