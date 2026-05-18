import type { CSSProperties } from 'react'

export const guestLayoutShell: CSSProperties = {
  flex: 1,
  width: '100%',
  minHeight: '100svh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'left',
  boxSizing: 'border-box',
  padding: 'clamp(20px, 5vw, 48px)',
  background: `
    radial-gradient(ellipse 90% 55% at 50% -15%, var(--accent-bg), transparent 55%),
    radial-gradient(ellipse 70% 45% at 110% 85%, var(--social-bg), transparent 50%),
    radial-gradient(ellipse 55% 40% at -10% 90%, var(--accent-bg), transparent 45%),
    var(--bg)
  `,
}
