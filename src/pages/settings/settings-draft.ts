import type { CurrencyCode } from '@/constants/currencies'
import type { UiLocale } from '@/constants/ui-languages'
import { useAppearanceStore } from '@/hooks/appearance-store'
import type { ThemePreference } from '@/hooks/theme-store'
import { useThemeStore } from '@/hooks/theme-store'
import { useUiPreferencesStore } from '@/hooks/ui-preferences-store'

export type SettingsDraft = {
  locale: UiLocale
  themePreference: ThemePreference
  primaryPresetId: string
  fontPresetId: string
  currency: CurrencyCode
}

export function readDraftFromStores(): SettingsDraft {
  const theme = useThemeStore.getState()
  const appearance = useAppearanceStore.getState()
  const ui = useUiPreferencesStore.getState()
  return {
    locale: ui.locale,
    themePreference: theme.preference,
    primaryPresetId: appearance.primaryPresetId,
    fontPresetId: appearance.fontPresetId,
    currency: ui.currency,
  }
}

export function commitDraftToStores(draft: SettingsDraft): void {
  useThemeStore.getState().setPreference(draft.themePreference)
  useAppearanceStore.getState().setPrimaryPresetId(draft.primaryPresetId)
  useAppearanceStore.getState().setFontPresetId(draft.fontPresetId)
  useUiPreferencesStore.getState().setCurrency(draft.currency)
  useUiPreferencesStore.getState().setLocale(draft.locale)
}

export function isDraftDirty(a: SettingsDraft, b: SettingsDraft): boolean {
  return (
    a.locale !== b.locale ||
    a.themePreference !== b.themePreference ||
    a.primaryPresetId !== b.primaryPresetId ||
    a.fontPresetId !== b.fontPresetId ||
    a.currency !== b.currency
  )
}
