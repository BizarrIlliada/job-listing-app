import type { IJob } from '@/types';
import { useI18n } from 'vue-i18n';

export function useJobsApi() {
  const { locale } = useI18n();

  async function loadJson(): Promise<IJob[]> {
    const { default: jobs } = await import(`@/constants/jobs.${locale.value}.json`);

    return jobs as IJob[];
  }

  async function getJobs(): Promise<IJob[]> {
    const jobs = await loadJson();

    await new Promise(resolve => setTimeout(resolve, 500));

    return jobs;
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
