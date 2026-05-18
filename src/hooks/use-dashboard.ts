import { useQuery } from '@tanstack/react-query'
import type { DashboardResponse } from '@/types/dashboard'
import { apiGet } from '@/utils/http-client'

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: () => apiGet<DashboardResponse>('/api/dashboard'),
  })
}
