import { Layout, Skeleton } from 'antd'
import {
  mainLayoutBottomNav,
  mainLayoutContentArea,
  mainLayoutContentAreaCompact,
  mainLayoutContentWithBottomNav,
  mainLayoutHeaderBar,
  mainLayoutHeaderBarCompact,
  mainLayoutInner,
  mainLayoutShell,
  mainLayoutSider,
  mainLayoutSiderInner,
} from '@/components/main-layout/main-layout.styles'
import { DashboardPageSkeleton } from './dashboard-page-skeleton'

const { Header, Content, Sider } = Layout

type AppShellSkeletonProps = {
  compact?: boolean
}

export function AppShellSkeleton({ compact = false }: AppShellSkeletonProps) {
  const contentStyle = {
    ...mainLayoutContentArea,
    ...(compact ? mainLayoutContentAreaCompact : {}),
    ...(compact ? mainLayoutContentWithBottomNav : {}),
  }

  return (
    <Layout style={mainLayoutShell}>
      {!compact ? (
        <Sider width={232} theme="light" style={mainLayoutSider}>
          <div style={mainLayoutSiderInner}>
            <Skeleton.Input active style={{ width: '100%', height: 52, marginBottom: 8 }} />
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton.Input key={i} active style={{ width: '100%', height: 36, marginBottom: 4 }} />
            ))}
          </div>
        </Sider>
      ) : null}
      <Layout style={mainLayoutInner}>
        <Header style={compact ? mainLayoutHeaderBarCompact : mainLayoutHeaderBar}>
          <Skeleton.Input active style={{ width: compact ? 100 : 180, height: 24 }} />
          {!compact ? (
            <Skeleton.Input active style={{ width: 140, height: 40, borderRadius: 999 }} />
          ) : null}
        </Header>
        <Content style={contentStyle}>
          <DashboardPageSkeleton compact={compact} />
        </Content>
      </Layout>
      {compact ? (
        <div style={mainLayoutBottomNav}>
          {Array.from({ length: 5 }, (_, i) => (
            <Skeleton.Avatar key={i} active size="small" shape="square" />
          ))}
        </div>
      ) : null}
    </Layout>
  )
}
