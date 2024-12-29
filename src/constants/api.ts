import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()

export type ResourceType = 'cdn' | 'assets' | 'avatar'
export type ResourceFormat = 'image' | 'audio'

export const categories = {
  article: { type: 'cdn' as ResourceType, format: 'image' as ResourceFormat },
  furni: { type: 'cdn' as ResourceType, format: 'image' as ResourceFormat },
  badge: { type: 'assets' as ResourceType, format: 'image' as ResourceFormat },
  catalogue: { type: 'assets' as ResourceType, format: 'image' as ResourceFormat },
  navigator: { type: 'assets' as ResourceType, format: 'image' as ResourceFormat },
  reception: { type: 'assets' as ResourceType, format: 'image' as ResourceFormat },
  web_promo_small: { type: 'assets' as ResourceType, format: 'image' as ResourceFormat },
  backgrounds: { type: 'assets' as ResourceType, format: 'image' as ResourceFormat },
  banner: { type: 'assets' as ResourceType, format: 'image' as ResourceFormat },
  upload: { type: 'cdn' as ResourceType, format: 'image' as ResourceFormat },
  sound: { type: 'cdn' as ResourceType, format: 'audio' as ResourceFormat },
  clothe: { type: 'avatar' as ResourceType, format: 'image' as ResourceFormat }
}

export type CategoryKey = keyof typeof categories

export const getUrl = (type: ResourceType) => {
  switch (type) {
    case 'cdn':
      return config.public.cdnUrl
    case 'assets':
      return config.public.assetsUrl
    case 'avatar':
      return config.public.avatarUrl
    default:
      return ''
  }
}
