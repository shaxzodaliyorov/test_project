import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '@/routes/paths'

export function ForbiddenPage() {
  const navigate = useNavigate()
  return (
    <Result
      status="403"
      title="403"
      subTitle="You do not have permission to view this page."
      extra={
        <Button type="primary" onClick={() => void navigate(PATHS.DASHBOARD)}>
          Back to dashboard
        </Button>
      }
    />
  )
}
