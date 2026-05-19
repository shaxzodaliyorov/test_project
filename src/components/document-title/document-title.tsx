import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useMatches } from 'react-router-dom'
import { APP_BRAND, formatDocumentTitle } from '@/constants/app-seo'
import type { AppRouteHandle } from '@/types/app-route-handle'
import { resolveDocumentTitleKey } from '@/utils/resolve-document-title-key'

export function DocumentTitle() {
  const matches = useMatches()
  const { pathname } = useLocation()
  const { t, i18n } = useTranslation()

  useEffect(() => {
    let titleKey: string | undefined
    for (let i = matches.length - 1; i >= 0; i--) {
      const handle = matches[i].handle as AppRouteHandle | undefined
      if (handle?.documentTitleKey) {
        titleKey = handle.documentTitleKey
        break
      }
    }
    titleKey ??= resolveDocumentTitleKey(pathname)
    const pageTitle = titleKey ? t(titleKey) : APP_BRAND
    document.title = titleKey ? formatDocumentTitle(pageTitle) : APP_BRAND
  }, [matches, pathname, t, i18n.language])

  return null
}
