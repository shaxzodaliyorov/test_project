import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { Flex, Switch } from 'antd'
import { useThemeStore } from '@/hooks/theme-store'
import { loginThemeToggleBar } from '../login.styles'

export function LoginThemeToggle() {
  const resolvedMode = useThemeStore((s) => s.resolvedMode)
  const setPreference = useThemeStore((s) => s.setPreference)

  return (
    <Flex align="center" gap="small" style={loginThemeToggleBar}>
      <Switch
        checked={resolvedMode === 'dark'}
        onChange={(checked) => {
          setPreference(checked ? 'dark' : 'light')
        }}
        checkedChildren={<MoonOutlined />}
        unCheckedChildren={<SunOutlined />}
        aria-label={
          resolvedMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
        }
      />
    </Flex>
  )
}
