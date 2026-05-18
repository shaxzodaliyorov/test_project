import { create } from 'zustand'

export type ThemeMode = 'light' | 'dark'
export type ThemePreference = ThemeMode

const PREFERENCE_KEY = 'theme-preference'
const LEGACY_MODE_KEY = 'theme-mode'
const RESOLVED_KEY = 'theme-resolved'

function systemPrefersDark(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * Birinchi kirish: saqlangan qiymat bo‘lmasa yoki `system` bo‘lsa — OS `prefers-color-scheme`
 * bo‘yicha `light`/`dark` tanlanadi va `theme-preference` ga yoziladi (UI da "Tizim" yo‘q).
 */
function readStoredPreferenceWithLegacyDefaults(): ThemePreference {
  if (typeof window === 'undefined') return 'light'
  let pref = localStorage.getItem(PREFERENCE_KEY)
  if (pref === 'system') {
    const migrated: ThemePreference = systemPrefersDark() ? 'dark' : 'light'
    localStorage.setItem(PREFERENCE_KEY, migrated)
    pref = migrated
  }
  if (pref === 'light' || pref === 'dark') {
    return pref
  }
  const legacy = localStorage.getItem(LEGACY_MODE_KEY)
  if (legacy === 'light' || legacy === 'dark') {
    localStorage.setItem(PREFERENCE_KEY, legacy)
    return legacy
  }
  const initial: ThemePreference = systemPrefersDark() ? 'dark' : 'light'
  try {
    localStorage.setItem(PREFERENCE_KEY, initial)
  } catch {
    /* private mode */
  }
  return initial
}

function persistResolvedTheme(mode: ThemeMode): void {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(RESOLVED_KEY, mode)
    localStorage.setItem(LEGACY_MODE_KEY, mode)
  } catch {
    /* private mode / quota */
  }
}

export function applyThemeToDocument(mode: ThemeMode): void {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.theme = mode
  document.documentElement.style.setProperty('color-scheme', mode)
  persistResolvedTheme(mode)
}

function onThemeStorageEvent(e: StorageEvent): void {
  if (e.storageArea !== localStorage) return
  if (e.key !== PREFERENCE_KEY) return
  const v = e.newValue
  if (v !== 'light' && v !== 'dark') return
  applyThemeToDocument(v)
  useThemeStore.setState({ preference: v, resolvedMode: v })
}

function initThemeCrossTabSync(): void {
  if (typeof window === 'undefined') return
  window.addEventListener('storage', onThemeStorageEvent)
}

type ThemeState = {
  preference: ThemePreference
  resolvedMode: ThemeMode
  setPreference: (preference: ThemePreference) => void
  toggleResolved: () => void
}

const initialPreference = readStoredPreferenceWithLegacyDefaults()

applyThemeToDocument(initialPreference)

export const useThemeStore = create<ThemeState>((set, get) => ({
  preference: initialPreference,
  resolvedMode: initialPreference,
  setPreference: (preference) => {
    if (preference !== 'light' && preference !== 'dark') return
    localStorage.setItem(PREFERENCE_KEY, preference)
    applyThemeToDocument(preference)
    set({ preference, resolvedMode: preference })
  },
  toggleResolved: () => {
    const next: ThemeMode =
      get().resolvedMode === 'light' ? 'dark' : 'light'
    get().setPreference(next)
  },
}))

initThemeCrossTabSync()
