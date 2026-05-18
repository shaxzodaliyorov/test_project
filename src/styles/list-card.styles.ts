import type { CSSProperties } from 'react'
import type { GlobalToken } from 'antd/es/theme/interface'

export const listCardWidth: CSSProperties = {
  width: '100%',
}

export function listCardBody(token: GlobalToken): CSSProperties {
  return {
    padding: token.paddingSM,
    background: token.colorFillQuaternary,
  }
}

export function listCardStack(token: GlobalToken): CSSProperties {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: token.marginXS,
  }
}

export const listCardHeaderRow: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: 8,
}

export const listCardHeaderMain: CSSProperties = {
  minWidth: 0,
  flex: 1,
}

export const listCardHeaderAside: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: 4,
  flexShrink: 0,
}

export const listCardTitle: CSSProperties = {
  display: 'block',
  fontSize: 14,
  lineHeight: 1.3,
  color: 'var(--text-h)',
}

export const listCardSubtitle: CSSProperties = {
  display: 'block',
  fontSize: 11,
  lineHeight: 1.35,
  marginTop: 2,
}

export const listCardSubtitleBreak: CSSProperties = {
  ...listCardSubtitle,
  wordBreak: 'break-word',
}

export const listCardIndex: CSSProperties = {
  fontSize: 11,
  flexShrink: 0,
}

export const listCardMerchantTitle: CSSProperties = {
  fontSize: 13,
  lineHeight: 1.3,
  color: 'var(--text-h)',
}

export const listCardEmail: CSSProperties = {
  fontSize: 11,
  wordBreak: 'break-word',
}

export const listCardTag: CSSProperties = {
  margin: 0,
  fontSize: 11,
}

export const listCardFieldRoot: CSSProperties = {
  minWidth: 0,
}

export const listCardFieldLabel: CSSProperties = {
  fontSize: 10,
  display: 'block',
  marginBottom: 2,
}

export const listCardFieldValue: CSSProperties = {
  fontSize: 11,
  lineHeight: 1.35,
  display: 'block',
  wordBreak: 'break-word',
  color: 'var(--text-h)',
}

export const listCardFieldGrid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: 10,
  marginTop: 4,
}

export const listCardRolesLabel: CSSProperties = {
  fontSize: 10,
  display: 'block',
  marginBottom: 4,
}

export const listCardActions: CSSProperties = {
  marginTop: 4,
}

export const listCardActionButton: CSSProperties = {
  fontSize: 12,
}

export const listCardShellTitleBlock: CSSProperties = {
  minWidth: 0,
}
