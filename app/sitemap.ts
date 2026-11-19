import type { MetadataRoute } from 'next';
import { insights } from '@/data/insights';
import { site } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url + '/' }, { url: site.url + '/services' },
    ...insights.map(item => ({ url: site.url + '/insights/' + item.id })),
  ];
}
