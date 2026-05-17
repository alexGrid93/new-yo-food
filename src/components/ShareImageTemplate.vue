<script setup lang="ts">
import mascot from '@/assets/mascot-share.png?inline'
import { useI18n } from 'vue-i18n'

interface ShareItem {
  text: string
  selected: boolean
}

defineProps<{
  userName: string
  dateInfo: string
  items: ShareItem[]
}>()

const { t } = useI18n()
</script>

<template>
  <div class="share-template">
    <div class="share-template__header">
      <img :src="mascot" alt="" class="share-template__mascot" crossorigin="anonymous" />
      <div class="share-template__info">
        <div class="share-template__title">{{ userName }}</div>
        <div class="share-template__subtitle">{{ dateInfo }}</div>
      </div>
    </div>
    <ul class="share-template__menu">
      <li
        v-for="(item, i) in items"
        :key="i"
        :class="{ 'share-template__item--unselected': !item.selected }"
        class="share-template__item"
      >
        {{ item.text }}
      </li>
    </ul>
    <div class="share-template__quote">{{ t('share_food_modal.quote') }}</div>
    <div class="share-template__quote-author">— {{ t('share_food_modal.quote_author') }}</div>
  </div>
</template>

<style scoped>
.share-template {
  width: 600px;
  padding: 40px;
  background: #fff;
  color: #231f20;
  font-family: 'Cormorant Garamond', 'Times New Roman', serif;
  box-sizing: border-box;
}
.share-template__header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
}
.share-template__mascot {
  display: block;
  width: 110px;
  height: auto;
  flex-shrink: 0;
}
.share-template__info {
  flex: 1;
  min-width: 0;
}
.share-template__quote {
  font-size: 22px;
  font-style: italic;
  text-align: center;
  line-height: 1.3;
  margin-top: 32px;
}
.share-template__quote-author {
  font-size: 16px;
  text-align: center;
  opacity: 0.6;
  margin-top: 4px;
}
.share-template__title {
  font-size: 24px;
  font-weight: 600;
  line-height: 1.2;
}
.share-template__subtitle {
  font-size: 18px;
  margin-top: 4px;
  opacity: 0.7;
}
.share-template__menu {
  list-style: none;
  padding: 0;
  margin: 0;
}
.share-template__item {
  font-size: 20px;
  line-height: 1.45;
  padding: 14px 0;
  border-bottom: 1px solid #eee;
}
.share-template__item:last-child {
  border-bottom: none;
}
.share-template__item--unselected {
  text-decoration: line-through;
  text-decoration-thickness: 2px;
  opacity: 0.6;
}
</style>
