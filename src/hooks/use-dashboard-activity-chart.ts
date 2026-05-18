import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { theme } from 'antd'
import { DASHBOARD_ACTIVITY_RANGE_VALUES } from '@/constants/dashboard-activity-range-options'
import type {
  DashboardActivityByRange,
  DashboardActivityRange,
} from '@/types/dashboard'

export function useDashboardActivityChart(activity: DashboardActivityByRange) {
  const { t } = useTranslation('dashboard')
  const { token } = theme.useToken()
  const [range, setRange] = useState<DashboardActivityRange>('week')

  const rangeDescription = useMemo(
    () => ({
      week: t('rangeWeekDesc'),
      month: t('rangeMonthDesc'),
      year: t('rangeYearDesc'),
    }),
    [t],
  )

  const rangeOptions = useMemo(
    () =>
      DASHBOARD_ACTIVITY_RANGE_VALUES.map((value) => ({
        value,
        label:
          value === 'week'
            ? t('rangeWeek')
            : value === 'month'
              ? t('rangeMonth')
              : t('rangeYear'),
      })),
    [t],
  )

  const data = activity[range]
  const tiltXLabels = data.length > 8

  const formatYAxisLabel = (v: string | number) =>
    typeof v === 'number' && v >= 1000
      ? `${Math.round(v / 1000)}k`
      : String(v)

  return {
    token,
    range,
    setRange,
    rangeDescription,
    rangeOptions,
    data,
    tiltXLabels,
    formatYAxisLabel,
  }
}
