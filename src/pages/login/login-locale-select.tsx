import { useTranslation } from "react-i18next";
import { Select } from "antd";
import type { UiLocale } from "@/constants/ui-languages";
import { UI_LOCALES } from "@/constants/ui-languages";
import { useUiPreferencesStore } from "@/hooks/ui-preferences-store";

type LoginLocaleSelectProps = {
  compact?: boolean;
};

export function LoginLocaleSelect({ compact = false }: LoginLocaleSelectProps) {
  const { t } = useTranslation("auth");
  const locale = useUiPreferencesStore((s) => s.locale);
  const setLocale = useUiPreferencesStore((s) => s.setLocale);

  return (
    <Select<UiLocale>
      size="small"
      variant="borderless"
      value={locale}
      aria-label={t("languageAria")}
      popupMatchSelectWidth={false}
      style={{ minWidth: compact ? 96 : 112 }}
      options={UI_LOCALES.map((l) => ({
        label: l.labelNative,
        value: l.code,
      }))}
      onChange={(v) => {
        setLocale(v);
      }}
    />
  );
}
