import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Radio, Select, Space } from "antd";
import type { UiLocale } from "@/constants/ui-languages";
import { UI_LOCALES } from "@/constants/ui-languages";
import { useCompactLayout } from "@/hooks/use-compact-layout";
import type { ThemePreference } from "@/hooks/theme-store";
import type { SettingsDraft } from "./settings-draft";
import { settingsFieldWidth } from "./settings-page.styles";
import { SettingsRow } from "./settings-row";

type SettingsGeneralFieldsProps = {
  draft: SettingsDraft;
  onDraftChange: (patch: Partial<SettingsDraft>) => void;
};

export function SettingsGeneralFields({
  draft,
  onDraftChange,
}: SettingsGeneralFieldsProps) {
  const { t } = useTranslation("settings");
  const isCompact = useCompactLayout();

  return (
    <Space
      direction="vertical"
      size={isCompact ? "middle" : "large"}
      style={{ width: "100%" }}
    >
      <SettingsRow label={t("languageLabel")}>
        <Select
          value={draft.locale}
          style={settingsFieldWidth(isCompact)}
          options={UI_LOCALES.map((l) => ({
            label: l.labelNative,
            value: l.code,
          }))}
          onChange={(v) => onDraftChange({ locale: v as UiLocale })}
        />
      </SettingsRow>
      <SettingsRow label={t("themeLabel")}>
        <Radio.Group
          value={draft.themePreference}
          onChange={(e) =>
            onDraftChange({ themePreference: e.target.value as ThemePreference })
          }
        >
          <Space wrap size={8}>
            <Radio.Button value="light">
              <SunOutlined /> {t("themeLight")}
            </Radio.Button>
            <Radio.Button value="dark">
              <MoonOutlined /> {t("themeDark")}
            </Radio.Button>
          </Space>
        </Radio.Group>
      </SettingsRow>
    </Space>
  );
}
