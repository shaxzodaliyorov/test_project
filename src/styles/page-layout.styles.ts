import type { CSSProperties } from 'react'

export const pageStack: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 24,
  textAlign: 'left',
}

export const pageStackCompact: CSSProperties = {
  ...pageStack,
  gap: 16,
}

export const pageCardList: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  width: '100%',
}

export const pageTitle: CSSProperties = {
  margin: 0,
}

export const pageTitleCompact: CSSProperties = {
  margin: 0,
  fontSize: 18,
}

export function pageTitleStyle(isCompact: boolean): CSSProperties {
  return isCompact ? pageTitleCompact : pageTitle
}

export const pageToolbarColumn: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  width: '100%',
}

export const pageToolbarRowBetween: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: 8,
  width: '100%',
}

export const pageToolbarRowEnd: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
  gap: 8,
  width: '100%',
}

export const pagePeriodColumn: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  width: '100%',
}

export const pagePeriodLabelCompact: CSSProperties = {
  fontSize: 12,
}

export const pageFullWidth: CSSProperties = {
  width: '100%',
}

export const pageSpaceFullWidth: CSSProperties = {
  width: '100%',
}

export const pageSearchDesktop: CSSProperties = {
  maxWidth: 420,
  minWidth: 200,
}

export const pageSearchUsersDesktop: CSSProperties = {
  width: 280,
  maxWidth: '100%',
}

export const pageSelectDesktop: CSSProperties = {
  minWidth: 180,
}

export const pageSelectPeriodDesktop: CSSProperties = {
  minWidth: 200,
}

export const pagePaginationCompact: CSSProperties = {
  marginTop: 4,
}

export const pageInputPrefix: CSSProperties = {
  color: 'var(--text)',
}
