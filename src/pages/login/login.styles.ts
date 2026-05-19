import type { CSSProperties } from "react";

export function loginRootFlex(compact: boolean): CSSProperties {
  return {
    width: "100%",
    position: "relative",
    boxSizing: "border-box",
    flex: 1,
    minHeight: 0,
    paddingTop: compact ? 56 : 0,
    paddingBottom: compact ? 8 : 0,
    ...(compact && {
      overflowY: "auto",
      WebkitOverflowScrolling: "touch",
    }),
  };
}

export function loginTopBar(compact: boolean): CSSProperties {
  return {
    position: "fixed",
    top: compact
      ? "max(10px, env(safe-area-inset-top, 0px))"
      : 16,
    right: compact
      ? "max(10px, env(safe-area-inset-right, 0px))"
      : 16,
    zIndex: 10,
    borderRadius: 999,
    padding: compact ? "4px 6px 4px 8px" : "6px 8px 6px 12px",
    background: "color-mix(in srgb, var(--bg) 88%, transparent)",
    border: "1px solid var(--border)",
    boxShadow: "var(--shadow)",
  };
}

export function loginRing(compact: boolean): CSSProperties {
  return {
    width: "100%",
    maxWidth: 420,
    borderRadius: compact ? 20 : 24,
    padding: 1,
    background:
      "linear-gradient(145deg, color-mix(in srgb, var(--accent) 45%, transparent), var(--accent-bg) 38%, var(--border) 92%)",
    boxShadow: compact
      ? "0 16px 32px -12px color-mix(in srgb, var(--text-h) 14%, transparent), 0 0 0 1px color-mix(in srgb, var(--border) 80%, transparent)"
      : "0 28px 56px -16px color-mix(in srgb, var(--text-h) 18%, transparent), 0 0 0 1px color-mix(in srgb, var(--border) 80%, transparent)",
  };
}

export function loginPanel(compact: boolean): CSSProperties {
  return {
    borderRadius: compact ? 19 : 23,
    background: "color-mix(in srgb, var(--bg) 92%, transparent)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    padding: compact ? "20px 16px 24px" : "clamp(28px, 5vw, 40px)",
    border: "1px solid color-mix(in srgb, var(--border) 85%, transparent)",
  };
}

export function loginHeroFlex(compact: boolean): CSSProperties {
  return {
    marginBottom: compact ? 20 : 28,
  };
}

export function loginLockIconWrap(compact: boolean): CSSProperties {
  return {
    width: compact ? 48 : 56,
    height: compact ? 48 : 56,
    borderRadius: compact ? 14 : 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--accent-bg)",
    color: "var(--accent)",
    fontSize: compact ? 20 : 24,
    border: "1px solid var(--accent-border)",
  };
}

export function loginTitle(compact: boolean): CSSProperties {
  return {
    margin: 0,
    color: "var(--text-h)",
    fontSize: compact ? 22 : undefined,
    lineHeight: compact ? 1.25 : undefined,
  };
}

export const loginSubtitle: CSSProperties = {
  margin: 0,
  textAlign: "center",
};

export function loginSubtitleCompact(compact: boolean): CSSProperties {
  return {
    ...loginSubtitle,
    fontSize: compact ? 13 : undefined,
    lineHeight: compact ? 1.45 : undefined,
  };
}

export const loginFieldLabel: CSSProperties = {
  color: "var(--text-h)",
};

export const loginInputPrefix: CSSProperties = {
  color: "var(--text)",
};
