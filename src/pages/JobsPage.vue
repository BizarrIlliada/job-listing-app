<template>
  <div class="jobs-page">
    <div
      v-if="areJobsLoaded"
      class="jobs-page__jobs"
    >
    <RouterLink
      v-for="job in jobs"
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

    <UiLoader v-else />
  </div>
</template>

<script setup lang="ts">
import JobCardComponent from '@/components/JobCardComponent.vue';
import UiLoader from '@/components/ui/UiLoader.vue';

import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { useJobsApi } from '@/api/jobs.api';
import type { IJob } from '@/types';

const router = useRouter();

const { locale } = useI18n();

const { getJobs } = useJobsApi();

const jobs = ref<IJob[] | null>(null);
const areJobsLoaded = ref(false);

async function loadJobs() {
  areJobsLoaded.value = false;

  try {
    jobs.value = await getJobs();
    areJobsLoaded.value = true;
  } catch (error) {
    router.push({ name: 'error-page' });
  }
}

watch(locale, () => {
  loadJobs();
}, { immediate: true });
</script>

<style lang="scss">
  .jobs-page {
    height: 100%;

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
  }
</style>

