import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ArrowUpRight } from 'lucide-react';
import { Navbar } from '@/components/sections/navbar';
import { Contact } from '@/components/sections/contact';
import { ContactActions } from '@/components/contact-actions';
import { Footer } from '@/components/sections/footer';
import { locales, type Locale } from '@/i18n';
import { business } from '@/lib/business';
import { createPageMetadata } from '@/lib/page-metadata';

const copy = {
  fr: {
    title: 'SHAMSI DIGITAL Mali — Logiciels et conseil informatique à Bamako',
    description: 'SHAMSI DIGITAL, entreprise individuelle de Chamsoudine THIENTA à Bamako. Logiciels métier, React, Spring Boot, PostgreSQL, data et accompagnement des ONG et entreprises.',
    heading: 'Des logiciels au service de vos opérations.',
    intro: 'SHAMSI DIGITAL accompagne les entreprises, ONG et établissements d’enseignement dans la conception de logiciels métier, l’organisation de leurs données et l’amélioration de leurs systèmes d’information.',
    status: 'Entreprise individuelle · Bamako, Mali',
    contact: 'Demander un devis',
    identity: 'Une entreprise, un interlocuteur identifié',
    identityBody: 'SHAMSI DIGITAL est le nom commercial de l’entreprise individuelle de Chamsoudine THIENTA, consultant informatique, ingénieur logiciel et formateur. L’activité est immatriculée au Mali sous le RCCM ci-dessous. SHAMSI Digital Mali et ShamsiDigital désignent cette même activité.',
    owner: 'Entrepreneur individuel',
    services: 'Des prestations adaptées au terrain',
    offers: [
      ['Logiciels métier & API', 'Applications web, portails par rôle, workflows, intégrations et reprise d’applications. React, Spring Boot et PostgreSQL font partie des technologies utilisées.', 'developpement-application-mali'],
      ['Systèmes d’information pour les ONG', 'Analyse des besoins, structuration des données, outils de suivi, automatisation du reporting et accompagnement des équipes.', 'consultant-si-ong'],
      ['Conseil, data & formation', 'Audit ciblé, cahier des charges, SQL, tableaux de bord et formation à l’utilisation des outils livrés.', 'consultant-informatique-bamako']
    ],
    cases: 'Des réalisations à examiner',
    projects: [
      ['KalanSUP', 'Logiciel de gestion universitaire : inscriptions, scolarité, paiements, planning, notes et documents. React · Spring Boot · PostgreSQL. Présentation fonctionnelle et démonstration sur données fictives ; code source privé.', 'kalansup'],
      ['StoreSup', 'Application de gestion de stock et d’opérations avec React, Node.js et MongoDB. Étude de cas et dépôt public disponibles.', 'storesup'],
      ['File d’attente numérique', 'Prototype de gestion des flux d’accueil avec interfaces de service et interactions en temps réel. Son statut de prototype est explicite.', 'digital-queue']
    ],
    caseLink: 'Voir la réalisation',
    working: 'Pour les missions et consultations',
    workingBody: 'Quelques lignes suffisent pour commencer. Si vous disposez déjà d’un cahier des charges ou de termes de référence, nous pourrons les examiner lors du premier échange. Le périmètre, les livrables, le calendrier, le budget et les modalités de paiement sont définis avant tout engagement. Les justificatifs administratifs disponibles sont communiqués dans un cadre approprié, selon les exigences de la consultation.',
    workingNote: 'Interventions à Bamako et collaboration à distance selon la mission. Les disponibilités sont confirmées au cas par cas.',
    legal: 'Identité légale et confidentialité',
    directory: 'Fiche professionnelle Maliya'
  },
  en: {
    title: 'SHAMSI DIGITAL Mali — Business software and IT consulting in Bamako',
    description: 'SHAMSI DIGITAL is Chamsoudine THIENTA’s sole proprietorship in Bamako, Mali. Business software, React, Spring Boot, PostgreSQL, data and support for NGOs and businesses.',
    heading: 'Software built around your operations.',
    intro: 'SHAMSI DIGITAL helps businesses, NGOs and educational institutions build business applications, organize their data and improve their information systems.',
    status: 'Sole proprietorship · Bamako, Mali',
    contact: 'Request a quote',
    identity: 'An identified business and a direct contact',
    identityBody: 'SHAMSI DIGITAL is the trade name of Chamsoudine THIENTA’s sole proprietorship. He is an IT consultant, software engineer and trainer. The business is registered in Mali under the RCCM number below. SHAMSI Digital Mali and ShamsiDigital refer to the same business.',
    owner: 'Sole proprietor',
    services: 'Services for practical operating needs',
    offers: [
      ['Business software & APIs', 'Web applications, role-based portals, workflows, integrations and application maintenance. Technologies include React, Spring Boot and PostgreSQL.', 'developpement-application-mali'],
      ['Information systems for NGOs', 'Requirements analysis, data organization, monitoring tools, reporting automation and support for operational teams.', 'consultant-si-ong'],
      ['Consulting, data & training', 'Focused audits, specifications, SQL, dashboards and training on delivered tools.', 'consultant-informatique-bamako']
    ],
    cases: 'Work you can review',
    projects: [
      ['KalanSUP', 'University management software covering admissions, tuition, payments, schedules, grades and documents. React · Spring Boot · PostgreSQL. Functional presentation and demonstrations with synthetic data; private source code.', 'kalansup'],
      ['StoreSup', 'Inventory and operations application using React, Node.js and MongoDB. A case study and public repository are available.', 'storesup'],
      ['Digital Queue', 'A reception and service-flow prototype with real-time interactions. Its prototype status is clearly stated.', 'digital-queue']
    ],
    caseLink: 'View the case study',
    working: 'For assignments and procurement enquiries',
    workingBody: 'A few lines are enough to get started. If you already have specifications or terms of reference, we can review them during our first conversation. Scope, deliverables, schedule, budget and payment terms are agreed before an engagement begins. Available administrative documents can be provided through an appropriate channel according to the requirements of the consultation.',
    workingNote: 'Work in Bamako and remote collaboration depend on the assignment. Availability is confirmed individually.',
    legal: 'Legal identity and privacy',
    directory: 'Maliya business listing'
  }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const c = copy[locale];
  return c ? createPageMetadata({ locale, path: '/shamsi-digital', title: c.title, description: c.description }) : {};
}

export default async function BusinessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!locales.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const c = copy[locale];
  return (
    <>
      <Navbar />
      <main id="content" tabIndex={-1} className="min-h-screen bg-black pt-36 text-white">
        <div className="mx-auto max-w-5xl px-6">
          <header className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-400">SHAMSI DIGITAL</p>
            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">{c.heading}</h1>
            <p className="mt-6 text-lg leading-relaxed text-white/70">{c.intro}</p>
            <p className="mt-5 text-sm text-white/60">{c.status}</p>
            <Link href="#contact" className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-brand-500 px-6 py-3 font-semibold text-black hover:bg-brand-400">{c.contact}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>
            <div className="mt-4"><ContactActions /></div>
          </header>
          <section className="mt-16 rounded-2xl border border-white/10 bg-white/[0.025] p-6 md:p-9">
            <h2 className="text-2xl font-bold">{c.identity}</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-white/65">{c.identityBody}</p>
            <dl className="mt-7 grid gap-6 sm:grid-cols-2">
              <div><dt className="text-sm text-white/50">{c.owner}</dt><dd className="mt-1 font-medium">{business.owner}</dd></div>
              <div><dt className="text-sm text-white/50">RCCM</dt><dd className="mt-1 break-words font-medium">{business.rccm}</dd></div>
            </dl>
          </section>
          <section className="mt-20">
            <h2 className="text-3xl font-bold">{c.services}</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">{c.offers.map(([title, body, slug]) => (
              <article key={slug} className="rounded-xl border border-white/10 p-6"><h3 className="text-xl font-semibold"><Link href={`/${locale}/services/${slug}`} className="hover:text-brand-400">{title}</Link></h3><p className="mt-4 leading-relaxed text-white/65">{body}</p></article>
            ))}</div>
          </section>
          <section className="mt-20">
            <h2 className="text-3xl font-bold">{c.cases}</h2>
            <div className="mt-8 divide-y divide-white/10">{c.projects.map(([title, body, slug]) => (
              <article key={slug} className="grid gap-4 py-8 md:grid-cols-[1fr_2fr]"><h3 className="text-2xl font-semibold">{title}</h3><div><p className="leading-relaxed text-white/65">{body}</p><Link href={`/${locale}/projects/${slug}`} className="mt-3 inline-flex min-h-11 items-center gap-2 text-brand-400 hover:underline">{c.caseLink}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link></div></article>
            ))}</div>
          </section>
          <section className="mt-16 border-t border-white/10 pt-10">
            <h2 className="text-3xl font-bold">{c.working}</h2>
            <p className="mt-5 max-w-3xl leading-relaxed text-white/65">{c.workingBody}</p>
            <p className="mt-4 text-white/65">{c.workingNote}</p>
            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3"><a href={`mailto:${business.email}`} className="break-all text-brand-400 hover:underline">{business.email}</a><a href={`tel:${business.telephone}`} className="text-brand-400 hover:underline">{business.phoneLabel}</a></div>
            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/60"><Link href={`/${locale}/mentions-legales`} className="hover:text-white">{c.legal}</Link><a href={business.directoryUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">{c.directory}</a></div>
          </section>
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
