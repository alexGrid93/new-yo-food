import { DishType } from '@/enums/DishType.ts'
import type { DeliveryStatus } from '@/enums/DeliveryStatus.ts'

export type DayMenu = Record<string, string[]>

export type MenuData = Record<string, DayMenu>

export interface FoodItem {
  ruName: string
  rsName: string
  count: number
  status: DeliveryStatus
}

export interface EmojiMapItem {
  emoji: string
  name: string
  key: DishType
}
