import { ref } from 'vue'
import type { SearchState, SearchFunction } from '~/types/search'

export const useSearch = (): SearchState => {
  const searchText = ref('')
  const isSearchOpen = ref(false)

  const filterItems = <T>(items: T[], searchFn: SearchFunction<T>) => {
    if (!searchText.value) return items
    
    return items.filter(item => 
      searchFn(item).toLowerCase().includes(searchText.value.toLowerCase())
    )
  }

  return {
    searchText,
    isSearchOpen,
    filterItems
  }
}
