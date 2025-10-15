export interface IJob {
  id: number,
  title: string;
  company: string;
  location: string;
  type: EJobType;
  description: string;
  applyLink: string;
}

export enum EJobType {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  CONTRACT = 'Contract',
  HYBRID = 'Hybrid',
  REMOTE = 'Remote',
  ON_SITE = 'On-site',
}
