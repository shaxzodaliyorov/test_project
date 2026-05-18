export const REPORTS_RANGE_VALUES = ['default', '12m', '30d'] as const

export type ReportsRangeValue = (typeof REPORTS_RANGE_VALUES)[number]
