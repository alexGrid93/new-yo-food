import type { Ref } from 'vue'
import type { MenuData } from './types'

export const getEmployeesFromMenu = (menu: Ref<MenuData | null>) => {
  if (!menu.value) return
  const days = Object.values(menu.value)
  let result = null

  for (const day of days) {
    const employees = Object.keys(day)

    if (employees.length > 1) {
      result = employees
      break
    }
  }

  return result?.filter((val) => val !== 'Итого')
}
