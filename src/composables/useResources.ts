import { ref, computed } from 'vue'
import { useWibboApi } from './useWibboApi'
import type { CategoryKey, ResourceFormat, ResourceType } from '~/constants/api'
import { useRuntimeConfig } from '#imports'

export const useResources = () => {
  const { fetchResources } = useWibboApi()
  const config = useRuntimeConfig()
  const route = useRoute()
  
  const files = ref<string[]>([])
  const currentCategory = ref<{ type: ResourceType, format: ResourceFormat } | null>(null)
  const categorySelected = ref<CategoryKey>('article')

  const getApiUrl = (type: 'cdn' | 'assets') => {
    return type === 'cdn' ? config.public.cdnUrl : config.public.assetsUrl
  }

  const baseUrl = computed(() => {
    const category = currentCategory.value
    if (!category) return ''
    
    if (category.type === 'avatar') {
      return `${config.public.avatarUrl}/?figure=`
    }
    return `${getApiUrl(category.type)}/`
  })

  const fileName = (file: string) => {
    return file.split('/').pop()?.split('.')[0] || ''
  }

  const loadPage = async (cate: CategoryKey) => {
    try {
      categorySelected.value = cate

      if (cate !== route.query.category) {
        await navigateTo({
          query: { 
            ...route.query,
            category: cate 
          }
        })
      }

      const { files: newFiles, category } = await fetchResources(cate)
      if (!newFiles || newFiles.length === 0) {
        throw new Error('No files found')
      }

      files.value = newFiles
      currentCategory.value = category
    } catch (error) {
      console.error('Error in loadPage:', error)
      files.value = []
      currentCategory.value = null
      throw createError({ statusCode: 404, statusMessage: 'Page not found' })
    }
  }

  return {
    files,
    currentCategory,
    categorySelected,
    baseUrl,
    fileName,
    loadPage
  }
}
