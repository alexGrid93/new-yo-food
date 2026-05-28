import xlsx from 'node-xlsx'
import { getJsDateFromExcel } from 'excel-date-to-js'
import { days, maxEmployeesCount, startIndex } from './constants'
import type { DayMenu, MenuData } from './types'
import { addListItemEmojies } from './addListItemEmojies'
import { getExportSpreadsheetLink } from './getExportSpreadsheetLink'
import { TableParseType } from '@/enums/TableParseType.ts'

export const downloadAndParseMenuSheet = async (currentSheetId: string | null) => {
  let menuStartDay: Date | undefined
  let error: string | undefined

  if (!currentSheetId) {
    error = 'Не удалось получить ссылку на таблицу'

    return { error }
  }

  const exportAdminSheetLink = getExportSpreadsheetLink(currentSheetId)

  const response = await fetch(exportAdminSheetLink, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
  })
  if (!response.ok) {
    error = `Ошибка загрузки таблицы c меню. Обратитесь к администратору приложения.`
    return { error }
  }
  const arrayBuffer = await response.arrayBuffer()
  const workbook = xlsx.parse(arrayBuffer, { type: 'array' })

  const menuMap = workbook.reduce((acc: MenuData, sheet) => {
    if (!days.has(sheet.name.toLowerCase())) {
      return acc
    }

    let parseType: TableParseType = TableParseType.Default

    const getMaybeStartDate = (): number => {
      if (typeof sheet.data[1][0] === 'number') {
        parseType = TableParseType.WishDish

        return sheet.data[1][0]
      }

      return sheet.data[0][0]
    }
    const maybeStartDate = getMaybeStartDate()

    const isDate = maybeStartDate > 10000 && maybeStartDate < 73000

    if (!menuStartDay && isDate) {
      menuStartDay = getJsDateFromExcel(maybeStartDate)
    }

    const sheetData = sheet.data.slice(startIndex, maxEmployeesCount)

    const dayMenu = sheetData.reduce((acc: DayMenu, current: string[]) => {
      const cleanedCurrent = current.slice(current.findIndex((item) => item !== undefined))

      const itemsWithEmojies = addListItemEmojies(cleanedCurrent, parseType)

      const filteredRow = itemsWithEmojies.filter((el) => typeof el === 'string')

      const employeeName = filteredRow.shift()?.trim()

      if (!employeeName) return acc

      acc[employeeName] = filteredRow

      return acc
    }, {})

    acc[sheet.name.toLowerCase()] = dayMenu

    return acc
  }, {})

  return { menuMap, menuStartDay }
}
