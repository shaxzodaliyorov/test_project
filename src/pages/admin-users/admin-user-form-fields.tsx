import { Checkbox, Form, Input } from 'antd'
import type { UserFormValues } from '@/types/admin-user-form'
import {
  emailRules,
  firstNameRules,
  lastNameRules,
  passwordRulesCreate,
  passwordRulesEdit,
  rolesRules,
} from '@/validators/admin-user-form-validation'

const checkboxGroupStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 8,
}

type AdminUserFormFieldsProps = {
  mode: 'create' | 'edit'
  roleOptions: { label: string; value: string }[]
}

export function AdminUserFormFields({ mode, roleOptions }: AdminUserFormFieldsProps) {
  const optionsForRoles =
    mode === 'create' ? roleOptions.filter((o) => o.value !== 'admin') : roleOptions
  const allowedSlugs = optionsForRoles.map((o) => o.value)
  return (
    <>
      <Form.Item<UserFormValues> name="firstName" label="Ism" rules={firstNameRules}>
        <Input autoComplete="given-name" />
      </Form.Item>
      <Form.Item<UserFormValues> name="lastName" label="Familiya" rules={lastNameRules}>
        <Input autoComplete="family-name" />
      </Form.Item>
      <Form.Item<UserFormValues> name="email" label="Email" rules={emailRules}>
        <Input autoComplete="email" />
      </Form.Item>
      {mode === 'create' ? (
        <Form.Item<UserFormValues> name="password" label="Parol" rules={passwordRulesCreate}>
          <Input.Password autoComplete="new-password" />
        </Form.Item>
      ) : (
        <Form.Item<UserFormValues>
          name="password"
          label="Yangi parol"
          extra="Bo‘sh qoldiring — joriy parol o‘zgarmaydi."
          rules={passwordRulesEdit}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>
      )}
      <Form.Item<UserFormValues>
        name="roles"
        label="Rollar"
        rules={rolesRules(allowedSlugs, mode)}
      >
        <Checkbox.Group options={optionsForRoles} style={checkboxGroupStyle} />
      </Form.Item>
    </>
  )
}
