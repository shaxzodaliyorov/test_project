import { DownOutlined, LogoutOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import {
  Avatar,
  Button,
  Dropdown,
  Grid,
  Layout,
  Menu,
  Modal,
  Space,
  Typography,
} from 'antd'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { MainLayoutBottomNav } from './main-layout-bottom-nav'
import {
  mainLayoutContentArea,
  mainLayoutContentAreaCompact,
  mainLayoutContentTableFriendly,
  mainLayoutContentWithBottomNav,
  mainLayoutHeaderBar,
  mainLayoutHeaderBarCompact,
  mainLayoutHeaderBrand,
  mainLayoutHeaderBrandCompact,
  mainLayoutHeaderBrandRow,
  mainLayoutHeaderRight,
  mainLayoutInner,
  mainLayoutMenu,
  mainLayoutShell,
  mainLayoutSider,
  mainLayoutSiderBrand,
  mainLayoutSiderBrandRow,
  mainLayoutSiderBrandTitle,
  mainLayoutSiderInner,
  mainLayoutUserTrigger,
  mainLayoutUserAvatar,
  mainLayoutUserTriggerChevron,
  mainLayoutUserTriggerName,
} from './main-layout.styles'
import { useAuthStore } from '@/hooks/auth-store'
import { useCompactLayout } from '@/hooks/use-compact-layout'
import { useMainNavItems } from '@/hooks/use-main-nav-items'
import { PATHS } from '@/routes/paths'
import { initialsFromName } from '@/utils/initials-from-name'

const { Header, Content, Sider } = Layout

function TaskSidebarMark({ size = 36 }: { size?: number }) {
  const icon = Math.round(size * 0.52)
  return (
    <span
      aria-hidden
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: 10,
        background: 'var(--accent)',
        color: '#fff',
        flexShrink: 0,
      }}
    >
      <svg width={icon} height={icon} viewBox="0 0 24 24" fill="none">
        <path
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

export function MainLayout() {
  const { t } = useTranslation(['nav', 'common'])
  const navigate = useNavigate()
  const location = useLocation()
  const screens = Grid.useBreakpoint()
  const isCompactNav = useCompactLayout()
  const navItems = useMainNavItems()
  const logout = useAuthStore((s) => s.logout)
  const user = useAuthStore((s) => s.user)

  const menuItems: MenuProps['items'] = useMemo(
    () =>
      navItems.map((item) => ({
        key: item.key,
        icon: item.icon,
        label: item.label,
      })),
    [navItems],
  )

  const userMenuItems: MenuProps['items'] = useMemo(
    () => [
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: t('nav:logout'),
        danger: true,
      },
    ],
    [t],
  )

  const contentStyle = useMemo(() => {
    const compactPadding = isCompactNav || screens.md === false
    return {
      ...mainLayoutContentArea,
      ...(compactPadding ? mainLayoutContentAreaCompact : {}),
      ...(isCompactNav ? mainLayoutContentWithBottomNav : {}),
      ...(location.pathname === PATHS.USERS ||
      location.pathname === PATHS.PAYMENTS ||
      location.pathname === PATHS.REPORTS
        ? mainLayoutContentTableFriendly
        : {}),
    }
  }, [isCompactNav, screens.md, location.pathname])

  const handleLogoutClick = () => {
    Modal.confirm({
      title: t('nav:logoutConfirmTitle'),
      content: t('nav:logoutConfirmBody'),
      okText: t('common:ok'),
      cancelText: t('common:cancel'),
      onOk: () => {
        logout()
        void navigate(PATHS.LOGIN)
      },
    })
  }

  if (user && user.permissions.length === 0) {
    return <Navigate to={PATHS.FORBIDDEN} replace />
  }

  return (
    <Layout style={mainLayoutShell}>
      {!isCompactNav ? (
        <Sider width={232} theme="light" style={mainLayoutSider}>
          <div style={mainLayoutSiderInner}>
            <Link
              to={PATHS.DASHBOARD}
              aria-label={t('nav:taskAria')}
              style={{
                ...mainLayoutSiderBrand,
                display: 'block',
                width: '100%',
                boxSizing: 'border-box',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <span style={mainLayoutSiderBrandRow}>
                <TaskSidebarMark />
                <span style={mainLayoutSiderBrandTitle}>TASK</span>
              </span>
            </Link>
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
      ) : null}
      <Layout style={mainLayoutInner}>
        <Header
          style={isCompactNav ? mainLayoutHeaderBarCompact : mainLayoutHeaderBar}
        >
          {isCompactNav ? (
            <Link
              to={PATHS.DASHBOARD}
              aria-label={t('nav:taskAria')}
              style={{
                ...mainLayoutHeaderBrandRow,
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <TaskSidebarMark size={32} />
              <span style={mainLayoutHeaderBrandCompact}>TASK</span>
            </Link>
          ) : (
            <Typography.Title level={4} style={mainLayoutHeaderBrand}>
              {t('nav:headerBrand')}
            </Typography.Title>
          )}
          {!isCompactNav ? (
            <div style={mainLayoutHeaderRight}>
              <Dropdown
                menu={{
                  items: userMenuItems,
                  onClick: ({ key }) => {
                    if (key === 'logout') {
                      handleLogoutClick()
                    }
                  },
                }}
                trigger={['click']}
              >
                <Button
                  type="default"
                  style={mainLayoutUserTrigger}
                  aria-label={user?.name ?? t('nav:logout')}
                >
                  <Space size={10} align="center" style={{ width: '100%' }}>
                    <Avatar size={28} style={mainLayoutUserAvatar}>
                      {initialsFromName(user?.name)}
                    </Avatar>
                    <span style={mainLayoutUserTriggerName}>{user?.name}</span>
                    <DownOutlined style={mainLayoutUserTriggerChevron} />
                  </Space>
                </Button>
              </Dropdown>
            </div>
          ) : null}
        </Header>
        <Content style={contentStyle}>
          <Outlet />
        </Content>
      </Layout>
      {isCompactNav ? <MainLayoutBottomNav items={navItems} /> : null}
    </Layout>
  )
}
