'use client';
import { useTranslations } from 'next-intl';

const STACK = [
  'Java',
  'Spring Boot',
  'Node.js',
  'React',
  'Next.js',
  'Python',
  'SQL',
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'Power BI',
  'REST APIs',
  'Database modeling',
  'Data reporting'
];

export function Stack() {
  const t = useTranslations('stack');
  return (
    <section className="relative py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-400 mb-3">{t('kicker')}</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{t('title')}</h2>
          <p className="mt-4 max-w-2xl text-white/60">{t('subtitle')}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {STACK.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] text-sm text-white/80 hover:border-brand-400/40 hover:text-white transition"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
