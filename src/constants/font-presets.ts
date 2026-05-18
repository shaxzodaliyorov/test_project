export type FontPreset = {
  id: string
  label: string
  fontFamily: string
}

export const FONT_PRESETS: readonly FontPreset[] = [
  {
    id: 'system',
    label: 'System UI',
    fontFamily:
      "system-ui, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },
  {
    id: 'humanist',
    label: 'Humanist',
    fontFamily:
      "Inter, system-ui, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },
  {
    id: 'serif',
    label: 'Serif',
    fontFamily: "Georgia, 'Times New Roman', Times, serif",
  },
  {
    id: 'mono',
    label: 'Monospace',
    fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace",
  },
] as const

export const DEFAULT_FONT_PRESET_ID = FONT_PRESETS[0].id

export function getFontPresetById(id: string): FontPreset | undefined {
  return FONT_PRESETS.find((p) => p.id === id)
}
