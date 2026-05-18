import { http, HttpResponse } from 'msw'
import { PERMISSIONS } from '@/constants/permissions'
import { ROLE_OPTIONS } from '@/constants/role-options'
import { getUserFromAuthHeader } from '@/utils/msw/handlers/auth'
import { mswLatency } from '@/utils/msw/msw-latency'

export const rolesHandlers = [
  http.get('/api/roles', async ({ request }) => {
    await mswLatency()
    const user = getUserFromAuthHeader(request.headers.get('authorization'))
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    if (!user.permissions.includes(PERMISSIONS.USERS_READ)) {
      return HttpResponse.json({ message: 'Forbidden' }, { status: 403 })
    }
    return HttpResponse.json({ items: [...ROLE_OPTIONS] })
  }),
]
