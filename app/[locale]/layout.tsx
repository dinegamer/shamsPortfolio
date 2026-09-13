import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n';
import { identityGraph, portraitUrl } from '@/lib/structured-data';
import '../globals.css';

const siteUrl = 'https://shamsi-dev.vercel.app';

const seo = {
  en: {
    title: 'IT Consultant in Bamako | Chamsoudine THIENTA',
    description:
      'IT consultant and software engineer in Bamako. Chamsoudine THIENTA delivers business software, APIs, databases, automation and data solutions through SHAMSI Digital.'
  },
  fr: {
    title: 'Consultant informatique à Bamako | Chamsoudine THIENTA',
    description:
      'Consultant informatique et ingénieur logiciel à Bamako, Chamsoudine THIENTA réalise logiciels métier, API, bases de données, automatisations et solutions data avec SHAMSI Digital.'
  }
} satisfies Record<Locale, { title: string; description: string }>;

export function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  return params.then(({ locale }) => {
  const current = seo[locale] ?? seo.en;
  const canonical = `/${locale}`;

  return {
    metadataBase: new URL(siteUrl),
    title: current.title,
    description: current.description,
    keywords:
      locale === 'fr'
        ? [
            'Chamsoudine Thienta',
            'Shams',
            'Consultant informatique Bamako',
            'Consultant SI Mali',
            'Ingénieur logiciel Bamako',
            'Développement logiciel Mali',
            'analyse de données Mali',
            'SHAMSI Digital'
          ]
        : [
            'Chamsoudine Thienta',
            'Shams',
            'IT Consultant Bamako',
            'Software Engineer Bamako',
            'Data Analyst Mali',
            'SHAMSI Digital'
          ],
    verification: {
      google: 'vbGp19kYZPXBLH4Ucq7yDmS2twd7C2ti7_DCO8vqiyc'
    },
    alternates: {
      canonical,
      languages: {
        en: '/en',
        fr: '/fr',
        'x-default': '/fr'
      }
    },
    openGraph: {
      title: current.title,
      description: current.description,
      url: canonical,
      siteName: 'SHAMSI Digital',
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      images: [
        {
          url: portraitUrl,
          width: 900,
          height: 1125,
          alt: locale === 'fr'
            ? 'Portrait de Chamsoudine THIENTA'
            : 'Portrait of Chamsoudine THIENTA'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: current.title,
      description: current.description,
      images: [portraitUrl]
    },
    icons: {
      icon: '/icon.svg'
    },
    manifest: '/manifest.webmanifest'
  };
  });
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as any)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <meta name="google-site-verification" content="vbGp19kYZPXBLH4Ucq7yDmS2twd7C2ti7_DCO8vqiyc" />
      </head>
      <body className="bg-black text-white">
        <script
          id="identity-graph"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(identityGraph) }}
        />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          {locale === 'fr' ? 'Aller au contenu' : 'Skip to content'}
        </a>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
