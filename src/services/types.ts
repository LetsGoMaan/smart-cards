import { Pagination } from '@/services/decks/types.ts'

export type PaginatedEntity<T> = {
  pagination: Pagination
  items: T[]
}
