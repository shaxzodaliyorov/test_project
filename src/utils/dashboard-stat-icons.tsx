import {
  AppstoreOutlined,
  CreditCardOutlined,
  ShopOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import type { DashboardStatIcon } from '@/hooks/use-dashboard-page'

const DASHBOARD_STAT_ICONS = {
  users: TeamOutlined,
  payments: CreditCardOutlined,
  categories: AppstoreOutlined,
  merchants: ShopOutlined,
} as const

export function dashboardStatIcon(icon: DashboardStatIcon) {
  const Icon = DASHBOARD_STAT_ICONS[icon]
  return <Icon />
}
