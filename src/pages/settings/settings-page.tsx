import { App, Button, Divider, Flex, Space, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import { getSettingsCopy } from "@/constants/settings-copy";
import { DEFAULT_UI_LOCALE } from "@/constants/ui-languages";
import {
  commitDraftToStores,
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
  const t = useMemo(() => getSettingsCopy(DEFAULT_UI_LOCALE), []);

  const [committed, setCommitted] = useState<SettingsDraft>(() =>
    readDraftFromStores(),
  );
  const [draft, setDraft] = useState<SettingsDraft>(() => readDraftFromStores());

  useEffect(() => {
    const s = readDraftFromStores();
    setCommitted(s);
    setDraft(s);
  }, []);

  const dirty = isDraftDirty(committed, draft);

  const patchDraft = (patch: Partial<SettingsDraft>) => {
    setDraft((d) => ({ ...d, ...patch }));
  };

  const handleCancel = () => {
    setDraft({ ...committed });
  };

  const handleSave = () => {
    commitDraftToStores(draft);
    setCommitted({ ...draft });
    message.success(t.saveSuccess);
  };

  return (
    <div style={settingsPageOuter}>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Typography.Title level={2} style={{ margin: 0 }}>
          {t.pageTitle}
        </Typography.Title>
        <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
          {t.applyOnSaveNote}
        </Typography.Paragraph>
      </Space>

      <div style={{ ...settingsPagePanel, marginTop: 20 }}>
        <Typography.Title level={5} style={settingsSectionTitle}>
          {t.generalSection}
        </Typography.Title>
        <SettingsGeneralFields draft={draft} onDraftChange={patchDraft} t={t} />
        <Divider style={{ margin: "24px 0" }} />
        <Typography.Title level={5} style={settingsSectionTitle}>
          {t.appearanceSection}
        </Typography.Title>
        <SettingsAppearanceFields draft={draft} onDraftChange={patchDraft} t={t} />
        <Divider style={{ margin: "24px 0" }} />
        <Typography.Title level={5} style={settingsSectionTitle}>
          {t.regionalSection}
        </Typography.Title>
        <SettingsRegionalFields draft={draft} onDraftChange={patchDraft} t={t} />
        <div style={settingsFooterBar}>
          <Flex justify="flex-end" gap={12} wrap="wrap">
            <Button onClick={handleCancel} disabled={!dirty}>
              {t.cancelButton}
            </Button>
            <Button type="primary" onClick={handleSave} disabled={!dirty}>
              {t.saveButton}
            </Button>
          </Flex>
        </div>
      </div>
    </div>
  );
}
