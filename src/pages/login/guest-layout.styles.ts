import type { CSSProperties } from 'react'

export function guestLayoutShell(compact: boolean): CSSProperties {
  return {
    flex: 1,
    width: '100%',
    minHeight: '100svh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: compact ? 'flex-start' : 'center',
    textAlign: 'left',
    boxSizing: 'border-box',
    padding: compact
      ? 'max(8px, env(safe-area-inset-top, 0px)) max(12px, env(safe-area-inset-right, 0px)) max(12px, env(safe-area-inset-bottom, 0px)) max(12px, env(safe-area-inset-left, 0px))'
      : 'clamp(20px, 5vw, 48px)',
    overflowY: compact ? 'auto' : undefined,
    WebkitOverflowScrolling: compact ? 'touch' : undefined,
    background: `
    radial-gradient(ellipse 90% 55% at 50% -15%, var(--accent-bg), transparent 55%),
    radial-gradient(ellipse 70% 45% at 110% 85%, var(--social-bg), transparent 50%),
    radial-gradient(ellipse 55% 40% at -10% 90%, var(--accent-bg), transparent 45%),
    var(--bg)
  `,
  }
}
