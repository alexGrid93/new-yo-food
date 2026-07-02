import { LocalStorageKey } from '@/enums/LocalStorageKey.ts'
import type { IYoFoodConfig } from '@/types/IYoFoodConfig.ts'

export const useYoFoodConfig = () => {
  const setConfig = (rawConfig: string) => {
    localStorage.setItem(LocalStorageKey.YOFOOD_CONFIG, rawConfig)
  }

  const getConfig = (): IYoFoodConfig => {
    const rawConfig = localStorage.getItem(LocalStorageKey.YOFOOD_CONFIG) || ''

    return JSON.parse(rawConfig) || {}
  }

  return {
    setConfig,
    getConfig,
  }
}
