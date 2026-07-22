'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ArrowUpRight, Github } from 'lucide-react';

type Project = {
  slug: string;
  name: string;
  stack: string[];
  statusKey: string;
  image?: string;
  github?: string;
};

const PROJECTS: Project[] = [
  {
    slug: 'kalansup',
    name: 'KalanSUP',
    stack: ['React', 'Spring Boot', 'PostgreSQL'],
    statusKey: 'statusProduct'
  },
  {
    slug: 'storesup',
    name: 'StoreSup',
    stack: ['MongoDB', 'Express', 'React', 'Node.js'],
    statusKey: 'statusProject',
    github: 'https://github.com/dinegamer/hackhaton_dev_frontEnd2'
  },
  {
    slug: 'agritechmali',
    name: 'AgritechMali',
    stack: ['Python', 'AI', 'React'],
    statusKey: 'statusPrototype',
    image: '/projects/agritech.png',
    github: 'https://github.com/dinegamer/agritechMali'
  },
  {
    slug: 'apeda',
    name: 'APEDA Mali',
    stack: ['React', 'Accessibility', 'Content'],
    statusKey: 'statusProject',
    github: 'https://github.com/dinegamer/apeda'
  },
  {
    slug: 'ae2c',
    name: 'AE2C',
    stack: ['React', 'Animation', 'Responsive UI'],
    statusKey: 'statusProject',
    github: 'https://github.com/dinegamer/cabinetae2c'
  },
  {
    slug: 'bamboolab',
    name: 'BambooLab',
    stack: ['React', 'Interactive UI'],
    statusKey: 'statusPrototype',
    github: 'https://github.com/dinegamer/bamboolab'
  },
  {
    slug: 'bnda-queue',
    name: 'BNDA Queue',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'Socket.io'],
    statusKey: 'statusPrototype',
    image: '/projects/bnda-queue.png'
  }
];

export function Projects() {
  const t = useTranslations('projects');
  return (
    <section id="work" className="relative py-24 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-400 mb-3">
            {t('kicker')}
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">{t('title')}</h2>
          <p className="mt-4 text-lg text-white/60 max-w-2xl">{t('subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {PROJECTS.map((p) => (
            <article
              key={p.slug}
              className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.02] transition hover:border-white/20"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-950">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={t(`${p.slug}.imageAlt`)}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-top opacity-90 transition duration-500 group-hover:opacity-100"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,rgba(34,211,238,0.12),rgba(249,115,22,0.12))]">
                    <span className="text-5xl md:text-6xl font-black text-white/10 tracking-tight select-none">
                      {p.name}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-brand-400">
                      {t(p.statusKey)}
                    </p>
                    <h3 className="mt-1 text-2xl font-bold">{p.name}</h3>
                  </div>
                  {p.github ? (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-brand-400/50 hover:text-white"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  ) : null}
                </div>
                <dl className="mt-5 space-y-4 text-sm leading-relaxed">
                  {['problem', 'contribution', 'features', 'capture'].map((field) => (
                    <div key={field}>
                      <dt className="text-xs uppercase tracking-wider text-white/40">
                        {t(`labels.${field}`)}
                      </dt>
                      <dd className="mt-1 text-white/70">{t(`${p.slug}.${field}`)}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium rounded-full bg-white/5 text-white/70 border border-white/10"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
