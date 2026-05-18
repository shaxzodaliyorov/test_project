import {
  BarChartOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { PERMISSIONS } from '@/constants/permissions'
import { useCanAccess } from '@/hooks/use-can-access'
import { PATHS } from '@/routes/paths'

export type MainNavItem = {
  key: string
  icon: ReactNode
  label: string
}

export function useMainNavItems(): MainNavItem[] {
  const { t } = useTranslation('nav')
  const canDashboard = useCanAccess(PERMISSIONS.DASHBOARD_READ)
  const canUsers = useCanAccess(PERMISSIONS.USERS_READ)
  const canPayments = useCanAccess(PERMISSIONS.PAYMENTS_READ)
  const canReports = useCanAccess(PERMISSIONS.REPORTS_READ)

  return useMemo(
    () => [
      ...(canDashboard
        ? [
            {
              key: PATHS.DASHBOARD,
              icon: <DashboardOutlined />,
              label: t('dashboard'),
            },
          ]
        : []),
      ...(canUsers
        ? [
            {
              key: PATHS.USERS,
              icon: <TeamOutlined />,
              label: t('users'),
            },
          ]
        : []),
      ...(canPayments
        ? [
            {
              key: PATHS.PAYMENTS,
              icon: <CreditCardOutlined />,
              label: t('payments'),
            },
          ]
        : []),
      ...(canReports
        ? [
            {
              key: PATHS.REPORTS,
              icon: <BarChartOutlined />,
              label: t('reports'),
            },
          ]
        : []),
      {
        key: PATHS.SETTINGS,
        icon: <SettingOutlined />,
        label: t('settings'),
      },
    ],
    [canDashboard, canUsers, canPayments, canReports, t],
  )
}
