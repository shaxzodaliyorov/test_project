import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppProviders } from '@/providers/app-providers.tsx'
import './index.css'

async function enableMocking() {
  if (!import.meta.env.DEV) return
  const { worker } = await import('@/utils/msw/browser.ts')
  await worker.start({ onUnhandledRequest: 'bypass' })
}

void enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AppProviders />
    </StrictMode>,
  )
})
