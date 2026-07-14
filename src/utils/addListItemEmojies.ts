import { TableParseType } from '@/enums/TableParseType.ts'
import { LocalStorageKey } from '@/enums/LocalStorageKey.ts'

const emojiesMap: Record<string, string> = {
  1: '🍳',
  3: '🥤',
  4: '🍲',
  6: '🥗',
  8: '🥘',
  10: '🍚',
  11: '🧁',
}

const emojiesMapWithSeparate: Record<string, string> = {
  2: '🍳',
  4: '🥤',
  5: '🍲',
  6: '🥗',
  7: '🥘',
  8: '🧁',
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
      [TableParseType.WithSeparate]: emojiesMapWithSeparate,
    }

    const type: TableParseType = localStorage.getItem(LocalStorageKey.PARSE_TYPE) as TableParseType || parseType

    const emoji = emojiByType[type][index]

    if (typeof item === 'string' && emoji) {
      return `${emoji}\u00A0\u00A0${item}`
    }

    return item
  })
}
