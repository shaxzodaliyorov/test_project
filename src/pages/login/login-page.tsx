import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Typography } from "antd";
import { useCompactLayout } from "@/hooks/use-compact-layout";
import {
  loginFieldLabel,
  loginHeroFlex,
  loginInputPrefix,
  loginLockIconWrap,
  loginPanel,
  loginRing,
  loginRootFlex,
  loginSubtitleCompact,
  loginTitle,
  loginTopBar,
} from "./login.styles";
import { useLoginPage } from "@/hooks/use-login-page";
import type { LoginFormValues } from "@/types/login-form";
import { LoginLocaleSelect } from "./login-locale-select";
import { LoginThemeToggle } from "./login-theme-toggle";

export function LoginPage() {
  const isCompact = useCompactLayout();
  const { t, emailRules, passwordRules, submit, isPending } = useLoginPage();
  const formSize = isCompact ? "middle" : "large";

  return (
    <Flex
      justify="center"
      align={isCompact ? "flex-start" : "center"}
      style={loginRootFlex(isCompact)}
    >
      <Flex
        align="center"
        gap="small"
        justify="flex-end"
        wrap="wrap"
        style={loginTopBar(isCompact)}
      >
        <LoginLocaleSelect compact={isCompact} />
        <LoginThemeToggle />
      </Flex>
      <div style={loginRing(isCompact)}>
        <div style={loginPanel(isCompact)}>
          <Flex
            vertical
            align="center"
            gap="small"
            style={loginHeroFlex(isCompact)}
          >
            <div style={loginLockIconWrap(isCompact)}>
              <LockOutlined aria-hidden />
            </div>
            <Typography.Title level={2} style={loginTitle(isCompact)}>
              {t("welcomeTitle")}
            </Typography.Title>
            <Typography.Paragraph
              type="secondary"
              style={loginSubtitleCompact(isCompact)}
            >
              {t("welcomeSubtitle")}
            </Typography.Paragraph>
          </Flex>

          <Form<LoginFormValues>
            layout="vertical"
            requiredMark={false}
            size={formSize}
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
              size={formSize}
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
