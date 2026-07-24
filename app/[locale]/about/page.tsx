import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ArrowLeft, ArrowUpRight, Check, Github, Linkedin, Mail } from 'lucide-react';
import { Footer } from '@/components/sections/footer';
import { Navbar } from '@/components/sections/navbar';
import { locales, type Locale } from '@/i18n';
import { createPageMetadata } from '@/lib/page-metadata';
import {
  githubUrl,
  linkedInUrl,
  portfolioContent
} from '@/lib/portfolio-content';

export function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  return params.then(({ locale }) => {
    const content = portfolioContent[locale]?.about;
    if (!content) return {};
    return createPageMetadata({
      locale,
      path: '/about',
      title: content.seoTitle,
      description: content.seoDescription
    });
  });
}

export default async function AboutPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!locales.includes(rawLocale as Locale)) notFound();

  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const content = portfolioContent[locale];
  const { about, navigation } = content;

  return (
    <>
      <Navbar />
      <main id="content" tabIndex={-1} className="min-h-screen bg-black pt-28 text-white">
        <header className="border-b border-white/10 px-6 pb-16 pt-10 md:pb-24">
          <div className="mx-auto max-w-5xl">
            <Link
              href={`/${locale}`}
              className="inline-flex min-h-11 items-center gap-2 text-sm text-white/65 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {navigation.home}
            </Link>
            <p className="mt-12 text-sm uppercase tracking-[0.3em] text-brand-400">
              {about.eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
              {about.title}
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/70 md:text-xl">
              {about.intro}
            </p>
          </div>
        </header>

        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-3">
            {about.sections.map((section) => (
              <article key={section.title}>
                <h2 className="text-xl font-bold">{section.title}</h2>
                <p className="mt-4 leading-relaxed text-white/65">{section.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-neutral-950 px-6 py-20 md:py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold md:text-4xl">{about.trajectoryTitle}</h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-3">
              {about.trajectory.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/70">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-brand-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold">{navigation.projects}</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}#work`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-500 px-6 py-3 font-semibold text-black transition hover:bg-brand-400"
              >
                {navigation.projects}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-white/80 transition hover:border-brand-400/50 hover:text-white"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-white/80 transition hover:border-brand-400/50 hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href="mailto:teenagerdine@gmail.com"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-white/80 transition hover:border-brand-400/50 hover:text-white"
              >
                <Mail className="h-4 w-4" />
                {navigation.contact}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
