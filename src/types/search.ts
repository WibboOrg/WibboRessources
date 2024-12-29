import type { Ref } from 'vue'

export interface SearchState {
  searchText: Ref<string>
  isSearchOpen: Ref<boolean>
  filterItems: <T>(items: T[], searchFn: (item: T) => string) => T[]
}

export type SearchFunction<T> = (item: T) => string
