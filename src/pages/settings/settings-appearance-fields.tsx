import { Flex, Select, Space } from "antd";
import type { SettingsCopy } from "@/constants/settings-copy";
import { FONT_PRESETS } from "@/constants/font-presets";
import { THEME_COLOR_PRESETS } from "@/constants/theme-color-presets";
import type { SettingsDraft } from "./settings-draft";
import { settingsSwatch } from "./settings-page.styles";
import { SettingsRow } from "./settings-row";

function presetLabel(id: string): string {
  return id.charAt(0).toUpperCase() + id.slice(1);
}

type SettingsAppearanceFieldsProps = {
  draft: SettingsDraft;
  onDraftChange: (patch: Partial<SettingsDraft>) => void;
  t: SettingsCopy;
};

export function SettingsAppearanceFields({
  draft,
  onDraftChange,
  t,
}: SettingsAppearanceFieldsProps) {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <SettingsRow label={t.primaryColorLabel}>
        <Flex wrap="wrap" gap={10} justify="flex-end">
          {THEME_COLOR_PRESETS.map((p) => {
            const selected = draft.primaryPresetId === p.id;
            return (
              <button
                key={p.id}
                type="button"
                title={presetLabel(p.id)}
                aria-label={presetLabel(p.id)}
                aria-pressed={selected}
                onClick={() => onDraftChange({ primaryPresetId: p.id })}
                style={{
                  ...settingsSwatch,
                  background: p.colorPrimaryLight,
                  boxShadow: selected
                    ? "0 0 0 2px var(--bg), 0 0 0 4px var(--accent)"
                    : undefined,
                }}
              />
            );
          })}
        </Flex>
      </SettingsRow>
      <SettingsRow label={t.fontLabel}>
        <Select
          value={draft.fontPresetId}
          style={{ minWidth: 260 }}
          options={FONT_PRESETS.map((f) => ({
            label: (
              <span style={{ fontFamily: f.fontFamily }}>{f.label}</span>
            ),
            value: f.id,
          }))}
          onChange={(v) => onDraftChange({ fontPresetId: v })}
        />
      </SettingsRow>
    </Space>
  );
}
