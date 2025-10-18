<template>
  <header class="app-header">
    <div class="container">
      <RouterLink :to="{ name: 'home-page' }">
        <h1 class="app-header__title">
          {{ t('shared.jobListingApp') }}
        </h1>
      </RouterLink>
  
      <AppLangSelector class="app-header__lang-selector" />
    </div>
  </header>
</template>

<script setup lang="ts">
import AppLangSelector from './AppLangSelector.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style lang="scss">
.app-header {
  height: var(--header-height);
  background-color: var(--green-10);
  box-shadow: var(--block-inner-shadow);

  &__title {
    transition: transform .3s ease;
    
    @include phone {
      font-size: 24px;
    }

    &:hover {
      transform: scale(1.02);
    }
  }
}

.app-header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
