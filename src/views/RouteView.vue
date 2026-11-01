<script setup lang="ts">
import DeliveryCheckPage from '@/views/DeliveryCheckPage.vue'
import MainPage from '@/views/MainPage.vue'
import MainSettingPage from '@/views/MainSettingPage.vue'
import { I18nManager } from '@/i18n/manager.ts'
import { App } from 'ant-design-vue'

const isFirstRun = !I18nManager.getCurrentUserLocale()
</script>

<template>
  <App>
    <template v-if="isFirstRun || $route.query.mode === 'settings'">
      <MainSettingPage />
    </template>

    <template v-else-if="$route.query.mode === 'delivery'">
      <DeliveryCheckPage />
    </template>

    <template v-else>
      <MainPage />
    </template>
  </App>
</template>

<style scoped></style>
