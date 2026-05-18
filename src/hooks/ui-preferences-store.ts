import { create } from 'zustand'
import { DEFAULT_CURRENCY_CODE, type CurrencyCode } from '@/constants/currencies'
import type { UiLocale } from '@/constants/ui-languages'
import i18n from '@/i18n/i18n'
import { resolveInitialUiLocale } from '@/utils/resolve-initial-ui-locale'

const STORAGE_KEY = 'ui-preferences'

type Stored = {
  locale?: string
  currency?: string
}

function readStored(): Stored {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Stored
  } catch {
    return {}
  }
}

function persist(partial: Stored): void {
  if (typeof window === 'undefined') return
  const prev = readStored()
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prev, ...partial }))
}

function isCurrency(x: string | undefined): x is CurrencyCode {
  return x === 'UZS' || x === 'USD' || x === 'RUB'
}

const stored = readStored()
const initialLocale: UiLocale = resolveInitialUiLocale()
const initialCurrency: CurrencyCode = isCurrency(stored.currency)
  ? stored.currency
  : DEFAULT_CURRENCY_CODE

type UiPreferencesState = {
  locale: UiLocale
  currency: CurrencyCode
  setLocale: (locale: UiLocale) => void
  setCurrency: (currency: CurrencyCode) => void
}

export const useUiPreferencesStore = create<UiPreferencesState>((set) => ({
  locale: initialLocale,
  currency: initialCurrency,
  setLocale: (locale) => {
    persist({ locale })
    set({ locale })
    void i18n.changeLanguage(locale)
  },
  setCurrency: (currency) => {
    persist({ currency })
    set({ currency })
  },
}))
