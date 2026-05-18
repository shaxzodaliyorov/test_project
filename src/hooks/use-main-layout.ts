import { LogoutOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Grid, Modal } from 'antd'
import { createElement, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  mainLayoutContentArea,
  mainLayoutContentAreaCompact,
  mainLayoutContentTableFriendly,
  mainLayoutContentWithBottomNav,
} from '@/components/main-layout/main-layout.styles'
import { useAuthStore } from '@/hooks/auth-store'
import { useCompactLayout } from '@/hooks/use-compact-layout'
import { useMainNavItems } from '@/hooks/use-main-nav-items'
import { PATHS } from '@/routes/paths'

const TABLE_FRIENDLY_PATHS: string[] = [
  PATHS.USERS,
  PATHS.PAYMENTS,
  PATHS.REPORTS,
]

export function useMainLayout() {
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
        icon: createElement(LogoutOutlined),
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
      ...(TABLE_FRIENDLY_PATHS.includes(location.pathname)
        ? mainLayoutContentTableFriendly
        : {}),
    }
  }, [isCompactNav, screens.md, location.pathname])

  const handleLogoutClick = useCallback(() => {
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
  }, [logout, navigate, t])

  const navigateTo = useCallback(
    (path: string) => {
      void navigate(path)
    },
    [navigate],
  )

  const hasNoPermissions = Boolean(user && user.permissions.length === 0)

  return {
    t,
    location,
    isCompactNav,
    navItems,
    user,
    menuItems,
    userMenuItems,
    contentStyle,
    handleLogoutClick,
    navigateTo,
    hasNoPermissions,
  }
}
