import jobs from '@/constants/jobs.json';
import type { IJob } from '@/types';

export function useJobsApi() {
  async function getJobs(): Promise<IJob[]> {
    await new Promise((resolve) => setTimeout(() => {
      console.log('[JOBS]: ', jobs);
      resolve(jobs);
    }, 500));

    return jobs as IJob[];
  }

  async function getJobById(id: number): Promise<IJob> {
    const job = jobs.find(j => j.id === id);

    await new Promise((resolve) => setTimeout(() => {
      console.log('[JOB]: ', job);
      resolve(job);
    }, 500));

    return job as IJob;
  }

  return {
    getJobs,
    getJobById,
  };
}