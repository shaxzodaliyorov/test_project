import { useTranslation } from "react-i18next";
import { Select, Space, Typography } from "antd";
import {
  CURRENCIES,
  type CurrencyCode,
} from "@/constants/currencies";
import { useCompactLayout } from "@/hooks/use-compact-layout";
import { formatSampleAmount } from "@/utils/format-sample-amount";
import type { SettingsDraft } from "./settings-draft";
import { settingsFieldWidth } from "./settings-page.styles";
import { SettingsRow } from "./settings-row";

type SettingsRegionalFieldsProps = {
  draft: SettingsDraft;
  onDraftChange: (patch: Partial<SettingsDraft>) => void;
};

export function SettingsRegionalFields({
  draft,
  onDraftChange,
}: SettingsRegionalFieldsProps) {
  const { t } = useTranslation("settings");
  const isCompact = useCompactLayout();

  return (
    <Space
      direction="vertical"
      size={isCompact ? "middle" : "large"}
      style={{ width: "100%" }}
    >
      <SettingsRow label={t("currencyLabel")}>
        <Select
          value={draft.currency}
          style={settingsFieldWidth(isCompact)}
          options={CURRENCIES.map((c) => ({
            label: c.labelNative,
            value: c.code,
          }))}
          onChange={(v) => onDraftChange({ currency: v as CurrencyCode })}
        />
      </SettingsRow>
      <SettingsRow label={t("previewLabel")}>
        <Space
          direction="vertical"
          size={4}
          align={isCompact ? "start" : "end"}
          style={{ width: isCompact ? "100%" : undefined }}
        >
          <Typography.Title
            level={isCompact ? 5 : 4}
            style={{ margin: 0, fontSize: isCompact ? 18 : undefined }}
          >
            {formatSampleAmount(draft.locale, draft.currency)}
          </Typography.Title>
          <Typography.Text type="secondary">
            {t("previewAmountNote")}
          </Typography.Text>
        </Space>
      </SettingsRow>
    </Space>
  );
}
