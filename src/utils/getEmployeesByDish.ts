import type { MenuData } from './types'
import { removeEmoji } from '@/utils/removeEmoji.ts'

export const getEmployeesByDish = (day?: string, dish?: string, menu?: MenuData | null) => {
  if (!day || !dish || !menu) return ''

  const dayMenu = menu[day]

  const employees = Object.entries(dayMenu).reduce((acc: string[], [employee, employeeMenu]) => {
    const employeeMenuWithoutEmoji = employeeMenu.map(removeEmoji)

    if (employeeMenuWithoutEmoji.includes(dish)) {
      acc.push(employee)
    }

    return acc
  }, [])

  return employees
}
