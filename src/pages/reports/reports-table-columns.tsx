import type { TFunction } from 'i18next'
import type { ColumnsType } from 'antd/es/table'
import type {
  ReportCategoryRow,
  ReportDailyPoint,
  ReportHourlyRow,
  ReportMerchantRow,
  ReportMonthlyRow,
} from '@/types/reports'
import { formatMoney } from './reports-format'

export function buildReportsColumnsMonthly(
  t: TFunction,
): ColumnsType<ReportMonthlyRow> {
  return [
    { title: t('reports:colMonth'), dataIndex: 'month', key: 'month' },
    {
      title: t('reports:colSum'),
      dataIndex: 'amount',
      key: 'amount',
      render: (v: number) => formatMoney(v),
    },
  ]
}

export function buildReportsColumnsDaily(
  t: TFunction,
): ColumnsType<ReportDailyPoint> {
  return [
    { title: t('reports:colDay'), dataIndex: 'day', key: 'day' },
    { title: t('reports:colOrders'), dataIndex: 'orders', key: 'orders' },
    {
      title: t('reports:colGross'),
      dataIndex: 'grossCents',
      key: 'grossCents',
      render: (v: number) => formatMoney(v),
    },
    {
      title: t('reports:colNet'),
      dataIndex: 'netCents',
      key: 'netCents',
      render: (v: number) => formatMoney(v),
    },
  ]
}

export function buildReportsColumnsCategory(
  t: TFunction,
): ColumnsType<ReportCategoryRow> {
  return [
    {
      title: t('reports:colCategory'),
      dataIndex: 'category',
      key: 'category',
      ellipsis: true,
      width: 200,
    },
    {
      title: (
        <span style={{ whiteSpace: 'nowrap' }}>
          {t('reports:colTransactions')}
        </span>
      ),
      dataIndex: 'transactionCount',
      key: 'transactionCount',
      width: 152,
      align: 'right',
    },
    {
      title: t('reports:colSum'),
      dataIndex: 'amountCents',
      key: 'amountCents',
      width: 220,
      align: 'right',
      render: (v: number) => (
        <span style={{ whiteSpace: 'nowrap' }}>{formatMoney(v)}</span>
      ),
    },
    {
      title: t('reports:colShare'),
      dataIndex: 'sharePercent',
      key: 'sharePercent',
      width: 96,
      align: 'right',
    },
  ]
}

export function buildReportsColumnsMerchant(
  t: TFunction,
): ColumnsType<ReportMerchantRow> {
  return [
    {
      title: t('reports:colMerchant'),
      dataIndex: 'merchant',
      key: 'merchant',
      ellipsis: true,
    },
    {
      title: t('reports:colOrders'),
      dataIndex: 'orders',
      key: 'orders',
      width: 110,
    },
    {
      title: t('reports:colRevenue'),
      dataIndex: 'revenueCents',
      key: 'revenueCents',
      render: (v: number) => formatMoney(v),
    },
    {
      title: t('reports:colRefunds'),
      dataIndex: 'refundsCents',
      key: 'refundsCents',
      render: (v: number) => formatMoney(v),
    },
  ]
}

export function buildReportsColumnsHourly(
  t: TFunction,
): ColumnsType<ReportHourlyRow> {
  return [
    {
      title: t('reports:colHourUtc'),
      dataIndex: 'hour',
      key: 'hour',
      width: 220,
      render: (v: string) => new Date(v).toLocaleString(),
    },
    {
      title: t('reports:colVolume'),
      dataIndex: 'volume',
      key: 'volume',
      width: 100,
    },
    {
      title: t('reports:colLatencyMs'),
      dataIndex: 'latencyMs',
      key: 'latencyMs',
      width: 120,
    },
  ]
}
