<template>
  <div class="jobs-page">
    <div
      v-if="areJobsLoaded"
      class="jobs-page__jobs"
    >
      <JobCardComponent
        v-for="job in jobs"
        :key="job.id"
      />
    </div>

    <UiLoader v-else />
  </div>
</template>

<script setup lang="ts">
import JobCardComponent from '../components/JobCardComponent.vue';

import { onMounted, ref } from 'vue';

import { useJobsApi } from '../api/jobs.api';
import type { IJob } from '../types';
import UiLoader from '../components/ui/UiLoader.vue';

const { getJobs } = useJobsApi();

const jobs = ref<IJob[] | null>(null);
const areJobsLoaded = ref(false);

onMounted(async () => {
  try {
    jobs.value = await getJobs();
    areJobsLoaded.value = true;
  } catch (error) {}
});
</script>

<style lang="scss">
  .jobs-page {
    height: 100%;
  }
</style>

