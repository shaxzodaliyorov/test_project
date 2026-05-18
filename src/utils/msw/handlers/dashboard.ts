import { http, HttpResponse } from 'msw'
import { API_ERROR_KEYS } from '@/constants/api-error-keys'
import type { DashboardResponse } from '@/types/dashboard'
import { PERMISSIONS } from '@/constants/permissions'
import { getDemoRowsCount } from '@/utils/msw/demo-users-store'
import { buildDashboardActivityFromReportDemoSeries } from '@/utils/msw/build-dashboard-activity'
import { getUserFromAuthHeader } from '@/utils/msw/handlers/auth'
import { mswLatency } from '@/utils/msw/msw-latency'

/** Mock hisobotlar bilan mos raqamlar (reports MSW generatorlari). */
const MOCK_PAYMENT_RECORDS = 88
const MOCK_REPORT_CATEGORIES = 56
const MOCK_REPORT_MERCHANTS = 42

export const dashboardHandlers = [
  http.get('/api/dashboard', async ({ request }) => {
    await mswLatency()
    const user = getUserFromAuthHeader(request.headers.get('authorization'))
    if (!user) {
      return HttpResponse.json({ errorKey: API_ERROR_KEYS.HTTP_UNAUTHORIZED }, { status: 401 })
    }
    if (!user.permissions.includes(PERMISSIONS.DASHBOARD_READ)) {
      return HttpResponse.json({ errorKey: API_ERROR_KEYS.HTTP_FORBIDDEN }, { status: 403 })
    }

    const stats: DashboardResponse['stats'] = {
      demoUsersTotal: getDemoRowsCount(),
      generatedAt: new Date().toISOString(),
    }
    if (user.permissions.includes(PERMISSIONS.PAYMENTS_READ)) {
      stats.demoPaymentRecords = MOCK_PAYMENT_RECORDS
    }
    if (user.permissions.includes(PERMISSIONS.REPORTS_READ)) {
      stats.demoReportCategories = MOCK_REPORT_CATEGORIES
      stats.demoReportMerchants = MOCK_REPORT_MERCHANTS
    }

    const body: DashboardResponse = {
      profile: {
        id: user.id,
        email: user.email,
        name: user.name,
        roles: [...user.roles],
        permissionCount: user.permissions.length,
      },
      stats,
      activity: buildDashboardActivityFromReportDemoSeries(),
    }
    return HttpResponse.json(body)
  }),
]
