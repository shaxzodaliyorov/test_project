import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { PaymentStatus, PaymentsListResponse } from '@/types/payment'
import { PAYMENTS_DEFAULT_PAGE_SIZE } from '@/constants/payments-list'
import { useAuthStore } from '@/hooks/auth-store'
import { useDebouncedValue } from '@/hooks/use-debounced-value'
import { apiGet } from '@/utils/http-client'

function paymentsShowTotal() {
  return (total: number, range: [number, number]) =>
    total === 0 ? '0 ta' : `${range[0]}-${range[1]} / ${total}`
}

function paymentsListUrl(
  page: number,
  pageSize: number,
  search: string,
  status: PaymentStatus | '',
): string {
  const p = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  })
  const q = search.trim()
  if (q) p.set('search', q)
  if (status) p.set('status', status)
  return `/api/payments?${p.toString()}`
}

export type PaymentsStatusFilter = PaymentStatus | ''

export function usePaymentsPage() {
  const preferredCurrency = useAuthStore(
    (s) => s.user?.preferredCurrency ?? 'USD',
  )
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAYMENTS_DEFAULT_PAGE_SIZE)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<PaymentsStatusFilter>('')

  const debouncedSearch = useDebouncedValue(search, 350)

  const query = useQuery({
    queryKey: [
      'payments',
      {
        page,
        pageSize,
        search: debouncedSearch,
        status,
        preferredCurrency,
      },
    ],
    queryFn: () =>
      apiGet<PaymentsListResponse>(
        paymentsListUrl(page, pageSize, debouncedSearch, status),
      ),
  })

  useEffect(() => {
    const d = query.data
    if (!d) return
    if (d.page === page && d.pageSize === pageSize) return
    let cancelled = false
    queueMicrotask(() => {
      if (cancelled) return
      if (d.page !== page) setPage(d.page)
      if (d.pageSize !== pageSize) setPageSize(d.pageSize)
    })
    return () => {
      cancelled = true
    }
  }, [query.data, page, pageSize])

  const setSearchAndResetPage = useCallback((value: string) => {
    setSearch(value)
    setPage(1)
  }, [])

  const setStatusAndResetPage = useCallback((value: PaymentsStatusFilter) => {
    setStatus(value)
    setPage(1)
  }, [])

  const onPaginationChange = useCallback((p: number) => {
    setPage(p)
  }, [])

  const errorDescription =
    query.error instanceof Error
      ? query.error.message
      : String(query.error ?? 'Unknown error')

  const refetch = useCallback(() => {
    void query.refetch()
  }, [query])

  const showTotal = useMemo(() => paymentsShowTotal(), [])

  return {
    page,
    pageSize,
    search,
    setSearch: setSearchAndResetPage,
    status,
    setStatus: setStatusAndResetPage,
    query,
    total: query.data?.total ?? 0,
    items: query.data?.items ?? [],
    errorDescription,
    refetch,
    showTotal,
    onPaginationChange,
  }
}
