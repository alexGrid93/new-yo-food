<script lang="ts" setup>
import { List, ListItem, Flex, TypographyText } from 'ant-design-vue'
import { getFullKBZU } from '@/utils/getKBZU.ts'
import type { DishCalories } from '@/types/MenuCalories.ts'

const props = defineProps(['modelValue'])

const kbzu = getFullKBZU()

const getDish = (name: string): DishCalories | null => kbzu?.[name.slice(4)] || null
</script>

<template>
  <List :locale="{ emptyText: $t('no_data') }" class="list">
    <ListItem class="listItem" v-for="(dish, index) in props.modelValue" :key="index">
      {{ dish }}

      <Flex v-if="kbzu" gap="10">
        <Flex><TypographyText type="secondary">K:</TypographyText>&nbsp;{{ getDish(dish)?.kbzu.k }}</Flex>
        <Flex><TypographyText type="secondary">P:</TypographyText>&nbsp;{{ getDish(dish)?.kbzu.b }}</Flex>
        <Flex><TypographyText type="secondary">C:</TypographyText>&nbsp;{{ getDish(dish)?.kbzu.u }}</Flex>
        <Flex><TypographyText type="secondary">F:</TypographyText>&nbsp;{{ getDish(dish)?.kbzu.z }}</Flex>
        <Flex><TypographyText type="secondary">W:</TypographyText>&nbsp;{{ getDish(dish)?.weight }}</Flex>
      </Flex>
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
}
</style>
