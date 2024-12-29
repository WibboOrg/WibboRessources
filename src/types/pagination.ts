import type { Ref } from 'vue'

export interface PaginationOptions {
  itemsPerPage?: number
}

export interface PaginationState {
  pageCurrent: Ref<number>
  pageCount: Ref<number>
  paginatedItems: Ref<string[]>
  goTo: (page: number) => void
}

export interface PaginationConfig {
  defaultItemsPerPage: number
  maxItemsPerPage: number
}
