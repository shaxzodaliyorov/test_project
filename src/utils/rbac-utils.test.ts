import { describe, expect, it } from 'vitest'
import { PERMISSIONS } from '@/constants/permissions'
import type { User } from '@/types/user'
import { hasPermission } from '@/utils/rbac-utils'

const demoUser: User = {
  id: '1',
  email: 'admin@test.com',
  name: 'Admin Demo',
  roles: ['admin'],
  permissions: [PERMISSIONS.DASHBOARD_READ, PERMISSIONS.USERS_READ],
  preferredLocale: 'en',
  preferredCurrency: 'USD',
}

describe('hasPermission', () => {
  it('returns false when user is null', () => {
    expect(hasPermission(null, PERMISSIONS.DASHBOARD_READ)).toBe(false)
  })

  it('returns true when user has the permission', () => {
    expect(hasPermission(demoUser, PERMISSIONS.DASHBOARD_READ)).toBe(true)
  })

  it('returns false when user lacks the permission', () => {
    expect(hasPermission(demoUser, PERMISSIONS.REPORTS_READ)).toBe(false)
  })
})
