import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n';
import '../globals.css';

const siteUrl = 'https://shamsi-dev.vercel.app';

const seo = {
  en: {
    title: 'Chamsoudine THIENTA | Software Engineer & Data Analyst',
    description:
      'Software Engineer and Data Analyst based in Bamako, building backend systems, APIs, databases and data-driven products. Founder of Shamsi Digital.'
  },
  fr: {
    title: 'Chamsoudine THIENTA | Ingénieur logiciel & Data Analyst',
    description:
      'Ingénieur logiciel et Data Analyst basé à Bamako, spécialisé dans les systèmes backend, API, bases de données et solutions fondées sur les données. Fondateur de Shamsi Digital.'
  }
} satisfies Record<Locale, { title: string; description: string }>;

export function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  return params.then(({ locale }) => {
  const current = seo[locale] ?? seo.en;
  const canonical = locale === 'fr' ? '/fr' : '/';

  return {
    metadataBase: new URL(siteUrl),
    title: current.title,
    description: current.description,
    verification: {
      google: 'vbGp19kYZPXBLH4Ucq7yDmS2twd7C2ti7_DCO8vqiyc'
    },
    alternates: {
      canonical,
      languages: {
        en: '/',
        fr: '/fr',
        'x-default': '/'
      }
    },
    openGraph: {
      title: current.title,
      description: current.description,
      url: canonical,
      siteName: 'Shamsi Digital',
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      images: [
        {
          url: '/me.jpg',
          width: 800,
          height: 800,
          alt: 'Chamsoudine THIENTA'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: current.title,
      description: current.description,
      images: ['/me.jpg']
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
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
