<script lang="ts" setup>
import { List, ListItem } from 'ant-design-vue'
import { getFullKBZU } from '@/utils/getKBZU.ts'
import type { DishCalories } from '@/types/MenuCalories.ts'
import KBZUView from '@/components/KBZUView.vue'

const props = defineProps(['modelValue'])

const kbzu = getFullKBZU()

const getDish = (name: string): DishCalories | null => kbzu?.[name.slice(4).trim()] || null
</script>

<template>
  <List :locale="{ emptyText: $t('no_data') }" class="list">
    <ListItem class="listItem" v-for="(dish, index) in props.modelValue" :key="index">
      {{ dish }}

      <KBZUView v-if="kbzu && Object.keys(getDish(dish)?.kbzu || {}).length" :dishKBZU="getDish(dish)" />
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
