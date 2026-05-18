import type { TFunction } from 'i18next'
import type { Rule } from 'antd/es/form'

const LETTERS_ONLY = /^[\p{L}]+$/u

const NAME_LEN = { min: 2, max: 50 } as const

export function createFirstNameRules(t: TFunction): Rule[] {
  return [
    { required: true, message: t('validation:firstNameRequired') },
    {
      min: NAME_LEN.min,
      max: NAME_LEN.max,
      message: t('validation:nameLength', {
        min: NAME_LEN.min,
        max: NAME_LEN.max,
      }),
    },
    {
      pattern: LETTERS_ONLY,
      message: t('validation:lettersOnly'),
    },
  ]
}

export function createLastNameRules(t: TFunction): Rule[] {
  return [
    { required: true, message: t('validation:lastNameRequired') },
    {
      min: NAME_LEN.min,
      max: NAME_LEN.max,
      message: t('validation:nameLength', {
        min: NAME_LEN.min,
        max: NAME_LEN.max,
      }),
    },
    {
      pattern: LETTERS_ONLY,
      message: t('validation:lettersOnly'),
    },
  ]
}

export function createEmailRules(t: TFunction): Rule[] {
  return [
    { required: true, message: t('validation:emailRequired') },
    { type: 'email', message: t('validation:emailInvalid') },
  ]
}

const SPECIALS = '!@#$%^&*()_+-=[]{};\':"|,.<>?/~`'

function hasSpecialChar(s: string): boolean {
  return [...s].some((ch) => SPECIALS.includes(ch))
}

function validatePasswordValue(s: string, t: TFunction): string | null {
  if (s.length < 8) return t('validation:passwordMin')
  if (!/[A-Z]/.test(s)) return t('validation:passwordUpper')
  if (!hasSpecialChar(s)) return t('validation:passwordSpecial')
  return null
}

export function createPasswordRulesCreate(t: TFunction): Rule[] {
  return [
    { required: true, message: t('validation:passwordRequired') },
    {
      validator: (_: unknown, v: unknown) => {
        const s = typeof v === 'string' ? v : ''
        const err = validatePasswordValue(s, t)
        return err ? Promise.reject(new Error(err)) : Promise.resolve()
      },
    },
  ]
}

export function createPasswordRulesEdit(t: TFunction): Rule[] {
  return [
    {
      validator: (_: unknown, v: unknown) => {
        const s = typeof v === 'string' ? v : ''
        if (!s.trim()) return Promise.resolve()
        const err = validatePasswordValue(s, t)
        return err ? Promise.reject(new Error(err)) : Promise.resolve()
      },
    },
  ]
}

export function createRolesRules(
  t: TFunction,
  allowedRoleValues: readonly string[],
  mode: 'create' | 'edit',
): Rule[] {
  const allow = new Set(allowedRoleValues)
  return [
    {
      validator: (_: unknown, v: unknown) => {
        if (!Array.isArray(v) || v.length === 0) {
          return Promise.reject(new Error(t('validation:rolesMin')))
        }
        if (!(v as string[]).every((x) => allow.has(x))) {
          return Promise.reject(new Error(t('validation:rolesInvalid')))
        }
        if ((v as string[]).includes('admin')) {
          return Promise.reject(
            new Error(
              mode === 'create'
                ? t('validation:rolesNoAdminCreate')
                : t('validation:rolesNoAdminEdit'),
            ),
          )
        }
        return Promise.resolve()
      },
    },
  ]
}
