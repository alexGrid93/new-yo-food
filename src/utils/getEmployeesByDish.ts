import type { MenuData } from './types'

export const getEmployeesByDish = (day?: string, dish?: string, menu?: MenuData | null) => {
  if (!day || !dish || !menu) return ''

  const dayMenu = menu[day]

  const employees = Object.entries(dayMenu).reduce((acc: string[], [employee, employeeMenu]) => {
    if (employeeMenu.includes(dish)) {
      acc.push(employee)
    }

    return acc
  }, [])

  return employees
}
