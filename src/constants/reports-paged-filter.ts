export type PagedFilter = { page: number; pageSize: number; search: string };

export const REPORTS_INITIAL_PAGED: PagedFilter = {
  page: 1,
  pageSize: 10,
  search: '',
}

export const REPORTS_DAILY_INITIAL: PagedFilter = {
  ...REPORTS_INITIAL_PAGED,
  pageSize: 12,
}

export const REPORTS_CATEGORIES_INITIAL: PagedFilter = {
  ...REPORTS_INITIAL_PAGED,
  pageSize: 12,
}

export const REPORTS_HOURLY_INITIAL: PagedFilter = {
  ...REPORTS_INITIAL_PAGED,
  pageSize: 12,
}
