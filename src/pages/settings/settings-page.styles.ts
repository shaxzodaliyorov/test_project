import type { CSSProperties } from "react";

export const settingsPageOuter: CSSProperties = {
  maxWidth: 720,
  width: "100%",
  paddingBottom: 96,
  margin: 0,
  textAlign: "left",
};

export const settingsPagePanel: CSSProperties = {
  padding: "28px 28px 20px",
  borderRadius: 12,
  border: "1px solid var(--border)",
  background: "color-mix(in srgb, var(--bg) 94%, var(--accent-bg))",
  boxShadow: "var(--shadow)",
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

export const settingsRowWrap: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  width: "100%",
};

export const settingsRowLabel: CSSProperties = {
  minWidth: 140,
  flexShrink: 0,
};

export const settingsRowControl: CSSProperties = {
  flex: 1,
  minWidth: 200,
  display: "flex",
  justifyContent: "flex-end",
  flexWrap: "wrap",
};

export const settingsSwatch: CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 10,
  border: "1px solid var(--border)",
  cursor: "pointer",
  padding: 0,
  flexShrink: 0,
};
