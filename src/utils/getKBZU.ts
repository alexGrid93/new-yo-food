import { LocalStorageKey } from '@/enums/LocalStorageKey.ts'
import type { DishCalories, MenuCalories } from '@/types/MenuCalories.ts'

export const getFullKBZU = (): MenuCalories | null => {
  const total = localStorage.getItem(LocalStorageKey.KBZU_DATA)

  if (!total || total === 'undefined') return null

  return JSON.parse(total)
}

export const getKBZUByName = (name: string): DishCalories => {
  const kbzu = getFullKBZU()

  return kbzu?.[name] || {} as DishCalories
}
