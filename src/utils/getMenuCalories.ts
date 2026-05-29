import type { Sheet } from '@/types/Sheet.ts'
import type { MenuCalories } from '@/types/MenuCalories.ts'

const FieldIndex = {
  Name: 0,
  Composition: 1,
  Weight: 3,
  KBZU: 2,
  K: 5,
  B: 6,
  Z: 7,
  U: 8,
  Allergens: 10,
}

export const getMenuCalories = (sheet: Sheet): MenuCalories => {
  const findedTitle = [
    'Завтрак',
    'Напитки',
    'Суп',
    'Сaлаты/Закуски',
    'Горячее',
    'Гарнир',
    'Соусы и топпинги',
  ]

  const slicedList = sheet.data.slice(2, 250)

  return slicedList.reduce((acc: MenuCalories, data) => {
    if (findedTitle.includes(data.join()) || data.length === 0) {
      return acc
    }

    acc[String(data[0]).trim()] = {
      name: String(data[FieldIndex.Name]).trim(),
      composition: data[FieldIndex.Composition],
      kbzu: {
        k: data[FieldIndex.K],
        z: data[FieldIndex.Z],
        b: data[FieldIndex.B],
        u: data[FieldIndex.U],
      },
      weight: data[FieldIndex.Weight],
    }

    return acc
  }, {})
}
