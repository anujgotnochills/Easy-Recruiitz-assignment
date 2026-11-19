export const jobFilters = ['All', 'Tech', 'Non-Tech', 'Leadership'] as const;
export type JobFilter = (typeof jobFilters)[number];

type Job = {
  id: string; title: string; category: Exclude<JobFilter, 'All'>; summary: string;
};

// TODO(client): Connect current, authorised vacancies before offering live applications.
export const jobs = [
  { id: 'senior-full-stack-developer', title: 'Senior Full-Stack Developer', category: 'Tech', summary: 'Build and maintain features across a React front end and Node.js services.' },
  { id: 'talent-acquisition-specialist', title: 'Talent Acquisition Specialist', category: 'Non-Tech', summary: 'Source candidates and coordinate interviews for commercial and operations teams.' },
  { id: 'head-of-operations', title: 'Head of Operations', category: 'Leadership', summary: 'Lead warehouse and fulfilment operations across multiple sites.' },
  { id: 'cloud-platform-engineer', title: 'Cloud Platform Engineer', category: 'Tech', summary: 'Maintain deployment pipelines, cloud infrastructure and production monitoring.' },
  { id: 'customer-success-manager', title: 'Customer Success Manager', category: 'Non-Tech', summary: 'Guide customers through onboarding, product adoption and renewal planning.' },
  { id: 'director-of-engineering', title: 'Director of Engineering', category: 'Leadership', summary: 'Set engineering priorities and manage delivery across multiple software teams.' },
] as const satisfies readonly Job[];

export const sampleJob = jobs[0];
