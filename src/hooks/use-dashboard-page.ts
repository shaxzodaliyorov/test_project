import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { theme } from 'antd'
import { useAuthSession } from '@/hooks/use-auth-session'
import { useDashboard } from '@/hooks/use-dashboard'
import type { DashboardResponse } from '@/types/dashboard'

export type DashboardStatIcon =
  | 'users'
  | 'payments'
  | 'categories'
  | 'merchants'

export type DashboardStatTileConfig = {
  key: string
  title: string
  value: number
  icon: DashboardStatIcon
  iconColor: string
}

function buildStatTiles(
  stats: DashboardResponse['stats'],
  t: (key: string) => string,
  token: ReturnType<typeof theme.useToken>['token'],
): DashboardStatTileConfig[] {
  const tiles: DashboardStatTileConfig[] = [
    {
      key: 'users',
      title: t('dashboard:statDemoUsers'),
      value: stats.demoUsersTotal,
      icon: 'users',
      iconColor: token.colorPrimary,
    },
  ]
  if (stats.demoPaymentRecords != null) {
    tiles.push({
      key: 'payments',
      title: t('dashboard:statPayments'),
      value: stats.demoPaymentRecords,
      icon: 'payments',
      iconColor: token.colorInfo,
    })
  }
  if (stats.demoReportCategories != null) {
    tiles.push({
      key: 'categories',
      title: t('dashboard:statReportCats'),
      value: stats.demoReportCategories,
      icon: 'categories',
      iconColor: token.colorSuccess,
    })
  }
  if (stats.demoReportMerchants != null) {
    tiles.push({
      key: 'merchants',
      title: t('dashboard:statReportMerchants'),
      value: stats.demoReportMerchants,
      icon: 'merchants',
      iconColor: token.colorWarning,
    })
  }
  return tiles
}

export function useDashboardPage() {
  const { t } = useTranslation(['dashboard', 'common'])
  const { token } = theme.useToken()
  const me = useAuthSession()
  const dashboard = useDashboard()

  const errorDescription =
    dashboard.error instanceof Error
      ? dashboard.error.message
      : String(dashboard.error ?? t('common:unknownError'))

  const statTiles = useMemo(
    () =>
      dashboard.data
        ? buildStatTiles(dashboard.data.stats, t, token)
        : [],
    [dashboard.data, t, token],
  )

  return {
    me,
    dashboard,
    errorDescription,
    statTiles,
  }
}
