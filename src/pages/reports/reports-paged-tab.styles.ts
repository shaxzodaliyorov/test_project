import type { CSSProperties } from 'react'
import { pageCardList, pagePaginationCompact } from '@/styles/page-layout.styles'

export const reportsPagedTabCardList = pageCardList
export const reportsPagedTabPagination = pagePaginationCompact

export const reportsPagedTabRoot: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}

export function reportsPagedTabRootGap(isCompact: boolean): CSSProperties {
  return {
    ...reportsPagedTabRoot,
    gap: isCompact ? 12 : 16,
  }
}

export function reportsPagedTabSearch(isCompact: boolean): CSSProperties {
  return {
    width: isCompact ? '100%' : undefined,
    maxWidth: isCompact ? undefined : 420,
  }
}
