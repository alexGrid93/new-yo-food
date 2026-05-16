<script lang="ts" setup>
import { emojiesOrderMap } from '@/utils/addListItemEmojies'
import { getOptionsForSelect } from '@/utils/getOptionsForSelect'
import { Select } from 'ant-design-vue'
import type { SelectValue } from 'ant-design-vue/es/select'
import { computed } from 'vue'

const props = defineProps({
  modelValue: String,
  options: {
    type: Array<string>,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])

const formattedOptions = computed(() =>
  getOptionsForSelect(props.options)
    .sort((a, b) => {
      const emojiA = String.fromCodePoint(a.label.codePointAt(0)!)
      const emojiB = String.fromCodePoint(b.label.codePointAt(0)!)

      const indexA = emojiesOrderMap[emojiA]
      const indexB = emojiesOrderMap[emojiB]

      return indexA - indexB
    })
    .filter((item) => Boolean(item.label.trim())),
)

const updateSelectedDish = (value: SelectValue) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <Select
    size="large"
    class="selectDish"
    :options="formattedOptions"
    :value="modelValue"
    @change="updateSelectedDish"
  />
</template>

<style></style>
