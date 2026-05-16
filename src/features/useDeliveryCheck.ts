import type { DayMenu, FoodItem } from '@/utils/types.ts'
import { EmojiMap } from '@/constants/emojiMap.ts'
import type { DishType } from '@/enums/DishType.ts'
import { LocalStorageKey } from '@/enums/LocalStorageKey.ts'

export const useDeliveryCheck = () => {
  const menuDataFromStorage = localStorage.getItem('menuData')

  const getTotalDishes = (day: string): Record<DishType, FoodItem[]> | null => {
    if (!menuDataFromStorage) return null

    const menuDataByDay: DayMenu = JSON.parse(menuDataFromStorage)[day]

    return Object.values(menuDataByDay).reduce<Record<DishType, FoodItem[]>>((acc, dayFoods) => {
      dayFoods.forEach((food) => {
        const key = Object.values(EmojiMap).find(
          (item) => item.emoji === food.substring(0, 2).trim(),
        )?.key || 'other' as DishType

        const rest = food.slice(2).trim()
        const [ruName, rsName] = rest.split('/').map((s) => s.trim())

        acc[key] ??= []

        const existing = acc[key].find((item) => item.ruName === ruName && item.rsName === rsName)

        if (existing) {
          existing.count += 1
        } else {
          acc[key].push({ ruName, rsName, count: 1 })
        }
      })

      return acc
    }, {} as Record<DishType, FoodItem[]>)
  }

  const setTotalToStore = (total: Record<DishType, FoodItem[]> | null) => {
    if (!total) return
    localStorage.setItem(LocalStorageKey.TOTAL_DISHES, JSON.stringify(total))
  };
  const getTotalFromStore = (): Record<DishType, FoodItem[]> | null => {
    const total = localStorage.getItem(LocalStorageKey.TOTAL_DISHES)

    if (!total || total === 'undefined') return null

    return JSON.parse(total)
  }

  const updateDishStatus = (type: DishType, name: string, status: string) => {
    const fromStore = getTotalFromStore();

    if (!fromStore) return

    const newType: FoodItem[] = [...fromStore[type].map(item => {
      if (item.rsName === name) {
        return {
          ...item,
          status: status
        }
      }

      return item
    })] as FoodItem[]

    const newTotal = {
      ...fromStore,
      [type]: newType,
    }

    setTotalToStore(newTotal)
    return newTotal;
  };

  return {
    getTotalDishes,
    setTotalToStore,
    getTotalFromStore,
    updateDishStatus,
  }
}
