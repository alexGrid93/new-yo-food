<script lang="ts" setup>
import { List, ListItem, Checkbox } from 'ant-design-vue'
import { getFullKBZU } from '@/utils/getKBZU.ts'
import type { DishCalories } from '@/types/MenuCalories.ts'
import KBZUView from '@/components/KBZUView.vue'
import { useEatenDishes } from '@/features/useEatenDishes.ts'
import { ref, watch } from 'vue'

const props = defineProps(['modelValue', 'employeeName', 'canMarkEaten'])

const kbzu = getFullKBZU()

const getDish = (name: string): DishCalories | null => kbzu?.[name.slice(4).trim()] || null

const { isEaten, toggleEaten } = useEatenDishes()

const eatenState = ref<boolean[]>([])

const syncEatenState = (): void => {
  const dishes: string[] = Array.isArray(props.modelValue) ? props.modelValue : []

  eatenState.value = dishes.map((_, index) =>
    props.employeeName ? isEaten(props.employeeName, index) : false,
  )
}

watch(() => [props.modelValue, props.employeeName], syncEatenState, { immediate: true })

const handleToggle = (index: number): void => {
  if (!props.employeeName) return

  toggleEaten(props.employeeName, index)
  eatenState.value[index] = !eatenState.value[index]
}
</script>

<template>
  <List :locale="{ emptyText: $t('no_data') }" class="list">
    <ListItem
      class="listItem"
      :class="{ canMarkEaten }"
      v-for="(dish, index) in props.modelValue"
      :key="index"
      @click="canMarkEaten && handleToggle(index)"
    >
      <span v-if="canMarkEaten" class="eatenCheckboxWrap" @click.stop="handleToggle(index)">
        <Checkbox :checked="eatenState[index]" class="eatenCheckbox" />
      </span>
      <span :class="{ eatenText: canMarkEaten && eatenState[index] }" class="dishName">
        {{ dish }}
      </span>

      <KBZUView v-if="kbzu && Object.keys(getDish(dish)?.kbzu || {}).length" :dishKBZU="getDish(dish)" class="kbzuView" />
    </ListItem>
  </List>
</template>

<style scoped>
.list {
  margin-top: 30px;
}

.listItem {
  padding: 0px;
  margin-bottom: 15px;
  font-size: 16px;
  display: grid;
  grid-template: 'text text text'
             'kbzu kbzu kbzu';
  grid-template-columns: 22px 1fr 1fr;
}

.listItem.canMarkEaten {
  grid-template: 'checkbox text text'
             'kbzu kbzu kbzu';
  grid-template-columns: 22px 1fr 1fr;
  cursor: pointer;
}

.eatenCheckboxWrap {
  margin-right: 10px;
  grid-area: checkbox;
  display: flex;
  align-items: center;
}

.dishName {
  grid-area: text;
}

.eatenText {
  text-decoration: line-through;
  opacity: 0.6;
}

.kbzuView {
  grid-area: kbzu;
}
</style>
