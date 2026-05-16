import {DishType} from '@/enums/DishType.ts'
import type { EmojiMapItem } from '@/utils/types.ts'

export const EmojiMap: Record<DishType, EmojiMapItem> = {
  [DishType.BREAKFAST]: {
    emoji: '🍳',
    name: 'Завтрак',
    key: DishType.BREAKFAST,
  },
  [DishType.JUICE]: {
    emoji: '🥤',
    name: 'Сок',
    key: DishType.JUICE,
  },
  [DishType.SOUP]: {
    emoji: '🍲',
    name: 'Суп',
    key: DishType.SOUP,
  },
  [DishType.SALAD]: {
    emoji: '🥗',
    name: 'Салат',
    key: DishType.SALAD,
  },
  [DishType.MAIN_DISH]: {
    emoji: '🥘',
    name: 'Горячее',
    key: DishType.MAIN_DISH,
  },
  [DishType.SIDE_DISH]: {
    emoji: '🍚',
    name: 'Гарниры',
    key: DishType.SIDE_DISH,
  },
  [DishType.DESSERT]: {
    emoji: '🧁',
    name: 'Десерты',
    key: DishType.DESSERT,
  },
}
