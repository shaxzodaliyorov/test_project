import type { CSSProperties } from 'react'

export const mainLayoutShell: CSSProperties = {
  minHeight: 0,
  height: '100svh',
  maxHeight: '100svh',
  overflow: 'hidden',
  background: 'var(--bg)',
  textAlign: 'left',
}

export const mainLayoutSider: CSSProperties = {
  background: 'var(--bg)',
  borderRight: '1px solid var(--border)',
  borderLeft: '3px solid var(--accent)',
  boxShadow: '2px 0 12px color-mix(in srgb, var(--text-h) 6%, transparent)',
  height: '100%',
  flexShrink: 0,
  overflow: 'hidden',
}

export const mainLayoutSiderInner: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  maxHeight: '100%',
  paddingTop: 8,
  paddingInline: 8,
  overflowY: 'auto',
  overflowX: 'hidden',
  boxSizing: 'border-box',
  textAlign: 'left',
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
  justifyContent: 'flex-start',
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
  textAlign: 'left',
}

export const mainLayoutInner: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minWidth: 0,
  minHeight: 0,
  overflow: 'hidden',
  background: 'color-mix(in srgb, var(--bg) 96%, var(--accent-bg))',
  textAlign: 'left',
}

/** Main scroll area around `<Outlet />` — light padding from header / edges. */
export const mainLayoutContentArea: CSSProperties = {
  flex: 1,
  minHeight: 0,
  width: '100%',
  boxSizing: 'border-box',
  overflowY: 'auto',
  WebkitOverflowScrolling: 'touch',
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

export const mainLayoutHeaderBarCompact: CSSProperties = {
  ...mainLayoutHeaderBar,
  paddingInline: 16,
  height: 56,
  lineHeight: '56px',
}

export const mainLayoutHeaderBrandRow: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  minWidth: 0,
}

export const mainLayoutHeaderBrandCompact: CSSProperties = {
  margin: 0,
  fontSize: 16,
  fontWeight: 700,
  color: 'var(--text-h)',
  letterSpacing: '0.06em',
  lineHeight: 1.1,
}

export const mainLayoutUserTriggerCompact: CSSProperties = {
  ...mainLayoutUserTrigger,
  paddingInline: 6,
  minWidth: 40,
  maxWidth: 40,
  justifyContent: 'center',
}

/** Tab bar (56px) + safe area + gap so scroll content does not sit under the bar. */
export const mainLayoutContentWithBottomNav: CSSProperties = {
  paddingBottom:
    'calc(56px + env(safe-area-inset-bottom, 0px) + 20px)',
}

export const mainLayoutBottomNav: CSSProperties = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  display: 'flex',
  alignItems: 'stretch',
  minHeight: 56,
  paddingBottom: 'env(safe-area-inset-bottom, 0px)',
  background: 'color-mix(in srgb, var(--bg) 82%, transparent)',
  backdropFilter: 'saturate(180%) blur(12px)',
  WebkitBackdropFilter: 'saturate(180%) blur(12px)',
  borderTop: '1px solid var(--border)',
  boxSizing: 'border-box',
}

export const mainLayoutBottomNavItem: CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
  minWidth: 0,
  minHeight: 56,
  padding: '6px 4px',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  color: 'var(--text)',
  fontFamily: 'inherit',
  fontSize: 10,
  fontWeight: 500,
  lineHeight: 1.2,
  WebkitTapHighlightColor: 'transparent',
  transition: 'color 0.15s ease',
}

export const mainLayoutBottomNavItemActive: CSSProperties = {
  color: 'var(--accent)',
}

export const mainLayoutBottomNavIcon: CSSProperties = {
  fontSize: 20,
  lineHeight: 1,
}

export const mainLayoutBottomNavLabel: CSSProperties = {
  maxWidth: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  textAlign: 'center',
}

export const mainLayoutBottomNavProfile: CSSProperties = {
  flex: '0 0 56px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 56,
  borderLeft: '1px solid var(--border)',
  boxSizing: 'border-box',
}

export const mainLayoutBottomNavProfileButton: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  padding: 0,
  border: 'none',
  borderRadius: '50%',
  background: 'transparent',
  cursor: 'pointer',
  WebkitTapHighlightColor: 'transparent',
}
