import type { TFunction } from 'i18next'
import type { ReactNode } from 'react'
import { Card, Typography, theme } from 'antd'
import type {
  ReportCategoryRow,
  ReportDailyPoint,
  ReportHourlyRow,
  ReportMerchantRow,
  ReportMonthlyRow,
} from '@/types/reports'
import { formatMoney } from './reports-format'
import {
  listCardBody,
  listCardFieldLabel,
  listCardFieldRoot,
  listCardFieldValue,
  listCardShellTitleBlock,
  listCardStack,
  listCardSubtitleBreak,
  listCardTitle,
  listCardWidth,
  reportsRowCardGrid,
} from './reports-row-cards.styles'

type ReportsRowCardsT = TFunction<['reports', 'common']>

function CardField({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div style={listCardFieldRoot}>
      <Typography.Text type="secondary" style={listCardFieldLabel}>
        {label}
      </Typography.Text>
      <Typography.Text style={listCardFieldValue}>{value}</Typography.Text>
    </div>
  )
}

function ReportCardShell({
  title,
  subtitle,
  children,
}: {
  title: ReactNode
  subtitle?: ReactNode
  children: ReactNode
}) {
  const { token } = theme.useToken()

  return (
    <Card
      size="small"
      variant="outlined"
      style={listCardWidth}
      styles={{ body: listCardBody(token) }}
    >
      <div style={listCardStack(token)}>
        <div style={listCardShellTitleBlock}>
          <Typography.Text strong style={listCardTitle}>
            {title}
          </Typography.Text>
          {subtitle ? (
            <Typography.Text type="secondary" style={listCardSubtitleBreak}>
              {subtitle}
            </Typography.Text>
          ) : null}
        </div>
        {children}
      </div>
    </Card>
  )
}

export function ReportMonthlyCard({
  row,
  t,
}: {
  row: ReportMonthlyRow
  t: ReportsRowCardsT
}) {
  return (
    <ReportCardShell title={row.month} subtitle={formatMoney(row.amount)}>
      <div style={reportsRowCardGrid}>
        <CardField label={t('reports:colMonth')} value={row.month} />
        <CardField label={t('reports:colSum')} value={formatMoney(row.amount)} />
      </div>
    </ReportCardShell>
  )
}

export function ReportDailyCard({
  row,
  t,
}: {
  row: ReportDailyPoint
  t: ReportsRowCardsT
}) {
  return (
    <ReportCardShell title={row.day} subtitle={formatMoney(row.grossCents)}>
      <div style={reportsRowCardGrid}>
        <CardField label={t('reports:colOrders')} value={row.orders} />
        <CardField
          label={t('reports:colGross')}
          value={formatMoney(row.grossCents)}
        />
        <CardField label={t('reports:colNet')} value={formatMoney(row.netCents)} />
      </div>
    </ReportCardShell>
  )
}

export function ReportCategoryCard({
  row,
  t,
}: {
  row: ReportCategoryRow
  t: ReportsRowCardsT
}) {
  return (
    <ReportCardShell title={row.category} subtitle={`${row.sharePercent}%`}>
      <div style={reportsRowCardGrid}>
        <CardField
          label={t('reports:colTransactions')}
          value={row.transactionCount}
        />
        <CardField
          label={t('reports:colSum')}
          value={formatMoney(row.amountCents)}
        />
        <CardField
          label={t('reports:colShare')}
          value={`${row.sharePercent}%`}
        />
      </div>
    </ReportCardShell>
  )
}

export function ReportMerchantCard({
  row,
  t,
}: {
  row: ReportMerchantRow
  t: ReportsRowCardsT
}) {
  return (
    <ReportCardShell
      title={row.merchant}
      subtitle={formatMoney(row.revenueCents)}
    >
      <div style={reportsRowCardGrid}>
        <CardField label={t('reports:colOrders')} value={row.orders} />
        <CardField
          label={t('reports:colRevenue')}
          value={formatMoney(row.revenueCents)}
        />
        <CardField
          label={t('reports:colRefunds')}
          value={formatMoney(row.refundsCents)}
        />
      </div>
    </ReportCardShell>
  )
}

export function ReportHourlyCard({
  row,
  t,
}: {
  row: ReportHourlyRow
  t: ReportsRowCardsT
}) {
  const timeLabel = new Date(row.hour).toLocaleString()

  return (
    <ReportCardShell title={timeLabel}>
      <div style={reportsRowCardGrid}>
        <CardField label={t('reports:colHourUtc')} value={timeLabel} />
        <CardField label={t('reports:colVolume')} value={row.volume} />
        <CardField label={t('reports:colLatencyMs')} value={row.latencyMs} />
      </div>
    </ReportCardShell>
  )
}
