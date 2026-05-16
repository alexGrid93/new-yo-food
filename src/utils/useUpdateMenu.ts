import type { Ref } from 'vue'
import { downloadAndParseMenuSheet } from './downloadAndParseMenuSheet'
import type { MenuData } from './types'

export const useUpdateMenu = async (
  currentSheetId: string | null,
  menuState: Ref<MenuData | null>,
  startDayState: Ref<Date | null>,
  errorState: Ref<string | null>,
) => {
  const { menuMap, menuStartDay, error } = (await downloadAndParseMenuSheet(currentSheetId)) || {}

  if (error || !menuMap || !menuStartDay) {
    errorState.value = error!
    return
  }

  menuState.value = menuMap
  startDayState.value = menuStartDay!
  localStorage.setItem('menuData', JSON.stringify(menuMap))
  localStorage.setItem('menuStartDate', JSON.stringify(menuStartDay))
}
