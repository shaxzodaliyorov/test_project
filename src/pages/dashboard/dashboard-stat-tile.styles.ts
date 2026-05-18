import type { CSSProperties } from 'react'
import type { GlobalToken } from 'antd/es/theme/interface'
import { listCardWidth, listCardBody } from '@/styles/list-card.styles'

export { listCardWidth as dashboardStatTileWidth }

export function dashboardStatTileBody(
  token: GlobalToken,
  compact: boolean,
): CSSProperties {
  return {
    ...listCardBody(token),
    padding: compact ? token.paddingSM : token.paddingLG,
  }
}

export function dashboardStatTileStack(
  token: GlobalToken,
  compact: boolean,
): CSSProperties {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: compact ? token.marginXS : token.marginMD,
  }
}

export function dashboardStatTileIconWrap(
  token: GlobalToken,
  compact: boolean,
  color: string,
): CSSProperties {
  const iconSize = compact ? 36 : 48
  const iconFontSize = compact ? 18 : 22
  return {
    width: iconSize,
    height: iconSize,
    borderRadius: token.borderRadiusLG,
    background: token.colorFillAlter,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: iconFontSize,
    color,
  }
}

export function dashboardStatTileTitle(compact: boolean): CSSProperties {
  return {
    fontSize: compact ? 11 : undefined,
    lineHeight: 1.3,
  }
}

export function dashboardStatTileValue(
  token: GlobalToken,
  compact: boolean,
): CSSProperties {
  return {
    fontWeight: 600,
    fontSize: compact ? token.fontSizeLG : token.fontSizeHeading4,
  }
}
