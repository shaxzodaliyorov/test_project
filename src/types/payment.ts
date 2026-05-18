export type PaymentStatus = 'pending' | 'paid' | 'failed'

export type PaymentMethod = 'card' | 'bank_transfer' | 'wallet'

export type Payment = {
  id: string
  amountCents: number
  feeCents: number
  currency: string
  status: PaymentStatus
  method: PaymentMethod
  category: string
  merchantName: string
  customerEmail: string
  externalRef: string
  city: string
  description: string
  createdAt: string
  settledAt: string | null
}

export type PaymentsListResponse = {
  items: Payment[]
  total: number
  page: number
  pageSize: number
}
