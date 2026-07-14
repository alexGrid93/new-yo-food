import type { Ref } from 'vue'
import { downloadAndParseMenuSheet } from './downloadAndParseMenuSheet'
import type { MenuData } from './types'
import { LocalStorageKey } from '@/enums/LocalStorageKey.ts'

export const useUpdateMenu = async (
  currentSheetId: string | null,
  menuState: Ref<MenuData | null>,
  startDayState: Ref<Date | null>,
  errorState: Ref<string | null>,
) => {
  localStorage.removeItem(LocalStorageKey.PARSE_TYPE)

  const { menuMap, menuStartDay, error } = (await downloadAndParseMenuSheet(currentSheetId)) || {}

  if (error || !menuMap || !menuStartDay) {
    errorState.value = error!
    return
  }

  localStorage.removeItem(LocalStorageKey.TOTAL_DISHES)

  menuState.value = menuMap
  startDayState.value = menuStartDay!
  localStorage.setItem(LocalStorageKey.MENU_DATA, JSON.stringify(menuMap))
  localStorage.setItem(LocalStorageKey.MENU_START_DATE, JSON.stringify(menuStartDay))
}
