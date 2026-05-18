import type { CSSProperties } from 'react'
import { pageStack, pageStackCompact } from '@/styles/page-layout.styles'

export const dashboardPageStack = pageStack
export const dashboardPageStackCompact = pageStackCompact

export const dashboardStatGrid: CSSProperties = {
  display: 'grid',
  width: '100%',
  gap: 12,
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
}

export const dashboardStatRow: CSSProperties = {
  width: '100%',
  margin: 0,
}
