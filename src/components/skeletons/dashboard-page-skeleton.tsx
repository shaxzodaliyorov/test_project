import { Card, Col, Row, Skeleton, theme } from 'antd'
import {
  dashboardActivityChartBody,
  dashboardActivityChartFlex,
  dashboardActivityChartHeader,
  dashboardActivityChartPlot,
  dashboardActivityChartSelect,
  dashboardActivityChartWidth,
} from '@/pages/dashboard/dashboard-activity-chart.styles'
import {
  dashboardStatGrid,
  dashboardStatRow,
} from '@/pages/dashboard/dashboard-page.styles'
import {
  dashboardStatTileBody,
  dashboardStatTileIconWrap,
  dashboardStatTileStack,
  dashboardStatTileWidth,
} from '@/pages/dashboard/dashboard-stat-tile.styles'

type DashboardPageSkeletonProps = {
  compact?: boolean
}

function StatTileSkeleton({ compact }: { compact: boolean }) {
  const { token } = theme.useToken()
  const iconSize = compact ? 36 : 48

  return (
    <Card
      size="small"
      variant="outlined"
      style={dashboardStatTileWidth}
      styles={{ body: dashboardStatTileBody(token, compact) }}
    >
      <div style={dashboardStatTileStack(token, compact)}>
        <Skeleton.Node
          active
          style={{
            ...dashboardStatTileIconWrap(token, compact, token.colorPrimary),
            width: iconSize,
            height: iconSize,
          }}
        />
        <Skeleton active title={{ width: '60%' }} paragraph={{ rows: 1, width: '40%' }} />
      </div>
    </Card>
  )
}

function ActivityChartSkeleton({ compact }: { compact: boolean }) {
  const { token } = theme.useToken()

  return (
    <Card
      size="small"
      variant="outlined"
      style={dashboardActivityChartWidth}
      styles={{ body: dashboardActivityChartBody(token, compact) }}
    >
      <div style={dashboardActivityChartFlex}>
        <div style={dashboardActivityChartHeader(token)}>
          <Skeleton.Input active style={{ width: '45%', height: compact ? 18 : 22, marginBottom: 8 }} />
          <Skeleton.Input active style={{ width: '70%', height: compact ? 12 : 14, marginBottom: 8 }} />
          <Skeleton.Input active style={dashboardActivityChartSelect(compact)} />
        </div>
        <Skeleton.Node active style={{ ...dashboardActivityChartPlot(compact), width: '100%' }} />
      </div>
    </Card>
  )
}

export function DashboardPageSkeleton({ compact = false }: DashboardPageSkeletonProps) {
  const tiles = Array.from({ length: 4 }, (_, i) => (
    <StatTileSkeleton key={i} compact={compact} />
  ))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 16 : 24, width: '100%' }}>
      {compact ? (
        <div style={dashboardStatGrid}>{tiles}</div>
      ) : (
        <Row gutter={[16, 16]} style={dashboardStatRow}>
          {tiles.map((tile, i) => (
            <Col key={i} xs={24} sm={12} md={8} lg={6}>
              {tile}
            </Col>
          ))}
        </Row>
      )}
      <ActivityChartSkeleton compact={compact} />
    </div>
  )
}
