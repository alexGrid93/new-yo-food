import { DishType } from '@/enums/DishType.ts'

type ParseConfig = Record<Partial<DishType>, number>

export interface IYoFoodConfig {
  parseConfig: ParseConfig
}
