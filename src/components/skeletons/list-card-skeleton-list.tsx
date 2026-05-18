import { pageCardList } from '@/styles/page-layout.styles'
import { ListCardSkeleton, type ListCardSkeletonVariant } from './list-card-skeleton'

type ListCardSkeletonListProps = {
  count: number
  variant: ListCardSkeletonVariant
}

export function ListCardSkeletonList({ count, variant }: ListCardSkeletonListProps) {
  return (
    <div style={pageCardList}>
      {Array.from({ length: count }, (_, i) => (
        <ListCardSkeleton key={i} variant={variant} />
      ))}
    </div>
  )
}
