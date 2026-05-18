import type { TFunction } from 'i18next'
import { Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { Payment, PaymentStatus } from '@/types/payment'
import { formatCurrencyMinorUnits } from '@/utils/format-currency'

const STATUS_TAG_COLOR: Record<PaymentStatus, string> = {
  pending: 'gold',
  paid: 'green',
  failed: 'red',
}

type BuildPaymentsColumnsArgs = {
  t: TFunction<['payments', 'common']>
  page: number
  pageSize: number
  statusLabels: Record<PaymentStatus, string>
}

export function buildPaymentsColumns({
  t,
  page,
  pageSize,
  statusLabels,
}: BuildPaymentsColumnsArgs): ColumnsType<Payment> {
  return [
    {
      title: t('payments:colNo'),
      key: 'index',
      width: 56,
      fixed: 'left',
      align: 'center',
      render: (_, __, index) => (page - 1) * pageSize + index + 1,
    },
    {
      title: t('payments:colId'),
      dataIndex: 'id',
      key: 'id',
      width: 120,
      fixed: 'left',
    },
    {
      title: t('payments:colAmount'),
      key: 'amount',
      width: 120,
      render: (_, row) =>
        formatCurrencyMinorUnits(row.amountCents, {
          currency: row.currency,
          maximumFractionDigits: 2,
          minimumFractionDigits: 0,
        }),
    },
    {
      title: t('payments:colFee'),
      key: 'fee',
      width: 100,
      render: (_, row) =>
        formatCurrencyMinorUnits(row.feeCents, {
          currency: row.currency,
          maximumFractionDigits: 2,
          minimumFractionDigits: 0,
        }),
    },
    {
      title: t('payments:colStatus'),
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (status: PaymentStatus) => (
        <Tag color={STATUS_TAG_COLOR[status]}>
          {statusLabels[status] ?? status}
        </Tag>
      ),
    },
    {
      title: t('payments:colMethod'),
      dataIndex: 'method',
      key: 'method',
      width: 120,
    },
    {
      title: t('payments:colCategory'),
      dataIndex: 'category',
      key: 'category',
      width: 120,
    },
    {
      title: t('payments:colMerchant'),
      dataIndex: 'merchantName',
      key: 'merchantName',
      width: 140,
    },
    {
      title: t('payments:colCustomer'),
      dataIndex: 'customerEmail',
      key: 'customerEmail',
      ellipsis: true,
      width: 200,
    },
    {
      title: t('payments:colRef'),
      dataIndex: 'externalRef',
      key: 'externalRef',
      width: 160,
    },
    {
      title: t('payments:colCity'),
      dataIndex: 'city',
      key: 'city',
      width: 100,
    },
    {
      title: t('payments:colCreated'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (v: string) => new Date(v).toLocaleString(),
    },
  ]
}
