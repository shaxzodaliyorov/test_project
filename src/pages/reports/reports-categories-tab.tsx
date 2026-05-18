import type { Dispatch, SetStateAction } from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { ReportCategoryRow, ReportsTableResponse } from '@/types/reports'
import type { PagedFilter } from '@/constants/reports-paged-filter'
import { ReportsPagedTab } from './reports-paged-tab'
import { ReportCategoryCard } from './reports-row-cards'
import { buildReportsColumnsCategory } from './reports-table-columns'

type CategoriesTable = Extract<ReportsTableResponse, { section: 'categories' }>

type ReportsCategoriesTabProps = {
  filter: PagedFilter
  onFilterChange: Dispatch<SetStateAction<PagedFilter>>
  data: CategoriesTable | null
  loading: boolean
}

export function ReportsCategoriesTab({
  filter,
  onFilterChange,
  data,
  loading,
}: ReportsCategoriesTabProps) {
  const { t } = useTranslation(['reports', 'common'])
  const columns = useMemo(() => buildReportsColumnsCategory(t), [t])

  return (
    <ReportsPagedTab<ReportCategoryRow>
      filter={filter}
      onFilterChange={onFilterChange}
      items={data?.items ?? []}
      total={data?.total ?? 0}
      loading={loading}
      rowKey="category"
      searchPlaceholder={t('reports:searchCategory')}
      columns={columns}
      scroll={{ y: 400, x: 900 }}
      renderCard={(row) => <ReportCategoryCard row={row} t={t} />}
    />
  )
}
