import type { IFigureData, IFigureMap } from '~/types/json'

interface FetchedAvatarData {
  figureData: IFigureData
  figureMap: IFigureMap
}

async function fetchAvatarData(assetsUrl: string, cache: string): Promise<FetchedAvatarData> {
  const [figureDataResponse, figureMapResponse] = await Promise.all([
    fetch(`${assetsUrl}/gamedata-sandbox/FigureData.json?cache=${cache}`),
    fetch(`${assetsUrl}/gamedata-sandbox/FigureMap.json?cache=${cache}`)
  ])

  if (!figureDataResponse.ok) {
    throw new Error(`Failed to fetch FigureData: ${figureDataResponse.status}`)
  }
  if (!figureMapResponse.ok) {
    throw new Error(`Failed to fetch FigureMap: ${figureMapResponse.status}`)
  }

  return {
    figureData: await figureDataResponse.json(),
    figureMap: await figureMapResponse.json()
  }
}

function processPartList(figureData: IFigureData): Record<string, string> {
  const partList: Record<string, string> = {}

  for (const figureType of figureData.setTypes ?? []) {
    for (const set of figureType.sets ?? []) {
      if (!set.selectable) continue

      for (const part of set.parts ?? []) {
        const key = `${part.id ?? -1}-${part.type ?? ''}`
        partList[key] = `${figureType.type}-${set.id}`
      }
    }
  }

  return partList
}

function processFigureMap(figureMap: IFigureMap, partList: Record<string, string>): string[] {
  const clothesSet = new Set<string>()

  for (const library of figureMap.libraries ?? []) {
    for (const part of library.parts ?? []) {
      const partId = partList[`${part.id}-${part.type}`]
      if (partId) {
        clothesSet.add(partId)
      }
    }
  }

  return Array.from(clothesSet)
}

export async function processAvatarData(assetsUrl: string, cache: string): Promise<string[]> {
  try {
    const { figureData, figureMap } = await fetchAvatarData(assetsUrl, cache)
    const partList = processPartList(figureData)
    return processFigureMap(figureMap, partList)
  } catch (error) {
    throw new Error(`Failed to process avatar data: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
