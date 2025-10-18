import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { EJobTypeValue, type IDropdownOption, type IJob } from '@/types';
import { useJobsApi } from '@/api/jobs.api';

export const useJobsStore = defineStore('jobsStore', () => {
  // FIlters
  const jobTypeFilterSelectedOptions = ref<IDropdownOption<EJobTypeValue>[]>([]);
  const jobTypeFilterSelectedValues = computed(() => jobTypeFilterSelectedOptions.value.map(o => o.value));
  const jobSearchQuery = ref('');

  function selectAllFilters() {
    jobTypeFilterSelectedOptions.value = [];
  }

  // JOBS
  const { getJobs } = useJobsApi();

  const jobs = ref<IJob[] | null>(null);

  async function loadJobs() {
    try {
      jobs.value = await getJobs(jobTypeFilterSelectedValues.value, jobSearchQuery.value);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return {
    jobTypeFilterSelectedOptions,
    jobSearchQuery,
    selectAllFilters,

    jobs,
    loadJobs,
  }
});
