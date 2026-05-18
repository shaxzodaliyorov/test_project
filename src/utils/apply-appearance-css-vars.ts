import type { ThemeMode } from '@/hooks/theme-store'

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '').trim()
  const full =
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h
  const n = Number.parseInt(full, 16)
  if (Number.isNaN(n) || full.length !== 6) {
    return [170, 59, 255]
  }
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export function applyAccentCssVars(
  primaryLight: string,
  primaryDark: string,
  resolvedMode: ThemeMode,
): void {
  if (typeof document === 'undefined') return
  const hex = resolvedMode === 'dark' ? primaryDark : primaryLight
  const [r, g, b] = hexToRgb(hex)
  const root = document.documentElement
  root.style.setProperty('--accent', hex)
  const bgAlpha = resolvedMode === 'dark' ? 0.15 : 0.1
  const borderAlpha = 0.5
  root.style.setProperty(
    '--accent-bg',
    `rgba(${r}, ${g}, ${b}, ${bgAlpha})`,
  )
  root.style.setProperty(
    '--accent-border',
    `rgba(${r}, ${g}, ${b}, ${borderAlpha})`,
  )
}

export function applyFontCssVars(fontFamily: string): void {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.style.setProperty('--sans', fontFamily)
  root.style.setProperty('--heading', fontFamily)
}
