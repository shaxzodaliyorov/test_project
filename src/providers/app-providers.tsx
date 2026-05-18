import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { App, ConfigProvider, theme as antdTheme } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { useThemeStore } from '@/hooks/theme-store'
import { appRouter } from '@/routes/app-routes'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
})

function ThemedTree() {
  const mode = useThemeStore((s) => s.mode)
  const isDark = mode === 'dark'

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: { colorPrimary: isDark ? '#c084fc' : '#aa3bff' },
      }}
    >
      <App>
        <RouterProvider router={appRouter} />
      </App>
    </ConfigProvider>
  )
}

export function AppProviders() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemedTree />
    </QueryClientProvider>
  )
}
