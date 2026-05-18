import type { CSSProperties } from 'react'

export const mainLayoutShell: CSSProperties = {
  minHeight: '100vh',
  background: 'var(--bg)',
}

export const mainLayoutSider: CSSProperties = {
  background: 'var(--bg)',
  borderRight: '1px solid var(--border)',
  borderLeft: '3px solid var(--accent)',
  boxShadow: '2px 0 12px color-mix(in srgb, var(--text-h) 6%, transparent)',
}

export const mainLayoutSiderInner: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  paddingTop: 8,
  paddingInline: 8,
}

export const mainLayoutSiderBrand: CSSProperties = {
  flexShrink: 0,
  marginBottom: 8,
  padding: '10px 12px',
  borderRadius: 10,
  border: '1px solid var(--border)',
  background: 'color-mix(in srgb, var(--bg) 88%, var(--accent-bg))',
  cursor: 'pointer',
  textAlign: 'left',
  transition: 'background 0.15s ease, border-color 0.15s ease',
}

export const mainLayoutSiderBrandRow: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  minWidth: 0,
}

export const mainLayoutSiderBrandTitle: CSSProperties = {
  display: 'block',
  margin: 0,
  fontSize: 22,
  fontWeight: 700,
  color: 'var(--text-h)',
  letterSpacing: '0.06em',
  lineHeight: 1.1,
}

export const mainLayoutSiderBrandSubtitle: CSSProperties = {
  margin: '4px 0 0',
  fontSize: 12,
  color: 'var(--text)',
  lineHeight: 1.2,
}

export const mainLayoutSiderBrandAccent: CSSProperties = {
  height: 2,
  marginTop: 8,
  borderRadius: 2,
  background: 'var(--accent)',
  opacity: 0.85,
}

export const mainLayoutMenu: CSSProperties = {
  flex: 1,
  border: 'none',
  background: 'transparent',
  marginTop: 4,
  borderRadius: 8,
}

export const mainLayoutInner: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  background: 'color-mix(in srgb, var(--bg) 96%, var(--accent-bg))',
  textAlign: 'left',
}

/** Main scroll area around `<Outlet />` — light padding from header / edges. */
export const mainLayoutContentArea: CSSProperties = {
  flex: 1,
  minHeight: 0,
  padding: '16px 24px',
}

export const mainLayoutContentAreaCompact: CSSProperties = {
  padding: '12px 16px',
}

/** Wide tables (e.g. admin users): horizontal scroll inside padded content. */
export const mainLayoutContentTableFriendly: CSSProperties = {
  overflowX: 'auto',
}

export const mainLayoutHeaderBar: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingInline: 24,
  height: 64,
  lineHeight: '64px',
  background: 'color-mix(in srgb, var(--bg) 82%, transparent)',
  backdropFilter: 'saturate(180%) blur(12px)',
  WebkitBackdropFilter: 'saturate(180%) blur(12px)',
  borderBottom: '1px solid var(--border)',
  position: 'sticky',
  top: 0,
  zIndex: 10,
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

export const mainLayoutUserTrigger: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  height: 40,
  paddingInline: 10,
  borderRadius: 999,
  border: '1px solid var(--border)',
  background: 'color-mix(in srgb, var(--bg) 70%, var(--accent-bg))',
  color: 'var(--text-h)',
  fontWeight: 500,
  maxWidth: 220,
}

export const mainLayoutUserTriggerName: CSSProperties = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  flex: 1,
  minWidth: 0,
  textAlign: 'left',
}

export const mainLayoutUserAvatar: CSSProperties = {
  background: 'var(--accent)',
  color: '#fff',
  fontWeight: 600,
  fontSize: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

export const mainLayoutUserTriggerChevron: CSSProperties = {
  fontSize: 10,
  flexShrink: 0,
  color: 'var(--text)',
}
