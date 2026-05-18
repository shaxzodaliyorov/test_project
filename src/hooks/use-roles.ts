import { useQuery } from '@tanstack/react-query'
import { apiGet } from '@/utils/http-client'

export type RoleOption = { label: string; value: string }

type RolesListResponse = { items: RoleOption[] }

export function useRolesList() {
  return useQuery({
    queryKey: ['roles'],
    queryFn: () => apiGet<RolesListResponse>('/api/roles'),
  })
}
