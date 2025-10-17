export interface IJob {
  id: number,
  title: string;
  company: string;
  location: string;
  type: {
    value: EJobTypeValue,
    label: string,
  };
  description: string;
  applyLink: string;
}

export enum EJobTypeValue {
  FULL_TIME = 'full-time',
  PART_TIME = 'part-time',
  CONTRACT = 'contract',
  HYBRID = 'hybrid',
  REMOTE = 'remote',
  ON_SITE = 'on-site',
}
