<script setup lang="ts">
import type { IPromo } from '@/types/promo.ts'
import { computed } from 'vue'

interface Props {
  promo: IPromo
}

const props = defineProps<Props>()

const styleVariables = computed(() => {
  const promoStyle = props.promo.style

  if (!promoStyle) return {}

  return Object.fromEntries(
    Object.entries({
      '--pc-c-gradient-color': promoStyle.gradientColor,
      '--pc-c-title-color': promoStyle.color || promoStyle.titleColor,
      '--pc-c-subtitle-color': promoStyle.color || promoStyle.subtitleColor,
      '--pc-c-percent-color': promoStyle.color || promoStyle.percentColor,
    }).filter(([, v]) => Boolean(v)),
  )
})
</script>

<template>
  <aside :style="styleVariables" class="promo-card">
    <picture>
      <source :srcset="promo.imgWebp" type="image/webp" />
      <img :src="promo.img" class="promo-card__img" alt="" />
    </picture>

    <div class="promo-card__body">
      <h3 class="promo-card__title">{{ $t(promo.title) }}</h3>
      <span class="promo-card__subtitle">{{ $t(promo.subtitle) }}</span>
      <h4 class="promo-card__percent">{{ promo.percentSale }}%</h4>
    </div>
  </aside>
</template>

<style scoped>
.promo-card {
  --pc-gradient-color: var(--pc-c-gradient-color, hsla(0deg, 0%, 87%, 80%));
  --pc-title-color: var(--pc-c-title-color, black);
  --pc-subtitle-color: var(--pc-c-subtitle-color, black);
  --pc-percent-color: var(--pc-c-percent-color, black);
  --pc-padding: 12px;

  max-width: 100%;
  max-height: 300px;
  height: 250px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.promo-card__img {
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
}

.promo-card__body {
  position: absolute;
  inset: 0;

  background-image: linear-gradient(
    hsla(0, 0%, 100%, 0) 0%,
    hsla(0, 0%, 100%, 0) 50%,
    var(--pc-gradient-color) 100%
  );

  display: grid;
  grid-template-areas:
    '. . .'
    'title title percent'
    'subtitle subtitle percent';
  grid-template-rows: 1fr 40px 40px;

  padding: var(--pc-padding);
}

.promo-card__title,
.promo-card__percent {
  margin: 0;
}

.promo-card__title,
.promo-card__subtitle,
.promo-card__percent {
  align-content: center;
}

.promo-card__title {
  grid-area: title;

  font-size: 32px;
  color: var(--pc-title-color);
}

.promo-card__subtitle {
  grid-area: subtitle;

  font-size: 18px;
  line-height: 22px;
  color: var(--pc-subtitle-color);
}
.promo-card__percent {
  grid-area: percent;
  text-align: end;

  font-size: 54px;
  color: var(--pc-percent-color);
}
</style>
