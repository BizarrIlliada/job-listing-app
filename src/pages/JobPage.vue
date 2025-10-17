<template>
  <div v-if="job">
    {{ job?.title }}
  </div>

  <UiLoader v-else />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { useJobsApi } from '@/api/jobs.api';
import type { IJob } from '@/types';
import UiLoader from '@/components/ui/UiLoader.vue';

const route = useRoute();
const router = useRouter();

const { locale } = useI18n();

const { getJobById } = useJobsApi();

const job = ref<IJob | null>(null);

async function loadJob() {
  job.value = null;
  const jobId = Number(route.params.id);

  try {
    job.value = await getJobById(jobId);
  } catch (error) {
    router.push({ name: 'not-found-page' });
  }
}

watch(locale, () => {
  loadJob();
}, { immediate: true });
</script>

<style lang="scss">

</style>
