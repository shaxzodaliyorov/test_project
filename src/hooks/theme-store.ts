import { create } from 'zustand'

export type ThemeMode = 'light' | 'dark'

const STORAGE_KEY = 'theme-mode'

function readStoredMode(): ThemeMode | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw === 'light' || raw === 'dark' ? raw : null
}

function systemPrefersDark(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function getInitialThemeMode(): ThemeMode {
  return readStoredMode() ?? (systemPrefersDark() ? 'dark' : 'light')
}

export function applyThemeToDocument(mode: ThemeMode): void {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.theme = mode
  document.documentElement.style.setProperty('color-scheme', mode)
}

type ThemeState = {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  toggleMode: () => void
}

const initialMode = getInitialThemeMode()
applyThemeToDocument(initialMode)

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: initialMode,
  setMode: (mode) => {
    localStorage.setItem(STORAGE_KEY, mode)
    applyThemeToDocument(mode)
    set({ mode })
  },
  toggleMode: () => {
    const next: ThemeMode = get().mode === 'light' ? 'dark' : 'light'
    localStorage.setItem(STORAGE_KEY, next)
    applyThemeToDocument(next)
    set({ mode: next })
  },
}))
