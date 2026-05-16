import type { MenuData } from './types'

export const getEmployeeMenuByDay = (day?: string, employee?: string, menu?: MenuData | null) => {
  if (!day || !employee || !menu) return ''

  return menu[day][employee]
}
