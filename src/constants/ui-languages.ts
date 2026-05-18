export type UiLocale = 'uz' | 'ru' | 'en'

export const UI_LOCALES: readonly {
  code: UiLocale
  labelNative: string
}[] = [
  { code: 'uz', labelNative: "O'zbek" },
  { code: 'ru', labelNative: 'Русский' },
  { code: 'en', labelNative: 'English' },
] as const

export const DEFAULT_UI_LOCALE: UiLocale = 'uz'
