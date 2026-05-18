export const PERMISSIONS = {
  DASHBOARD_READ: 'dashboard:read',
  USERS_READ: 'users:read',
} as const

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]
