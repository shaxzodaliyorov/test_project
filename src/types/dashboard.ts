import type { Role } from '@/types/role'

export type DashboardProfile = {
  id: string
  email: string
  name: string
  roles: Role[]
  permissionCount: number
}

export type DashboardStats = {
  demoUsersTotal: number
  demoPaymentRecords?: number
  demoReportCategories?: number
  demoReportMerchants?: number
  generatedAt: string
}

export type DashboardActivityPoint = {
  period: string
  value: number
}

export type DashboardActivityRange = 'week' | 'month' | 'year'

export type DashboardActivityByRange = {
  week: DashboardActivityPoint[]
  month: DashboardActivityPoint[]
  year: DashboardActivityPoint[]
}

export type DashboardResponse = {
  profile: DashboardProfile
  stats: DashboardStats
  activity: DashboardActivityByRange
}
