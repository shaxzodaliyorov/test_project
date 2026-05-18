import type { UiLocale } from '@/constants/ui-languages'

const STORAGE_KEY = 'ui-preferences'

function readStoredLocaleRaw(): string | undefined {
  if (typeof window === 'undefined') return undefined
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return undefined
    const j = JSON.parse(raw) as { locale?: string }
    return j.locale
  } catch {
    return undefined
  }
}

function isUiLocale(x: string | undefined): x is UiLocale {
  return x === 'uz' || x === 'ru' || x === 'en'
}

function mapNavigatorToUiLocale(): UiLocale {
  if (typeof navigator === 'undefined') return 'uz'
  const nav = (navigator.language || '').toLowerCase()
  if (nav.startsWith('ru')) return 'ru'
  if (nav.startsWith('uz')) return 'uz'
  if (nav.startsWith('en')) return 'en'
  return 'uz'
}

export function resolveInitialUiLocale(): UiLocale {
  const stored = readStoredLocaleRaw()
  if (isUiLocale(stored)) return stored
  return mapNavigatorToUiLocale()
}
