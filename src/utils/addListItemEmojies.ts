import { TableParseType } from '@/enums/TableParseType.ts'

const emojiesMap: Record<string, string> = {
  1: '🍳',
  3: '🥤',
  4: '🍲',
  6: '🥗',
  8: '🥘',
  10: '🍚',
  11: '🧁',
}

const emojiesMapTypeWishDish: Record<string, string> = {
  1: '🍳',
  2: '🥤',
  3: '🍲',
  4: '🥗',
  5: '🥘',
  6: '🍚',
  7: '🥫',
}

export const emojiesOrderMap = Object.entries(emojiesMap).reduce(
  (acc: Record<string, number>, [index, value]) => {
    acc[value] = Number(index)

    return acc
  },
  {},
)

export const addListItemEmojies = (items: string[], parseType: TableParseType = TableParseType.Default) => {
  return items.map((item, index) => {
    const emojiByType: Record<TableParseType, Record<string, string>> = {
      [TableParseType.Default]: emojiesMap,
      [TableParseType.WishDish]: emojiesMapTypeWishDish,
    }

    const emoji = emojiByType[parseType][index]

    if (typeof item === 'string' && emoji) {
      return `${emoji}\u00A0\u00A0${item}`
    }

    return item
  })
}
