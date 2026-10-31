import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ServiceDetail } from '@/components/pages/service-detail';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { locales, type Locale } from '@/i18n';
import { createPageMetadata } from '@/lib/page-metadata';
import { serviceContent, serviceSlugs, type ServiceSlug } from '@/lib/service-content';

function isServiceSlug(slug: string): slug is ServiceSlug {
  return serviceSlugs.includes(slug as ServiceSlug);
}

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!locales.includes(locale) || !isServiceSlug(slug)) return {};
  const page = serviceContent[locale][slug];
  return createPageMetadata({ locale, path: `/services/${slug}`, title: page.seoTitle, description: page.seoDescription });
}

export default async function ServicePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  if (!locales.includes(rawLocale as Locale) || !isServiceSlug(slug)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  return <><Navbar /><ServiceDetail locale={locale} slug={slug} /><Footer /></>;
}
