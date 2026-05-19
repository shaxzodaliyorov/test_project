import { describe, expect, it } from 'vitest'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { ProtectedRoute } from '@/components/protected-route/protected-route'
import { PERMISSIONS } from '@/constants/permissions'
import { useAuthStore } from '@/hooks/auth-store'
import { PATHS } from '@/routes/paths'
import {
  createTestQueryClient,
  renderWithProviders,
  routerDataFutureFlags,
  routerProviderFutureFlags,
  screen,
  waitFor,
} from '@/test/test-utils'
import {
  findRowById,
  rowToUser,
} from '@/utils/msw/demo-users-store'
import { buildMockJwt } from '@/utils/mock-jwt'

function renderProtectedDashboard() {
  const queryClient = createTestQueryClient()
  const router = createMemoryRouter(
    [
      { path: PATHS.LOGIN, element: <div>Login page</div> },
      { path: PATHS.FORBIDDEN, element: <div>Forbidden</div> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: PATHS.DASHBOARD,
            element: <div>OK</div>,
            handle: { permissions: [PERMISSIONS.DASHBOARD_READ] },
          },
        ],
      },
    ],
    {
      initialEntries: [PATHS.DASHBOARD],
      future: routerDataFutureFlags,
    },
  )

  return renderWithProviders(
    <RouterProvider router={router} future={routerProviderFutureFlags} />,
    {
    queryClient,
      withMemoryRouter: false,
    },
  )
}

describe('ProtectedRoute', () => {
  it('redirects to login when there is no token', async () => {
    renderProtectedDashboard()

    expect(await screen.findByText('Login page')).toBeInTheDocument()
    expect(screen.queryByText('OK')).not.toBeInTheDocument()
  })

  it('renders child route when user has required permission', async () => {
    const adminRow = findRowById('1')
    expect(adminRow).toBeDefined()
    const admin = rowToUser(adminRow!)
    useAuthStore.setState({
      token: buildMockJwt(admin),
      user: admin,
    })

    renderProtectedDashboard()

    expect(await screen.findByText('OK')).toBeInTheDocument()
  })

  it('redirects to forbidden when user lacks required permission', async () => {
    const usersOnlyRow = findRowById('5')
    expect(usersOnlyRow).toBeDefined()
    const usersOnly = rowToUser(usersOnlyRow!)
    useAuthStore.setState({
      token: buildMockJwt(usersOnly),
      user: usersOnly,
    })

    renderProtectedDashboard()

    await waitFor(() => {
      expect(screen.getByText('Forbidden')).toBeInTheDocument()
    })
    expect(screen.queryByText('OK')).not.toBeInTheDocument()
  })
})
