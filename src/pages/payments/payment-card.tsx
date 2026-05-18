import type { TFunction } from 'i18next'
import type { ReactNode } from 'react'
import { Card, Tag, Typography, theme } from 'antd'
import type { Payment, PaymentStatus } from '@/types/payment'
import { formatCurrencyMinorUnits } from '@/utils/format-currency'
import {
  paymentCardBody,
  paymentCardEmail,
  paymentCardFieldGrid,
  paymentCardFieldLabel,
  paymentCardFieldRoot,
  paymentCardFieldValue,
  paymentCardHeaderAside,
  paymentCardHeaderMain,
  paymentCardHeaderRow,
  paymentCardIndex,
  paymentCardMerchantTitle,
  paymentCardStack,
  paymentCardSubtitle,
  paymentCardTag,
  paymentCardTitle,
  paymentCardWidth,
} from './payment-card.styles'

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
    <div style={paymentCardFieldRoot}>
      <Typography.Text type="secondary" style={paymentCardFieldLabel}>
        {label}
      </Typography.Text>
      <Typography.Text style={paymentCardFieldValue}>{value}</Typography.Text>
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
      style={paymentCardWidth}
      styles={{ body: paymentCardBody(token) }}
    >
      <div style={paymentCardStack(token)}>
        <div style={paymentCardHeaderRow}>
          <div style={paymentCardHeaderMain}>
            <Typography.Text strong style={paymentCardTitle}>
              {amount}
            </Typography.Text>
            <Typography.Text type="secondary" style={paymentCardSubtitle}>
              {payment.id}
            </Typography.Text>
          </div>
          <div style={paymentCardHeaderAside}>
            <Typography.Text type="secondary" style={paymentCardIndex}>
              #{index}
            </Typography.Text>
            <Tag color={STATUS_TAG_COLOR[payment.status]} style={paymentCardTag}>
              {statusLabel}
            </Tag>
          </div>
        </div>

        <Typography.Text strong style={paymentCardMerchantTitle}>
          {payment.merchantName}
        </Typography.Text>
        <Typography.Text type="secondary" style={paymentCardEmail}>
          {payment.customerEmail}
        </Typography.Text>

        <div style={paymentCardFieldGrid}>
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
