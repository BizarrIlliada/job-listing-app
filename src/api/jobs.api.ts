import jobs from '../constants/jobs.json';
import type { IJob } from '../types/jobs.types';

export function useJobsApi() {
  async function getJobs(): Promise<IJob[]> {
    await new Promise((resolve) => setTimeout(() => {
      console.log('[JOBS]: ', jobs);
      resolve(jobs);
    }, 5000));

    return jobs as IJob[];
  }

  return {
    getJobs,
  };
}