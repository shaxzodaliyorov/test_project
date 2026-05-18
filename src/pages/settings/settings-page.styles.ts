import type { CSSProperties } from "react";

export const settingsPageStack: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: 720,
  gap: 24,
  paddingBottom: 96,
  margin: 0,
  textAlign: "left",
};

export const settingsPageStackCompact: CSSProperties = {
  ...settingsPageStack,
  gap: 16,
  paddingBottom: 88,
};

export const settingsPagePanel: CSSProperties = {
  padding: "28px 28px 20px",
  borderRadius: 12,
  border: "1px solid var(--border)",
  background: "color-mix(in srgb, var(--bg) 94%, var(--accent-bg))",
  boxShadow: "var(--shadow)",
};

export const settingsPagePanelCompact: CSSProperties = {
  ...settingsPagePanel,
  padding: "16px 16px 12px",
  borderRadius: 10,
};

export const settingsSectionTitle: CSSProperties = {
  margin: "0 0 12px",
};

export const settingsFooterBar: CSSProperties = {
  position: "sticky",
  bottom: 0,
  zIndex: 2,
  marginTop: 16,
  marginInline: -28,
  marginBottom: -20,
  padding: "14px 28px",
  borderTop: "1px solid var(--border)",
  background: "color-mix(in srgb, var(--bg) 92%, var(--accent-bg))",
  borderBottomLeftRadius: 12,
  borderBottomRightRadius: 12,
};

export const settingsFooterBarCompact: CSSProperties = {
  ...settingsFooterBar,
  marginInline: -16,
  marginBottom: -12,
  padding: "12px 16px",
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
};

export const settingsRowWrap: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  width: "100%",
};

export const settingsRowWrapCompact: CSSProperties = {
  flexDirection: "column",
  alignItems: "stretch",
  gap: 8,
};

export const settingsRowLabel: CSSProperties = {
  minWidth: 140,
  flexShrink: 0,
};

export const settingsRowLabelCompact: CSSProperties = {
  minWidth: 0,
};

export const settingsRowControl: CSSProperties = {
  flex: 1,
  minWidth: 200,
  display: "flex",
  justifyContent: "flex-end",
  flexWrap: "wrap",
};

export const settingsRowControlCompact: CSSProperties = {
  flex: "none",
  width: "100%",
  minWidth: 0,
  justifyContent: "flex-start",
};

export function settingsFieldWidth(compact: boolean): CSSProperties {
  return compact
    ? { width: "100%", minWidth: 0, maxWidth: "100%" }
    : { minWidth: 200 };
}

export function settingsFieldWidthWide(compact: boolean): CSSProperties {
  return compact
    ? { width: "100%", minWidth: 0, maxWidth: "100%" }
    : { minWidth: 260 };
}

export const settingsSwatch: CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 10,
  border: "1px solid var(--border)",
  cursor: "pointer",
  padding: 0,
  flexShrink: 0,
};
