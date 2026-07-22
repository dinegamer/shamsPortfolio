'use client';
import { useTranslations } from 'next-intl';
import { BarChart3, Code2, DatabaseZap } from 'lucide-react';

export function Services() {
  const t = useTranslations('services');
  const items = [
    { icon: Code2, title: t('softwareTitle'), body: t('softwareBody') },
    { icon: BarChart3, title: t('analyticsTitle'), body: t('analyticsBody') },
    { icon: DatabaseZap, title: t('systemsTitle'), body: t('systemsBody') }
  ];
  return (
    <section id="services" className="relative py-24 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-400 mb-3">{t('kicker')}</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">{t('title')}</h2>
          <p className="mt-4 max-w-2xl text-lg text-white/60">{t('subtitle')}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map(({ icon: Icon, title, body }) => (
            <article
              key={title}
              className="group relative p-8 rounded-lg border border-white/10 bg-white/[0.02] hover:border-brand-400/30 hover:bg-white/[0.04] transition"
            >
              <div className="w-12 h-12 rounded-lg bg-brand-500/15 flex items-center justify-center mb-6">
                <Icon className="w-6 h-6 text-brand-400" />
              </div>
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="mt-3 text-sm text-white/65 leading-relaxed">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
