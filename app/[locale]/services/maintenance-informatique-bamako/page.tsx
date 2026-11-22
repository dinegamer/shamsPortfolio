import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { contactHref } from '@/lib/contact-options';
import { createPageMetadata } from '@/lib/page-metadata';
import { maintenanceBamakoPath } from '@/lib/service-routes';

const title = 'Maintenance informatique à Bamako pour PME et ONG | SHAMSI Digital';
const description = 'Dépannage informatique ciblé à Bamako : postes de travail, logiciels et problèmes de connexion. Diagnostic, tests et compte rendu. Intervention sur place selon le besoin.';
const contact = contactHref('fr', { service: 'maintenance' });
const body = 'mt-5 max-w-3xl leading-relaxed text-white/70';
const heading = 'text-2xl font-bold sm:text-3xl';
const section = 'border-t border-white/10 py-10';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'fr') return {};
  const metadata = createPageMetadata({ locale, path: maintenanceBamakoPath, title, description });
  return {
    ...metadata,
    alternates: { canonical: metadata.alternates?.canonical },
    openGraph: { ...metadata.openGraph, alternateLocale: undefined }
  };
}

function EnquiryLink() {
  return <Link href={contact} className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 font-semibold text-black hover:bg-brand-400">
    Décrire votre panne <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
  </Link>;
}

export default async function MaintenanceBamakoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Neither publish nor advertise a translation that doesn't exist.
  if (locale === 'en') redirect('/en/shamsi-digital');
  if (locale !== 'fr') notFound();
  setRequestLocale(locale);
  return <>
    <Navbar />
    <main id="content" tabIndex={-1} className="min-h-screen bg-black px-6 pb-16 pt-28 text-white sm:pt-36">
      <div className="mx-auto max-w-5xl">
        <header className="pb-12">
          <Link href="/fr#services" className="inline-flex min-h-11 items-center text-sm text-white/65 hover:text-white">Retour aux services</Link>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-brand-400">SHAMSI Digital · Bamako</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-6xl">Maintenance informatique à Bamako pour PME et ONG</h1>
          <p className={body}>Un ordinateur ne lance plus votre logiciel de travail ? Un poste n’accède plus à la connexion utilisée par l’équipe ? SHAMSI Digital vous aide à identifier la panne et à choisir la prochaine action. À Bamako, l’intervention sur place dépend du quartier, du matériel et de la disponibilité. Si le problème logiciel peut être traité à distance, nous vous le proposons après le premier échange.</p>
          <EnquiryLink />
        </header>

        <section className={section}>
          <h2 className={heading}>Sur quoi pouvons-nous intervenir ?</h2>
          <ul className={`${body} list-disc space-y-3 pl-5`}>
            <li><strong className="text-white">Postes de travail :</strong> diagnostiquer un poste qui ralentit ou bloque et vérifier son fonctionnement avec les outils utilisés par l’équipe.</li>
            <li><strong className="text-white">Logiciels de travail :</strong> installer ou configurer un logiciel autorisé, vérifier son démarrage et tester l’usage attendu.</li>
            <li><strong className="text-white">Connexion d’un poste :</strong> rechercher si la panne vient du poste, de son accès local ou d’un service externe. Si elle relève du fournisseur d’accès ou d’un spécialiste réseau, nous vous indiquons à qui la transmettre.</li>
          </ul>
          <p className={body}>Pour une panne de code sur un formulaire web, une API ou un outil métier, consultez la <Link className="text-brand-400 underline underline-offset-4 hover:text-brand-300" href="/fr/services/developpement-application-mali">reprise d’application à Bamako</Link>.</p>
        </section>

        <section className={section}>
          <h2 className={heading}>Comment se passe une intervention ?</h2>
          <ol className={`${body} list-decimal space-y-4 pl-5`}>
            <li><strong className="text-white">Décrire le problème.</strong> Indiquez le quartier si un déplacement est nécessaire, le nombre de postes touchés, le message d’erreur et le moment où la panne a commencé. N’envoyez ni mot de passe ni document confidentiel.</li>
            <li><strong className="text-white">Confirmer le périmètre.</strong> Nous convenons du poste ou logiciel concerné, du mode d’intervention, des accès autorisés et du devis avant de commencer.</li>
            <li><strong className="text-white">Vérifier le résultat.</strong> Nous reproduisons le problème si possible, testons la correction prévue et notons ce qui a été vérifié. Si la panne dépasse le périmètre convenu, nous expliquons le blocage et la prochaine étape.</li>
          </ol>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-lg font-semibold">Exemple illustratif, pas une référence client</h3>
            <p className="mt-3 max-w-3xl leading-relaxed text-white/70">Un logiciel métier ne s’ouvre plus sur un seul poste. Le test convenu consiste à le lancer sur ce poste et à vérifier, avec des données d’essai, l’action qui bloquait. Le compte rendu indique le résultat et ce qui reste à faire si le service ne peut pas être rétabli dans le périmètre convenu.</p>
          </div>
        </section>

        <section className={section}>
          <h2 className={heading}>Questions fréquentes</h2>
          <dl className="mt-6 max-w-3xl space-y-6">
            <div><dt className="font-semibold">Pouvez-vous venir sur place ?</dt><dd className="mt-2 leading-relaxed text-white/70">À Bamako, oui selon le quartier et le créneau confirmé avant devis. Une intervention à distance peut être proposée pour un problème logiciel si l’accès est autorisé.</dd></div>
            <div><dt className="font-semibold">Les pièces et licences sont-elles comprises ?</dt><dd className="mt-2 leading-relaxed text-white/70">Non, sauf mention explicite du devis. La prestation ne couvre ni l’astreinte, ni la récupération lourde de données, ni les guichets automatiques bancaires.</dd></div>
            <div><dt className="font-semibold">Pouvez-vous donner un prix sans voir la panne ?</dt><dd className="mt-2 leading-relaxed text-white/70">Le prix dépend du nombre de postes, du problème et du déplacement éventuel. Nous confirmons le périmètre et le prix avant toute intervention.</dd></div>
          </dl>
          <EnquiryLink />
        </section>
      </div>
    </main>
    <Footer />
  </>;
}
