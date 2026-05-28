import type { Ref } from 'vue'
import { ref } from 'vue'
import { LocalStorageKey } from '@/enums/LocalStorageKey.ts'

export const getMenuStartDay = (): Ref<Date | null> => {
  const menuStartDayFromStorage = localStorage.getItem(LocalStorageKey.MENU_START_DATE)

  return ref(menuStartDayFromStorage ? new Date(JSON.parse(menuStartDayFromStorage)) : null)
}
