import { setupWorker } from 'msw/browser'
import { authHandlers } from '@/utils/msw/handlers/auth'
import { usersHandlers } from '@/utils/msw/handlers/users'

export const worker = setupWorker(...authHandlers, ...usersHandlers)
