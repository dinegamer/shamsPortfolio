import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Check, Github, Linkedin, Mail } from 'lucide-react';
import type { Locale } from '@/i18n';
import {
  linkedInUrl,
  portfolioContent,
  projectSlugs,
  type ProjectSlug
} from '@/lib/portfolio-content';
import {
  contentModifiedDate,
  getProjectKeywords,
  getProjectStructuredType,
  personId
} from '@/lib/structured-data';

type ProjectDetailProps = {
  locale: Locale;
  slug: ProjectSlug;
};

export function ProjectDetail({ locale, slug }: ProjectDetailProps) {
  const content = portfolioContent[locale];
  const project = content.projects[slug];
  const labels = content.projectLabels;
  const navigation = content.navigation;
  const related = projectSlugs.filter((item) => item !== slug);
  const projectUrl = `https://shamsi-dev.vercel.app/${locale}/projects/${slug}`;
  const structuredType = getProjectStructuredType(slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': structuredType,
    '@id': `${projectUrl}#project`,
    name: project.name,
    description: project.summary,
    url: projectUrl,
    inLanguage: locale,
    dateModified: contentModifiedDate,
    keywords: getProjectKeywords(locale, slug),
    creator: {
      '@id': personId
    },
    ...(structuredType === 'SoftwareApplication'
      ? { applicationCategory: 'BusinessApplication' }
      : {}),
    ...(structuredType === 'SoftwareSourceCode' && project.github
      ? { codeRepository: project.github }
      : {}),
    ...(project.image
      ? { image: `https://shamsi-dev.vercel.app${project.image.src}` }
      : {})
  };

  return (
    <main id="content" tabIndex={-1} className="min-h-screen bg-black pt-28 text-white">
      <script
        id="project-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="border-b border-white/10 px-6 pb-16 pt-10 md:pb-24">
        <div className="mx-auto max-w-6xl">
          <Link
            href={`/${locale}#work`}
            className="inline-flex min-h-11 items-center gap-2 text-sm text-white/65 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            {navigation.backToProjects}
          </Link>
          <p className="mt-12 text-sm uppercase tracking-[0.3em] text-brand-400">
            {project.eyebrow}
          </p>
          <h1 className="mt-4 max-w-5xl text-5xl font-bold leading-tight md:text-7xl">
            {project.name}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/70 md:text-xl">
            {project.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-white/90"
              >
                <Github className="h-4 w-4" />
                {navigation.github}
              </a>
            ) : null}
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-white/80 transition hover:border-brand-400/50 hover:text-white"
            >
              <Linkedin className="h-4 w-4" />
              {navigation.linkedIn}
            </a>
          </div>
        </div>
      </header>

      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-x-14 gap-y-16 md:grid-cols-2">
          <ContentSection title={labels.problem}>
            <p>{project.problem}</p>
          </ContentSection>
          <ContentSection title={labels.solution}>
            <p>{project.solution}</p>
          </ContentSection>
          <ContentSection title={labels.role}>
            <p>{project.role}</p>
          </ContentSection>
          <ContentSection title={labels.status}>
            <p>{project.status}</p>
          </ContentSection>
          <ContentSection title={labels.features}>
            <FeatureList items={project.features} />
          </ContentSection>
          <ContentSection title={labels.technologies}>
            <ul className="flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <li
                  key={technology}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/80"
                >
                  {technology}
                </li>
              ))}
            </ul>
          </ContentSection>
          {project.constraints?.length ? (
            <ContentSection title={labels.constraints}>
              <FeatureList items={project.constraints} />
            </ContentSection>
          ) : null}
        </div>
      </section>

      {project.image ? (
        <section className="border-y border-white/10 bg-neutral-950 px-6 py-20 md:py-28">
          <figure className="mx-auto max-w-6xl">
            <p className="mb-6 text-sm uppercase tracking-[0.3em] text-brand-400">
              {labels.image}
            </p>
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-white/10 bg-white">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                sizes="(min-width: 1024px) 1152px, 100vw"
                className="object-contain object-top"
                priority
              />
            </div>
            <figcaption className="mt-4 text-sm text-white/50">
              {project.image.caption}
            </figcaption>
          </figure>
        </section>
      ) : null}

      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold">{navigation.otherProjects}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((relatedSlug) => {
              const relatedProject = content.projects[relatedSlug];
              return (
                <Link
                  key={relatedSlug}
                  href={`/${locale}/projects/${relatedSlug}`}
                  className="group border-t border-white/15 py-5 transition hover:border-brand-400"
                >
                  <span className="text-xs uppercase tracking-wider text-white/45">
                    {relatedProject.eyebrow}
                  </span>
                  <span className="mt-2 flex items-center justify-between gap-3 text-xl font-semibold">
                    {relatedProject.name}
                    <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-neutral-950 px-6 py-20 text-center md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold md:text-4xl">{labels.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/65">{labels.ctaBody}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:teenagerdine@gmail.com"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-500 px-6 py-3 font-semibold text-black transition hover:bg-brand-400"
            >
              <Mail className="h-4 w-4" />
              {navigation.email}
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
          </div>
        </div>
      </section>
    </main>
  );
}

function ContentSection({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-sm uppercase tracking-[0.25em] text-brand-400">{title}</h2>
      <div className="mt-4 leading-relaxed text-white/70">{children}</div>
    </section>
  );
}

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <Check className="mt-1 h-4 w-4 shrink-0 text-brand-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
