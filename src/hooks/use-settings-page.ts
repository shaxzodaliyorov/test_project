import { App } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { CurrencyCode } from '@/constants/currencies'
import type { UiLocale } from '@/constants/ui-languages'
import { useAuthStore } from '@/hooks/auth-store'
import { useUiPreferencesStore } from '@/hooks/ui-preferences-store'
import type { User } from '@/types/user'
import { apiPatch } from '@/utils/http-client'
import {
  commitThemeAndAppearanceToStores,
  isDraftDirty,
  readDraftFromStores,
  type SettingsDraft,
} from '@/pages/settings/settings-draft'

export function useSettingsPage() {
  const { message } = App.useApp()
  const { t } = useTranslation(['settings', 'common'])
  const user = useAuthStore((s) => s.user)
  const setUser = useAuthStore((s) => s.setUser)

  const [committed, setCommitted] = useState<SettingsDraft>(() =>
    readDraftFromStores(),
  )
  const [draft, setDraft] = useState<SettingsDraft>(() => readDraftFromStores())
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!user?.id) return
    const s = readDraftFromStores()
    queueMicrotask(() => {
      setCommitted(s)
      setDraft(s)
    })
  }, [user?.id])

  const dirty = isDraftDirty(committed, draft)

  const patchDraft = useCallback((patch: Partial<SettingsDraft>) => {
    setDraft((d) => ({ ...d, ...patch }))
  }, [])

  const handleCancel = useCallback(() => {
    setDraft({ ...committed })
  }, [committed])

  const handleSave = useCallback(async () => {
    setSaving(true)
    try {
      const updated = await apiPatch<
        User,
        { preferredCurrency: CurrencyCode; preferredLocale: UiLocale }
      >('/api/auth/me/preferences', {
        preferredCurrency: draft.currency,
        preferredLocale: draft.locale,
      })
      setUser(updated)
      useUiPreferencesStore.getState().setLocale(updated.preferredLocale)
      useUiPreferencesStore.getState().setCurrency(updated.preferredCurrency)
      commitThemeAndAppearanceToStores(draft)
      const next = readDraftFromStores()
      setCommitted(next)
      setDraft(next)
      message.success(t('settings:saveSuccess'))
    } catch (e) {
      message.error(e instanceof Error ? e.message : t('common:error'))
    } finally {
      setSaving(false)
    }
  }, [draft, message, setUser, t])

  return {
    draft,
    dirty,
    saving,
    patchDraft,
    handleCancel,
    handleSave,
  }
}
