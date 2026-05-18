import type { ReactNode } from 'react'
import { Card, Statistic, theme } from 'antd'
import {
  dashboardStatTileBody,
  dashboardStatTileIconWrap,
  dashboardStatTileStack,
  dashboardStatTileTitle,
  dashboardStatTileValue,
  dashboardStatTileWidth,
} from './dashboard-stat-tile.styles'

type DashboardStatTileProps = {
  title: string
  value: number
  icon: ReactNode
  iconColor?: string
  compact?: boolean
}

export function DashboardStatTile({
  title,
  value,
  icon,
  iconColor,
  compact = false,
}: DashboardStatTileProps) {
  const { token } = theme.useToken()
  const color = iconColor ?? token.colorPrimary

  return (
    <Card
      size="small"
      variant="outlined"
      style={dashboardStatTileWidth}
      styles={{ body: dashboardStatTileBody(token, compact) }}
    >
      <div style={dashboardStatTileStack(token, compact)}>
        <div style={dashboardStatTileIconWrap(token, compact, color)}>{icon}</div>
        <Statistic
          title={<span style={dashboardStatTileTitle(compact)}>{title}</span>}
          value={value}
          valueStyle={dashboardStatTileValue(token, compact)}
        />
      </div>
    </Card>
  )
}
