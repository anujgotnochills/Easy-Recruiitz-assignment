import type { MetadataRoute } from 'next';
import { BRAND, site } from '@/data/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND, short_name: BRAND, description: site.description, start_url: '/',
    display: 'standalone', background_color: '#F6F5F1', theme_color: '#F6F5F1',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/app-icon', sizes: '512x512', type: 'image/png' },
    ],
  };
}
