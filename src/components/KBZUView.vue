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
    <Flex>
      <TypographyText type="secondary">{{ $t('kbzuShort.calories') }}:</TypographyText>&nbsp;{{
        dishKBZU?.kbzu.k
      }}
    </Flex>
    <Flex>
      <TypographyText type="secondary">{{ $t('kbzuShort.proteins') }}:</TypographyText>&nbsp;{{
        dishKBZU?.kbzu.b
      }}
    </Flex>
    <Flex>
      <TypographyText type="secondary">{{ $t('kbzuShort.carbohydrates') }}:</TypographyText>&nbsp;{{
        dishKBZU?.kbzu.u
      }}
    </Flex>
    <Flex>
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
