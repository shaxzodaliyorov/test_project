import type { CSSProperties } from 'react'
import type { GlobalToken } from 'antd/es/theme/interface'
import { listCardWidth, listCardBody } from '@/styles/list-card.styles'
import { pageFullWidth } from '@/styles/page-layout.styles'

export { listCardWidth as dashboardActivityChartWidth }

export function dashboardActivityChartBody(
  token: GlobalToken,
  compact: boolean,
): CSSProperties {
  return {
    ...listCardBody(token),
    padding: compact ? token.paddingSM : token.paddingMD,
  }
}

export const dashboardActivityChartFlex: CSSProperties = {
  ...pageFullWidth,
}

export function dashboardActivityChartHeader(token: GlobalToken): CSSProperties {
  return {
    paddingBottom: token.paddingSM,
    borderBottom: `1px solid ${token.colorBorderSecondary}`,
  }
}

export function dashboardActivityChartTitle(
  token: GlobalToken,
  compact: boolean,
): CSSProperties {
  return {
    margin: 0,
    marginBottom: token.marginSM,
    fontSize: compact ? 14 : undefined,
  }
}

export function dashboardActivityChartDescription(
  token: GlobalToken,
  compact: boolean,
): CSSProperties {
  return {
    display: 'block',
    marginBottom: token.marginSM,
    fontSize: compact ? 11 : token.fontSizeSM,
  }
}

export function dashboardActivityChartSelect(compact: boolean): CSSProperties {
  return {
    width: '100%',
    maxWidth: compact ? undefined : 320,
  }
}

export function dashboardActivityChartPlot(compact: boolean): CSSProperties {
  return {
    width: '100%',
    minWidth: 0,
    height: compact ? 220 : 300,
  }
}
