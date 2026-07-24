import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://shamsi-dev.vercel.app/fr',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1
    },
    {
      url: 'https://shamsi-dev.vercel.app/en',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1
    }
  ];
}
