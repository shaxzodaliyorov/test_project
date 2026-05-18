import { http, HttpResponse } from 'msw'
import { PERMISSIONS } from '@/constants/permissions'
import { getUserFromAuthHeader } from '@/utils/msw/handlers/auth'

export const usersHandlers = [
  http.get('/api/users', ({ request }) => {
    const user = getUserFromAuthHeader(request.headers.get('authorization'))
    if (!user) {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    if (!user.permissions.includes(PERMISSIONS.USERS_READ)) {
      return HttpResponse.json({ message: 'Forbidden' }, { status: 403 })
    }
    return HttpResponse.json([
      { id: '1', email: 'admin@test.com', name: 'Admin' },
      { id: '2', email: 'user@test.com', name: 'Regular' },
    ])
  }),
]
