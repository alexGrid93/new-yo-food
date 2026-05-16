<script setup lang="ts">
import { Modal, Divider, message } from 'ant-design-vue'
import type { IPromo } from '@/types/promo.ts'
import PromoSocialIcon from '@/components/promo/PromoSocialIcon.vue'
import { writeClipboard } from '@/utils/writeClipboard.ts'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Props {
  promo: IPromo | null
}

const props = defineProps<Props>()

const open = defineModel<boolean>('open')

const copyPromocode = async () => {
  if (!props.promo?.promocode) {
    message.error(t('promotions.copy_error_1'))
    return
  }

  try {
    await writeClipboard(props.promo.promocode)
    message.success(t('promotions.copy_success'))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    try {
      await navigator.clipboard.writeText(props.promo.promocode)
      message.success(t('promotions.copy_success'))
    } catch {
      message.error(t('promotions.copy_error_2'))
    }
  }
}
</script>

<template>
  <Modal v-model:open="open" :getContainer="false" :footer="null" centered class="promo-modal">
    <template v-if="!promo">{{ $t('system.error') }}</template>
    <template v-else>
      <div class="promo-modal-body">
        <picture>
          <source :srcset="promo.imgWebp" type="image/webp" />
          <img :src="promo.img" class="promo-modal-body__img" alt="" />
        </picture>

        <h2 class="promo-modal-body__title">{{ $t(promo.title) }}</h2>

        <p class="promo-modal-body__description">{{ $t(promo.description) }}</p>

        <Divider class="promo-modal-body-divider" />

        <ul class="promo-modal-body-social">
          <li
            v-for="social in promo.social"
            :key="`social-${social.type}-${social.link}`"
            class="promo-modal-body-social__item"
          >
            <PromoSocialIcon :type="social.type" class="promo-modal-body-social__icon" />

            <a :href="social.link" target="_blank" class="promo-modal-body-social__link">{{
              social.name
            }}</a>
          </li>
        </ul>

        <Divider class="promo-modal-body-divider" />

        <button class="promo-modal-promocode" @click="copyPromocode">
          {{ promo.promocode }}

          <span class="promo-modal-promocode__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M15.24 2h-3.894c-1.764 0-3.162 0-4.255.148-1.126.152-2.037.472-2.755 1.193-.719.721-1.038 1.636-1.189 2.766C3 7.205 3 8.608 3 10.379v5.838c0 1.508.92 2.8 2.227 3.342-.067-.91-.067-2.185-.067-3.247v-5.01c0-1.281 0-2.386.118-3.27.127-.948.413-1.856 1.147-2.593s1.639-1.024 2.583-1.152c.88-.118 1.98-.118 3.257-.118h3.07c1.276 0 2.374 0 3.255.118A3.6 3.6 0 0 0 15.24 2"
              />
              <path
                fill="currentColor"
                d="M6.6 11.397c0-2.726 0-4.089.844-4.936.843-.847 2.2-.847 4.916-.847h2.88c2.715 0 4.073 0 4.917.847S21 8.671 21 11.397v4.82c0 2.726 0 4.089-.843 4.936-.844.847-2.202.847-4.917.847h-2.88c-2.715 0-4.073 0-4.916-.847-.844-.847-.844-2.21-.844-4.936z"
              />
            </svg>
          </span>
        </button>
      </div>
    </template>
  </Modal>
</template>

<style scoped>
.promo-modal-body {
  --modal-padding-i: 24px;
  position: relative;
}

.promo-modal-body__img {
  object-fit: cover;
  object-position: center;
  width: calc(var(--modal-padding-i) * 2 + 100%);
  height: 200px;
  margin-left: calc(-1 * var(--modal-padding-i));
  margin-top: -20px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.promo-modal-body__title {
  margin: 0;
  margin-top: -4px;

  font-size: 34px;
  line-height: 38px;
}

.promo-modal-body__description {
  font-size: 16px;
  margin: 0;
}

.promo-modal-promocode {
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 500;
  background-color: hsl(0, 0%, 94%);
  color: hsl(0 0% 40%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.promo-modal-promocode__icon {
  height: 1em;
}

.promo-modal-body-social {
  margin: 0;
  padding: 0;
  list-style: none;
}

.promo-modal-body-social__item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;

  font-size: 18px;
  line-height: 20px;
}

.promo-modal-body-social__item,
.promo-modal-body-social__link {
  color: hsl(0, 0%, 0%);
}

.promo-modal-body-divider {
  margin: 16px 0;
}

:deep(.promo-modal) .ant-modal-close:before {
  content: '';
  display: block;
  width: calc(100% + 10px);
  height: calc(100% + 10px);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: hsl(0, 0%, 100%);
  border-radius: 50%;
  z-index: -1;
}

.promo-modal-body__percent {
  --size: 68px;
  position: absolute;

  top: 150px;
  right: 0;

  height: var(--size);

  font-size: var(--size);
  line-height: var(--size);
  font-weight: 700;
  z-index: 1;
}
</style>
