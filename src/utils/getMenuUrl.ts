import { getExportSpreadsheetLink } from './getExportSpreadsheetLink'
import xlsx from 'node-xlsx'

export const getMenuUrl = async (adminSheetId: string) => {
  let error: string | undefined
  const exportAdminSheetLink = getExportSpreadsheetLink(adminSheetId)

  const response = await fetch(exportAdminSheetLink, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },
  })
  if (!response.ok) {
    error = `Ошибка загрузки админской таблицы. Обратитесь к администратору приложения.`
    return { adminError: error }
  }

  const arrayBuffer = await response.arrayBuffer()
  const workbook = xlsx.parse(arrayBuffer, { type: 'array' })
  const pageWithId = workbook[0]

  if (!pageWithId.data?.[0]?.[0]) {
    error =
      'Не удалось найти id таблицы с меню в указанной таблице. Обратитесь к администратору приложения.'
    return { adminError: error }
  }

  try {
    const menuSheetId = pageWithId.data[0][0].trim()

    const menuTableUrl = getExportSpreadsheetLink(menuSheetId)
    return { menuTableUrl, menuSheetId }
  } catch {
    error =
      'Возникла проблема с получением таблицы с меню. Скорее всего вы перешли по неправильной ссылке. Пожалуйста, перейдите по ссылке из чата'

    return { adminError: error }
  }
}
