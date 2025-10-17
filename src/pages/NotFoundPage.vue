<template>
  <div class="not-found-page">
    <h2 class="not-found-page__title">404</h2>

    <RouterLink :to="{ name: 'home-page' }">
      <UiButton>
        {{ t('shared.toHomePage') }}
      </UiButton>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import UiButton from '@/components/ui/UiButton.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style lang="scss">
  .not-found-page {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &__title {
      margin-block-end: 24px;
    }
  }
</style>
