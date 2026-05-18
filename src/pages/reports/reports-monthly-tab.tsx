import type { Dispatch, SetStateAction } from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { ReportMonthlyRow, ReportsTableResponse } from '@/types/reports'
import type { PagedFilter } from '@/constants/reports-paged-filter'
import { ReportsPagedTab } from './reports-paged-tab'
import { ReportMonthlyCard } from './reports-row-cards'
import { buildReportsColumnsMonthly } from './reports-table-columns'

type MonthlyTable = Extract<ReportsTableResponse, { section: 'monthly' }>

type ReportsMonthlyTabProps = {
  filter: PagedFilter
  onFilterChange: Dispatch<SetStateAction<PagedFilter>>
  data: MonthlyTable | null
  loading: boolean
}

export function ReportsMonthlyTab({
  filter,
  onFilterChange,
  data,
  loading,
}: ReportsMonthlyTabProps) {
  const { t } = useTranslation(['reports', 'common'])
  const columns = useMemo(() => buildReportsColumnsMonthly(t), [t])

  return (
    <ReportsPagedTab<ReportMonthlyRow>
      filter={filter}
      onFilterChange={onFilterChange}
      items={data?.items ?? []}
      total={data?.total ?? 0}
      loading={loading}
      rowKey="month"
      searchPlaceholder={t('reports:searchMonthly')}
      columns={columns}
      renderCard={(row) => <ReportMonthlyCard row={row} t={t} />}
    />
  )
}
