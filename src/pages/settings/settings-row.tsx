import { Typography } from "antd";
import type { ReactNode } from "react";
import {
  settingsRowControl,
  settingsRowLabel,
  settingsRowWrap,
} from "./settings-page.styles";

type SettingsRowProps = {
  label: string;
  children: ReactNode;
};

export function SettingsRow({ label, children }: SettingsRowProps) {
  return (
    <div style={settingsRowWrap}>
      <Typography.Text style={settingsRowLabel} type="secondary">
        {label}
      </Typography.Text>
      <div style={settingsRowControl}>{children}</div>
    </div>
  );
}
