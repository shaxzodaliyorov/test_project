import type { CSSProperties } from 'react'

export function reportsOverviewChartPlot(compact: boolean): CSSProperties {
  return {
    width: '100%',
    height: compact ? 220 : 320,
  }
}

export const reportsOverviewChartEmpty: CSSProperties = {
  color: 'var(--ant-color-text-secondary)',
  fontSize: 13,
}
