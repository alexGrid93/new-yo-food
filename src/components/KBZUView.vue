<script setup lang="ts">
import { Flex, TypographyText } from 'ant-design-vue'
import type { DishCalories } from '@/types/MenuCalories.ts'

interface Props {
  dishKBZU: DishCalories | null
}

defineProps<Props>()
</script>

<template>
  <Flex gap="10">
    <Flex v-if="dishKBZU?.kbzu.k !== '#N/A'">
      <TypographyText type="secondary">{{ $t('kbzuShort.calories') }}:</TypographyText>&nbsp;{{
        dishKBZU?.kbzu.k
      }}
    </Flex>
    <Flex v-if="dishKBZU?.kbzu.b !== '#N/A'">
      <TypographyText type="secondary">{{ $t('kbzuShort.proteins') }}:</TypographyText>&nbsp;{{
        dishKBZU?.kbzu.b
      }}
    </Flex>
    <Flex v-if="dishKBZU?.kbzu.u !== '#N/A'">
      <TypographyText type="secondary">{{ $t('kbzuShort.carbohydrates') }}:</TypographyText>&nbsp;{{
        dishKBZU?.kbzu.u
      }}
    </Flex>
    <Flex v-if="dishKBZU?.kbzu.z !== '#N/A'">
      <TypographyText type="secondary">{{ $t('kbzuShort.fats') }}:</TypographyText>&nbsp;{{
        dishKBZU?.kbzu.z
      }}
    </Flex>
    <Flex v-if="Boolean(dishKBZU?.weight)">
      <TypographyText type="secondary">{{ $t('kbzuShort.weight') }}:</TypographyText>&nbsp;{{
        dishKBZU?.weight
      }}
    </Flex>
  </Flex>
</template>

<style scoped></style>
