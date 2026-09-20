import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/sections/footer';
import { Navbar } from '@/components/sections/navbar';
import { locales, type Locale } from '@/i18n';
import { createPageMetadata } from '@/lib/page-metadata';

const content = {
  fr: {
    title: 'Comment choisir un consultant informatique au Mali ?',
    intro: 'Un bon consultant ne commence pas par imposer une technologie. Il clarifie le problème, les utilisateurs, les données, les risques, les critères de réussite et la capacité réelle de l’organisation à exploiter la solution.',
    sections: [
      ['1. Exiger un problème formulé clairement', 'Le besoin doit être exprimé comme un résultat opérationnel : réduire une ressaisie, tracer une validation, consolider des données ou livrer une application définie. « Faire la transformation digitale » n’est pas un périmètre.'],
      ['2. Vérifier les preuves, pas seulement les technologies', 'Demandez une démonstration, une architecture, un exemple de livrable, un dépôt public ou une étude de cas. Distinguez toujours prototype, produit disponible et déploiement client.'],
      ['3. Commencer par un lot limité', 'Un diagnostic court, un cahier des charges ou un pilote mesurable réduit le risque avant un déploiement complet. Le périmètre, le délai, les responsabilités et la recette doivent être écrits.'],
      ['4. Protéger les données et la continuité', 'Clarifiez les droits d’accès, les sauvegardes, les exports, la réversibilité, la formation et le support. Aucune promesse de sécurité ou de conformité ne doit remplacer des contrôles concrets.'],
      ['5. Évaluer la capacité à transmettre', 'La documentation, la formation et l’écoute métier comptent autant que le code. Une solution non comprise ou non adoptée ne produit pas la valeur attendue.']
    ],
    checklist: ['Problème et utilisateurs identifiés', 'Livrables et critères de recette écrits', 'Preuves vérifiables', 'Budget et calendrier annoncés', 'Propriété et export des données clarifiés', 'Formation, support et maintenance définis'],
    cta: 'Présenter une mission à Chamsoudine'
  },
  en: {
    title: 'How to choose an IT consultant in Mali',
    intro: 'A strong consultant does not start by imposing technology. They clarify the problem, users, data, risks, success criteria and the organization’s ability to operate the solution.',
    sections: [
      ['1. Require a clearly framed problem', 'Express the need as an operational result: remove duplicate entry, trace an approval, consolidate data or deliver a defined application. “Digital transformation” alone is not a scope.'],
      ['2. Verify evidence, not only technologies', 'Ask for a demo, architecture, sample deliverable, public repository or case study. Always distinguish a prototype, an available product and a client deployment.'],
      ['3. Start with a limited package', 'A short diagnosis, requirements document or measurable pilot reduces risk before a full deployment. Scope, timeline, responsibilities and acceptance criteria should be written.'],
      ['4. Protect data and continuity', 'Clarify access rights, backups, exports, reversibility, training and support. Security or compliance claims never replace concrete controls.'],
      ['5. Assess the ability to transfer knowledge', 'Documentation, training and business listening matter as much as code. A solution that is not understood or adopted cannot deliver its intended value.']
    ],
    checklist: ['Problem and users identified', 'Written deliverables and acceptance criteria', 'Verifiable evidence', 'Budget and timeline discussed', 'Data ownership and export clarified', 'Training, support and maintenance defined'],
    cta: 'Discuss an assignment with Chamsoudine'
  }
} as const;

export function generateStaticParams() { return locales.map(locale => ({ locale })); }
export function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> { return params.then(({ locale }) => createPageMetadata({ locale, path: '/guides/choisir-consultant-informatique-mali', title: locale === 'fr' ? 'Choisir un consultant informatique au Mali : guide pratique' : 'Choosing an IT consultant in Mali: practical guide', description: locale === 'fr' ? 'Les critères concrets pour sélectionner un consultant SI, développeur ou expert data au Mali sans se limiter aux mots-clés techniques.' : 'Practical criteria for selecting an IT consultant, developer or data specialist in Mali.', keywords: ['consultant informatique Mali','consultant SI Bamako','développeur malien','IT consultant Mali','SHAMSI Digital'] })); }

export default async function Guide({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params; if (!locales.includes(raw as Locale)) notFound(); const locale=raw as Locale; setRequestLocale(locale); const page=content[locale];
  const faq = { '@context':'https://schema.org','@type':'Article', headline:page.title, author:{'@type':'Person',name:'Chamsoudine THIENTA'}, dateModified:'2026-09-20', inLanguage:locale, mainEntityOfPage:`https://shamsi-dev.vercel.app/${locale}/guides/choisir-consultant-informatique-mali` };
  return <><Navbar/><main id="content" className="min-h-screen bg-black px-6 pb-24 pt-36 text-white"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faq)}}/><article className="mx-auto max-w-3xl"><p className="text-sm uppercase tracking-[.3em] text-brand-400">{locale==='fr'?'Guide acheteur':'Buyer guide'}</p><h1 className="mt-5 text-5xl font-bold leading-tight md:text-6xl">{page.title}</h1><p className="mt-7 text-xl leading-relaxed text-white/70">{page.intro}</p><div className="mt-16 space-y-12">{page.sections.map(([title,body])=><section key={title}><h2 className="text-2xl font-bold">{title}</h2><p className="mt-4 leading-relaxed text-white/70">{body}</p></section>)}</div><section className="mt-16 rounded-2xl border border-white/10 bg-white/[.03] p-8"><h2 className="text-2xl font-bold">Checklist</h2><ul className="mt-6 space-y-3">{page.checklist.map(item=><li key={item} className="flex gap-3 text-white/75"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brand-400"/>{item}</li>)}</ul></section><div className="mt-14"><Link href={`/${locale}/services/consultant-informatique-bamako`} className="inline-flex rounded-full bg-brand-500 px-7 py-4 font-semibold text-black hover:bg-brand-400">{page.cta}</Link></div></article></main><Footer/></>;
}
