import { App, Button, Divider, Flex, Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { CurrencyCode } from "@/constants/currencies";
import type { UiLocale } from "@/constants/ui-languages";
import { useAuthStore } from "@/hooks/auth-store";
import { useCompactLayout } from "@/hooks/use-compact-layout";
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
  settingsFooterBarCompact,
  settingsPagePanel,
  settingsPagePanelCompact,
  settingsPageStack,
  settingsPageStackCompact,
  settingsSectionTitle,
} from "./settings-page.styles";

export function SettingsPage() {
  const { message } = App.useApp();
  const { t } = useTranslation(["settings", "common"]);
  const isCompact = useCompactLayout();
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

  const sectionDividerMargin = isCompact ? "16px 0" : "24px 0";

  return (
    <div style={isCompact ? settingsPageStackCompact : settingsPageStack}>
      <div>
        <Typography.Title
          level={isCompact ? 4 : 2}
          style={{ margin: 0, fontSize: isCompact ? 18 : undefined }}
        >
          {t("settings:pageTitle")}
        </Typography.Title>
        <Typography.Paragraph
          type="secondary"
          style={{
            marginBottom: 0,
            marginTop: isCompact ? 6 : 8,
            fontSize: isCompact ? 13 : undefined,
          }}
        >
          {t("settings:applyOnSaveNote")}
        </Typography.Paragraph>
      </div>

      <div style={isCompact ? settingsPagePanelCompact : settingsPagePanel}>
        <Typography.Title level={5} style={settingsSectionTitle}>
          {t("settings:generalSection")}
        </Typography.Title>
        <SettingsGeneralFields draft={draft} onDraftChange={patchDraft} />
        <Divider style={{ margin: sectionDividerMargin }} />
        <Typography.Title level={5} style={settingsSectionTitle}>
          {t("settings:appearanceSection")}
        </Typography.Title>
        <SettingsAppearanceFields draft={draft} onDraftChange={patchDraft} />
        <Divider style={{ margin: sectionDividerMargin }} />
        <Typography.Title level={5} style={settingsSectionTitle}>
          {t("settings:regionalSection")}
        </Typography.Title>
        <SettingsRegionalFields draft={draft} onDraftChange={patchDraft} />
        <div style={isCompact ? settingsFooterBarCompact : settingsFooterBar}>
          {isCompact ? (
            <Flex vertical gap={8}>
              <Button
                type="primary"
                block
                onClick={() => void handleSave()}
                disabled={!dirty}
                loading={saving}
              >
                {t("settings:saveButton")}
              </Button>
              <Button block onClick={handleCancel} disabled={!dirty}>
                {t("settings:cancelButton")}
              </Button>
            </Flex>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}
