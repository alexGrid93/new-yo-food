import { TableParseType } from '@/enums/TableParseType.ts'
import { EmojiMap } from '@/constants/emojiMap.ts'
import type { DishType } from '@/enums/DishType.ts'
import { useYoFoodConfig } from '@/features/useYoFoodConfig.ts'

const createMapFromConfig = () => {
  const { getConfig } = useYoFoodConfig()

  const yofoodParseConfig: Record<DishType, number> = getConfig().parseConfig

  return Object.fromEntries(
    Object.entries(yofoodParseConfig).map(([key, value]) => [value, EmojiMap[key as DishType]?.emoji]),
  )
}

const mapFromConfig = createMapFromConfig()

export const emojiesOrderMap = Object.entries(mapFromConfig).reduce(
  (acc: Record<string, number>, [index, value]) => {
    acc[value] = Number(index)

    return acc
  },
  {},
)

export const addListItemEmojies = (items: string[], parseType: TableParseType = TableParseType.Default) => {
  return items.map((item, index) => {
    const emoji = mapFromConfig[index]

    if (typeof item === 'string' && emoji) {
      return `${emoji}\u00A0\u00A0${item}`
    }

    return item
  })
}
