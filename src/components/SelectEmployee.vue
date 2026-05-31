<script lang="ts" setup>
import { getOptionsForSelect } from '@/utils/getOptionsForSelect'
import { Select } from 'ant-design-vue'
import type { SelectValue } from 'ant-design-vue/es/select'
import { computed } from 'vue'
import { LocalStorageKey } from '@/enums/LocalStorageKey.ts'

const props = defineProps({
  modelValue: String,
  options: {
    type: Array<string>,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue', 'update:employee'])

const formattedOptions = computed(() => getOptionsForSelect(props.options))

const updateSelectedEmployee = (value: SelectValue) => {
  localStorage.setItem(LocalStorageKey.SELECTED_EMPLOYEE, String(value))
  emit('update:modelValue', value)
  emit('update:employee')
}
</script>

<template>
  <Select
    size="large"
    class="select"
    :value="modelValue"
    :options="formattedOptions"
    show-search
    @change="updateSelectedEmployee"
  />
</template>

<style>
.select {
  width: 100%;
}
</style>
