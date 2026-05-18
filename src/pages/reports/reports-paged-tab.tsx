import type { CSSProperties, Dispatch, ReactNode, SetStateAction } from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { ColumnsType } from 'antd/es/table'
import { Input, Pagination, Spin, Table } from 'antd'
import type { PagedFilter } from '@/constants/reports-paged-filter'
import { useCompactLayout } from '@/hooks/use-compact-layout'
import { paginationShowTotal } from '@/utils/pagination-show-total'

const reportsCardList: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  width: '100%',
}

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: isCompact ? 12 : 16,
        width: '100%',
      }}
    >
      <Input.Search
        allowClear
        placeholder={searchPlaceholder}
        value={filter.search}
        onChange={(e) => {
          onFilterChange((s) => ({ ...s, search: e.target.value, page: 1 }))
        }}
        style={{
          width: isCompact ? '100%' : undefined,
          maxWidth: isCompact ? undefined : 420,
        }}
      />

      {isCompact ? (
        <Spin spinning={loading}>
          <div style={reportsCardList}>
            {items.map((row) => (
              <div key={String(row[rowKey])}>{renderCard(row)}</div>
            ))}
          </div>
          {total > 0 ? (
            <Pagination
              {...paginationConfig}
              size="small"
              style={{ marginTop: 4 }}
            />
          ) : null}
        </Spin>
      ) : (
        <Table<T>
          rowKey={rowKey}
          loading={loading}
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
