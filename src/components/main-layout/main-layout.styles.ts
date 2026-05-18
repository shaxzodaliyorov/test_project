import type { CSSProperties } from 'react'

export const mainLayoutShell: CSSProperties = {
  minHeight: '100vh',
  background: 'var(--bg)',
}

export const mainLayoutSider: CSSProperties = {
  background: 'var(--bg)',
  borderRight: '1px solid var(--border)',
  boxShadow: '2px 0 12px color-mix(in srgb, var(--text-h) 6%, transparent)',
}

export const mainLayoutSiderInner: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  paddingTop: 12,
}

export const mainLayoutMenu: CSSProperties = {
  flex: 1,
  border: 'none',
  background: 'transparent',
  marginTop: 8,
}

export const mainLayoutInner: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  background: 'color-mix(in srgb, var(--bg) 96%, var(--accent-bg))',
}

export const mainLayoutHeaderBar: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingInline: 24,
  height: 64,
  lineHeight: '64px',
  background: 'var(--bg)',
  borderBottom: '1px solid var(--border)',
  position: 'sticky',
  top: 0,
  zIndex: 5,
}

export const mainLayoutHeaderBrand: CSSProperties = {
  margin: 0,
  fontSize: 18,
  fontWeight: 600,
  color: 'var(--text-h)',
  letterSpacing: '-0.02em',
}

export const mainLayoutHeaderRight: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
}

export const mainLayoutUserName: CSSProperties = {
  color: 'var(--text)',
  fontSize: 14,
}

export const mainLayoutContent: CSSProperties = {
  flex: 1,
  margin: 24,
  padding: 24,
  borderRadius: 12,
  background: 'var(--bg)',
  border: '1px solid var(--border)',
  boxShadow: 'var(--shadow)',
  minHeight: 0,
}
