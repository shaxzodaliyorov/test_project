import { LogoutOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Avatar, Dropdown, Modal } from 'antd'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/hooks/auth-store'
import type { MainNavItem } from '@/hooks/use-main-nav-items'
import { PATHS } from '@/routes/paths'
import { initialsFromName } from '@/utils/initials-from-name'
import {
  mainLayoutBottomNav,
  mainLayoutBottomNavIcon,
  mainLayoutBottomNavItem,
  mainLayoutBottomNavItemActive,
  mainLayoutBottomNavLabel,
  mainLayoutBottomNavProfile,
  mainLayoutBottomNavProfileButton,
  mainLayoutUserAvatar,
} from './main-layout.styles'

type MainLayoutBottomNavProps = {
  items: MainNavItem[]
}

export function MainLayoutBottomNav({ items }: MainLayoutBottomNavProps) {
  const { t } = useTranslation(['nav', 'common'])
  const navigate = useNavigate()
  const location = useLocation()
  const logout = useAuthStore((s) => s.logout)
  const user = useAuthStore((s) => s.user)

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

  return (
    <nav style={mainLayoutBottomNav} aria-label="Main navigation">
      {items.map((item) => {
        const isActive = location.pathname === item.key
        return (
          <button
            key={item.key}
            type="button"
            aria-current={isActive ? 'page' : undefined}
            style={{
              ...mainLayoutBottomNavItem,
              ...(isActive ? mainLayoutBottomNavItemActive : {}),
            }}
            onClick={() => {
              void navigate(item.key)
            }}
          >
            <span style={mainLayoutBottomNavIcon} aria-hidden>
              {item.icon}
            </span>
            <span style={mainLayoutBottomNavLabel}>{item.label}</span>
          </button>
        )
      })}
      <div style={mainLayoutBottomNavProfile}>
        <Dropdown
          menu={{
            items: userMenuItems,
            onClick: ({ key }) => {
              if (key === 'logout') {
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
            },
          }}
          trigger={['click']}
          placement="topRight"
        >
          <button
            type="button"
            style={mainLayoutBottomNavProfileButton}
            aria-label={user?.name ?? t('nav:logout')}
          >
            <Avatar size={32} style={mainLayoutUserAvatar}>
              {initialsFromName(user?.name)}
            </Avatar>
          </button>
        </Dropdown>
      </div>
    </nav>
  )
}
