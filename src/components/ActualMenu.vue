<script setup lang="ts">
import { useActualMenu } from '@/features/useActualMenu.ts'
import { getMenuStartDay } from '@/utils/getMenuStartDay.ts'
import { getCurrentDateView } from '@/utils/constants.ts'

const { isActualMenu } = useActualMenu()
const menuStartDay = getMenuStartDay()
</script>

<template>
  <div :class="isActualMenu ? 'actualMenuDate' : 'expiredMenuDate'" v-if="menuStartDay">
    {{ $t('menu_from', { date: getCurrentDateView(menuStartDay) }) }}
    {{ !isActualMenu ? `(${$t('outdated').toLowerCase()})` : '' }}
  </div>
</template>

<style scoped>
.actualMenuDate {
  color: #41b619;
}

.expiredMenuDate {
  color: #ce3d1d;
}
</style>
