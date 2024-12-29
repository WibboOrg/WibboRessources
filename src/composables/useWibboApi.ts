import { categories, type CategoryKey } from '~/constants/api'
import { useRuntimeConfig } from '#imports'
import { processAvatarData } from '~/utils/avatarProcessor'

export const useWibboApi = () => {
  const config = useRuntimeConfig()

  const getApiUrl = (type: 'cdn' | 'assets') => {
    return type === 'cdn' ? config.public.cdnUrl : config.public.assetsUrl
  }

  const fetchResources = async (category: CategoryKey) => {
    try {
      const categoryData = categories[category];
      if (!categoryData) throw new Error('Invalid category');

      const date = new Date();
      const cacheKey = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

      const storedCache = localStorage.getItem(category);
      const storedCacheKey = localStorage.getItem(`${category}_cacheKey`);

      if (storedCache && storedCacheKey === cacheKey) {
        const cache: Partial<Record<CategoryKey, string[]>> = {};
        cache[category] = JSON.parse(storedCache);
        return {
          files: cache[category],
          category: categoryData
        };
      } else {
        localStorage.removeItem(category);
        localStorage.removeItem(`${category}_cacheKey`);
      }

      if (categoryData.type === 'avatar') {
        const files = await processAvatarData(config.public.assetsUrl, cacheKey);
        const cache: Partial<Record<CategoryKey, string[]>> = {};
        cache[category] = files;
        localStorage.setItem(category, JSON.stringify(files));
        localStorage.setItem(`${category}_cacheKey`, cacheKey);
        return {
          files: cache[category],
          category: categoryData
        };
      } else {
        const apiUrl = getApiUrl(categoryData.type);
        const response = await fetch(
          `${apiUrl}/${config.public.apiEndpoint}?cate=${category}&cache=${cacheKey}`
        );

        if (!response.ok) throw new Error('Failed to fetch resources');

        const data = await response.json();
        const files = Array.isArray(data) ? data : data.files || [];
        const cache: Partial<Record<CategoryKey, string[]>> = {};
        cache[category] = files;
        localStorage.setItem(category, JSON.stringify(files));
        localStorage.setItem(`${category}_cacheKey`, cacheKey);
        return {
          files: cache[category],
          category: categoryData
        };
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
      return {
        files: [],
        category: categories[category]
      };
    }
  }

  return {
    categories,
    fetchResources
  }
}
