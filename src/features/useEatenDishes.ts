import { LocalStorageKey } from '@/enums/LocalStorageKey.ts'

type EatenDishesStore = Record<string, Record<string, boolean[]>>

const getTodayKey = (): string => new Date().toDateString()

const readStore = (): EatenDishesStore => {
  const raw = localStorage.getItem(LocalStorageKey.EATEN_DISHES)

  if (!raw) return {}

  try {
    return JSON.parse(raw) as EatenDishesStore
  } catch {
    return {}
  }
}

const writeStore = (store: EatenDishesStore): void => {
  localStorage.setItem(LocalStorageKey.EATEN_DISHES, JSON.stringify(store))
}

export const useEatenDishes = () => {
  const isEaten = (employee: string, index: number): boolean => {
    const store = readStore()

    return Boolean(store[getTodayKey()]?.[employee]?.[index])
  }

  const toggleEaten = (employee: string, index: number): void => {
    const store = readStore()
    const todayKey = getTodayKey()

    if (!store[todayKey]) store[todayKey] = {}
    if (!store[todayKey][employee]) store[todayKey][employee] = []

    store[todayKey][employee][index] = !store[todayKey][employee][index]

    writeStore(store)
  }

  return {
    isEaten,
    toggleEaten,
  }
}
