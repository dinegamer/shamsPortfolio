import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { Locale } from '@/i18n';
import { serviceContent, type ServiceSlug } from '@/lib/service-content';
import { personId, organizationId } from '@/lib/structured-data';

export function ServiceDetail({ locale, slug }: { locale: Locale; slug: ServiceSlug }) {
  const page = serviceContent[locale][slug];
  const url = `https://shamsi-dev.vercel.app/${locale}/services/${slug}`;
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Service', '@id': `${url}#service`,
    name: page.title, description: page.promise, url,
    provider: { '@id': organizationId }, broker: { '@id': personId },
    areaServed: ['Mali', 'Guinea', 'Francophone Africa'], inLanguage: locale
  };

  return <main id="content" className="min-h-screen bg-black pt-28 text-white">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <header className="border-b border-white/10 px-6 pb-20 pt-10">
      <div className="mx-auto max-w-6xl">
        <Link href={`/${locale}#services`} className="inline-flex min-h-11 items-center gap-2 text-sm text-white/65 hover:text-white"><ArrowLeft className="h-4 w-4" />{locale === 'fr' ? 'Retour aux services' : 'Back to services'}</Link>
        <p className="mt-12 text-sm uppercase tracking-[0.3em] text-brand-400">{page.eyebrow}</p>
        <h1 className="mt-4 max-w-5xl text-5xl font-bold leading-tight md:text-7xl">{page.title}</h1>
        <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/70 md:text-xl">{page.promise}</p>
        <a href="#demande" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 font-semibold text-black hover:bg-brand-400">{page.cta}<ArrowRight className="h-4 w-4" /></a>
      </div>
    </header>
    <section className="px-6 py-20"><div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2">
      <Block title={locale === 'fr' ? 'Pour qui ?' : 'Who is it for?'}><p>{page.audience}</p></Block>
      <Block title={locale === 'fr' ? 'Problèmes traités' : 'Problems addressed'}><List items={page.pains} /></Block>
      <Block title={locale === 'fr' ? 'Livrables possibles' : 'Possible deliverables'}><List items={page.deliverables} /></Block>
      <Block title={locale === 'fr' ? 'Preuve et limites' : 'Evidence and limits'}><p>{page.proof}</p></Block>
    </div></section>
    <section id="demande" className="border-y border-white/10 bg-neutral-950 px-6 py-20 text-center">
      <div className="mx-auto max-w-3xl"><p className="text-sm uppercase tracking-[0.3em] text-brand-400">{locale === 'fr' ? 'Première étape' : 'First step'}</p><h2 className="mt-4 text-3xl font-bold">{page.firstStep}</h2>
      <p className="mt-5 text-white/60">{locale === 'fr' ? 'Indiquez votre organisation, votre rôle, le problème prioritaire, le délai souhaité et votre fourchette budgétaire.' : 'Share your organization, role, priority problem, desired timeline and budget range.'}</p>
      <a href={`/${locale}#contact`} className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-black hover:bg-white/90">{page.cta}<ArrowRight className="h-4 w-4" /></a></div>
    </section>
  </main>;
}

function Block({ title, children }: { title: string; children: React.ReactNode }) { return <section><h2 className="text-sm uppercase tracking-[0.25em] text-brand-400">{title}</h2><div className="mt-4 leading-relaxed text-white/70">{children}</div></section>; }
function List({ items }: { items: string[] }) { return <ul className="space-y-3">{items.map(item => <li key={item} className="flex items-start gap-3"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brand-400" />{item}</li>)}</ul>; }
