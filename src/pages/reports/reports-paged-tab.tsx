import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { ColumnsType } from 'antd/es/table'
import { Input, Pagination, Table } from 'antd'
import type { PagedFilter } from '@/constants/reports-paged-filter'
import { DataTableSkeleton } from '@/components/skeletons/data-table-skeleton'
import { ListCardSkeletonList } from '@/components/skeletons/list-card-skeleton-list'
import { useCompactLayout } from '@/hooks/use-compact-layout'
import { paginationShowTotal } from '@/utils/pagination-show-total'
import {
  reportsPagedTabCardList,
  reportsPagedTabPagination,
  reportsPagedTabRootGap,
  reportsPagedTabSearch,
} from './reports-paged-tab.styles'

type ReportsPagedTabProps<T extends object> = {
  filter: PagedFilter
  onFilterChange: Dispatch<SetStateAction<PagedFilter>>
  items: T[]
  total: number
  loading: boolean
  rowKey: keyof T & string
  searchPlaceholder: string
  columns: ColumnsType<T>
  scroll?: { x?: number; y?: number }
  renderCard: (row: T) => ReactNode
}

export function ReportsPagedTab<T extends object>({
  filter,
  onFilterChange,
  items,
  total,
  loading,
  rowKey,
  searchPlaceholder,
  columns,
  scroll,
  renderCard,
}: ReportsPagedTabProps<T>) {
  const { t } = useTranslation(['reports', 'common'])
  const isCompact = useCompactLayout()
  const showTotal = useMemo(() => paginationShowTotal(t), [t])

  const paginationConfig = {
    current: filter.page,
    pageSize: filter.pageSize,
    total,
    showSizeChanger: false as const,
    showTotal,
    onChange: (p: number) => onFilterChange((s) => ({ ...s, page: p })),
  }

  return (
    <div style={reportsPagedTabRootGap(isCompact)}>
      <Input.Search
        allowClear
        placeholder={searchPlaceholder}
        value={filter.search}
        onChange={(e) => {
          onFilterChange((s) => ({ ...s, search: e.target.value, page: 1 }))
        }}
        style={reportsPagedTabSearch(isCompact)}
      />

      {isCompact ? (
        loading ? (
          <ListCardSkeletonList count={filter.pageSize} variant="report" />
        ) : (
          <>
            <div style={reportsPagedTabCardList}>
              {items.map((row) => (
                <div key={String(row[rowKey])}>{renderCard(row)}</div>
              ))}
            </div>
            {total > 0 ? (
              <Pagination
                {...paginationConfig}
                size="small"
                style={reportsPagedTabPagination}
              />
            ) : null}
          </>
        )
      ) : loading ? (
        <DataTableSkeleton
          columnCount={columns?.length ?? 4}
          rowCount={filter.pageSize}
          size="small"
        />
      ) : (
        <Table<T>
          rowKey={rowKey}
          dataSource={items}
          size="small"
          columns={columns}
          scroll={scroll}
          pagination={paginationConfig}
        />
      )}
    </div>
  )
}
