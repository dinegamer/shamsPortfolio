import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ProjectDetail } from '@/components/pages/project-detail';
import { Footer } from '@/components/sections/footer';
import { Navbar } from '@/components/sections/navbar';
import { locales, type Locale } from '@/i18n';
import { createPageMetadata } from '@/lib/page-metadata';
import {
  isProjectSlug,
  portfolioContent,
  projectSlugs
} from '@/lib/portfolio-content';

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  return params.then(({ locale, slug }) => {
    if (!isProjectSlug(slug) || !locales.includes(locale)) return {};
    const project = portfolioContent[locale].projects[slug];
    return createPageMetadata({
      locale,
      path: `/projects/${slug}`,
      title: project.seoTitle,
      description: project.seoDescription,
      image: project.image?.src
    });
  });
}

export default async function ProjectPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  if (!locales.includes(rawLocale as Locale) || !isProjectSlug(slug)) notFound();

  const locale = rawLocale as Locale;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <ProjectDetail locale={locale} slug={slug} />
      <Footer />
    </>
  );
}
