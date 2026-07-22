import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Chamsoudine THIENTA | Shamsi Digital',
    short_name: 'Shamsi Digital',
    description: 'Software Engineer & Data Analyst based in Bamako, Mali.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#06b6d4',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml'
      }
    ]
  };
}
