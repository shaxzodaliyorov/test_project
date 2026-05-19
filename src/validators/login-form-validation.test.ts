import type { TFunction } from 'i18next'
import { describe, expect, it } from 'vitest'
import {
  createLoginEmailRules,
  createLoginPasswordRules,
} from '@/validators/login-form-validation'

const tAuthValidation = ((key: string) => {
  const messages: Record<string, string> = {
    'auth:emailRequired': 'Email is required',
    'validation:emailInvalid': 'Invalid email',
  }
  return messages[key] ?? key
}) as TFunction<['auth', 'validation']>

const tAuth = ((key: string) => {
  const messages: Record<string, string> = {
    passwordRequired: 'Password is required',
  }
  return messages[key] ?? key
}) as TFunction<'auth'>

describe('createLoginEmailRules', () => {
  it('requires email with validation message', () => {
    const rules = createLoginEmailRules(tAuthValidation)

    expect(rules).toHaveLength(2)
    expect(rules[0]).toMatchObject({
      required: true,
      message: 'Email is required',
    })
    expect(rules[1]).toMatchObject({
      type: 'email',
      message: 'Invalid email',
    })
  })
})

describe('createLoginPasswordRules', () => {
  it('requires password with validation message', () => {
    const rules = createLoginPasswordRules(tAuth)

    expect(rules).toHaveLength(1)
    expect(rules[0]).toMatchObject({
      required: true,
      message: 'Password is required',
    })
  })
})
