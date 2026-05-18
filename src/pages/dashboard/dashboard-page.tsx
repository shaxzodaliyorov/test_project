import {
  AppstoreOutlined,
  CreditCardOutlined,
  ShopOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Alert, Button, Col, Row, Spin, Typography, theme } from 'antd'
import { useDashboard } from '@/hooks/use-dashboard'
import { useAuthSession } from '@/hooks/use-auth-session'
import { useCompactLayout } from '@/hooks/use-compact-layout'
import { pageTitleStyle } from '@/styles/page-layout.styles'
import { DashboardActivityChart } from './dashboard-activity-chart'
import { DashboardStatTile } from './dashboard-stat-tile'
import {
  dashboardPageStack,
  dashboardPageStackCompact,
  dashboardStatGrid,
  dashboardStatRow,
} from './dashboard-page.styles'

export function DashboardPage() {
  const { t } = useTranslation(['dashboard', 'common'])
  const { token } = theme.useToken()
  const isCompact = useCompactLayout()
  const me = useAuthSession()
  const dashboard = useDashboard()

  if (me.isLoading) {
    return <Spin size="large" />
  }

  const errorDescription =
    dashboard.error instanceof Error
      ? dashboard.error.message
      : String(dashboard.error ?? t('common:unknownError'))

  const d = dashboard.data

  const statGrid = d ? (
    <>
      <DashboardStatTile
        title={t('dashboard:statDemoUsers')}
        value={d.stats.demoUsersTotal}
        icon={<TeamOutlined />}
        iconColor={token.colorPrimary}
        compact={isCompact}
      />
      {d.stats.demoPaymentRecords != null ? (
        <DashboardStatTile
          title={t('dashboard:statPayments')}
          value={d.stats.demoPaymentRecords}
          icon={<CreditCardOutlined />}
          iconColor={token.colorInfo}
          compact={isCompact}
        />
      ) : null}
      {d.stats.demoReportCategories != null ? (
        <DashboardStatTile
          title={t('dashboard:statReportCats')}
          value={d.stats.demoReportCategories}
          icon={<AppstoreOutlined />}
          iconColor={token.colorSuccess}
          compact={isCompact}
        />
      ) : null}
      {d.stats.demoReportMerchants != null ? (
        <DashboardStatTile
          title={t('dashboard:statReportMerchants')}
          value={d.stats.demoReportMerchants}
          icon={<ShopOutlined />}
          iconColor={token.colorWarning}
          compact={isCompact}
        />
      ) : null}
    </>
  ) : null

  return (
    <div style={isCompact ? dashboardPageStackCompact : dashboardPageStack}>
      <Typography.Title level={isCompact ? 4 : 2} style={pageTitleStyle(isCompact)}>
        {t('dashboard:title')}
      </Typography.Title>

      {dashboard.isError ? (
        <Alert
          type="error"
          showIcon
          message={t('dashboard:loadError')}
          description={errorDescription}
          action={
            <Button size="small" onClick={() => void dashboard.refetch()}>
              {t('common:retry')}
            </Button>
          }
        />
      ) : null}

      <Spin spinning={dashboard.isFetching && !d}>
        {d ? (
          <div
            style={
              isCompact ? dashboardPageStackCompact : dashboardPageStack
            }
          >
            {isCompact ? (
              <div style={dashboardStatGrid}>{statGrid}</div>
            ) : (
              <Row gutter={[16, 16]} style={dashboardStatRow}>
                <Col xs={24} sm={12} md={8} lg={6}>
                  <DashboardStatTile
                    title={t('dashboard:statDemoUsers')}
                    value={d.stats.demoUsersTotal}
                    icon={<TeamOutlined />}
                    iconColor={token.colorPrimary}
                  />
                </Col>
                {d.stats.demoPaymentRecords != null ? (
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <DashboardStatTile
                      title={t('dashboard:statPayments')}
                      value={d.stats.demoPaymentRecords}
                      icon={<CreditCardOutlined />}
                      iconColor={token.colorInfo}
                    />
                  </Col>
                ) : null}
                {d.stats.demoReportCategories != null ? (
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <DashboardStatTile
                      title={t('dashboard:statReportCats')}
                      value={d.stats.demoReportCategories}
                      icon={<AppstoreOutlined />}
                      iconColor={token.colorSuccess}
                    />
                  </Col>
                ) : null}
                {d.stats.demoReportMerchants != null ? (
                  <Col xs={24} sm={12} md={8} lg={6}>
                    <DashboardStatTile
                      title={t('dashboard:statReportMerchants')}
                      value={d.stats.demoReportMerchants}
                      icon={<ShopOutlined />}
                      iconColor={token.colorWarning}
                    />
                  </Col>
                ) : null}
              </Row>
            )}
            <DashboardActivityChart activity={d.activity} compact={isCompact} />
          </div>
        ) : null}
      </Spin>
    </div>
  )
}
