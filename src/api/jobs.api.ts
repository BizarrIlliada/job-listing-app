import type { EJobTypeValue, IJob } from '@/types';
import { useI18n } from 'vue-i18n';

export function useJobsApi() {
  const { locale } = useI18n();

  async function loadJson(): Promise<IJob[]> {
    const { default: jobs } = await import(`@/constants/jobs.${locale.value}.json`);

    return jobs as IJob[];
  }

  async function getJobs(
    selectedFiltersValues: EJobTypeValue[],
    searchQuery: string,
  ): Promise<IJob[]> {
    const jobs = await loadJson();
    const filteredByTypeJobs = selectedFiltersValues.length > 0
      ? jobs.filter(j => selectedFiltersValues.includes(j.type.value))
      : jobs;

    const query = searchQuery.trim().toLowerCase();

    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('[FETCH JOBS]');

    if (!query) {
      return filteredByTypeJobs;
    }

    return filteredByTypeJobs.filter(j =>
      j.location.toLowerCase().includes(query) ||
      j.title.toLowerCase().includes(query) ||
      j.company.toLowerCase().includes(query)
    );
  }

  async function getJobById(id: number): Promise<IJob> {
    const jobs = await loadJson();

    const job = jobs.find(j => j.id === id);

    await new Promise((resolve, reject) => setTimeout(() => {
      if (!job) {
        return reject(new Error('Job with this id doesn\'t exist'));
      }

      resolve(job);
    }, 500));

    return job as IJob;
  }

  return {
    getJobs,
    getJobById,
  };
}
