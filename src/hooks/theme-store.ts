import { create } from 'zustand'

export type ThemeMode = 'light' | 'dark'
export type ThemePreference = 'light' | 'dark' | 'system'

const PREFERENCE_KEY = 'theme-preference'
const LEGACY_MODE_KEY = 'theme-mode'

function systemPrefersDark(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/** No stored keys: default to system (same as old un-set behaviour). */
function readStoredPreferenceWithLegacyDefaults(): ThemePreference {
  if (typeof window === 'undefined') return 'light'
  const pref = localStorage.getItem(PREFERENCE_KEY)
  if (pref === 'light' || pref === 'dark' || pref === 'system') {
    return pref
  }
  const legacy = localStorage.getItem(LEGACY_MODE_KEY)
  if (legacy === 'light' || legacy === 'dark') {
    localStorage.setItem(PREFERENCE_KEY, legacy)
    return legacy
  }
  return 'system'
}

export function resolveThemeMode(preference: ThemePreference): ThemeMode {
  if (preference === 'system') {
    return systemPrefersDark() ? 'dark' : 'light'
  }
  return preference
}

export function applyThemeToDocument(mode: ThemeMode): void {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.theme = mode
  document.documentElement.style.setProperty('color-scheme', mode)
}

let systemMql: MediaQueryList | null = null

function onSystemColorSchemeChange(): void {
  const { preference } = useThemeStore.getState()
  if (preference !== 'system') return
  const resolved = systemPrefersDark() ? 'dark' : 'light'
  applyThemeToDocument(resolved)
  useThemeStore.setState({ resolvedMode: resolved })
}

function syncSystemMediaListener(preference: ThemePreference): void {
  if (typeof window === 'undefined') return
  if (preference === 'system') {
    if (!systemMql) {
      systemMql = window.matchMedia('(prefers-color-scheme: dark)')
      systemMql.addEventListener('change', onSystemColorSchemeChange)
    }
  } else if (systemMql) {
    systemMql.removeEventListener('change', onSystemColorSchemeChange)
    systemMql = null
  }
}

type ThemeState = {
  preference: ThemePreference
  resolvedMode: ThemeMode
  setPreference: (preference: ThemePreference) => void
  toggleResolved: () => void
}

const initialPreference = readStoredPreferenceWithLegacyDefaults()
const initialResolved = resolveThemeMode(initialPreference)
applyThemeToDocument(initialResolved)

export const useThemeStore = create<ThemeState>((set, get) => ({
  preference: initialPreference,
  resolvedMode: initialResolved,
  setPreference: (preference) => {
    const resolvedMode = resolveThemeMode(preference)
    localStorage.setItem(PREFERENCE_KEY, preference)
    applyThemeToDocument(resolvedMode)
    syncSystemMediaListener(preference)
    set({ preference, resolvedMode })
  },
  toggleResolved: () => {
    const next: ThemeMode =
      get().resolvedMode === 'light' ? 'dark' : 'light'
    get().setPreference(next)
  },
}))

syncSystemMediaListener(initialPreference)
