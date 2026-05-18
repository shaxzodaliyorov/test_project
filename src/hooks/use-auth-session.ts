import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useAuthStore } from '@/hooks/auth-store'
import { apiGet } from '@/utils/http-client'
import type { User } from '@/types/user'

export function useAuthSession() {
  const token = useAuthStore((s) => s.token)
  const setUser = useAuthStore((s) => s.setUser)
  const logout = useAuthStore((s) => s.logout)
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['me', token],
    queryFn: () => apiGet<User>('/api/auth/me'),
    enabled: Boolean(token),
  })

  useEffect(() => {
    if (query.data) setUser(query.data)
  }, [query.data, setUser])

  useEffect(() => {
    if (!token || !query.isError) return
    logout()
    queryClient.removeQueries({ queryKey: ['me'] })
  }, [query.isError, queryClient, token, logout])

  return query
}
