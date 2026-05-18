import { Skeleton } from 'antd'
import {
  listCardActions,
  listCardFieldGrid,
  listCardHeaderAside,
  listCardHeaderMain,
  listCardHeaderRow,
  listCardShellTitleBlock,
} from '@/styles/list-card.styles'
import { SkeletonCardShell } from './skeleton-card-shell'

export type ListCardSkeletonVariant = 'admin-user' | 'payment' | 'report'

type ListCardSkeletonProps = {
  variant: ListCardSkeletonVariant
}

function FieldGridSkeleton({ count }: { count: number }) {
  return (
    <div style={listCardFieldGrid}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i}>
          <Skeleton.Input active size="small" style={{ width: 48, height: 10, marginBottom: 4 }} />
          <Skeleton.Input active size="small" style={{ width: '80%', height: 12 }} />
        </div>
      ))}
    </div>
  )
}

function AdminUserCardSkeleton() {
  return (
    <SkeletonCardShell>
      <div style={listCardHeaderRow}>
        <div style={listCardHeaderMain}>
          <Skeleton.Input active size="small" style={{ width: '70%', height: 16, marginBottom: 6 }} />
          <Skeleton.Input active size="small" style={{ width: '90%', height: 12 }} />
        </div>
        <Skeleton.Input active size="small" style={{ width: 28, height: 12 }} />
      </div>
      <div>
        <Skeleton.Input active size="small" style={{ width: 40, height: 10, marginBottom: 6 }} />
        <Skeleton.Input active size="small" style={{ width: '50%', height: 22 }} />
      </div>
      <div style={listCardActions}>
        <Skeleton.Button active size="small" style={{ width: 72 }} />
        <Skeleton.Button active size="small" style={{ width: 72 }} />
      </div>
    </SkeletonCardShell>
  )
}

function PaymentCardSkeleton() {
  return (
    <SkeletonCardShell>
      <div style={listCardHeaderRow}>
        <div style={listCardHeaderMain}>
          <Skeleton.Input active size="small" style={{ width: '55%', height: 16, marginBottom: 6 }} />
          <Skeleton.Input active size="small" style={{ width: '75%', height: 11 }} />
        </div>
        <div style={listCardHeaderAside}>
          <Skeleton.Input active size="small" style={{ width: 28, height: 11 }} />
          <Skeleton.Input active size="small" style={{ width: 52, height: 20, borderRadius: 4 }} />
        </div>
      </div>
      <Skeleton.Input active size="small" style={{ width: '65%', height: 14 }} />
      <Skeleton.Input active size="small" style={{ width: '80%', height: 11 }} />
      <FieldGridSkeleton count={6} />
    </SkeletonCardShell>
  )
}

function ReportCardSkeleton() {
  return (
    <SkeletonCardShell>
      <div style={listCardShellTitleBlock}>
        <Skeleton.Input active size="small" style={{ width: '50%', height: 16, marginBottom: 6 }} />
        <Skeleton.Input active size="small" style={{ width: '40%', height: 12 }} />
      </div>
      <FieldGridSkeleton count={3} />
    </SkeletonCardShell>
  )
}

export function ListCardSkeleton({ variant }: ListCardSkeletonProps) {
  switch (variant) {
    case 'admin-user':
      return <AdminUserCardSkeleton />
    case 'payment':
      return <PaymentCardSkeleton />
    case 'report':
      return <ReportCardSkeleton />
  }
}
