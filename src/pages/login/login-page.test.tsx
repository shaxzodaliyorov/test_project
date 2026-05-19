import { describe, expect, it } from 'vitest'
import { useAuthStore } from '@/hooks/auth-store'
import { LoginPage } from '@/pages/login/login-page'
import {
  renderWithProviders,
  screen,
  waitFor,
} from '@/test/test-utils'

describe('LoginPage', () => {
  it('renders welcome heading in English', () => {
    renderWithProviders(<LoginPage />, {
      router: { initialEntries: ['/login'] },
    })

    expect(
      screen.getByRole('heading', { name: /welcome back/i }),
    ).toBeInTheDocument()
  })

  it('shows validation errors when submitting empty form', async () => {
    const { user } = renderWithProviders(<LoginPage />, {
      router: { initialEntries: ['/login'] },
    })

    await user.click(screen.getByRole('button', { name: /continue/i }))

    expect(await screen.findByText('Email is required')).toBeInTheDocument()
    expect(await screen.findByText('Password is required')).toBeInTheDocument()
  })

  it('stores token after successful login', async () => {
    const { user } = renderWithProviders(<LoginPage />, {
      router: { initialEntries: ['/login'] },
    })

    await user.type(
      screen.getByRole('textbox', { name: /email/i }),
      'admin@test.com',
    )
    await user.type(screen.getByLabelText(/password/i), 'Admin@123')
    await user.click(screen.getByRole('button', { name: /continue/i }))

    await waitFor(() => {
      expect(useAuthStore.getState().token).toBeTruthy()
    })
    expect(useAuthStore.getState().user?.email).toBe('admin@test.com')
  })

  it('shows error message for invalid credentials', async () => {
    const { user } = renderWithProviders(<LoginPage />, {
      router: { initialEntries: ['/login'] },
    })

    await user.type(
      screen.getByRole('textbox', { name: /email/i }),
      'admin@test.com',
    )
    await user.type(screen.getByLabelText(/password/i), 'wrong-password')
    await user.click(screen.getByRole('button', { name: /continue/i }))

    expect(
      await screen.findByText('Invalid email or password.'),
    ).toBeInTheDocument()
    expect(useAuthStore.getState().token).toBeNull()
  })
})
