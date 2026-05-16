<script lang="ts" setup>
import { getCurrentDateView } from '@/utils/constants'
import { TypographyText } from 'ant-design-vue'
import { computed } from 'vue'

const props = defineProps<{
  date: Date
}>()

const formattedDate = computed(() => getCurrentDateView(props.date, { withWeekday: true }))
</script>

<template>
  <TypographyText className="currentDate">{{ formattedDate }}</TypographyText>
</template>

<style>
.currentDate {
  font-size: 12px;
}
</style>
