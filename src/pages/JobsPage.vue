<template>
  <div class="jobs-page">
    <div class="jobs-page__filters">
      <UiMultiselectDropdown
        v-model="jobsStore.jobTypeFilterSelectedOptions"
        v-model:isOpen="isJobTypeFilterOpen"
        :name="t('jobs.jobType')"
        :dropdownOptions="jobTypeFilterOptions"
        :disabled="!areJobsLoaded"
        @onSelectAll="jobsStore.selectAllFilters"
      />

      <UiInput
        :placeholder="t('jobs.inputPlaceholder')"
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
          :visited="jobsStore.visitedJobsIds.has(job.id)"
          :selected="jobsStore.selectedJobsIds.has(job.id)"
          @onSelect="jobsStore.toggleSelectedItem(job.id)"
        />
      </RouterLink>
    </div>

    <p
      v-else-if="areJobsLoaded && !jobsStore.jobs?.length"
      class="jobs-page__empty-placeholder"
    >
      {{ t('jobs.emptyPlaceholder') }}
    </p>

    <UiLoader v-else />
  </div>
</template>

<script setup lang="ts">
import JobCardComponent from '@/components/JobCardComponent.vue';
import UiMultiselectDropdown from '@/components/ui/UiMultiselectDropdown.vue';
import UiLoader from '@/components/ui/UiLoader.vue';

import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useDebounceFn } from '@vueuse/core';

import { EJobTypeValue } from '@/types';
import UiInput from '@/components/ui/UiInput.vue';
import { useJobsStore } from '@/store/jobsStore';

const router = useRouter();
const { t, locale } = useI18n();
const jobsStore = useJobsStore();

const areJobsLoaded = ref(jobsStore.jobs !== null);
const isJobTypeFilterOpen = ref(false);
const jobTypeFilterOptions = computed(() => [
  { label: t('jobs.filters.contract'), value: EJobTypeValue.CONTRACT },
  { label: t('jobs.filters.fullTime'), value: EJobTypeValue.FULL_TIME },
  { label: t('jobs.filters.hybrid'), value: EJobTypeValue.HYBRID },
  { label: t('jobs.filters.onSite'), value: EJobTypeValue.ON_SITE },
  { label: t('jobs.filters.partTime'), value: EJobTypeValue.PART_TIME },
  { label: t('jobs.filters.remote'), value: EJobTypeValue.REMOTE },
]);

async function loadJobs() {
  areJobsLoaded.value = false;
  isJobTypeFilterOpen.value = false;

  try {
    await jobsStore.loadJobs();
    areJobsLoaded.value = true;
  } catch (error) {
    router.push({ name: 'error-page' });
  }
}

const loadJobsDebounced = useDebounceFn(loadJobs, 800);

onMounted(() => {
  if (!areJobsLoaded.value) {
    loadJobs();
  }
});

watch([
    () => jobsStore.jobTypeFilterSelectedOptions,
    () => jobsStore.jobSearchQuery,
  ], loadJobsDebounced,
);

watch(locale, loadJobs);
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
