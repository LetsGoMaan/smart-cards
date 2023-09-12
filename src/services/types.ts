export type PaginatedEntity<T> = {
  pagination: Pagination
  items: T[]
}

export interface Pagination {
  totalPages: number
  currentPage: number
  itemsPerPage: number
  totalItems: number
}

export type PaginatedRequest = Partial<Pick<Pagination, 'itemsPerPage' | 'currentPage'>>
