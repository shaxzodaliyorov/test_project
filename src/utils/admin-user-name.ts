import type { UserFormValues } from '@/types/admin-user-form'

export function fullNameFromForm(
  v: Pick<UserFormValues, 'firstName' | 'lastName'>,
): string {
  return `${v.firstName.trim()} ${v.lastName.trim()}`.trim()
}

export function splitStoredName(name: string): {
  firstName: string
  lastName: string
} {
  const t = name.trim()
  const i = t.indexOf(' ')
  if (i === -1) {
    return { firstName: t, lastName: '' }
  }
  return {
    firstName: t.slice(0, i).trim(),
    lastName: t.slice(i + 1).trim(),
  }
}
