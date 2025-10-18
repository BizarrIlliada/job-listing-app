<template>
  <div class="job-card" :class="{ 'job-card--visited': visited, 'job-card--selected': selected }">
    <h3 class="job-card__title">
      {{ t('jobs.jobAtCompany', { jobTitle: title, companyName: company }) }}
    </h3>

    <p class="job-card__description">
      {{ description }}
    </p>

    <div class="job-card__footer">
      <div class="job-card__footer-info">
        <span class="job-card__location">
          {{ location }}
        </span>
        <br>
        <span class="job-card__type">
          {{ type.label }}
        </span>
      </div>

      <button
        class="job-card__select-button"
        :class="{ 'job-card__select-button--selected': selected }"
        @click.prevent="onSelect"
      >
        <IconRatingStar />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconRatingStar from './icons/IconRatingStar.vue';
import { useI18n } from 'vue-i18n';
import type { EJobTypeValue } from '@/types';

const { t } = useI18n();

interface Props {
  title: string;
  company: string;
  description: string;
  location: string;
  type: {
    value: EJobTypeValue;
    label: string;
  };
  visited?: boolean;
  selected?: boolean;
}

defineProps<Props>();

const emit = defineEmits(['onSelect']);

function onSelect() {
  emit('onSelect');
}
</script>

<style lang="scss">
.job-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: var(--orange-10);
  padding-block: 12px;
  padding-inline: 16px;
  border-radius: 4px;
  transition: background-color .3s ease, transform .3s ease;

  &--visited {
    background-color: var(--green-10);
  }

  &--selected {
    background-color: var(--yellow-10);
  }

  &__title {
    font-size: 24px;
    margin-block-end: auto;
  }

  &__description {
    font-size: 20px;
    margin-block-end: 24px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    padding-block-start: 8px;
    border-block-start: 1px solid var(--gray-100);
  }

  &__location, &__type {
    color: var(--gray-75);
  }

  &__select-button {
    padding-inline: 6px;
    background-color: transparent;
    border: 1px solid var(--gray-100);
    border-radius: 4px;
    transition: background-color .3s ease;
    cursor: pointer;

    &:hover, &--selected {
      background-color: var(--yellow-75);
    }
  }
}
</style>
