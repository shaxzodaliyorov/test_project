import type { TFunction } from 'i18next'

export function paginationShowTotal(t: TFunction) {
  return (total: number, range: [number, number]) =>
    total === 0
      ? t('common:paginationEmpty')
      : t('common:paginationRange', {
          from: range[0],
          to: range[1],
          total,
        })
}
