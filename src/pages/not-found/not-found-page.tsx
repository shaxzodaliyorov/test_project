import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '@/routes/paths'

export function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle="This page does not exist or you do not have access."
      extra={
        <Button type="primary" onClick={() => void navigate(PATHS.DASHBOARD)}>
          Back to dashboard
        </Button>
      }
    />
  )
}
