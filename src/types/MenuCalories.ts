// @TODO need fix k: number | string

export interface DishCalories {
  name: string
  composition: string[]
  kbzu: {
    k: number | string
    b: number | string
    z: number | string
    u: number | string
  }
  weight: string | null
}

export type MenuCalories = Record<DishCalories['name'], DishCalories>
