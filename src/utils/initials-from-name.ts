export function initialsFromName(name: string | undefined | null): string {
  const n = name?.trim()
  if (!n) return '?'
  const words = n.split(/\s+/).filter(Boolean)
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  const first = words[0][0]
  const last = words[words.length - 1][0]
  return `${first}${last}`.toUpperCase()
}
