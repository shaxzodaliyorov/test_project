import { useMutation } from '@tanstack/react-query'
import { App } from 'antd'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/hooks/auth-store'
import type { LoginFormValues } from '@/types/login-form'
import type { User } from '@/types/user'
import { getApiErrorMessage } from '@/utils/api-error'
import { apiPost } from '@/utils/http-client'
import { postLoginPath } from '@/utils/post-login-path'
import {
  createLoginEmailRules,
  createLoginPasswordRules,
} from '@/validators/login-form-validation'

type LoginResponse = { token: string; user: User }

export function useLoginPage() {
  const { t } = useTranslation(['auth', 'validation'])
  const navigate = useNavigate()
  const { message } = App.useApp()
  const setToken = useAuthStore((s) => s.setToken)
  const setUser = useAuthStore((s) => s.setUser)

  const emailRules = useMemo(() => createLoginEmailRules(t), [t])
  const passwordRules = useMemo(() => createLoginPasswordRules(t), [t])

  const login = useMutation({
    mutationFn: (values: LoginFormValues) =>
      apiPost<LoginResponse, LoginFormValues>('/api/auth/login', values),
    onSuccess: (data) => {
      setToken(data.token)
      setUser(data.user)
      void navigate(postLoginPath(data.user))
    },
    onError: (error) => {
      message.error(getApiErrorMessage(error))
    },
  })

  const submit = useCallback(
    (values: LoginFormValues) => {
      login.mutate(values)
    },
    [login],
  )

  return {
    t,
    emailRules,
    passwordRules,
    submit,
    isPending: login.isPending,
  }
}
