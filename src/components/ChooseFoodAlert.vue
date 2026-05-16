<script setup lang="ts">
import { Alert, Button } from 'ant-design-vue'
import AlertImage from '../assets/gop-pigeon.png'
import { BellOutlined } from '@ant-design/icons-vue'

defineEmits(['onCloseAlert', 'remindMeLater'])
</script>

<template>
  <Alert
    @close="$emit('onCloseAlert')"
    :message="$t('food_alert_banner.title')"
    showIcon
    banner
    type="error"
    closable
    class="choose-food-alert"
  >
    <template #icon>
      <img :src="AlertImage" alt="" data-class="choose-food-alert__img" />
    </template>

    <template #description>
      {{ $t('food_alert_banner.subtitle') }}

      <Button
        @click="$emit('remindMeLater')"
        ghost
        type="dashed"
        block
        class="choose-food-alert__remind"
      >
        <template #icon>
          <BellOutlined />
        </template>

        {{ $t('food_alert_banner.remind_later') }}
      </Button>
    </template>
  </Alert>
</template>

<style scoped>
.choose-food-alert {
  --choose-food-alert-bg: #edc9ff;
  --choose-food-alert-remind: #0e33bf;

  background-color: var(--choose-food-alert-bg);
}

.choose-food-alert__remind {
  margin-top: 12px;
  color: var(--choose-food-alert-remind);
  border-color: var(--choose-food-alert-remind);
}

.choose-food-alert :deep(.ant-alert-message) {
  font-size: 20px;
}

.choose-food-alert :deep(.ant-alert-close-icon) {
  font-size: 18px;
}

[data-class='choose-food-alert__img'] {
  width: 80px;
  //align-self: stretch;
}
</style>
