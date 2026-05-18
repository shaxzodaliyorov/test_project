import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Flex, Switch } from "antd";
import { useTranslation } from "react-i18next";
import { useThemeStore } from "@/hooks/theme-store";

export function LoginThemeToggle() {
  const { t } = useTranslation("auth");
  const resolvedMode = useThemeStore((s) => s.resolvedMode);
  const setPreference = useThemeStore((s) => s.setPreference);

  return (
    <Flex align="center" gap="small">
      <Switch
        checked={resolvedMode === "dark"}
        onChange={(checked) => {
          setPreference(checked ? "dark" : "light");
        }}
        checkedChildren={<MoonOutlined />}
        unCheckedChildren={<SunOutlined />}
        aria-label={
          resolvedMode === "dark" ? t("themeAriaDark") : t("themeAriaLight")
        }
      />
    </Flex>
  );
}
