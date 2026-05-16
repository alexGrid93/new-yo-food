<script lang="ts" setup>
import { arrayDays } from '@/utils/constants'
import { getOptionsForSelect } from '@/utils/getOptionsForSelect'
import { Select, SelectOption } from 'ant-design-vue'
import type { SelectValue } from 'ant-design-vue/es/select'
import { computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'update:day'])

const updateSelectedDay = (value: SelectValue) => {
  emit('update:modelValue', value)
  emit('update:day')
}

const options = computed(() => getOptionsForSelect(arrayDays))

const dayMap = new Map()
dayMap.set('пн', 'mon')
dayMap.set('вт', 'tue')
dayMap.set('ср', 'wed')
dayMap.set('чт', 'thu')
dayMap.set('пт', 'fri')
dayMap.set('сб', 'sat')
</script>

<template>
  <Select class="select" size="large" :value="props.modelValue" @change="updateSelectedDay">
    <SelectOption v-for="day in options" :key="`day-${day}`" :value="day.value">
      {{ $t(`days.${dayMap.get(day.label)}`) }}
    </SelectOption>
  </Select>
</template>

<style>
.select {
  width: 100%;
}
</style>
