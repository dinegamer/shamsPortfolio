import type { Locale } from '@/i18n';
import {
  githubUrl,
  linkedInUrl,
  siteUrl,
  type ProjectSlug
} from '@/lib/portfolio-content';

export const personId = `${siteUrl}/#chamsoudine-thienta`;
export const organizationId = `${siteUrl}/#shamsi-digital`;
export const portraitUrl = `${siteUrl}/chamsoudine-thienta-portrait.webp`;
export const contentModifiedDate = '2026-07-26';

export const identityGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': personId,
      name: 'Chamsoudine Thienta',
      alternateName: ['Shams', 'Chamsoudine THIENTA'],
      url: `${siteUrl}/fr`,
      image: {
        '@type': 'ImageObject',
        url: portraitUrl
      },
      jobTitle: ['Software Engineer', 'Data Analyst'],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bamako',
        addressCountry: 'Mali'
      },
      sameAs: [githubUrl, linkedInUrl],
      affiliation: {
        '@id': organizationId
      },
      knowsAbout: [
        'Software development',
        'Backend systems',
        'REST APIs',
        'Databases',
        'Data systems',
        'Data analytics'
      ]
    },
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: 'Shamsi Digital',
      alternateName: 'SH☀MSI Digital',
      url: siteUrl,
      founder: {
        '@id': personId
      }
    }
  ]
};

export function createProfilePageJsonLd({
  locale,
  name,
  description
}: {
  locale: Locale;
  name: string;
  description: string;
}) {
  const url = `${siteUrl}/${locale}/about`;

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${url}#profile-page`,
    url,
    name,
    description,
    inLanguage: locale,
    dateModified: contentModifiedDate,
    mainEntity: {
      '@id': personId
    }
  };
}

const projectTypes: Record<
  ProjectSlug,
  'SoftwareApplication' | 'SoftwareSourceCode' | 'CreativeWork'
> = {
  kalansup: 'SoftwareApplication',
  'digital-queue': 'SoftwareApplication',
  'agritech-mali': 'CreativeWork',
  storesup: 'SoftwareSourceCode'
};

export function getProjectStructuredType(slug: ProjectSlug) {
  return projectTypes[slug];
}

const projectKeywords: Record<Locale, Record<ProjectSlug, string[]>> = {
  fr: {
    kalansup: [
      'KalanSUP',
      'gestion scolaire',
      'gestion universitaire',
      'Spring Boot',
      'PostgreSQL'
    ],
    'digital-queue': [
      'file d’attente numérique',
      'gestion de file',
      'Next.js',
      'Socket.IO',
      'prototype'
    ],
    'agritech-mali': [
      'AgritechMali',
      'intelligence artificielle',
      'agriculture',
      'recommandation de cultures',
      'maladies des plantes'
    ],
    storesup: [
      'StoreSup',
      'gestion de stock',
      'MERN',
      'MongoDB',
      'Express'
    ]
  },
  en: {
    kalansup: [
      'KalanSUP',
      'school management',
      'university management',
      'Spring Boot',
      'PostgreSQL'
    ],
    'digital-queue': [
      'digital queue',
      'queue management',
      'Next.js',
      'Socket.IO',
      'prototype'
    ],
    'agritech-mali': [
      'AgritechMali',
      'artificial intelligence',
      'agriculture',
      'crop recommendation',
      'plant diseases'
    ],
    storesup: [
      'StoreSup',
      'inventory management',
      'MERN',
      'MongoDB',
      'Express'
    ]
  }
};

export function getProjectKeywords(locale: Locale, slug: ProjectSlug) {
  return projectKeywords[locale][slug];
}
