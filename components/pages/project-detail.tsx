import { contactHref } from '@/lib/contact-options';
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
            <Link href={contactHref(locale, { project: slug })} className="inline-flex min-h-11 items-center rounded-full bg-brand-500 px-6 py-3 font-semibold text-black hover:bg-brand-400">{locale === 'fr' ? 'Discuter d’un projet similaire' : 'Discuss a similar project'}</Link>
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

      {slug === 'kalansup' ? <KalanSupProof locale={locale} /> : null}

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

      {slug === 'kalansup' && (
        <div className="mx-auto max-w-6xl px-6 pb-16">
          <Link href={`/${locale}/services/kalansup-universites`} className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand-400 underline underline-offset-4 hover:text-brand-300">
            {locale === 'fr' ? 'Découvrir l’offre KalanSUP pour les universités' : 'Explore KalanSUP for universities'}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      )}
      <section className="border-t border-white/10 bg-neutral-950 px-6 py-20 text-center md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold md:text-4xl">{labels.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/65">{labels.ctaBody}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={contactHref(locale, { project: slug })}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand-500 px-6 py-3 font-semibold text-black transition hover:bg-brand-400"
            >
              <Mail className="h-4 w-4" />
              {locale === 'fr' ? 'Demander un devis' : 'Request a quote'}
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

function KalanSupProof({ locale }: { locale: Locale }) {
  const fr = locale === 'fr';
  const examples = [
    {
      title: fr
        ? 'Repérer un conflit avant de publier les emplois du temps'
        : 'Spot a timetable conflict before publishing',
      description: fr
        ? 'Un enseignant est prévu dans deux classes sur deux sites au même créneau. KalanSUP affiche les deux séances ensemble pour que la direction sache quel planning revoir.'
        : 'An instructor is assigned to two classes at different campuses at the same time. KalanSUP shows both sessions together so the academic office can see what needs correcting.',
      href: 'https://fr.linkedin.com/posts/chamsoudine-thienta-146b21183_kalansup-shamsidigital-enseignementsup%C3%A9rieur-activity-7514026052118028288-b_V0'
    },
    {
      title: fr ? 'Retrouver une information dans l’espace étudiant' : 'Find information in the student portal',
      description: fr
        ? 'Sur un dossier fictif, le service envoie un rappel. L’étudiant retrouve le même solde dans Paiements, puis consulte son prochain cours et les notes déjà publiées.'
        : 'For a fictional student record, the office sends a reminder. The student sees the same balance in Payments, then finds their next class and already published grades.',
      href: 'https://fr.linkedin.com/posts/chamsoudine-thienta-146b21183_shamsidigital-kalansup-enseignementsuperieur-activity-7519453453882961920-mRbG'
    }
  ];

  return (
    <section aria-labelledby="kalansup-demo-title" className="border-y border-white/10 bg-neutral-950 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 id="kalansup-demo-title" className="text-3xl font-bold md:text-4xl">
          {fr ? 'KalanSUP en action : deux démonstrations' : 'KalanSUP in action: two walkthroughs'}
        </h2>
        <p className="mt-4 max-w-3xl text-white/70">
          {fr
            ? 'Ces vidéos utilisent des données fictives. Elles montrent le comportement de l’application, pas un déploiement chez un client ni un gain mesuré.'
            : 'These videos use fictional data. They show how the application works, not a client deployment or a measured improvement.'}
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {examples.map(({ title, description, href }) => (
            <article key={href} className="flex h-full flex-col items-start rounded-lg border border-white/15 bg-white/[0.03] p-6">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-white/70">{description}</p>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${fr ? 'Voir sur LinkedIn' : 'Watch in French on LinkedIn'}: ${title}`}
                className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-brand-400 underline underline-offset-4 hover:text-white"
              >
                {fr ? 'Voir sur LinkedIn' : 'Watch in French on LinkedIn'}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
