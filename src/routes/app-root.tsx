import { Outlet } from 'react-router-dom'
import { DocumentTitle } from '@/components/document-title/document-title'

export function AppRoot() {
  return (
    <>
      <DocumentTitle />
      <Outlet />
    </>
  )
}
