import { setupWorker } from 'msw/browser'
import { authHandlers } from '@/utils/msw/handlers/auth'
import { dashboardHandlers } from '@/utils/msw/handlers/dashboard'
import { paymentsHandlers } from '@/utils/msw/handlers/payments'
import { reportsHandlers } from '@/utils/msw/handlers/reports'
import { rolesHandlers } from '@/utils/msw/handlers/roles'
import { usersHandlers } from '@/utils/msw/handlers/users'

export const worker = setupWorker(
  ...authHandlers,
  ...usersHandlers,
  ...rolesHandlers,
  ...dashboardHandlers,
  ...paymentsHandlers,
  ...reportsHandlers,
)
