import type { MetadataRoute } from 'next';
import { BRAND, site } from '@/data/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND, short_name: BRAND, description: site.description, start_url: '/',
    display: 'standalone', background_color: '#f0f4f8', theme_color: '#022f71',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/app-icon', sizes: '512x512', type: 'image/png' },
    ],
  };
}
