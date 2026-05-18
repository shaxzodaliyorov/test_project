import {
  LockOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { App, Button, Divider, Flex, Form, Input, Space, Tag, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { LoginThemeToggle } from './components/login-theme-toggle'
import {
  loginCertIcon,
  loginDemoDividerText,
  loginDemoPermissionNote,
  loginDemoSpace,
  loginDemoStrong,
  loginDivider,
  loginFieldLabel,
  loginHeroFlex,
  loginInputPrefix,
  loginLockIconWrap,
  loginPanel,
  loginRing,
  loginRootFlex,
  loginSubtitle,
  loginTitle,
} from './login.styles'
import { PERMISSIONS } from '@/constants/permissions'
import { useAuthStore } from '@/hooks/auth-store'
import { PATHS } from '@/routes/paths'
import { getApiErrorMessage } from '@/utils/api-error'
import { apiPost } from '@/utils/http-client'

type LoginResponse = { token: string }

export function LoginPage() {
  const navigate = useNavigate()
  const { message } = App.useApp()
  const setToken = useAuthStore((s) => s.setToken)

  const login = useMutation({
    mutationFn: (values: { email: string; password: string }) =>
      apiPost<LoginResponse, { email: string; password: string }>(
        '/api/auth/login',
        values,
      ),
    onSuccess: (data) => {
      setToken(data.token)
      void navigate(PATHS.DASHBOARD)
    },
    onError: (error) => {
      message.error(getApiErrorMessage(error))
    },
  })

  return (
    <Flex justify="center" align="center" style={loginRootFlex}>
      <LoginThemeToggle />
      <div style={loginRing}>
        <div style={loginPanel}>
          <Flex vertical align="center" gap="small" style={loginHeroFlex}>
            <div style={loginLockIconWrap}>
              <LockOutlined aria-hidden />
            </div>
            <Typography.Title level={2} style={loginTitle}>
              Welcome back
            </Typography.Title>
            <Typography.Paragraph type="secondary" style={loginSubtitle}>
              Sign in to continue to RBAC demo.
            </Typography.Paragraph>
          </Flex>

          <Form
            layout="vertical"
            requiredMark={false}
            size="large"
            onFinish={(values) => {
              login.mutate(values)
            }}
            disabled={login.isPending}
          >
            <Form.Item
              name="email"
              label={<span style={loginFieldLabel}>Email</span>}
              rules={[{ required: true, message: 'Email is required' }]}
            >
              <Input
                type="email"
                autoComplete="username"
                placeholder="you@company.com"
                prefix={<MailOutlined style={loginInputPrefix} />}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label={<span style={loginFieldLabel}>Password</span>}
              rules={[{ required: true, message: 'Password is required' }]}
            >
              <Input.Password
                autoComplete="current-password"
                placeholder="••••••••"
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={login.isPending}
            >
              Continue
            </Button>
          </Form>

          <Divider plain style={loginDivider}>
            <Typography.Text type="secondary" style={loginDemoDividerText}>
              Demo sign-in
            </Typography.Text>
          </Divider>

          <Space direction="vertical" size={12} style={loginDemoSpace}>
            <Flex align="center" gap={8} wrap="wrap">
              <SafetyCertificateOutlined style={loginCertIcon} />
              <Typography.Text strong style={loginDemoStrong}>
                Admin
              </Typography.Text>
              <Tag>admin@test.com</Tag>
              <Tag>Admin1!xx</Tag>
            </Flex>
            <Flex align="center" gap={8} wrap="wrap">
              <Typography.Text strong style={loginDemoStrong}>
                User
              </Typography.Text>
              <Tag>user@test.com</Tag>
              <Tag>User1!xx</Tag>
              <Typography.Text type="secondary" style={loginDemoPermissionNote}>
                ({PERMISSIONS.DASHBOARD_READ} only)
              </Typography.Text>
            </Flex>
          </Space>
        </div>
      </div>
    </Flex>
  )
}
