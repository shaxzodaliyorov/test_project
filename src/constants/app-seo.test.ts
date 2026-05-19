import { describe, expect, it } from 'vitest'
import { formatDocumentTitle } from '@/constants/app-seo'

describe('formatDocumentTitle', () => {
  it('formats page title with TASK brand prefix', () => {
    expect(formatDocumentTitle('Dashboard')).toBe('TASK | Dashboard')
  })
})
