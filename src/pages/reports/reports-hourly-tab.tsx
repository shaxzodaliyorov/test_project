import type { Dispatch, SetStateAction } from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { ReportHourlyRow, ReportsTableResponse } from '@/types/reports'
import type { PagedFilter } from '@/constants/reports-paged-filter'
import { ReportsPagedTab } from './reports-paged-tab'
import { ReportHourlyCard } from './reports-row-cards'
import { buildReportsColumnsHourly } from './reports-table-columns'

type HourlyTable = Extract<ReportsTableResponse, { section: 'hourly' }>

type ReportsHourlyTabProps = {
  filter: PagedFilter
  onFilterChange: Dispatch<SetStateAction<PagedFilter>>
  data: HourlyTable | null
  loading: boolean
}

export function ReportsHourlyTab({
  filter,
  onFilterChange,
  data,
  loading,
}: ReportsHourlyTabProps) {
  const { t } = useTranslation(['reports', 'common'])
  const columns = useMemo(() => buildReportsColumnsHourly(t), [t])

  return (
    <ReportsPagedTab<ReportHourlyRow>
      filter={filter}
      onFilterChange={onFilterChange}
      items={data?.items ?? []}
      total={data?.total ?? 0}
      loading={loading}
      rowKey="hour"
      searchPlaceholder={t('reports:searchHourly')}
      columns={columns}
      scroll={{ x: 520 }}
      renderCard={(row) => <ReportHourlyCard row={row} t={t} />}
    />
  )
}
