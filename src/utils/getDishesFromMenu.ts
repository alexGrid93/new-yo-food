import type { MenuData } from './types'
import { removeEmoji } from '@/utils/removeEmoji.ts'

export const getDishesFromMenu = (menu: MenuData) => {
  if (!menu) return

  const days = Object.entries(menu)
  const result: Record<string, string[]> = {}

  for (const [day, menu] of days) {
    const dishes = new Set(Object.values(menu).flat().map(removeEmoji))

    result[day] = Array.from(dishes).sort()
  }

  return result
}
