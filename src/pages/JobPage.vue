<template>
  <div v-if="job">
    {{ job?.title }}
  </div>

  <UiLoader v-else />
</template>

<script setup lang="ts">
import UiLoader from '@/components/ui/UiLoader.vue';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import type { IJob } from '@/types';
import { useJobsStore } from '@/store/jobsStore';
import { useJobsApi } from '@/api/jobs.api';

const route = useRoute();
const router = useRouter();
const { locale } = useI18n();

const jobsStore = useJobsStore();
const { getJobById } = useJobsApi();

const job = ref<IJob | null>(null);

async function initJob() {
  job.value = null;
  const jobId = Number(route.params.id);

  if (!jobsStore.visitedJobsIds.has(jobId)) {
    jobsStore.visitedJobsIds.add(jobId);
  }

  try {
    job.value = await getJobById(jobId);
  } catch (error) {
    router.push({ name: 'not-found-page' });
  }
}

watch(locale, () => {
  initJob();
}, { immediate: true });
</script>

<style lang="scss">

</style>
