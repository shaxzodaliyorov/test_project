import type { ReactNode } from 'react'
import { Card, theme } from 'antd'
import { listCardBody, listCardStack, listCardWidth } from '@/styles/list-card.styles'

type SkeletonCardShellProps = {
  children: ReactNode
}

export function SkeletonCardShell({ children }: SkeletonCardShellProps) {
  const { token } = theme.useToken()

  return (
    <Card
      size="small"
      variant="outlined"
      style={listCardWidth}
      styles={{ body: listCardBody(token) }}
    >
      <div style={listCardStack(token)}>{children}</div>
    </Card>
  )
}
