<script setup lang="ts">
import { I18nManager } from '@/i18n/manager.ts'
import { useI18n } from 'vue-i18n'
import {
  RadioGroup,
  RadioButton,
  Button,
  TypographyTitle,
  TypographyText,
  Divider,
} from 'ant-design-vue'
import { ref } from 'vue'

const { availableLocales, locale } = useI18n({ useScope: 'global' })

const currentLocale = ref(locale)

const switchLanguage = async () => {
  await I18nManager.setLocale(currentLocale.value)
}

const ok = async () => {
  await switchLanguage()
  window.location.reload()
}
</script>

<template>
  <div class="main-setting-page">
    <div class="main-setting-page__titles">
      <TypographyTitle :level="2">Select language</TypographyTitle>
      <TypographyText type="secondary">Выберите язык</TypographyText>
      <Divider type="vertical" />
      <TypographyText type="secondary">Izaberite jezik</TypographyText>
    </div>

    <div>
      <RadioGroup v-model:value="currentLocale" size="large">
        <RadioButton
          v-for="lang in availableLocales"
          :value="lang"
          :key="`locale-${lang}`"
        >
          {{ lang }}
        </RadioButton>
      </RadioGroup>
    </div>

    <Button @click="ok" type="primary" size="large" block class="main-setting-page__ok">
      Ок 👌
    </Button>
  </div>
</template>

<style scoped>
.main-setting-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.main-setting-page__titles {
  margin-bottom: 20px;
}

.main-setting-page__ok {
  margin-top: 120px;
}
</style>
