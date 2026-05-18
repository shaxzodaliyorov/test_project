import { Card, Skeleton } from 'antd'
import { reportsOverviewChartPlot } from '@/pages/reports/reports-overview-chart.styles'

type ReportsChartSkeletonProps = {
  compact?: boolean
}

export function ReportsChartSkeleton({ compact = false }: ReportsChartSkeletonProps) {
  return (
    <Card
      size="small"
      title={<Skeleton.Input active size="small" style={{ width: 160, height: 18 }} />}
    >
      <Skeleton.Node active style={{ ...reportsOverviewChartPlot(compact), width: '100%' }} />
    </Card>
  )
}
