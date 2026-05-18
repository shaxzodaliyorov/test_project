import {
  LockOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import {
  Button,
  Divider,
  Flex,
  Form,
  Input,
  Space,
  Tag,
  Typography,
} from "antd";
import {
  loginCertIcon,
  loginDemoDividerText,
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
  loginTopBar,
} from "./login.styles";
import { useLoginPage } from "@/hooks/use-login-page";
import type { LoginFormValues } from "@/types/login-form";
import { LoginLocaleSelect } from "./login-locale-select";
import { LoginThemeToggle } from "./login-theme-toggle";

export function LoginPage() {
  const { t, emailRules, passwordRules, submit, isPending } = useLoginPage();

  return (
    <Flex justify="center" align="center" style={loginRootFlex}>
      <Flex
        align="center"
        gap="small"
        justify="flex-end"
        wrap="wrap"
        style={loginTopBar}
      >
        <LoginLocaleSelect />
        <LoginThemeToggle />
      </Flex>
      <div style={loginRing}>
        <div style={loginPanel}>
          <Flex vertical align="center" gap="small" style={loginHeroFlex}>
            <div style={loginLockIconWrap}>
              <LockOutlined aria-hidden />
            </div>
            <Typography.Title level={2} style={loginTitle}>
              {t("welcomeTitle")}
            </Typography.Title>
            <Typography.Paragraph type="secondary" style={loginSubtitle}>
              {t("welcomeSubtitle")}
            </Typography.Paragraph>
          </Flex>

          <Form<LoginFormValues>
            layout="vertical"
            requiredMark={false}
            size="large"
            onFinish={submit}
            disabled={isPending}
          >
            <Form.Item
              name="email"
              label={<span style={loginFieldLabel}>{t("email")}</span>}
              rules={emailRules}
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
              label={<span style={loginFieldLabel}>{t("password")}</span>}
              rules={passwordRules}
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
              loading={isPending}
            >
              {t("continue")}
            </Button>
          </Form>

          <Divider plain style={loginDivider}>
            <Typography.Text type="secondary" style={loginDemoDividerText}>
              {t("demoDivider")}
            </Typography.Text>
          </Divider>

          <Space direction="vertical" size={12} style={loginDemoSpace}>
            <Flex align="center" gap={8} wrap="wrap">
              <SafetyCertificateOutlined style={loginCertIcon} />
              <Typography.Text strong style={loginDemoStrong}>
                {t("demoAdmin")}
              </Typography.Text>
              <Tag>admin@test.com</Tag>
              <Tag>Admin@123</Tag>
            </Flex>
            <Flex align="center" gap={8} wrap="wrap">
              <Typography.Text strong style={loginDemoStrong}>
                {t("demoPayment")}
              </Typography.Text>
              <Tag>payment@test.com</Tag>
              <Tag>Payment@1</Tag>
            </Flex>
            <Flex align="center" gap={8} wrap="wrap">
              <Typography.Text strong style={loginDemoStrong}>
                {t("demoReports")}
              </Typography.Text>
              <Tag>reports@test.com</Tag>
              <Tag>Reports@1</Tag>
            </Flex>
            <Flex align="center" gap={8} wrap="wrap">
              <Typography.Text strong style={loginDemoStrong}>
                {t("demoUsersOnly")}
              </Typography.Text>
              <Tag>usersonly@test.com</Tag>
              <Tag>Users@123</Tag>
            </Flex>
            <Flex align="center" gap={8} wrap="wrap">
              <Typography.Text strong style={loginDemoStrong}>
                {t("demoNoRoles")}
              </Typography.Text>
              <Tag>user@test.com</Tag>
              <Tag>User@1234</Tag>
            </Flex>
          </Space>
        </div>
      </div>
    </Flex>
  );
}
