<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Select, SelectOption } from 'ant-design-vue'
import { I18nManager } from '@/i18n/manager.ts'

const { availableLocales, locale } = useI18n({ useScope: 'global' })

const switchLanguage = async (newLocale: string) => {
  await I18nManager.setLocale(newLocale)
}
</script>

<template>
  <Select
    :value="locale"
    @change="(newVal) => switchLanguage(newVal as string)"
    :showArrow="false"
    size="large"
    class="lang-switch"
  >
    <SelectOption
      v-for="lang in availableLocales"
      :value="lang"
      :key="`locale-${lang}`"
      class="lang-switch-option"
    >
      {{ lang }}
    </SelectOption>
  </Select>
</template>

<style>
.lang-switch.ant-select-single.ant-select-lg:not(.ant-select-customize-input) .ant-select-selector {
  padding: 0 4px;
  min-width: 40px;
  text-align: center;
}

.lang-switch-option.ant-select-item.ant-select-item-option {
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
