import { ref, computed, type Ref } from 'vue'
import type { PaginationState, PaginationOptions } from '~/types/pagination'
import { PAGINATION_CONFIG } from '~/constants/pagination'

export const usePagination = (
  items: Ref<string[]>, 
  options: PaginationOptions = {}
): PaginationState => {
  const pageCurrent = ref(1)
  const itemsPerPage = options.itemsPerPage ?? PAGINATION_CONFIG.defaultItemsPerPage

  const pageCount = computed(() => {
    return Math.ceil(items.value.length / itemsPerPage)
  })

  const paginatedItems = computed(() => {
    const start = (pageCurrent.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return items.value.slice(start, end)
  })

  const goTo = (page: number) => {
    if (page > 0 && page <= pageCount.value) {
      pageCurrent.value = page
    }
  }

  return {
    pageCurrent,
    pageCount,
    paginatedItems,
    goTo
  }
}
