import type { Dispatch, SetStateAction } from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { ReportMerchantRow, ReportsTableResponse } from '@/types/reports'
import type { PagedFilter } from '@/constants/reports-paged-filter'
import { ReportsPagedTab } from './reports-paged-tab'
import { ReportMerchantCard } from './reports-row-cards'
import { buildReportsColumnsMerchant } from './reports-table-columns'

type MerchantsTable = Extract<ReportsTableResponse, { section: 'merchants' }>

type ReportsMerchantsTabProps = {
  filter: PagedFilter
  onFilterChange: Dispatch<SetStateAction<PagedFilter>>
  data: MerchantsTable | null
  loading: boolean
}

export function ReportsMerchantsTab({
  filter,
  onFilterChange,
  data,
  loading,
}: ReportsMerchantsTabProps) {
  const { t } = useTranslation(['reports', 'common'])
  const columns = useMemo(() => buildReportsColumnsMerchant(t), [t])

  return (
    <ReportsPagedTab<ReportMerchantRow>
      filter={filter}
      onFilterChange={onFilterChange}
      items={data?.items ?? []}
      total={data?.total ?? 0}
      loading={loading}
      rowKey="merchant"
      searchPlaceholder={t('reports:searchMerchants')}
      columns={columns}
      scroll={{ x: 720 }}
      renderCard={(row) => <ReportMerchantCard row={row} t={t} />}
    />
  )
}
