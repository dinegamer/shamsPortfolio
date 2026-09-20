'use client';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowUpRight, BarChart3, Building2, Code2, DatabaseZap, GraduationCap, HeartPulse } from 'lucide-react';

export function Services() {
  const t = useTranslations('services');
  const locale = useLocale();
  const items = [
    { icon: DatabaseZap, title: locale === 'fr' ? 'Consultant informatique' : 'IT consulting', body: locale === 'fr' ? 'Diagnostic SI, cahier des charges, automatisation, data, formation et accompagnement.' : 'IT diagnosis, requirements, automation, data, training and enablement.', slug: 'consultant-informatique-bamako' },
    { icon: Code2, title: t('softwareTitle'), body: t('softwareBody'), slug: 'developpement-application-mali' },
    { icon: BarChart3, title: locale === 'fr' ? 'Missions SI pour ONG' : 'IT assignments for NGOs', body: locale === 'fr' ? 'Processus, qualité des données, reporting, automatisation et formation.' : 'Processes, data quality, reporting, automation and training.', slug: 'consultant-si-ong' },
    { icon: GraduationCap, title: 'KalanSUP', body: locale === 'fr' ? 'Pilotage académique, administratif et financier des universités.' : 'Academic, administrative and financial university operations.', slug: 'kalansup-universites' },
    { icon: Building2, title: 'Kalan+', body: locale === 'fr' ? 'Suivi scolaire, assiduité et communication pour les écoles privées.' : 'School monitoring, attendance and family communication.', slug: 'kalanplus-ecoles' },
    { icon: HeartPulse, title: 'SmartCare', body: locale === 'fr' ? 'Diagnostic et prototype pour l’accueil, les files et les parcours en clinique.' : 'Diagnosis and prototyping for clinic reception, queues and service flows.', slug: 'smartcare-cliniques' }
  ];
  return (
    <section id="services" className="relative py-24 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-400 mb-3">{t('kicker')}</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">{t('title')}</h2>
          <p className="mt-4 max-w-2xl text-lg text-white/60">{t('subtitle')}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ icon: Icon, title, body, slug }) => (
            <a
              key={title}
              href={`/${locale}/services/${slug}`}
              className="group relative p-8 rounded-lg border border-white/10 bg-white/[0.02] hover:border-brand-400/30 hover:bg-white/[0.04] transition"
            >
              <div className="w-12 h-12 rounded-lg bg-brand-500/15 flex items-center justify-center mb-6">
                <Icon className="w-6 h-6 text-brand-400" />
              </div>
              <h3 className="flex items-center justify-between gap-3 text-xl font-bold">{title}<ArrowUpRight className="h-4 w-4 text-white/50 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-400" /></h3>
              <p className="mt-3 text-sm text-white/65 leading-relaxed">{body}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
