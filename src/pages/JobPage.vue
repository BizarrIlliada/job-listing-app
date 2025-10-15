<template>
  <div v-if="job">
    {{ job?.title }}
  </div>

  <UiLoader v-else />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { useJobsApi } from '@/api/jobs.api';
import type { IJob } from '@/types';
import UiLoader from '@/components/ui/UiLoader.vue';

const route = useRoute();

const { getJobById } = useJobsApi();

const job = ref<IJob | null>(null);

onMounted(async () => {
  const jobId = Number(route.params.id);

  if (isFinite(jobId)) {
    job.value = await getJobById(jobId);
  }
});
</script>

<style lang="scss"></style>
