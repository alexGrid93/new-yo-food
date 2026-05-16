import { computed, ref } from 'vue'
import { millisecondsDay } from '@/utils/constants.ts'
import { getMenuStartDay } from '@/utils/getMenuStartDay.ts'

export const useActualMenu = () => {
  const menuStartDay = getMenuStartDay()

  const currentDate = ref(new Date())

  const isActualMenu = computed(() => {
    if (!menuStartDay.value) return false

    const timeDiff = currentDate.value.getTime() - menuStartDay.value.getTime()

    return timeDiff < 5 * millisecondsDay
  })

  return {
    isActualMenu,
  }
}
