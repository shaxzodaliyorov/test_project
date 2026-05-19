export const APP_BRAND = 'TASK'

export function formatDocumentTitle(pageTitle: string): string {
  return `${APP_BRAND} | ${pageTitle}`
}
