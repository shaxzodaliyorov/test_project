import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { Flex, Switch } from 'antd'
import { useThemeStore } from '@/hooks/theme-store'
import { loginThemeToggleBar } from '../login.styles'

export function LoginThemeToggle() {
  const themeMode = useThemeStore((s) => s.mode)
  const setThemeMode = useThemeStore((s) => s.setMode)

  return (
    <Flex align="center" gap="small" style={loginThemeToggleBar}>
      <Switch
        checked={themeMode === 'dark'}
        onChange={(checked) => {
          setThemeMode(checked ? 'dark' : 'light')
        }}
        checkedChildren={<MoonOutlined />}
        unCheckedChildren={<SunOutlined />}
        aria-label={
          themeMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
        }
      />
    </Flex>
  )
}
