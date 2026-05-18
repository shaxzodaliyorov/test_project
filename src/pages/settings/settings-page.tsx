import { App, Button, Divider, Flex, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { CurrencyCode } from "@/constants/currencies";
import type { UiLocale } from "@/constants/ui-languages";
import { useAuthStore } from "@/hooks/auth-store";
import { useUiPreferencesStore } from "@/hooks/ui-preferences-store";
import type { User } from "@/types/user";
import { apiPatch } from "@/utils/http-client";
import {
  commitThemeAndAppearanceToStores,
  isDraftDirty,
  readDraftFromStores,
  type SettingsDraft,
} from "./settings-draft";
import { SettingsAppearanceFields } from "./settings-appearance-fields";
import { SettingsGeneralFields } from "./settings-general-fields";
import { SettingsRegionalFields } from "./settings-regional-fields";
import {
  settingsFooterBar,
  settingsPageOuter,
  settingsPagePanel,
  settingsSectionTitle,
} from "./settings-page.styles";

export function SettingsPage() {
  const { message } = App.useApp();
  const { t } = useTranslation(["settings", "common"]);
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  const [committed, setCommitted] = useState<SettingsDraft>(() =>
    readDraftFromStores(),
  );
  const [draft, setDraft] = useState<SettingsDraft>(() => readDraftFromStores());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    const s = readDraftFromStores();
    queueMicrotask(() => {
      setCommitted(s);
      setDraft(s);
    });
  }, [user?.id]);

  const dirty = isDraftDirty(committed, draft);

  const patchDraft = (patch: Partial<SettingsDraft>) => {
    setDraft((d) => ({ ...d, ...patch }));
  };

  const handleCancel = () => {
    setDraft({ ...committed });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await apiPatch<
        User,
        { preferredCurrency: CurrencyCode; preferredLocale: UiLocale }
      >("/api/auth/me/preferences", {
        preferredCurrency: draft.currency,
        preferredLocale: draft.locale,
      });
      setUser(updated);
      useUiPreferencesStore.getState().setLocale(updated.preferredLocale);
      useUiPreferencesStore.getState().setCurrency(updated.preferredCurrency);
      commitThemeAndAppearanceToStores(draft);
      const next = readDraftFromStores();
      setCommitted(next);
      setDraft(next);
      message.success(t("settings:saveSuccess"));
    } catch (e) {
      message.error(e instanceof Error ? e.message : t("common:error"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={settingsPageOuter}>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Typography.Title level={2} style={{ margin: 0 }}>
          {t("settings:pageTitle")}
        </Typography.Title>
        <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
          {t("settings:applyOnSaveNote")}
        </Typography.Paragraph>
      </Space>

      <div style={{ ...settingsPagePanel, marginTop: 20 }}>
        <Typography.Title level={5} style={settingsSectionTitle}>
          {t("settings:generalSection")}
        </Typography.Title>
        <SettingsGeneralFields draft={draft} onDraftChange={patchDraft} />
        <Divider style={{ margin: "24px 0" }} />
        <Typography.Title level={5} style={settingsSectionTitle}>
          {t("settings:appearanceSection")}
        </Typography.Title>
        <SettingsAppearanceFields draft={draft} onDraftChange={patchDraft} />
        <Divider style={{ margin: "24px 0" }} />
        <Typography.Title level={5} style={settingsSectionTitle}>
          {t("settings:regionalSection")}
        </Typography.Title>
        <SettingsRegionalFields draft={draft} onDraftChange={patchDraft} />
        <div style={settingsFooterBar}>
          <Flex justify="flex-end" gap={12} wrap="wrap">
            <Button onClick={handleCancel} disabled={!dirty}>
              {t("settings:cancelButton")}
            </Button>
            <Button
              type="primary"
              onClick={() => void handleSave()}
              disabled={!dirty}
              loading={saving}
            >
              {t("settings:saveButton")}
            </Button>
          </Flex>
        </div>
      </div>
    </div>
  );
}
