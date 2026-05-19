import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Typography } from "antd";
import {
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
        </div>
      </div>
    </Flex>
  );
}
