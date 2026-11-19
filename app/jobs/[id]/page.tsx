import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ResourcePage } from '@/components/ResourcePage';
import { Button } from '@/components/ui/Button';
import { Pill } from '@/components/ui/Pill';
import { audienceCopy } from '@/data/audience';
import { content } from '@/data/content';
import { jobs, sampleJob } from '@/data/jobs';
import { BRAND, contactHref } from '@/data/site';
import { serializeSchema } from '@/lib/schema';

type Props = { params: Promise<{ id: string }> };
export const dynamicParams = false;

export const generateStaticParams = () => jobs.map(job => ({ id: job.id }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const job = jobs.find(item => item.id === id);
  return { title: job?.title, description: job?.summary, alternates: { canonical: '/jobs/' + id }, robots: { index: false, follow: true } };
}

export default async function JobPage({ params }: Props) {
  const { id } = await params;
  const job = jobs.find(item => item.id === id);
  if (!job) notFound();

  // TODO(client): Replace the sample with complete, verified schema only on live job detail pages.
  const exampleSchema = {
    '@context': 'https://schema.org', '@type': 'JobPosting',
    title: 'Sample: ' + job.title, description: content.pages.sampleJob + ' ' + job.summary,
    hiringOrganization: { '@type': 'Organization', name: BRAND },
  };

  return <ResourcePage title={job.title} description={content.pages.sampleJob} back="/jobs" backText={content.pages.otherJobs}>
    {job.id === sampleJob.id && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeSchema(exampleSchema) }} />}
    <div className="resource-article">
      <Pill>{job.category}</Pill>
      <p>{job.summary}</p>
      <Button href={contactHref('candidate', job.title, true)} variant="brand">{audienceCopy.candidate.hero.secondary.text}</Button>
    </div>
  </ResourcePage>;
}
