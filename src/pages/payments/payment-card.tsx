import type { TFunction } from 'i18next'
import type { ReactNode } from 'react'
import { Card, Tag, Typography, theme } from 'antd'
import type { Payment, PaymentStatus } from '@/types/payment'
import { formatCurrencyMinorUnits } from '@/utils/format-currency'

const STATUS_TAG_COLOR: Record<PaymentStatus, string> = {
  pending: 'gold',
  paid: 'green',
  failed: 'red',
}

type PaymentCardProps = {
  payment: Payment
  index: number
  statusLabel: string
  t: TFunction<['payments', 'common']>
}

function CardField({
  label,
  value,
}: {
  label: string
  value: ReactNode
}) {
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

export function PaymentCard({
  payment,
  index,
  statusLabel,
  t,
}: PaymentCardProps) {
  const { token } = theme.useToken()
  const amount = formatCurrencyMinorUnits(payment.amountCents, {
    currency: payment.currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  })
  const fee = formatCurrencyMinorUnits(payment.feeCents, {
    currency: payment.currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  })

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
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 8,
          }}
        >
          <div style={{ minWidth: 0, flex: 1 }}>
            <Typography.Text
              strong
              style={{
                display: 'block',
                fontSize: 14,
                lineHeight: 1.3,
                color: 'var(--text-h)',
              }}
            >
              {amount}
            </Typography.Text>
            <Typography.Text
              type="secondary"
              style={{
                display: 'block',
                fontSize: 11,
                lineHeight: 1.35,
                marginTop: 2,
              }}
            >
              {payment.id}
            </Typography.Text>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 4,
              flexShrink: 0,
            }}
          >
            <Typography.Text type="secondary" style={{ fontSize: 11 }}>
              #{index}
            </Typography.Text>
            <Tag
              color={STATUS_TAG_COLOR[payment.status]}
              style={{ margin: 0, fontSize: 11 }}
            >
              {statusLabel}
            </Tag>
          </div>
        </div>

        <Typography.Text
          strong
          style={{ fontSize: 13, lineHeight: 1.3, color: 'var(--text-h)' }}
        >
          {payment.merchantName}
        </Typography.Text>
        <Typography.Text
          type="secondary"
          style={{ fontSize: 11, wordBreak: 'break-word' }}
        >
          {payment.customerEmail}
        </Typography.Text>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 10,
            marginTop: 4,
          }}
        >
          <CardField label={t('payments:colMethod')} value={payment.method} />
          <CardField label={t('payments:colCategory')} value={payment.category} />
          <CardField label={t('payments:colFee')} value={fee} />
          <CardField label={t('payments:colCity')} value={payment.city} />
          <CardField
            label={t('payments:colRef')}
            value={payment.externalRef}
          />
          <CardField
            label={t('payments:colCreated')}
            value={new Date(payment.createdAt).toLocaleString()}
          />
        </div>
      </div>
    </Card>
  )
}
