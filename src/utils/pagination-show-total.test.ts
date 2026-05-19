import type { TFunction } from 'i18next'
import { describe, expect, it } from 'vitest'
import { paginationShowTotal } from '@/utils/pagination-show-total'

const t = ((key: string, options?: { from?: number; to?: number; total?: number }) => {
  if (key === 'common:paginationEmpty') return '0 items'
  if (key === 'common:paginationRange') {
    return `${options?.from}-${options?.to} / ${options?.total}`
  }
  return key
}) as TFunction

describe('paginationShowTotal', () => {
  it('returns empty label when total is 0', () => {
    const showTotal = paginationShowTotal(t)
    expect(showTotal(0, [0, 0])).toBe('0 items')
  })

  it('returns range label when total is greater than 0', () => {
    const showTotal = paginationShowTotal(t)
    expect(showTotal(42, [1, 10])).toBe('1-10 / 42')
  })
})
