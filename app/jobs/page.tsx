import type { Metadata } from 'next';
import { JobBoard } from '@/components/JobBoard';
import { ResourcePage } from '@/components/ResourcePage';
import { content } from '@/data/content';

export const metadata: Metadata = {
  title: content.pages.jobs, robots: { index: false, follow: true }, alternates: { canonical: '/jobs' },
};

export default function JobsPage() {
  return <ResourcePage title={content.pages.jobs}><JobBoard /></ResourcePage>;
}
