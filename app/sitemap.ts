import type { MetadataRoute } from 'next';
import { projectSlugs, siteUrl } from '@/lib/portfolio-content';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const locales = ['fr', 'en'] as const;
  const paths = [
    '',
    '/about',
    ...projectSlugs.map((slug) => `/projects/${slug}`)
  ];

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified,
      changeFrequency: path ? ('monthly' as const) : ('weekly' as const),
      priority: path ? 0.8 : 1
    }))
  );
}
