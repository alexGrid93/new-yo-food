export interface DishCalories {
  name: string
  composition: string[]
  kbzu: {
    k: number
    b: number
    z: number
    u: number
  }
  weight: string | null
}

export type MenuCalories = Record<DishCalories['name'], DishCalories>
