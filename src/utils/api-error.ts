function tryParseJsonMessage(text: string): string | null {
  const trimmed = text.trim()
  if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) return null
  try {
    const parsed = JSON.parse(trimmed) as { message?: unknown }
    if (typeof parsed?.message === 'string') return parsed.message
  } catch {
    /* ignore */
  }
  return null
}

export function getApiErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const fromJson = tryParseJsonMessage(error.message)
    if (fromJson) return fromJson
    return error.message || 'Something went wrong'
  }
  if (typeof error === 'string' && error) return error
  return 'Something went wrong'
}
