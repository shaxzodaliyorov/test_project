export type ThemeColorPreset = {
  id: string
  colorPrimaryLight: string
  colorPrimaryDark: string
}

export const THEME_COLOR_PRESETS: readonly ThemeColorPreset[] = [
  {
    id: 'violet',
    colorPrimaryLight: '#aa3bff',
    colorPrimaryDark: '#c084fc',
  },
  {
    id: 'blue',
    colorPrimaryLight: '#1677ff',
    colorPrimaryDark: '#69b1ff',
  },
  {
    id: 'teal',
    colorPrimaryLight: '#0d9488',
    colorPrimaryDark: '#2dd4bf',
  },
  {
    id: 'amber',
    colorPrimaryLight: '#d97706',
    colorPrimaryDark: '#fbbf24',
  },
  {
    id: 'rose',
    colorPrimaryLight: '#e11d48',
    colorPrimaryDark: '#fb7185',
  },
] as const

export const DEFAULT_THEME_COLOR_PRESET_ID = THEME_COLOR_PRESETS[0].id

export function getThemeColorPresetById(
  id: string,
): ThemeColorPreset | undefined {
  return THEME_COLOR_PRESETS.find((p) => p.id === id)
}
