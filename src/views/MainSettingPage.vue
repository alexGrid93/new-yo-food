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
  Select,
} from 'ant-design-vue'
import { computed, ref } from 'vue'
import { LocalStorageKey } from '@/enums/LocalStorageKey.ts'
import type { MenuData } from '@/utils/types.ts'
import { getEmployeesFromMenu } from '@/utils/getEmployeesFromMenu.ts'
import { getOptionsForSelect } from '@/utils/getOptionsForSelect.ts'
import { useMyIdentity } from '@/features/useMyIdentity.ts'

const { availableLocales, locale } = useI18n({ useScope: 'global' })

const currentLocale = ref(locale)

const menuDataFromStorage = localStorage.getItem(LocalStorageKey.MENU_DATA)
const menuData = ref(menuDataFromStorage ? (JSON.parse(menuDataFromStorage) as MenuData) : null)

const employeesToSelect = computed(() => getEmployeesFromMenu(menuData) ?? [])

const { myEmployeeName, setMyEmployeeName } = useMyIdentity()
const pendingIdentity = ref<string | undefined>(myEmployeeName.value ?? undefined)

const isLocaleChosen = computed(() => !!I18nManager.getCurrentUserLocale())
const isIdentityForced = computed(
  () => employeesToSelect.value.length > 0 && !myEmployeeName.value,
)
const canGoBack = computed(() => isLocaleChosen.value && !isIdentityForced.value)
const canSave = computed(() => employeesToSelect.value.length === 0 || !!pendingIdentity.value)

const save = async () => {
  await I18nManager.setLocale(currentLocale.value)

  if (pendingIdentity.value) {
    setMyEmployeeName(pendingIdentity.value)

    if (!localStorage.getItem(LocalStorageKey.SELECTED_EMPLOYEE)) {
      localStorage.setItem(LocalStorageKey.SELECTED_EMPLOYEE, pendingIdentity.value)
    }
  }

  window.location.href = '/'
}
</script>

<template>
  <div class="main-setting-page">
    <div class="main-setting-page__section">
      <div class="main-setting-page__titles">
        <TypographyTitle :level="2">Select language</TypographyTitle>
        <TypographyText type="secondary">Выберите язык</TypographyText>
        <Divider type="vertical" />
        <TypographyText type="secondary">Izaberite jezik</TypographyText>
      </div>

      <RadioGroup v-model:value="currentLocale" size="large">
        <RadioButton v-for="lang in availableLocales" :value="lang" :key="`locale-${lang}`">
          {{ lang }}
        </RadioButton>
      </RadioGroup>
    </div>

    <div class="main-setting-page__section" v-if="employeesToSelect.length">
      <div class="main-setting-page__titles">
        <TypographyTitle :level="3">{{ $t('identity_section.title') }}</TypographyTitle>
        <TypographyText type="secondary">{{ $t('identity_section.description') }}</TypographyText>
      </div>

      <Select
        size="large"
        show-search
        class="main-setting-page__identity-select"
        v-model:value="pendingIdentity"
        :placeholder="$t('identity_section.placeholder')"
        :options="getOptionsForSelect(employeesToSelect)"
      />
    </div>

    <div class="main-setting-page__actions">
      <Button v-if="canGoBack" size="large" @click="$router.push('')">
        {{ $t('system.cancel') }}
      </Button>
      <Button
        @click="save"
        :disabled="!canSave"
        type="primary"
        size="large"
        block
        class="main-setting-page__ok"
      >
        Ок 👌
      </Button>
    </div>
  </div>
</template>

<style scoped>
.main-setting-page {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 20px 0;
}

.main-setting-page__section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 420px;
}

.main-setting-page__titles {
  text-align: center;
}

.main-setting-page__identity-select {
  width: 100%;
}

.main-setting-page__actions {
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: 420px;
}

.main-setting-page__ok {
  flex: 1;
}
</style>
