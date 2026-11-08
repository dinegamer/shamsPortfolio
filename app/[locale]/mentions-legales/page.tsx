import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/sections/navbar';
import { Footer } from '@/components/sections/footer';
import { locales, type Locale } from '@/i18n';
import { business } from '@/lib/business';
import { createPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return createPageMetadata({ locale, path: '/mentions-legales', title: locale === 'fr' ? 'Mentions légales et confidentialité | SHAMSI DIGITAL' : 'Legal notice and privacy | SHAMSI DIGITAL', description: locale === 'fr' ? 'Identité de SHAMSI DIGITAL, entreprise individuelle de Chamsoudine THIENTA à Bamako, RCCM et informations sur le traitement des demandes de contact.' : 'SHAMSI DIGITAL’s business identity, sole proprietor, registration and information about contact enquiries.' });
}

export default async function LegalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!locales.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const fr = locale === 'fr';
  return (
    <>
      <Navbar />
      <main id="content" tabIndex={-1} className="min-h-screen bg-black px-6 pb-24 pt-36 text-white">
        <div className="mx-auto max-w-3xl space-y-12">
          <header><p className="text-sm uppercase tracking-[0.25em] text-brand-400">SHAMSI DIGITAL</p><h1 className="mt-5 text-4xl font-bold md:text-5xl">{fr ? 'Mentions légales et confidentialité' : 'Legal notice and privacy'}</h1><p className="mt-5 text-sm text-white/50">{fr ? 'Mise à jour : 8 novembre 2026' : 'Updated: 8 November 2026'}</p></header>
          <section><h2 className="text-2xl font-semibold">{fr ? 'Éditeur et responsable de publication' : 'Publisher'}</h2><p className="mt-4 leading-relaxed text-white/70">{fr ? 'Chamsoudine THIENTA, entrepreneur individuel exerçant sous le nom commercial SHAMSI DIGITAL, à Bamako, Mali.' : 'Chamsoudine THIENTA, sole proprietor trading as SHAMSI DIGITAL, based in Bamako, Mali.'}</p><p className="mt-3 text-white/70">RCCM : {business.rccm}</p><p className="mt-3 text-white/70"><a href={`mailto:${business.email}`} className="break-all underline">{business.email}</a> · <a href={`tel:${business.telephone}`} className="whitespace-nowrap underline">{business.phoneLabel}</a></p><p className="mt-4 leading-relaxed text-white/70">{fr ? 'SHAMSI Digital Mali et ShamsiDigital sont des variantes de présentation de cette activité. Les produits présentés, dont KalanSUP, sont des réalisations de cette activité.' : 'SHAMSI Digital Mali and ShamsiDigital are alternative presentations of this business. Products presented here, including KalanSUP, are its software projects.'}</p></section>
          <section><h2 className="text-2xl font-semibold">{fr ? 'Hébergement' : 'Hosting'}</h2><p className="mt-4 leading-relaxed text-white/70">{fr ? 'Ce site est hébergé par Vercel Inc. Informations et contact de l’hébergeur : ' : 'This website is hosted by Vercel Inc. Hosting provider information and contact: '}<a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="underline">vercel.com</a>.</p></section>
          <section id="confidentialite"><h2 className="text-2xl font-semibold">{fr ? 'Vos demandes et vos données' : 'Your enquiries and data'}</h2><div className="mt-4 space-y-4 leading-relaxed text-white/70"><p>{fr ? 'Le formulaire recueille votre nom, votre adresse e-mail et votre besoin. Votre organisation et la prestation souhaitée sont facultatives. Si vous arrivez depuis une réalisation, son nom accompagne la demande ; l’objet du message est généré automatiquement. Ces informations sont utilisées par Chamsoudine THIENTA pour répondre à votre demande et préparer les échanges liés à une éventuelle mission.' : 'The contact form collects your name, email address and needs. Your organization and service of interest are optional. When you arrive from a project page, its name accompanies the enquiry; the subject is generated automatically. Chamsoudine THIENTA uses this information to respond and discuss a potential assignment.'}</p><p>{fr ? 'L’envoi passe par FormSubmit, qui transmet le message à la messagerie professionnelle utilisée pour cette activité. Vous pouvez aussi écrire directement par e-mail. L’hébergeur et ces services peuvent traiter des données techniques nécessaires à leur fonctionnement.' : 'Messages are sent through FormSubmit and forwarded to the email account used for this business. You can also email directly. The hosting and messaging providers may process technical data needed to operate their services.'}</p><p>{fr ? 'Le site utilise le stockage local de votre navigateur pour limiter les envois rapprochés du formulaire : il conserve l’heure du dernier envoi. Si le lien utilisé indique notre fiche Google, cette origine est conservée dans cet onglet jusqu’à sa fermeture et jointe à votre demande, pour comprendre comment vous nous avez trouvés. Aucune saisie du formulaire n’est enregistrée dans le stockage du navigateur. Ces informations ne sont pas utilisées pour du ciblage publicitaire.' : 'The website uses your browser’s local storage to record the last form submission time and limit rapid repeat submissions. If the link identifies our Google Business Profile, this source is retained in this tab until it closes and included in your enquiry to understand how you found us. No form entries are saved in browser storage. This information is not used for advertising targeting.'}</p><p>{fr ? 'N’envoyez pas de mot de passe, de pièce d’identité ni de donnée confidentielle via ce formulaire. Pour toute demande d’accès, de rectification ou de suppression concernant vos échanges, contactez ' : 'Do not send passwords, identity documents or confidential data through the form. For access, correction or deletion requests concerning your correspondence, contact '}<a href={`mailto:${business.email}`} className="break-all underline">{business.email}</a>.</p></div></section>
          <section><h2 className="text-2xl font-semibold">{fr ? 'Réalisations et propriété intellectuelle' : 'Projects and intellectual property'}</h2><p className="mt-4 leading-relaxed text-white/70">{fr ? 'Les présentations publiques ne donnent aucun droit d’accès aux dépôts privés, au code source ou aux données des projets. Les démonstrations de KalanSUP utilisent des données fictives. Les licences des dépôts publics, lorsqu’elles existent, s’appliquent uniquement à leur propre contenu.' : 'Public project presentations do not grant access to private repositories, source code or project data. KalanSUP demonstrations use synthetic data. Public repository licences, where provided, apply only to their own contents.'}</p></section>
          <Link href={`/${locale}/shamsi-digital`} className="inline-flex min-h-11 items-center text-brand-400 hover:underline">{fr ? 'Découvrir SHAMSI DIGITAL' : 'About SHAMSI DIGITAL'} →</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
