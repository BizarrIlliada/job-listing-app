<template>
  <div class="job-page">
    <div class="job-page__job" v-if="job">
      <h2 class="job-page__job-title">
        {{ t('jobs.jobTitle', { jobTitle: job.title }) }}

        <IconRatingStar v-if="isJobSelected" />
      </h2>

      <div class="job-page__job-info">
        <p class="job-page__job-info-field">
          {{ job.description }}
        </p>

        <p class="job-page__job-buttons">
          <a :href="job.applyLink" target="_blank">
            <UiButton>
              {{ t('jobs.applyHere') }}
            </UiButton>
          </a>

          <UiButton @click="jobsStore.toggleSelectedItem(job.id)">
            {{ t(isJobSelected ? 'jobs.removeFromSelected' : 'jobs.addToSelected') }}
          </UiButton>
        </p>

        <hr>

        <p class="job-page__job-info-field">
          {{ t('jobs.companyName', { companyName: job.company }) }}
        </p>

        <p class="job-page__job-info-field">
          {{ t('jobs.location', { location: job.location }) }}
        </p>
      </div>
    </div>

    <UiLoader v-else />

    <UiButton v-if="job" @click="goBackToTheList">
      {{ t('shared.backToList') }}
    </UiButton>
  </div>
</template>

<script setup lang="ts">
import UiLoader from '@/components/ui/UiLoader.vue';
import UiButton from '@/components/ui/UiButton.vue';
import IconRatingStar from '@/components/icons/IconRatingStar.vue';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import type { IJob } from '@/types';
import { useJobsStore } from '@/store/jobsStore';
import { useJobsApi } from '@/api/jobs.api';
import { useHelpers } from '@/helpers/useHelpers';

const route = useRoute();
const router = useRouter();
const { locale, t } = useI18n();

const jobsStore = useJobsStore();
const { getJobById } = useJobsApi();
const { safeRouterBack } = useHelpers();

const job = ref<IJob | null>(null);
const isJobSelected = computed(() => {
  return job.value && jobsStore.selectedJobsIds.has(job.value.id);
});

function goBackToTheList() {
  safeRouterBack();
}

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
.job-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 24px;

  &__job {
    padding: 12px 24px;
    background-color: var(--green-10);
    border: 1px solid var(--gray-100);
    border-radius: 8px;
  }

  &__job-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-block-end: 24px;
  }

  &__job-info {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__job-info-field {
    font-size: 20px;
  }

  &__job-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    @include phone {
      a, button {
        width: 100%;
      }
    }
  }
}
</style>
