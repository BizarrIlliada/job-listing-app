import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useDebounceFn } from '@vueuse/core';
import { EJobTypeValue, type IDropdownOption, type IJob } from '@/types';
import { useJobsApi } from '@/api/jobs.api';

export const useJobsStore = defineStore('jobsStore', () => {
  const router = useRouter();
  const { locale } = useI18n();

  // FIlters
  const jobTypeFilterSelectedOptions = ref<IDropdownOption<EJobTypeValue>[]>([]);
  const jobTypeFilterSelectedValues = computed(() => jobTypeFilterSelectedOptions.value.map(o => o.value));
  const jobSearchQuery = ref('');

  function selectAllFilters() {
    jobTypeFilterSelectedOptions.value = [];
  }

  // Jobs
  const { getJobs } = useJobsApi();

  const jobs = ref<IJob[] | null>(null);
  const areJobsLoaded = ref(false);
  const visitedJobsIds = ref<Set<number>>(new Set());
  const selectedJobsIds = ref<Set<number>>(new Set());

  function toggleSelectedItem(id: number) {
    if (selectedJobsIds.value.has(id)) {
      selectedJobsIds.value.delete(id);
    } else {
      selectedJobsIds.value.add(id);
    }
  }

  async function loadJobs() {
    try {
      areJobsLoaded.value = false;
      jobs.value = await getJobs(jobTypeFilterSelectedValues.value, jobSearchQuery.value);
      areJobsLoaded.value = true;
    } catch (error) {
      router.push({ name: 'error-page' });
    }
  }

  const loadJobsDebounced = useDebounceFn(loadJobs, 800);

  watch([
      jobTypeFilterSelectedOptions,
      jobSearchQuery,
    ], loadJobsDebounced,
  );

  watch(locale, loadJobs);

  return {
    jobTypeFilterSelectedOptions,
    jobSearchQuery,
    selectAllFilters,

    jobs,
    areJobsLoaded,
    visitedJobsIds,
    selectedJobsIds,
    toggleSelectedItem,
    loadJobs,
  }
});
