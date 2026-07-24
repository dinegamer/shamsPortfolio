import type { Metadata } from 'next';
import type { Locale } from '@/i18n';
import { siteUrl } from '@/lib/portfolio-content';

type PageMetadataInput = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
};

export function createPageMetadata({
  locale,
  path,
  title,
  description,
  image = '/me.jpg'
}: PageMetadataInput): Metadata {
  const localizedPath = `/${locale}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}${localizedPath}`,
      languages: {
        fr: `${siteUrl}/fr${path}`,
        en: `${siteUrl}/en${path}`,
        'x-default': `${siteUrl}/fr${path}`
      }
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${localizedPath}`,
      siteName: 'Shamsi Digital',
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: locale === 'fr' ? ['en_US'] : ['fr_FR'],
      images: [
        {
          url: image,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image]
    }
  };
}
