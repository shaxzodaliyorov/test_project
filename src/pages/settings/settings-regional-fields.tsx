import { useTranslation } from "react-i18next";
import { Select, Space, Typography } from "antd";
import {
  CURRENCIES,
  type CurrencyCode,
} from "@/constants/currencies";
import { formatSampleAmount } from "@/utils/format-sample-amount";
import type { SettingsDraft } from "./settings-draft";
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

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <SettingsRow label={t("currencyLabel")}>
        <Select
          value={draft.currency}
          style={{ minWidth: 200 }}
          options={CURRENCIES.map((c) => ({
            label: c.labelNative,
            value: c.code,
          }))}
          onChange={(v) => onDraftChange({ currency: v as CurrencyCode })}
        />
      </SettingsRow>
      <SettingsRow label={t("previewLabel")}>
        <Space direction="vertical" size={4} align="end">
          <Typography.Title level={4} style={{ margin: 0 }}>
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
