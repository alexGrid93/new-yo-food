<script setup lang="ts">
import PromoCard from '@/components/promo/PromoCard.vue'
import {promotions} from '@/data/promo/promotions.ts'
import PromoModal from '@/components/promo/PromoModal.vue'
import { ref } from 'vue'
import type { IPromo } from '@/types/promo.ts'

const isOpenModal = ref(false)
const openedPromo = ref<IPromo | null>(null)
const openPromoModal = (promo: IPromo) => {
  openedPromo.value = promo
  isOpenModal.value = true
}
</script>

<template>
  <section class="promo-view">
    <PromoCard v-for="(promo, index) in promotions" :key="`promo-${index}-${promo.title}`" @click="openPromoModal(promo)" :promo="promo" />

    <PromoModal v-model:open="isOpenModal" :promo="openedPromo" />
  </section>
</template>

<style scoped>
.promo-view {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
