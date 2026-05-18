import { Typography } from "antd";
import type { ReactNode } from "react";
import { useCompactLayout } from "@/hooks/use-compact-layout";
import {
  settingsRowControl,
  settingsRowControlCompact,
  settingsRowLabel,
  settingsRowLabelCompact,
  settingsRowWrap,
  settingsRowWrapCompact,
} from "./settings-page.styles";

type SettingsRowProps = {
  label: string;
  children: ReactNode;
};

export function SettingsRow({ label, children }: SettingsRowProps) {
  const isCompact = useCompactLayout();

  return (
    <div style={{ ...settingsRowWrap, ...(isCompact ? settingsRowWrapCompact : {}) }}>
      <Typography.Text
        style={{ ...settingsRowLabel, ...(isCompact ? settingsRowLabelCompact : {}) }}
        type="secondary"
      >
        {label}
      </Typography.Text>
      <div
        style={{
          ...settingsRowControl,
          ...(isCompact ? settingsRowControlCompact : {}),
        }}
      >
        {children}
      </div>
    </div>
  );
}
