import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { App, ConfigProvider } from 'antd'
import {
  render,
  type RenderOptions,
  type RenderResult,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactElement, ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom'
import i18n from '@/i18n/i18n'

/** For MemoryRouter (react-router FutureConfig). */
export const routerFutureFlags = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
} as const

/** For createMemoryRouter / createBrowserRouter (@remix-run/router). */
export const routerDataFutureFlags = {
  v7_relativeSplatPath: true,
} as const

/** For RouterProvider (react-router; not passed via createMemoryRouter). */
export const routerProviderFutureFlags = {
  v7_startTransition: true,
} as const

export type RenderWithProvidersOptions = Omit<RenderOptions, 'wrapper'> & {
  router?: MemoryRouterProps
  queryClient?: QueryClient
  /** When false, children must supply their own router (e.g. RouterProvider). */
  withMemoryRouter?: boolean
}

export function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
}

export function renderWithProviders(
  ui: ReactElement,
  {
    router,
    queryClient = createTestQueryClient(),
    withMemoryRouter = true,
    ...renderOptions
  }: RenderWithProvidersOptions = {},
): RenderResult & { user: ReturnType<typeof userEvent.setup> } {
  void i18n.changeLanguage('en')

  function Wrapper({ children }: { children: ReactNode }) {
    const content = withMemoryRouter ? (
      <MemoryRouter
        {...router}
        future={{ ...routerFutureFlags, ...router?.future }}
      >
        {children}
      </MemoryRouter>
    ) : (
      children
    )

    return (
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <ConfigProvider>
            <App>{content}</App>
          </ConfigProvider>
        </I18nextProvider>
      </QueryClientProvider>
    )
  }

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  }
}

export * from '@testing-library/react'
export { userEvent }
