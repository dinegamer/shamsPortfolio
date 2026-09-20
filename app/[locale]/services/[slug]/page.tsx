import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ServiceDetail } from '@/components/pages/service-detail';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { locales, type Locale } from '@/i18n';
import { createPageMetadata } from '@/lib/page-metadata';
import { isServiceSlug, serviceContent, serviceSlugs } from '@/lib/service-content';

export function generateStaticParams() { return serviceSlugs.map(slug => ({ slug })); }
export function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  return params.then(({ locale, slug }) => {
    if (!locales.includes(locale) || !isServiceSlug(slug)) return {};
    const page = serviceContent[locale][slug];
    return createPageMetadata({ locale, path: `/services/${slug}`, title: page.seoTitle, description: page.seoDescription, keywords: [page.eyebrow, 'SHAMSI Digital', 'Chamsoudine THIENTA', 'Bamako', 'Mali'] });
  });
}
export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  if (!locales.includes(rawLocale as Locale) || !isServiceSlug(slug)) notFound();
  const locale = rawLocale as Locale; setRequestLocale(locale);
  return <><Navbar /><ServiceDetail locale={locale} slug={slug} /><Footer /></>;
}
