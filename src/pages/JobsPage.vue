<template>
  <div class="jobs-page">
    <div class="jobs-page__filters">
      <UiMultiselectDropdown
        v-model="jobsStore.jobTypeFilterSelectedOptions"
        v-model:isOpen="isJobTypeFilterOpen"
        :name="t('jobsPage.jobType')"
        :dropdownOptions="jobTypeFilterOptions"
        :disabled="!areJobsLoaded"
        @click="isJobTypeFilterOpen = !isJobTypeFilterOpen"
        @onSelectAll="jobsStore.selectAllFilters"
      />

      <UiInput
        :placeholder="t('jobsPage.inputPlaceholder')"
        v-model="jobsStore.jobSearchQuery"
      />
    </div>

    <div
      v-if="areJobsLoaded && jobsStore.jobs?.length"
      class="jobs-page__jobs"
    >
      <RouterLink
        v-for="job in jobsStore.jobs"
        :key="job.id"
        :to="{name: 'job-page', params: { id: job.id }}"
      >
        <JobCardComponent
          class="jobs-page__job"
          :title="job.title"
          :company="job.company"
          :description="job.description"
          :location="job.location"
          :type="job.type"
        />
      </RouterLink>
    </div>

    <p
      v-else-if="areJobsLoaded && !jobsStore.jobs?.length"
      class="jobs-page__empty-placeholder"
    >
      {{ t('jobsPage.emptyPlaceholder') }}
    </p>

    <UiLoader v-else />
  </div>
</template>

<script setup lang="ts">
import JobCardComponent from '@/components/JobCardComponent.vue';
import UiMultiselectDropdown from '@/components/ui/UiMultiselectDropdown.vue';
import UiLoader from '@/components/ui/UiLoader.vue';

import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { EJobTypeValue } from '@/types';
import UiInput from '@/components/ui/UiInput.vue';
import { useJobsStore } from '@/store/jobsStore';

const router = useRouter();
const { t, locale } = useI18n();
const jobsStore = useJobsStore();

const areJobsLoaded = ref(jobsStore.jobs !== null);
const isJobTypeFilterOpen = ref(false);
const jobTypeFilterOptions = computed(() => [
  { label: t('jobsPage.filters.contract'), value: EJobTypeValue.CONTRACT },
  { label: t('jobsPage.filters.fullTime'), value: EJobTypeValue.FULL_TIME },
  { label: t('jobsPage.filters.hybrid'), value: EJobTypeValue.HYBRID },
  { label: t('jobsPage.filters.onSite'), value: EJobTypeValue.ON_SITE },
  { label: t('jobsPage.filters.partTime'), value: EJobTypeValue.PART_TIME },
  { label: t('jobsPage.filters.remote'), value: EJobTypeValue.REMOTE },
]);

watch([
    locale,
    () => jobsStore.jobTypeFilterSelectedOptions,
    () => jobsStore.jobSearchQuery,
  ],
  async () => {
    areJobsLoaded.value = false;
    isJobTypeFilterOpen.value = false;

    try {
      await jobsStore.loadJobs();
      areJobsLoaded.value = true;
    } catch (error) {
      router.push({ name: 'error-page' });
    }
}, { immediate: true });
</script>

<style lang="scss">
  .jobs-page {
    height: 100%;

    &__filters {
      display: flex;
      gap: 4px;
      margin-block-end: 24px;
    }

    &__jobs {
      display: grid;
      gap: 8px;
      grid-template-columns: repeat(3, 1fr);

      @include tablet {
        grid-template-columns: repeat(2, 1fr);
      }

      @include phone {
        grid-template-columns: repeat(1, 1fr);
      }
    }

    &__job {
      height: 100%;
      transition: transform .3s ease;
      box-shadow: var(--block-outer-shadow);

      &:hover {
        transform: scale(1.02);
      }
    }

    &__empty-placeholder {
      color: var(--gray-75);
      font-size: 24px;

      @include phone {
        font-size: 20px;
      }
    }
  }
</style>
