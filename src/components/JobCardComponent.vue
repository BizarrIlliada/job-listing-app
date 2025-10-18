<template>
  <div class="job-card">
    <h3 class="job-card__title">
      {{ t('jobsPage.jobAtCompany', { jobTitle: title, companyName: company }) }}
    </h3>

    <p class="job-card__description">
      {{ description }}
    </p>

    <div class="job-card__footer">
      <span class="job-card__location">
        {{ location }}
      </span>
      <br>
      <span class="job-card__type">
        {{ type.label }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { EJobTypeValue, IJob } from '@/types';

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
}

defineProps<Props>();
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

  &__title {
    font-size: 24px;
    margin-block-end: auto;
  }

  &__description {
    font-size: 20px;
    margin-block-end: 24px;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* кількість рядків */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__footer {
    padding-block-start: 8px;
    border-block-start: 1px solid var(--gray-100);
  }

  &__location, &__type {
    color: var(--gray-75);
  }
}
</style>
