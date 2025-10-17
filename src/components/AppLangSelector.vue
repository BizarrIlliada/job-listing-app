<template>
  <div class="app-lang-selector">
    <ul class="app-lang-selector__list">
      <li
        v-for="language in languages"
        :key="language.value"
        @click="onChangeLang(language.value)"
        class="app-lang-selector__list-item"
        :class="{
          'app-lang-selector__list-item--active': language.value === locale,
        }"
      >
        {{ language.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';

  const languages = [
    { label: 'EN', value: 'en' },
    { label: 'UA', value: 'uk' },
  ];

  const { locale } = useI18n();

  function onChangeLang(val: string) {
    locale.value = val;
  }
</script>

<style scoped lang="scss">
  .app-lang-selector {
    &__list {
      list-style: none;
      height: 100%;
      padding: 20px 0;
    }

    &__list-item {
      color: var(--gray-50);
      font-size: 22px;
      line-height: 22px;
      font-weight: 700;
      letter-spacing: 1.5px;
      transition: color .3s ease;
      cursor: pointer;

      &:hover, &--active {
        color: var(--gray-100);
      }
    }
  }
</style>
