import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ResourcePage } from '@/components/ResourcePage';
import { Pill } from '@/components/ui/Pill';
import { content } from '@/data/content';
import { insights } from '@/data/insights';

type Props = { params: Promise<{ id: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => insights.map(item => ({ id: item.id }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = insights.find(post => post.id === id);
  return { title: item?.title, description: item?.excerpt, alternates: { canonical: '/insights/' + id } };
}

export default async function InsightPage({ params }: Props) {
  const { id } = await params;
  const item = insights.find(post => post.id === id);
  if (!item) notFound();

  return <ResourcePage title={item.title} description={item.excerpt} back="/#insights" backText={content.insights.title}>
    <article className="resource-article">
      <div className="insight-meta"><Pill>{item.category}</Pill></div>
      {item.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
    </article>
  </ResourcePage>;
}
