import type { CSSProperties } from "react";

export const loginRootFlex: CSSProperties = {
  width: "100%",
  position: "relative",
};

export const loginThemeToggleBar: CSSProperties = {
  position: "fixed",
  top: 16,
  right: 16,
  zIndex: 10,
  borderRadius: 999,
  background: "color-mix(in srgb, var(--bg) 88%, transparent)",
  border: "1px solid var(--border)",
  boxShadow: "var(--shadow)",
};

export const loginRing: CSSProperties = {
  width: "100%",
  maxWidth: 420,
  borderRadius: 24,
  padding: 1,
  background:
    "linear-gradient(145deg, color-mix(in srgb, var(--accent) 45%, transparent), var(--accent-bg) 38%, var(--border) 92%)",
  boxShadow:
    "0 28px 56px -16px color-mix(in srgb, var(--text-h) 18%, transparent), 0 0 0 1px color-mix(in srgb, var(--border) 80%, transparent)",
};

export const loginPanel: CSSProperties = {
  borderRadius: 23,
  background: "color-mix(in srgb, var(--bg) 92%, transparent)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  padding: "clamp(28px, 5vw, 40px)",
  border: "1px solid color-mix(in srgb, var(--border) 85%, transparent)",
};

export const loginHeroFlex: CSSProperties = {
  marginBottom: 28,
};

export const loginLockIconWrap: CSSProperties = {
  width: 56,
  height: 56,
  borderRadius: 16,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "var(--accent-bg)",
  color: "var(--accent)",
  fontSize: 24,
  border: "1px solid var(--accent-border)",
};

export const loginTitle: CSSProperties = {
  margin: 0,
  color: "var(--text-h)",
};

export const loginSubtitle: CSSProperties = {
  margin: 0,
  textAlign: "center",
};

export const loginFieldLabel: CSSProperties = {
  color: "var(--text-h)",
};

export const loginInputPrefix: CSSProperties = {
  color: "var(--text)",
};

export const loginDivider: CSSProperties = {
  margin: "28px 0 20px",
  borderColor: "var(--border)",
};

export const loginDemoDividerText: CSSProperties = {
  fontSize: 13,
};

export const loginDemoSpace: CSSProperties = {
  width: "100%",
};

export const loginCertIcon: CSSProperties = {
  color: "var(--accent)",
};

export const loginDemoStrong: CSSProperties = {
  color: "var(--text-h)",
};

export const loginDemoPermissionNote: CSSProperties = {
  fontSize: 13,
};
