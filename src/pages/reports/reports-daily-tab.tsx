import type { Dispatch, SetStateAction } from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { ReportDailyPoint, ReportsTableResponse } from '@/types/reports'
import type { PagedFilter } from '@/constants/reports-paged-filter'
import { ReportsPagedTab } from './reports-paged-tab'
import { ReportDailyCard } from './reports-row-cards'
import { buildReportsColumnsDaily } from './reports-table-columns'

type DailyTable = Extract<ReportsTableResponse, { section: 'daily' }>

type ReportsDailyTabProps = {
  filter: PagedFilter
  onFilterChange: Dispatch<SetStateAction<PagedFilter>>
  data: DailyTable | null
  loading: boolean
}

export function ReportsDailyTab({
  filter,
  onFilterChange,
  data,
  loading,
}: ReportsDailyTabProps) {
  const { t } = useTranslation(['reports', 'common'])
  const columns = useMemo(() => buildReportsColumnsDaily(t), [t])

  return (
    <ReportsPagedTab<ReportDailyPoint>
      filter={filter}
      onFilterChange={onFilterChange}
      items={data?.items ?? []}
      total={data?.total ?? 0}
      loading={loading}
      rowKey="day"
      searchPlaceholder={t('reports:searchDaily')}
      columns={columns}
      scroll={{ x: 560 }}
      renderCard={(row) => <ReportDailyCard row={row} t={t} />}
    />
  )
}
