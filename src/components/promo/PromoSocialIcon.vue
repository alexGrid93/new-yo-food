<script setup lang="ts">
import { type SocialType } from '@/enums/SocialType.ts'

interface Props {
  type: SocialType
}

defineProps<Props>()
</script>

<template>
  <span class="promo-social-icon">
    <template v-if="type === 'instagram'">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xml:space="preserve"
        width="1em"
        height="1em"
        viewBox="0 0 512 512"
      >
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M66 1h380c36 0 66 29 66 65v380c0 36-30 66-66 66H66c-36 0-65-30-65-66V66C1 30 30 1 66 1m307 56c-13 0-23 11-23 23v55q2 21 23 23h57c13 0 24-10 24-23V80c0-12-11-23-24-23zm81 160h-45q6 20 6 43c0 85-71 154-159 154-87 0-158-69-158-154q0-23 6-43H57v215q2 20 21 21h355q20-1 21-21zm-198-62c-56 0-102 45-102 100s46 99 102 99c57 0 103-44 103-99s-46-100-103-100"
          clip-rule="evenodd"
        />
      </svg>
    </template>

    <template v-else>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M9.84 18.45q.26.48.5.87a7.5 7.5 0 0 1-4.31-2.78c.7-.4 1.58-.8 2.65-1.1.3 1.2.73 2.2 1.16 3m1.32-.7c-.37-.7-.74-1.58-1.01-2.61a13 13 0 0 1 3.7 0A12 12 0 0 1 12 19.08q-.37-.5-.84-1.34M9.75 12q0 .88.1 1.66a14 14 0 0 1 4.3 0 13 13 0 0 0 0-3.32 14 14 0 0 1-4.3 0q-.1.79-.1 1.66m-1.36-1.97a14 14 0 0 0 0 3.94c-1.28.34-2.33.83-3.15 1.29a7.5 7.5 0 0 1 0-6.52c.82.46 1.87.95 3.15 1.29m1.76-1.17a13 13 0 0 0 3.7 0A12 12 0 0 0 12 4.92q-.37.5-.84 1.34c-.37.7-.74 1.57-1.01 2.6m5.46 1.17a14 14 0 0 1 0 3.94c1.28.34 2.33.83 3.15 1.29a7.5 7.5 0 0 0 0-6.52c-.82.46-1.87.95-3.15 1.29m2.36-2.57c-.7.4-1.58.8-2.65 1.1a13 13 0 0 0-1.67-3.88 7.5 7.5 0 0 1 4.32 2.78m-9.3 1.1c-1.06-.3-1.95-.7-2.64-1.1a7.5 7.5 0 0 1 4.32-2.78 13 13 0 0 0-1.67 3.87m6.65 6.89a13 13 0 0 1-1.67 3.87 7.5 7.5 0 0 0 4.32-2.78c-.7-.4-1.58-.8-2.65-1.1M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18"
          clip-rule="evenodd"
        />
      </svg>
    </template>
  </span>
</template>

<style scoped>
.promo-social-icon {
  width: 1em;
  height: 1em;
}
</style>
