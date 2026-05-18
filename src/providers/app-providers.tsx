import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { App, ConfigProvider, theme as antdTheme } from 'antd'
import enUS from 'antd/locale/en_US'
import ruRU from 'antd/locale/ru_RU'
import { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import { RouterProvider } from 'react-router-dom'
import { FONT_PRESETS, getFontPresetById } from '@/constants/font-presets'
import {
  THEME_COLOR_PRESETS,
  getThemeColorPresetById,
} from '@/constants/theme-color-presets'
import { useAppearanceStore } from '@/hooks/appearance-store'
import { useThemeStore } from '@/hooks/theme-store'
import { useUiPreferencesStore } from '@/hooks/ui-preferences-store'
import i18n from '@/i18n/i18n'
import { appRouter } from '@/routes/app-routes'
import {
  applyAccentCssVars,
  applyFontCssVars,
} from '@/utils/apply-appearance-css-vars'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
})

function ThemedTree() {
  const resolvedMode = useThemeStore((s) => s.resolvedMode)
  const isDark = resolvedMode === 'dark'
  const primaryPresetId = useAppearanceStore((s) => s.primaryPresetId)
  const fontPresetId = useAppearanceStore((s) => s.fontPresetId)
  const uiLocale = useUiPreferencesStore((s) => s.locale)

  const colorPreset =
    getThemeColorPresetById(primaryPresetId) ?? THEME_COLOR_PRESETS[0]
  const fontPreset = getFontPresetById(fontPresetId) ?? FONT_PRESETS[0]

  const colorPrimary =
    resolvedMode === 'dark'
      ? colorPreset.colorPrimaryDark
      : colorPreset.colorPrimaryLight

  useEffect(() => {
    document.documentElement.lang = uiLocale
  }, [uiLocale])

  useEffect(() => {
    applyAccentCssVars(
      colorPreset.colorPrimaryLight,
      colorPreset.colorPrimaryDark,
      resolvedMode,
    )
  }, [
    colorPreset.colorPrimaryLight,
    colorPreset.colorPrimaryDark,
    resolvedMode,
  ])

  useEffect(() => {
    applyFontCssVars(fontPreset.fontFamily)
  }, [fontPreset.fontFamily])

  const antdLocale = uiLocale === 'ru' ? ruRU : enUS

  return (
    <ConfigProvider
      locale={antdLocale}
      theme={{
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary,
          fontFamily: fontPreset.fontFamily,
          fontSize: 15,
          fontSizeLG: 16,
          controlHeight: 44,
          controlHeightLG: 52,
          controlHeightSM: 36,
        },
      }}
    >
      <App>
        <RouterProvider router={appRouter} />
      </App>
    </ConfigProvider>
  )
}

export function AppProviders() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <ThemedTree />
      </I18nextProvider>
    </QueryClientProvider>
  )
}
