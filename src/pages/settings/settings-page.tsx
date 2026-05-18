import { Button, Divider, Flex, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useCompactLayout } from "@/hooks/use-compact-layout";
import { useSettingsPage } from "@/hooks/use-settings-page";
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
  settingsPageSubtitle,
  settingsPageTitle,
  settingsSectionDividerMargin,
  settingsSectionTitle,
} from "./settings-page.styles";

export function SettingsPage() {
  const { t } = useTranslation(["settings", "common"]);
  const isCompact = useCompactLayout();
  const s = useSettingsPage();
  const sectionDividerMargin = settingsSectionDividerMargin(isCompact);

  return (
    <div style={isCompact ? settingsPageStackCompact : settingsPageStack}>
      <div>
        <Typography.Title
          level={isCompact ? 4 : 2}
          style={settingsPageTitle(isCompact)}
        >
          {t("settings:pageTitle")}
        </Typography.Title>
        <Typography.Paragraph
          type="secondary"
          style={settingsPageSubtitle(isCompact)}
        >
          {t("settings:applyOnSaveNote")}
        </Typography.Paragraph>
      </div>

      <div style={isCompact ? settingsPagePanelCompact : settingsPagePanel}>
        <Typography.Title level={5} style={settingsSectionTitle}>
          {t("settings:generalSection")}
        </Typography.Title>
        <SettingsGeneralFields draft={s.draft} onDraftChange={s.patchDraft} />
        <Divider style={{ margin: sectionDividerMargin }} />
        <Typography.Title level={5} style={settingsSectionTitle}>
          {t("settings:appearanceSection")}
        </Typography.Title>
        <SettingsAppearanceFields draft={s.draft} onDraftChange={s.patchDraft} />
        <Divider style={{ margin: sectionDividerMargin }} />
        <Typography.Title level={5} style={settingsSectionTitle}>
          {t("settings:regionalSection")}
        </Typography.Title>
        <SettingsRegionalFields draft={s.draft} onDraftChange={s.patchDraft} />
        <div style={isCompact ? settingsFooterBarCompact : settingsFooterBar}>
          {isCompact ? (
            <Flex vertical gap={8}>
              <Button
                type="primary"
                block
                onClick={() => void s.handleSave()}
                disabled={!s.dirty}
                loading={s.saving}
              >
                {t("settings:saveButton")}
              </Button>
              <Button block onClick={s.handleCancel} disabled={!s.dirty}>
                {t("settings:cancelButton")}
              </Button>
            </Flex>
          ) : (
            <Flex justify="flex-end" gap={12} wrap="wrap">
              <Button onClick={s.handleCancel} disabled={!s.dirty}>
                {t("settings:cancelButton")}
              </Button>
              <Button
                type="primary"
                onClick={() => void s.handleSave()}
                disabled={!s.dirty}
                loading={s.saving}
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
