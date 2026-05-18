import { Checkbox, Form, Input } from 'antd'
import type { Rule } from 'antd/es/form'
import { ROLE_OPTIONS } from '@/constants/role-options'
import type { UserFormValues } from './admin-user-form-types'

const rolesRules: Rule[] = [
  { required: true, message: 'Select at least one role' },
  {
    validator: (_: unknown, v: unknown) =>
      Array.isArray(v) && v.length > 0
        ? Promise.resolve()
        : Promise.reject(new Error('Select at least one role')),
  },
]

const checkboxGroupStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 8,
}

type AdminUserFormFieldsProps = {
  mode: 'create' | 'edit'
}

export function AdminUserFormFields({ mode }: AdminUserFormFieldsProps) {
  return (
    <>
      <Form.Item<UserFormValues>
        name="name"
        label="Name"
        rules={[
          { required: true, message: 'Enter a name' },
          { min: 2, message: 'At least 2 characters' },
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item<UserFormValues>
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Enter an email' },
          { type: 'email', message: 'Invalid email' },
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>
      {mode === 'create' ? (
        <Form.Item<UserFormValues>
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Enter a password' },
            { min: 6, message: 'At least 6 characters' },
          ]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>
      ) : (
        <Form.Item<UserFormValues>
          name="password"
          label="New password"
          extra="Leave blank to keep the current password."
          rules={[
            {
              validator: (_: unknown, v: unknown) => {
                const s = typeof v === 'string' ? v : ''
                if (s.length > 0 && s.length < 6) {
                  return Promise.reject(new Error('At least 6 characters'))
                }
                return Promise.resolve()
              },
            },
          ]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>
      )}
      <Form.Item<UserFormValues> name="roles" label="Roles" rules={rolesRules}>
        <Checkbox.Group options={ROLE_OPTIONS} style={checkboxGroupStyle} />
      </Form.Item>
    </>
  )
}
