import type { YFConfig } from '@/types/YFConfig.ts'

export const getYFConfig = (sheetData: never[][]): YFConfig => {
  return Object.fromEntries(sheetData.filter((row) => row.length > 0))
}
