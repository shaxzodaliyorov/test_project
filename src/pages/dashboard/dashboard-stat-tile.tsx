import type { ReactNode } from 'react'
import { Card, Statistic, theme } from 'antd'

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
  const iconSize = compact ? 36 : 48
  const iconFontSize = compact ? 18 : 22

  return (
    <Card
      size="small"
      variant="outlined"
      style={{ width: '100%' }}
      styles={{
        body: {
          padding: compact ? token.paddingSM : token.paddingLG,
          background: token.colorFillQuaternary,
        },
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: compact ? token.marginXS : token.marginMD,
        }}
      >
        <div
          style={{
            width: iconSize,
            height: iconSize,
            borderRadius: token.borderRadiusLG,
            background: token.colorFillAlter,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: iconFontSize,
            color,
          }}
        >
          {icon}
        </div>
        <Statistic
          title={
            <span
              style={{
                fontSize: compact ? 11 : undefined,
                lineHeight: 1.3,
              }}
            >
              {title}
            </span>
          }
          value={value}
          valueStyle={{
            fontWeight: 600,
            fontSize: compact ? token.fontSizeLG : token.fontSizeHeading4,
          }}
        />
      </div>
    </Card>
  )
}
