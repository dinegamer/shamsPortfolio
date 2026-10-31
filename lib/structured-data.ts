import type { Locale } from '@/i18n';
import { business } from '@/lib/business';
import {
  githubUrl,
  linkedInUrl,
  siteUrl,
  type ProjectSlug
} from '@/lib/portfolio-content';

export const personId = `${siteUrl}/#chamsoudine-thienta`;
export const organizationId = `${siteUrl}/#shamsi-digital`;
export const portraitUrl = `${siteUrl}/chamsoudine-thienta-portrait.webp`;
export const contentModifiedDate = '2026-10-31';

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
      jobTitle: [
        'Consultant informatique',
        'IT Consultant',
        'Software Engineer',
        'Data Analyst'
      ],
      description:
        'Consultant informatique, ingénieur logiciel, Data Analyst et formateur basé à Bamako, fondateur de SHAMSI Digital Mali.',
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
        'IT consulting',
        'Information systems consulting',
        'Software development',
        'Business software',
        'Backend systems',
        'REST APIs',
        'Databases',
        'Data systems',
        'Data analytics'
      ]
    },
    {
      '@type': 'ProfessionalService',
      '@id': organizationId,
      name: business.name,
      legalName: business.owner,
      alternateName: ['SHAMSI Digital Mali', 'SHAMSI Digital', 'ShamsiDigital', 'SH☀MSI Digital'],
      url: `${siteUrl}/fr/shamsi-digital`,
      identifier: { '@type': 'PropertyValue', propertyID: 'RCCM', value: business.rccm },
      sameAs: [business.directoryUrl],
      description:
        'SHAMSI DIGITAL est le nom commercial de l’entreprise individuelle de Chamsoudine THIENTA à Bamako, au Mali : conseil informatique, logiciels métier, API, données, automatisation et formation.',
      disambiguatingDescription:
        'Entreprise individuelle immatriculée au Mali sous le RCCM ML-BKO-01-2026-A-07041, également présentée comme SHAMSI Digital Mali ou ShamsiDigital.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bamako',
        addressCountry: 'ML'
      },
      areaServed: [
        {
          '@type': 'City',
          name: 'Bamako'
        },
        {
          '@type': 'Country',
          name: 'Mali'
        }
      ],
      founder: {
        '@id': personId
      },
      email: business.email,
      telephone: business.telephone,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services SHAMSI Digital Mali',
        itemListElement: [
          'Développement de logiciels métiers',
          'Audit et automatisation SI',
          'Data, SQL et tableaux de bord',
          'Formation et support utilisateurs'
        ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } }))
      }
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: 'SHAMSI DIGITAL Mali',
      alternateName: ['SHAMSI DIGITAL', 'ShamsiDigital', 'Chamsoudine THIENTA'],
      url: `${siteUrl}/`,
      inLanguage: ['fr', 'en'],
      publisher: { '@id': organizationId }
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
