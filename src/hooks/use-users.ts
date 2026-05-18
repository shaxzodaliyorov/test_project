import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { App } from 'antd'
import { useCallback } from 'react'
import type { Role } from '@/types/role'
import type { User } from '@/types/user'
import { apiDelete, apiGet, apiPost, apiPut } from '@/utils/http-client'

type UsersListResponse = {
  items: User[]
  total: number
  page: number
  pageSize: number
}

export type UseUsersArgs = {
  page: number
  pageSize: number
  search: string
}

export function useUsers({ page, pageSize, search }: UseUsersArgs) {
  const { message } = App.useApp()
  const queryClient = useQueryClient()

  const listQuery = useQuery({
    queryKey: ['users', { page, pageSize, search }],
    queryFn: () => {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
        search,
      })
      return apiGet<UsersListResponse>(`/api/users?${params.toString()}`)
    },
  })

  const invalidateUsers = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: ['users'] })
  }, [queryClient])

  const createMutation = useMutation({
    mutationFn: (body: {
      email: string
      name: string
      password: string
      roles: Role[]
    }) => apiPost<User, typeof body>('/api/users', body),
    onSuccess: () => {
      message.success('User created')
      invalidateUsers()
    },
    onError: (e: Error) => message.error(e.message),
  })

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string
      body: Partial<{
        email: string
        name: string
        password: string
        roles: Role[]
      }>
    }) => apiPut<User, typeof body>(`/api/users/${id}`, body),
    onSuccess: () => {
      message.success('User updated')
      invalidateUsers()
    },
    onError: (e: Error) => message.error(e.message),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiDelete(`/api/users/${id}`),
    onSuccess: () => {
      message.success('User removed')
      invalidateUsers()
    },
    onError: (e: Error) => message.error(e.message),
  })

  return {
    listQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  }
}
