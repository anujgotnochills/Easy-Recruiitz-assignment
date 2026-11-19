import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ResourcePage } from '@/components/ResourcePage';
import { content } from '@/data/content';
import { legal } from '@/data/legal';
import { site } from '@/data/site';

type Props = { params: Promise<{ policy: string }> };
const getPolicy = (key: string) => key === 'privacy' || key === 'terms' ? legal[key] : null;

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(legal).map(policy => ({ policy }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { policy } = await params;
  return { title: getPolicy(policy)?.title, robots: { index: false, follow: true }, alternates: { canonical: '/' + policy } };
}

export default async function PolicyPage({ params }: Props) {
  const { policy } = await params;
  const entry = getPolicy(policy);
  if (!entry) notFound();
  return <ResourcePage title={entry.title} description={content.pages.legalDraft}>
    <div className="resource-article">
      {entry.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      <a href={'mailto:' + site.email}>{site.email}</a>
    </div>
  </ResourcePage>;
}
