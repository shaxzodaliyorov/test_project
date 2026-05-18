export type CurrencyCode = 'UZS' | 'USD' | 'RUB'

export type CurrencyOption = {
  code: CurrencyCode
  labelNative: string
  intlCurrency: string
}

export const CURRENCIES: readonly CurrencyOption[] = [
  { code: 'UZS', labelNative: "So'm (UZS)", intlCurrency: 'UZS' },
  { code: 'USD', labelNative: 'Dollar (USD)', intlCurrency: 'USD' },
  { code: 'RUB', labelNative: 'Rubl (RUB)', intlCurrency: 'RUB' },
] as const

export const DEFAULT_CURRENCY_CODE: CurrencyCode = 'UZS'
