import { computed, type ComputedRef, ref } from 'vue'
import { LocalStorageKey } from '@/enums/LocalStorageKey.ts'
import { REAL_PROMO_INDEX } from '@/data/promo/promotions.ts'

interface PromoMarketingReturn {
  isShowBadge: ComputedRef<boolean>
  userVisitPromo: () => void
}

export const usePromoMerketing = (): PromoMarketingReturn => {
  const promoIndexLS = localStorage.getItem(LocalStorageKey.PROMO_INDEX)
  const localKeyWindow = ref<number>(Number(promoIndexLS ?? 0))

  const isShowBadge = computed<boolean>(() => {
    return localKeyWindow.value !== REAL_PROMO_INDEX
  })

  const userVisitPromo = (): void => {
    localKeyWindow.value = REAL_PROMO_INDEX // реактивно гасим бейдж
    localStorage.setItem(LocalStorageKey.PROMO_INDEX, String(REAL_PROMO_INDEX)) // фиксируем значение, а не инкремент
  }

  return {
    isShowBadge,
    userVisitPromo,
  }
}
