export const PERMISSIONS = {
  DASHBOARD_READ: 'dashboard:read',
  USERS_READ: 'users:read',
  USERS_WRITE: 'users:write',
  PAYMENTS_READ: 'payments:read',
  REPORTS_READ: 'reports:read',
} as const

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]
