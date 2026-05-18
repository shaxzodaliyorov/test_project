import type { CSSProperties } from 'react'
import { Skeleton, theme } from 'antd'

type DataTableSkeletonProps = {
  columnCount: number
  rowCount: number
  size?: 'small' | 'middle'
}

const tableWrap: CSSProperties = {
  width: '100%',
  border: '1px solid var(--ant-color-border-secondary)',
  borderRadius: 8,
  overflow: 'hidden',
}

export function DataTableSkeleton({
  columnCount,
  rowCount,
  size = 'small',
}: DataTableSkeletonProps) {
  const { token } = theme.useToken()
  const rowHeight = size === 'small' ? 40 : 48
  const headerHeight = size === 'small' ? 40 : 48

  return (
    <div style={tableWrap}>
      <div
        style={{
          display: 'flex',
          gap: 8,
          padding: '10px 12px',
          background: token.colorFillAlter,
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
          minHeight: headerHeight,
          alignItems: 'center',
        }}
      >
        {Array.from({ length: columnCount }, (_, i) => (
          <Skeleton.Input
            key={i}
            active
            size="small"
            style={{ flex: i === 0 ? '0 0 56px' : 1, height: 14, minWidth: 48 }}
          />
        ))}
      </div>
      {Array.from({ length: rowCount }, (_, row) => (
        <div
          key={row}
          style={{
            display: 'flex',
            gap: 8,
            padding: '8px 12px',
            borderBottom:
              row < rowCount - 1
                ? `1px solid ${token.colorBorderSecondary}`
                : undefined,
            minHeight: rowHeight,
            alignItems: 'center',
          }}
        >
          {Array.from({ length: columnCount }, (_, col) => (
            <Skeleton.Input
              key={col}
              active
              size="small"
              style={{
                flex: col === 0 ? '0 0 56px' : 1,
                height: 12,
                minWidth: 40,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
