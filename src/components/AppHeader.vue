<template>
  <header class="app-header">
    <h1 class="app-header__title">
      {{ t('shared.jobListingApp') }}
    </h1>
  </header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style lang="scss">
.app-header {
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--gray-10);
  box-shadow: var(--block-inner-shadow);
;

  &__title {

  }
}
</style>
