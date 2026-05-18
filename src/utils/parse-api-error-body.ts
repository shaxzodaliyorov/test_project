/** Reads `errorKey` from JSON error bodies returned by the API. */
export function parseApiErrorKeyFromBody(text: string): string | null {
  const trimmed = text.trim()
  if (!trimmed.startsWith("{")) return null
  try {
    const parsed = JSON.parse(trimmed) as { errorKey?: unknown }
    if (typeof parsed.errorKey === "string" && parsed.errorKey.length > 0) {
      return parsed.errorKey
    }
  } catch {
    /* ignore */
  }
  return null
}
