import { create } from 'zustand'
import {
  DEFAULT_FONT_PRESET_ID,
  getFontPresetById,
} from '@/constants/font-presets'
import {
  DEFAULT_THEME_COLOR_PRESET_ID,
  getThemeColorPresetById,
} from '@/constants/theme-color-presets'

const STORAGE_KEY = 'appearance-preferences'

type Stored = {
  primaryPresetId?: string
  fontPresetId?: string
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
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...prev, ...partial }),
  )
}

function normalizePrimaryId(id: string | undefined): string {
  if (id && getThemeColorPresetById(id)) return id
  return DEFAULT_THEME_COLOR_PRESET_ID
}

function normalizeFontId(id: string | undefined): string {
  if (id && getFontPresetById(id)) return id
  return DEFAULT_FONT_PRESET_ID
}

const stored = readStored()
const initialPrimary = normalizePrimaryId(stored.primaryPresetId)
const initialFont = normalizeFontId(stored.fontPresetId)

type AppearanceState = {
  primaryPresetId: string
  fontPresetId: string
  setPrimaryPresetId: (id: string) => void
  setFontPresetId: (id: string) => void
}

export const useAppearanceStore = create<AppearanceState>((set) => ({
  primaryPresetId: initialPrimary,
  fontPresetId: initialFont,
  setPrimaryPresetId: (id) => {
    const next = normalizePrimaryId(id)
    persist({ primaryPresetId: next })
    set({ primaryPresetId: next })
  },
  setFontPresetId: (id) => {
    const next = normalizeFontId(id)
    persist({ fontPresetId: next })
    set({ fontPresetId: next })
  },
}))
