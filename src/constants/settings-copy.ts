import type { CurrencyCode } from '@/constants/currencies'
import type { UiLocale } from '@/constants/ui-languages'
import { normalizeCurrencySpacing } from '@/utils/format-currency'

export type SettingsCopy = {
  pageTitle: string
  applyOnSaveNote: string
  saveButton: string
  cancelButton: string
  saveSuccess: string
  generalSection: string
  languageLabel: string
  themeLabel: string
  themeLight: string
  themeDark: string
  appearanceSection: string
  primaryColorLabel: string
  fontLabel: string
  regionalSection: string
  currencyLabel: string
  previewLabel: string
  previewAmountNote: string
}

export const SETTINGS_COPY: Record<UiLocale, SettingsCopy> = {
  uz: {
    pageTitle: 'Sozlamalar',
    applyOnSaveNote:
      'O‘zgarishlar faqat «Saqlash» tugmasidan keyin ilovaga qo‘llanadi.',
    saveButton: 'Saqlash',
    cancelButton: 'Bekor qilish',
    saveSuccess: 'Sozlamalar saqlandi.',
    generalSection: 'Umumiy',
    languageLabel: 'Interfeys tili',
    themeLabel: 'Mavzu',
    themeLight: 'Yorug‘',
    themeDark: 'Qorong‘u',
    appearanceSection: 'Ko‘rinish',
    primaryColorLabel: 'Asosiy rang',
    fontLabel: 'Shrift',
    regionalSection: 'Mintaqa',
    currencyLabel: 'Pul birligi',
    previewLabel: 'Namuna',
    previewAmountNote: 'Faqat ko‘rinish (kurs konvertatsiyasi yo‘q)',
  },
  ru: {
    pageTitle: 'Настройки',
    applyOnSaveNote:
      'Изменения применяются к приложению только после нажатия «Сохранить».',
    saveButton: 'Сохранить',
    cancelButton: 'Отмена',
    saveSuccess: 'Настройки сохранены.',
    generalSection: 'Общие',
    languageLabel: 'Язык интерфейса',
    themeLabel: 'Тема',
    themeLight: 'Светлая',
    themeDark: 'Тёмная',
    appearanceSection: 'Оформление',
    primaryColorLabel: 'Основной цвет',
    fontLabel: 'Шрифт',
    regionalSection: 'Регион',
    currencyLabel: 'Валюта',
    previewLabel: 'Пример',
    previewAmountNote: 'Только отображение (без конвертации курса)',
  },
  en: {
    pageTitle: 'Settings',
    applyOnSaveNote:
      'Changes apply to the app only after you click Save.',
    saveButton: 'Save',
    cancelButton: 'Cancel',
    saveSuccess: 'Settings saved.',
    generalSection: 'General',
    languageLabel: 'Interface language',
    themeLabel: 'Theme',
    themeLight: 'Light',
    themeDark: 'Dark',
    appearanceSection: 'Appearance',
    primaryColorLabel: 'Primary color',
    fontLabel: 'Font',
    regionalSection: 'Regional',
    currencyLabel: 'Currency',
    previewLabel: 'Preview',
    previewAmountNote: 'Display only (no exchange rate)',
  },
}

export function getSettingsCopy(locale: UiLocale): SettingsCopy {
  return SETTINGS_COPY[locale] ?? SETTINGS_COPY.uz
}

export function formatSampleAmount(
  locale: UiLocale,
  currency: CurrencyCode,
): string {
  const amount = 1_234_567.89
  const map: Record<UiLocale, string> = {
    uz: 'uz-UZ',
    ru: 'ru-RU',
    en: 'en-US',
  }
  try {
    return normalizeCurrencySpacing(
      new Intl.NumberFormat(map[locale], {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
        currencyDisplay: 'narrowSymbol',
      }).format(amount),
    )
  } catch {
    return normalizeCurrencySpacing(`${amount.toFixed(0)} ${currency}`)
  }
}
