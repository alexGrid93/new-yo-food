<script setup lang="ts">
import CurrentDate from '@/components/CurrentDate.vue'
import TitleContainer from '@/components/TitleContainer.vue'
import { Button, Flex, List, ListItem, Badge } from 'ant-design-vue'
import { onMounted, ref } from 'vue'
import { currentDayView } from '@/utils/constants.ts'
import ActualMenu from '@/components/ActualMenu.vue'
import { useDeliveryCheck } from '@/features/useDeliveryCheck.ts'
import { EmojiMap } from '@/constants/emojiMap.ts'
import type { FoodItem } from '@/utils/types.ts'
import { sortByPriority } from '@/utils/sortByPriority.ts'
import type { DishType } from '@/enums/DishType.ts'
import { LocalStorageKey } from '@/enums/LocalStorageKey.ts'

const currentDate = ref(new Date())
const { getTotalDishes, setTotalToStore, getTotalFromStore, updateDishStatus } = useDeliveryCheck()

const totalDishes = ref<Record<string, FoodItem[]>>({})

const updateStatus = (type: DishType, name: string) => {
  const getStatus = () => {
    const currentItem = totalDishes.value[type].find((item) => item.rsName === name)

    switch (currentItem?.status) {
      case 'done':
        return 'notAll'
      case 'notAll':
        return 'noDelivery'
      case 'noDelivery':
        return 'done'
      default:
        return 'noDelivery'
    }
  }

  const newTotal = updateDishStatus(type, name, getStatus())

  totalDishes.value = newTotal || {}
}

onMounted(() => {
  const currentTotalDay = localStorage.getItem(LocalStorageKey.CURRENT_TOTAL_DAY)

  if (!currentTotalDay) {
    localStorage.setItem(LocalStorageKey.CURRENT_TOTAL_DAY, currentDayView)
  }

  if (currentTotalDay === currentDayView) {
    const totalDishesFromStore = getTotalFromStore()

    if (totalDishesFromStore) {
      totalDishes.value = totalDishesFromStore
      return
    }
  }

  const total = getTotalDishes(currentDayView)

  setTotalToStore(total)

  totalDishes.value = total || {}

  localStorage.setItem(LocalStorageKey.CURRENT_TOTAL_DAY, currentDayView)

  return
})

const priority = [EmojiMap.breakfast.key, EmojiMap.juice.key]

const onReset = (): void => {
  localStorage.removeItem(LocalStorageKey.CURRENT_TOTAL_DAY)
  localStorage.removeItem(LocalStorageKey.TOTAL_DISHES)

  window.location.reload()
}
</script>

<template>
  <Flex vertical gap="20">
    <CurrentDate :date="currentDate" />
    <TitleContainer @click-logo="$router.push('')" />
    <ActualMenu />

    <Button @click="onReset" class="delivery-check-page__reset">{{ $t('system.reset') }}</Button>

    <Flex vertical gap="10">
      <template
        v-for="type in Object.entries(totalDishes).sort((a, b) =>
          sortByPriority<string>(a[0], b[0], priority),
        )"
        :key="`type-${type}`"
      >
        <h3>
          {{ $t(`dish_type.${EmojiMap[type[0] as DishType].key}`) }}&nbsp;
          {{ EmojiMap[type[0] as DishType].emoji }}
        </h3>

        <List :locale="{ emptyText: $t('no_data') }" class="list">
          <ListItem
            @click="updateStatus(type[0] as DishType, dish.rsName)"
            class="listItem dish"
            v-for="(dish, index) in totalDishes[type[0]].sort((a, b) => b.count - a.count)"
            :key="index"
            :class="[`dish--status-${dish.status}`]"
          >
            <Flex
              gap="10"
              :style="{
                justifyContent: 'space-between',
                width: '100%',
              }"
            >
              {{ dish.rsName.split(',').join(' ') }}

              <Badge :count="dish.count" color="blue" />
            </Flex>
          </ListItem>
        </List>
      </template>
    </Flex>
  </Flex>
</template>

<style scoped>
.dish {
  transition:
    color 0.3s ease,
    text-decoration 0.3s ease;
}
.dish--status-done {
  color: #648e6e;
  text-decoration: line-through;
}
.dish--status-notAll {
  color: #d8a405;
}

.listItem {
  padding: 0;
  margin-bottom: 15px;
  font-size: 16px;
}

.delivery-check-page__reset {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
