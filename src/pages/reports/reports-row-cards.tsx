import type { TFunction } from 'i18next'
import type { CSSProperties, ReactNode } from 'react'
import { Card, Typography, theme } from 'antd'
import type {
  ReportCategoryRow,
  ReportDailyPoint,
  ReportHourlyRow,
  ReportMerchantRow,
  ReportMonthlyRow,
} from '@/types/reports'
import { formatMoney } from './reports-format'

type ReportsRowCardsT = TFunction<['reports', 'common']>

const cardGrid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: 10,
  marginTop: 4,
}

function CardField({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div style={{ minWidth: 0 }}>
      <Typography.Text
        type="secondary"
        style={{ fontSize: 10, display: 'block', marginBottom: 2 }}
      >
        {label}
      </Typography.Text>
      <Typography.Text
        style={{
          fontSize: 11,
          lineHeight: 1.35,
          display: 'block',
          wordBreak: 'break-word',
          color: 'var(--text-h)',
        }}
      >
        {value}
      </Typography.Text>
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
      style={{ width: '100%' }}
      styles={{
        body: {
          padding: token.paddingSM,
          background: token.colorFillQuaternary,
        },
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: token.marginXS,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <Typography.Text
            strong
            style={{
              display: 'block',
              fontSize: 14,
              lineHeight: 1.3,
              color: 'var(--text-h)',
            }}
          >
            {title}
          </Typography.Text>
          {subtitle ? (
            <Typography.Text
              type="secondary"
              style={{
                display: 'block',
                fontSize: 11,
                lineHeight: 1.35,
                marginTop: 2,
                wordBreak: 'break-word',
              }}
            >
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
      <div style={cardGrid}>
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
      <div style={cardGrid}>
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
      <div style={cardGrid}>
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
      <div style={cardGrid}>
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
      <div style={cardGrid}>
        <CardField label={t('reports:colHourUtc')} value={timeLabel} />
        <CardField label={t('reports:colVolume')} value={row.volume} />
        <CardField label={t('reports:colLatencyMs')} value={row.latencyMs} />
      </div>
    </ReportCardShell>
  )
}
