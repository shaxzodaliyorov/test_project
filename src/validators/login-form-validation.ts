import type { TFunction } from 'i18next'
import type { Rule } from 'antd/es/form'

export function createLoginEmailRules(
  t: TFunction<['auth', 'validation']>,
): Rule[] {
  return [
    { required: true, message: t('auth:emailRequired') },
    { type: 'email', message: t('validation:emailInvalid') },
  ]
}

export function createLoginPasswordRules(t: TFunction<'auth'>): Rule[] {
  return [{ required: true, message: t('passwordRequired') }]
}
