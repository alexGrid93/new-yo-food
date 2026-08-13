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
  Checkbox,
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
import ShareImageTemplate from '@/components/ShareImageTemplate.vue'
import { ReloadOutlined, ShareAltOutlined, ShoppingCartOutlined } from '@ant-design/icons-vue'

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
import { useShareAnnouncement } from '@/features/useShareAnnouncement.ts'
import { LocalStorageKey } from '@/enums/LocalStorageKey.ts'

const menuDataFromStorage = localStorage.getItem(LocalStorageKey.MENU_DATA)
const selectedEmployeeFromStorage = localStorage.getItem(LocalStorageKey.SELECTED_EMPLOYEE)
const menuStartDayFromStorage = localStorage.getItem(LocalStorageKey.MENU_START_DATE)

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

const { isShowShareBadge, markShareClicked } = useShareAnnouncement()

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

const {
  onClick,
  isOpenPreShareModal,
  isOpenShareModal,
  imageUrl: shareImageUrl,
  imageBlob: shareImageBlob,
  isCopied: isShareCopied,
  canNativeShare,
  canCopy: canCopyImage,
  dateInfo: shareDateInfo,
  userName: shareUserName,
  menuItems: shareMenuItems,
  templateRef: shareTemplateRef,
  closePreShareModal,
  toggleItem: toggleShareItem,
  generateImage,
  shareImage,
  downloadImage,
  copyImage,
  resetImageResponse,
} = useShareImage()

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

watch([isOpenShareModal, isOpenPreShareModal], ([share, pre]) => {
  document.body.style.overflow = share || pre ? 'hidden' : ''
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

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
  // {
  //   value: SegmentMode.Promo,
  //   payload: {
  //     name: t('promotions.segment_title'),
  //   },
  // },
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
  <Flex vertical gap="10">
    <Flex align="center" justify="space-between" gap="small">
      <CurrentDate @click="clickHideControl(HideControl.DATE)" :date="currentDate" />

      <Flex align="center" gap="small">
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

        <Button
          size="large"
          :type="isActualMenu ? 'default' : 'primary'"
          :loading="isLoading"
          @click="isUpdateModalOpen = true"
        >
          <template #icon>
            <ReloadOutlined />
          </template>
        </Button>

        <Badge
          v-if="isEmployeeMode && selectedEmployee && employeeMenuByDay && employeeMenuByDay.length"
          :dot="isShowShareBadge"
          :offset="[-6, 6]"
          :class="{ 'share-button--highlight': isShowShareBadge }"
        >
          <Button
            @click="
              () => {
                markShareClicked()
                onClick({
                  dateInfo: selectedDay,
                  menu: employeeMenuByDay || [''],
                  userName: selectedEmployee || '',
                })
              }
            "
            size="large"
          >
            <template #icon>
              <ShareAltOutlined />
            </template>
          </Button>
        </Badge>

        <LangSwitch />
      </Flex>
    </Flex>

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
    v-model:open="isOpenPreShareModal"
    :getContainer="false"
    :okText="$t('share_food_modal.pre_generate')"
    :cancelText="$t('system.cancel')"
    :ok-button-props="{ onClick: () => generateImage() }"
    :cancel-button-props="{ onClick: () => closePreShareModal() }"
    :body-style="{ maxHeight: '60vh', overflowY: 'auto' }"
    centered
  >
    <template #title>{{ $t('share_food_modal.pre_title') }}</template>
    <Text type="secondary">{{ $t('share_food_modal.pre_hint') }}</Text>
    <Divider />
    <Flex vertical gap="8">
      <Checkbox
        v-for="(item, i) in shareMenuItems"
        :key="i"
        :checked="item.selected"
        @change="toggleShareItem(i)"
      >
        {{ item.text }}
      </Checkbox>
    </Flex>
  </Modal>

  <Modal
    v-model:open="isOpenShareModal"
    :getContainer="false"
    :footer="false"
    :body-style="{ maxHeight: '95vh', overflowY: 'auto' }"
    destroyOnClose
    centered
    @cancel="resetImageResponse"
  >
    <Flex align="center" justify="center" class="imageContainer">
      <Spin v-if="!shareImageUrl" size="large" />
      <Image v-else :src="shareImageUrl" :preview="false" :placeholder="true" class="shareImage" />
    </Flex>

    <Flex
      v-if="shareImageBlob"
      gap="10"
      justify="center"
      :style="{ marginTop: '16px' }"
      wrap="wrap"
    >
      <Button v-if="canNativeShare" type="primary" size="large" @click="shareImage">
        <template #icon>
          <ShareAltOutlined />
        </template>
        {{ $t('share_food_modal.send') }}
      </Button>
      <template v-else>
        <Button type="primary" size="large" @click="downloadImage">
          {{ $t('share_food_modal.download') }}
        </Button>
        <Button v-if="canCopyImage" size="large" @click="copyImage">
          {{ isShareCopied ? $t('share_food_modal.copied') : $t('share_food_modal.copy') }}
        </Button>
      </template>
    </Flex>

    <template v-if="shareImageBlob && !canNativeShare && !canCopyImage">
      <TypographyTitle :level="5">{{ $t('share_food_modal.how_to_save_title') }}</TypographyTitle>
      <Typography>1. {{ $t('share_food_modal.how_to_save_step_1') }}</Typography>
      <Typography>2. {{ $t('share_food_modal.how_to_save_step_2') }}</Typography>
    </template>
  </Modal>

  <div ref="shareTemplateRef" class="share-template-offscreen" aria-hidden="true">
    <ShareImageTemplate
      :user-name="shareUserName"
      :date-info="shareDateInfo"
      :items="shareMenuItems"
    />
  </div>
</template>

<style>
body {
  position: relative;
  margin: 8px 20px 20px;
  padding: 10px;
  color: #231f20;
  max-width: 800px;
}

.spinner {
  margin-top: 20px;
}
.spinner > span > i {
  background-color: gray !important;
}

.imageContainer {
  width: 100%;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 8px;
}

.shareImage {
  width: 100% !important;
  height: auto !important;
  max-width: 100%;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.share-template-offscreen {
  position: fixed;
  top: 0;
  left: -10000px;
  pointer-events: none;
}

.food-alert {
  position: absolute;
  top: -20px;
  left: 50%;
  width: calc(100% + 40px);
  transform: translateX(-50%);
  z-index: 9999999;
}

@keyframes share-pulse {
  0% {
    box-shadow:
      0 0 0 0 rgba(24, 144, 255, 0.65),
      0 0 0 0 rgba(24, 144, 255, 0.45);
  }
  70% {
    box-shadow:
      0 0 0 14px rgba(24, 144, 255, 0),
      0 0 0 22px rgba(24, 144, 255, 0);
  }
  100% {
    box-shadow:
      0 0 0 0 rgba(24, 144, 255, 0),
      0 0 0 0 rgba(24, 144, 255, 0);
  }
}

.share-button--highlight {
  position: relative;
  border-radius: 8px;
  animation: share-pulse 1.6s ease-out infinite;
}

.share-button--highlight :deep(.ant-btn) {
  border-color: #1890ff;
  color: #1890ff;
  transition:
    border-color 0.3s,
    color 0.3s;
}
</style>
