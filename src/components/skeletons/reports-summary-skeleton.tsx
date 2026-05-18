import { Skeleton, theme } from 'antd'

export function ReportsSummarySkeleton() {
  const { token } = theme.useToken()

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: token.paddingMD,
        width: '100%',
        padding: token.paddingSM,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
      }}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i}>
          <Skeleton.Input active size="small" style={{ width: '55%', height: 12, marginBottom: 8 }} />
          <Skeleton.Input active size="small" style={{ width: '75%', height: 16 }} />
        </div>
      ))}
    </div>
  )
}
