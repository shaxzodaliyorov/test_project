import type { Rule } from 'antd/es/form'

/** Faqat harflar (lotin, kirill va h.k., Unicode harflar). */
const LETTERS_ONLY = /^[\p{L}]+$/u

const NAME_LEN = { min: 2, max: 50 } as const

export const firstNameRules: Rule[] = [
  { required: true, message: 'Ism majburiy' },
  { min: NAME_LEN.min, max: NAME_LEN.max, message: '2–50 belgi bo‘lishi kerak' },
  {
    pattern: LETTERS_ONLY,
    message: 'Faqat harflar',
  },
]

export const lastNameRules: Rule[] = [
  { required: true, message: 'Familiya majburiy' },
  { min: NAME_LEN.min, max: NAME_LEN.max, message: '2–50 belgi bo‘lishi kerak' },
  {
    pattern: LETTERS_ONLY,
    message: 'Faqat harflar',
  },
]

export const emailRules: Rule[] = [
  { required: true, message: 'Email majburiy' },
  { type: 'email', message: 'Standart email (user@domain.com)' },
]

const SPECIALS = '!@#$%^&*()_+-=[]{};\':"|,.<>?/~`'

function hasSpecialChar(s: string): boolean {
  return [...s].some((ch) => SPECIALS.includes(ch))
}

function validatePasswordValue(s: string): string | null {
  if (s.length < 8) return 'Minimum 8 belgi'
  if (!/[A-Z]/.test(s)) return 'Kamida 1 ta katta harf (A–Z)'
  if (!hasSpecialChar(s)) return 'Kamida 1 ta maxsus belgi (!@# va boshqalar)'
  return null
}

export const passwordRulesCreate: Rule[] = [
  { required: true, message: 'Parol majburiy' },
  {
    validator: (_: unknown, v: unknown) => {
      const s = typeof v === 'string' ? v : ''
      const err = validatePasswordValue(s)
      return err ? Promise.reject(new Error(err)) : Promise.resolve()
    },
  },
]

export const passwordRulesEdit: Rule[] = [
  {
    validator: (_: unknown, v: unknown) => {
      const s = typeof v === 'string' ? v : ''
      if (!s.trim()) return Promise.resolve()
      const err = validatePasswordValue(s)
      return err ? Promise.reject(new Error(err)) : Promise.resolve()
    },
  },
]

export function rolesRules(
  allowedRoleValues: readonly string[],
  mode: 'create' | 'edit',
): Rule[] {
  const allow = new Set(allowedRoleValues)
  return [
    {
      validator: (_: unknown, v: unknown) => {
        if (!Array.isArray(v) || v.length === 0) {
          return Promise.reject(new Error('Kamida bitta rol tanlang'))
        }
        if (!(v as string[]).every((x) => allow.has(x))) {
          return Promise.reject(new Error('Mavjud bo‘lmagan rol tanlangan'))
        }
        if (mode === 'create' && (v as string[]).includes('admin')) {
          return Promise.reject(
            new Error('Yangi foydalanuvchiga Admin roli berib bo‘lmaydi'),
          )
        }
        return Promise.resolve()
      },
    },
  ]
}
