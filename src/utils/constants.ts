import { I18nManager } from '@/i18n/manager.ts'

export const millisecondsDay = 1000 * 60 * 60 * 24

export const getCurrentDateView = (date: Date, config?: { withWeekday: boolean }) => {
  const options = {
    ...(config?.withWeekday ? { weekday: 'long' } : {}),
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as Intl.DateTimeFormatOptions

  const currentLocate = I18nManager.getCurrentLocale()

  const formattedDate = date.toLocaleDateString(currentLocate === 'sr' ? 'sr-Latn' : currentLocate, options)

  return `${formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}`
}

export const arrayDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб']

interface IDaysMap {
  Mon: string
  Tue: string
  Wed: string
  Thu: string
  Fri: string
  Sat: string
}

export const DaysMap: IDaysMap = {
  Mon: arrayDays[0],
  Tue: arrayDays[1],
  Wed: arrayDays[2],
  Thu: arrayDays[3],
  Fri: arrayDays[4],
  Sat: arrayDays[5],
}

export const days = new Set(arrayDays)

const getCurrentWeekDay = () => {
  const currentDay = new Date().getDay() - 1

  return arrayDays[currentDay] ?? arrayDays[0]
}

export const currentDayView = getCurrentWeekDay()

export const maxEmployeesCount = 200

export const startIndex = 4
