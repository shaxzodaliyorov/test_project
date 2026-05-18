import { http, HttpResponse } from 'msw'
import { API_ERROR_KEYS } from '@/constants/api-error-keys'
import { PERMISSIONS } from '@/constants/permissions'
import { ROLE_OPTIONS_MSW } from '@/constants/role-options'
import { getUserFromAuthHeader } from '@/utils/msw/handlers/auth'
import { mswLatency } from '@/utils/msw/msw-latency'

export const rolesHandlers = [
  http.get('/api/roles', async ({ request }) => {
    await mswLatency()
    const user = getUserFromAuthHeader(request.headers.get('authorization'))
    if (!user) {
      return HttpResponse.json({ errorKey: API_ERROR_KEYS.HTTP_UNAUTHORIZED }, { status: 401 })
    }
    if (!user.permissions.includes(PERMISSIONS.USERS_READ)) {
      return HttpResponse.json({ errorKey: API_ERROR_KEYS.HTTP_FORBIDDEN }, { status: 403 })
    }
    return HttpResponse.json({ items: [...ROLE_OPTIONS_MSW] })
  }),
]
