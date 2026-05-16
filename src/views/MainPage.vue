<script setup lang="ts">
import CurrentDate from '@/components/CurrentDate.vue'
import TitleContainer from '@/components/TitleContainer.vue'
import ActualMenu from '@/components/ActualMenu.vue'
import { currentDayView, millisecondsDay } from '@/utils/constants'
import { getDishesFromMenu } from '@/utils/getDishesFromMenu'
import { getEmployeesByDish } from '@/utils/getEmployeesByDish'
import { getEmployeesFromMenu } from '@/utils/getEmployeesFromMenu'
import { getEmployeeMenuByDay } from '@/utils/getEmployeeMenuByDay'
import type { MenuData } from '@/utils/types'
import {
  Alert,
  Button,
  Divider,
  Flex,
  Image,
  Input,
  Modal,
  Segmented,
  Spin,
  Typography,
  TypographyTitle,
  Row,
  Col,
  Badge,
} from 'ant-design-vue'
import { ShareAltOutlined, ShoppingCartOutlined } from '@ant-design/icons-vue'

import reloadSvg from '@/assets/reload.svg'
import reloadDisabledSvg from '@/assets/reload_disabled.svg'

import { useUpdateMenu } from '@/utils/useUpdateMenu'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import DishesByEmployee from '@/components/DishesByEmployee.vue'
import EmployeesByDish from '@/components/EmployeesByDish.vue'
import SelectDay from '@/components/SelectDay.vue'
import SelectDish from '@/components/SelectDish.vue'
import SelectEmployee from '@/components/SelectEmployee.vue'
import Text from 'ant-design-vue/es/typography/Text'
import { useShareImage } from '@/features/useShareImage.ts'
import { useHideControls } from '@/features/useHideControls.ts'
import { HideControl } from '@/enums/HideControl.ts'
import ChooseFoodAlert from '@/components/ChooseFoodAlert.vue'
import { useFoodAlert } from '@/features/useFoodAlert.ts'
import LangSwitch from '@/components/LangSwitch.vue'
import PromoView from '@/components/promo/PromoView.vue'
import { useI18n } from 'vue-i18n'
import { usePromoMerketing } from '@/features/usePromoMerketing.ts'

const menuDataFromStorage = localStorage.getItem('menuData')
const selectedEmployeeFromStorage = localStorage.getItem('selectedEmployee')
const menuStartDayFromStorage = localStorage.getItem('menuStartDate')

const menuData = ref(menuDataFromStorage ? (JSON.parse(menuDataFromStorage) as MenuData) : null)
const menuStartDay = ref(
  menuStartDayFromStorage ? new Date(JSON.parse(menuStartDayFromStorage)) : null,
)

const errorState = ref(null)
const currentDate = ref(new Date())
const selectedEmployee = ref(selectedEmployeeFromStorage ?? undefined)
const selectedDish = ref(undefined)
const selectedDay = ref(currentDayView)
const isEmployeeMode = ref(true)
const isUpdateModalOpen = ref(false)
const pastedUrl = ref('')
const inputStatus = ref<'warning' | 'error' | ''>('')
const pastedSheetId = ref<string | null>(null)

const isLoading = ref(false)

const employeesToSelect = computed(() => {
  if (!menuData.value) return []

  return getEmployeesFromMenu(menuData) ?? []
})

const dishesToSelect = computed(() => {
  if (!menuData.value) return {}
  return getDishesFromMenu(menuData.value) ?? {}
})

const employeeMenuByDay = computed(() =>
  getEmployeeMenuByDay(selectedDay.value, selectedEmployee.value, menuData.value),
)

const employeesByDish = computed(() =>
  getEmployeesByDish(selectedDay.value, selectedDish.value, menuData.value),
)

const isActualMenu = computed(() => {
  if (!menuStartDay.value) return false

  const timeDiff = currentDate.value.getTime() - menuStartDay.value.getTime()

  return timeDiff < 5 * millisecondsDay
})

const reloadButtonUrl = computed(() => (isActualMenu.value ? reloadDisabledSvg : reloadSvg))

const updateDate = () => {
  currentDate.value = new Date()
}

const pasteFromClipboard = async () => {
  const text = await navigator.clipboard.readText()
  pastedUrl.value = text
}

const reloadPage = () => {
  window.location.reload()
}

onMounted(() => {
  updateDate()

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) updateDate()
  })

  window.addEventListener('focus', updateDate)
})

onUnmounted(() => {
  document.removeEventListener('visibilitychange', updateDate)
  window.removeEventListener('focus', updateDate)
})

const { isShowBadge, userVisitPromo } = usePromoMerketing()

const handleTogglehMode = (val: SegmentMode) => {
  segmentMode.value = val

  if (val === SegmentMode.Promo) {
    userVisitPromo()
  }
}

const handleUpdateMenu = async () => {
  errorState.value = null
  isLoading.value = true
  isUpdateModalOpen.value = false
  pastedUrl.value = ''
  await useUpdateMenu(pastedSheetId.value, menuData, menuStartDay, errorState)
  isLoading.value = false
}

const SHEETS_URL_REGEX = /^https:\/\/docs\.google\.com\/spreadsheets\/d\/[a-zA-Z0-9_-]+/

const isValidGoogleSheetUrl = (value: string): boolean => {
  return SHEETS_URL_REGEX.test(value.trim())
}

const extractGoogleSheetId = (url: string): string | null => {
  if (!url) return null

  const match = url.match(/^https:\/\/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/)

  return match ? match[1] : null
}

const { onClick, isOpenShareModal, imageResponse, resetImageResponse } = useShareImage()

const onUpdateDay = () => {
  resetImageResponse()
}
const onUpdateEmployee = () => {
  resetImageResponse()
}

watch(pastedUrl, (val) => {
  if (!val) {
    inputStatus.value = ''
    pastedSheetId.value = null

    return
  }

  const isValid = isValidGoogleSheetUrl(val)

  if (isValid) {
    inputStatus.value = ''
    pastedSheetId.value = extractGoogleSheetId(val)
  } else {
    inputStatus.value = 'error'
    pastedSheetId.value = ''
  }
})

watch(isUpdateModalOpen, (isOpen) => {
  if (!isOpen) {
    pastedUrl.value = ''
  }
})

watch(selectedDay, () => (selectedDish.value = undefined))

const { clickHideControl, isShowHideControls } = useHideControls()
const { isShow, onClose, remindMeLater } = useFoodAlert()

enum SegmentMode {
  Employee,
  Dish,
  Promo,
}

const { t } = useI18n()

const segmentOptions = computed(() => [
  {
    value: SegmentMode.Employee,
    payload: {
      name: t('by_name'),
    },
  },
  {
    value: SegmentMode.Dish,
    payload: {
      name: t('by_dish'),
    },
  },
  {
    value: SegmentMode.Promo,
    payload: {
      name: t('promotions.segment_title'),
    },
  },
])

const segmentMode = ref<SegmentMode>(SegmentMode.Employee)

const isEmployeeModeActive = computed(() => segmentMode.value === SegmentMode.Employee)
const isDishModeActive = computed(() => segmentMode.value === SegmentMode.Dish)
const isPromoModeActive = computed(() => segmentMode.value === SegmentMode.Promo)
</script>

<template>
  <ChooseFoodAlert
    v-if="isShow"
    @onCloseAlert="onClose"
    @remindMeLater="remindMeLater"
    class="food-alert"
  />
  <Flex class="menu" align="center" gap="small">
    <Button
      v-if="isShowHideControls"
      @click="
        $router.push({
          query: {
            mode: 'delivery',
          },
        })
      "
      size="large"
    >
      <template #icon>
        <ShoppingCartOutlined />
      </template>
    </Button>

    <img
      @click="
        () => {
          if (!isLoading) {
            isUpdateModalOpen = true
          }
        }
      "
      :src="reloadButtonUrl"
      :class="{ reloadButton: true, 'reloadButton--loading': isLoading }"
    />

    <Button
      v-if="isEmployeeMode && selectedEmployee"
      @click="
        () =>
          onClick({
            dateInfo: selectedDay,
            menu: employeeMenuByDay || [''],
            userName: selectedEmployee || '',
          })
      "
      size="large"
    >
      <template #icon>
        <ShareAltOutlined />
      </template>
    </Button>

    <LangSwitch />
  </Flex>

  <Flex vertical gap="20">
    <CurrentDate @click="clickHideControl(HideControl.DATE)" :date="currentDate" />
    <TitleContainer
      @click-logo="clickHideControl(HideControl.LOGO)"
      @click-title="clickHideControl(HideControl.TITLE)"
    />
  </Flex>
  <Flex gap="20" vertical v-if="errorState">
    <Text type="danger">{{ errorState }}</Text>
    <Button @click="reloadPage">{{ $t('system.reload') }}</Button>
  </Flex>

  <Text class="spinner" v-else-if="isLoading">{{ $t('menu_is_updating') }}...</Text>

  <Flex vertical gap="25" v-else-if="menuStartDay">
    <ActualMenu @click="clickHideControl(HideControl.ACTUAL)" :style="{ marginTop: '20px' }" />

    <div>
      <Segmented
        :value="segmentMode"
        :options="segmentOptions"
        @change="(val) => handleTogglehMode(val as SegmentMode)"
        block
      >
        <template #label="opt">
          <template v-if="opt.value === SegmentMode.Promo && isShowBadge">
            <Badge dot :offset="[5, 0]">
              {{ opt.payload.name }}
            </Badge>
          </template>
          <template v-else>{{ opt.payload.name }}</template>
        </template>
      </Segmented>
    </div>

    <div v-if="isEmployeeModeActive">
      <Row :gutter="[10, 10]">
        <Col :flex="2">
          <SelectDay @update:day="onUpdateDay" v-model="selectedDay" />
        </Col>
        <Col :flex="6">
          <SelectEmployee
            @update:employee="onUpdateEmployee"
            v-model="selectedEmployee"
            :options="employeesToSelect"
          />
        </Col>
      </Row>
      <DishesByEmployee v-model="employeeMenuByDay" />
    </div>
    <div v-else-if="isDishModeActive">
      <Flex vertical gap="10">
        <SelectDay v-model="selectedDay" />
        <SelectDish v-model="selectedDish" :options="dishesToSelect[selectedDay]" />
      </Flex>
      <EmployeesByDish v-model="employeesByDish" />
    </div>
    <div v-else-if="isPromoModeActive">
      <PromoView />
    </div>
  </Flex>

  <Modal
    v-model:open="isUpdateModalOpen"
    :cancelText="$t('system.cancel')"
    :ok-button-props="{
      disabled: !pastedSheetId,
      onClick: () => handleUpdateMenu(),
    }"
    :getContainer="false"
  >
    <template #title>{{ $t('update_menu_modal.title') }}</template>
    <Flex :gap="10" vertical>
      <Text>{{ $t('update_menu_modal.input_label') }}</Text>
      <Input
        v-model:value="pastedUrl"
        :status="inputStatus"
        :placeholder="$t('update_menu_modal.input_placeholder')"
        name="new-table-url"
        allow-clear
      />
      <Button @click="pasteFromClipboard">{{ $t('system.insert') }}</Button>
    </Flex>
    <Divider />
    <Alert :message="$t('update_menu_modal.info_message')" />
    <Divider />
  </Modal>

  <Modal
    v-model:open="isOpenShareModal"
    :getContainer="false"
    :footer="false"
    destroyOnClose
    centered
  >
    <template #title>{{ $t('share_food_modal.title') }}</template>
    <Flex align="center" justify="center" class="imageContainer">
      <Spin v-if="!imageResponse" size="large" />
      <Image
        v-else
        :src="imageResponse"
        :preview="false"
        :placeholder="true"
        width="600"
        height="600"
      />
    </Flex>

    <TypographyTitle :level="5">{{ $t('share_food_modal.how_to_save_title') }}</TypographyTitle>
    <Typography>1. {{ $t('share_food_modal.how_to_save_step_1') }}</Typography>
    <Typography>2. {{ $t('share_food_modal.how_to_save_step_2') }}</Typography>
  </Modal>
</template>

<style>
body {
  position: relative;
  margin: 20px;
  padding: 10px;
  color: #231f20;
  max-width: 800px;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.menu {
  position: absolute;
  right: 20px;
  top: -15px;
}

.reloadButton {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  width: 60px;
  height: 60px;
  transition: transform 0.3s ease-in-out;
}

.reloadButton--loading {
  animation: spin 1s linear infinite;
}

.spinner {
  margin-top: 20px;
}
.spinner > span > i {
  background-color: gray !important;
}

.imageContainer {
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
}

.food-alert {
  position: absolute;
  top: -20px;
  left: 50%;
  width: calc(100% + 40px);
  transform: translateX(-50%);
  z-index: 9999999;
}
</style>
