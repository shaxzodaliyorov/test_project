import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Radio, Select, Space } from "antd";
import type { SettingsCopy } from "@/constants/settings-copy";
import type { UiLocale } from "@/constants/ui-languages";
import { UI_LOCALES } from "@/constants/ui-languages";
import type { ThemePreference } from "@/hooks/theme-store";
import type { SettingsDraft } from "./settings-draft";
import { SettingsRow } from "./settings-row";

type SettingsGeneralFieldsProps = {
  draft: SettingsDraft;
  onDraftChange: (patch: Partial<SettingsDraft>) => void;
  t: SettingsCopy;
};

export function SettingsGeneralFields({
  draft,
  onDraftChange,
  t,
}: SettingsGeneralFieldsProps) {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <SettingsRow label={t.languageLabel}>
        <Select
          value={draft.locale}
          style={{ minWidth: 200 }}
          options={UI_LOCALES.map((l) => ({
            label: l.labelNative,
            value: l.code,
          }))}
          onChange={(v) => onDraftChange({ locale: v as UiLocale })}
        />
      </SettingsRow>
      <SettingsRow label={t.themeLabel}>
        <Radio.Group
          value={draft.themePreference}
          onChange={(e) =>
            onDraftChange({ themePreference: e.target.value as ThemePreference })
          }
        >
          <Space wrap size={8}>
            <Radio.Button value="light">
              <SunOutlined /> {t.themeLight}
            </Radio.Button>
            <Radio.Button value="dark">
              <MoonOutlined /> {t.themeDark}
            </Radio.Button>
          </Space>
        </Radio.Group>
      </SettingsRow>
    </Space>
  );
}
