import i18n from "@/i18n/i18n";

const GENERIC_KEY = "errors:generic";

function tryParseJsonMessage(text: string): string | null {
  const trimmed = text.trim();
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return null;
  try {
    const parsed = JSON.parse(trimmed) as {
      errorKey?: unknown;
      message?: unknown;
    };
    if (typeof parsed?.errorKey === "string") return parsed.errorKey;
    if (typeof parsed?.message === "string") return parsed.message;
  } catch {
    void 0
  }
  return null;
}

function translateIfErrorKey(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.startsWith("errors:")) {
    const out = i18n.t(trimmed);
    return out === trimmed ? i18n.t(GENERIC_KEY) : out;
  }
  return trimmed;
}

export function getApiErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const fromJson = tryParseJsonMessage(error.message);
    const raw = fromJson ?? error.message;
    if (raw.trim().startsWith("errors:")) return translateIfErrorKey(raw);
    if (raw) return raw;
    return i18n.t(GENERIC_KEY);
  }
  if (typeof error === "string" && error) {
    if (error.trim().startsWith("errors:")) return translateIfErrorKey(error);
    return error;
  }
  return i18n.t(GENERIC_KEY);
}
