import {
  DashboardOutlined,
  LogoutOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Layout, Menu, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { PERMISSIONS } from '@/constants/permissions'
import { useAuthStore } from '@/hooks/auth-store'
import { useCanAccess } from '@/hooks/use-can-access'
import {
  mainLayoutContent,
  mainLayoutHeaderBar,
  mainLayoutHeaderBrand,
  mainLayoutHeaderRight,
  mainLayoutInner,
  mainLayoutMenu,
  mainLayoutShell,
  mainLayoutSider,
  mainLayoutSiderInner,
  mainLayoutUserName,
} from './main-layout.styles'
import { PATHS } from '@/routes/paths'

const { Header, Content, Sider } = Layout

export function MainLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const logout = useAuthStore((s) => s.logout)
  const user = useAuthStore((s) => s.user)
  const canUsers = useCanAccess(PERMISSIONS.USERS_READ)

  const menuItems: MenuProps['items'] = useMemo(
    () => [
      {
        key: PATHS.DASHBOARD,
        icon: <DashboardOutlined />,
        label: 'Dashboard',
      },
      ...(canUsers
        ? [
            {
              key: PATHS.ADMIN_USERS,
              icon: <TeamOutlined />,
              label: 'Users',
            },
          ]
        : []),
    ],
    [canUsers],
  )

  return (
    <Layout style={mainLayoutShell}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        width={232}
        collapsedWidth={72}
        theme="light"
        style={mainLayoutSider}
      >
        <div style={mainLayoutSiderInner}>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={({ key }) => {
              void navigate(String(key))
            }}
            style={mainLayoutMenu}
          />
        </div>
      </Sider>
      <Layout style={mainLayoutInner}>
        <Header style={mainLayoutHeaderBar}>
          <Typography.Title level={4} style={mainLayoutHeaderBrand}>
            RBAC demo
          </Typography.Title>
          <div style={mainLayoutHeaderRight}>
            <span style={mainLayoutUserName}>{user?.name}</span>
            <Button
              type="default"
              icon={<LogoutOutlined />}
              onClick={() => {
                logout()
                void navigate(PATHS.LOGIN)
              }}
            >
              Log out
            </Button>
          </div>
        </Header>
        <Content style={mainLayoutContent}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
