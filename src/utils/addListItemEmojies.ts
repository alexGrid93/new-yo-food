const emojiesMap: Record<string, string> = {
  1: '🍳',
  3: '🥤',
  4: '🍲',
  6: '🥗',
  8: '🥘',
  10: '🍚',
  11: '🧁',
}

export const emojiesOrderMap = Object.entries(emojiesMap).reduce(
  (acc: Record<string, number>, [index, value]) => {
    acc[value] = Number(index)

    return acc
  },
  {},
)

export const addListItemEmojies = (items: string[]) => {
  return items.map((item, index) => {
    const emoji = emojiesMap[index]

    if (typeof item === 'string' && emoji) {
      return `${emoji}\u00A0\u00A0${item}`
    }

    return item
  })
}
