import type { Ref } from 'vue'
import { ref } from 'vue'

export const getMenuStartDay = (): Ref<Date | null> => {
  const menuStartDayFromStorage = localStorage.getItem('menuStartDate')

  return ref(menuStartDayFromStorage ? new Date(JSON.parse(menuStartDayFromStorage)) : null)
}
