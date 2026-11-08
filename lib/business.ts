export const business = {
  name: 'SHAMSI DIGITAL',
  owner: 'Chamsoudine THIENTA',
  rccm: 'ML-BKO-01-2026-A-07041',
  email: 'teenagerdine@gmail.com',
  telephone: '+22373449230',
  phoneLabel: '+223 73 44 92 30',
  locality: 'Bamako, Mali',
  directoryUrl: 'https://www.maliya.net/annonce/shamsi-digital-mali-conseil-informatique-logiciels-et-data/'
} as const;

export function whatsappHref(locale: string, fromGoogle = false) {
  const message = locale === 'fr'
    ? `Bonjour SHAMSI DIGITAL.${fromGoogle ? ' Je viens de votre fiche Google.' : ''} Je souhaite échanger au sujet de mon projet : `
    : `Hello SHAMSI DIGITAL.${fromGoogle ? ' I found you on Google.' : ''} I would like to discuss my project: `;
  return `https://wa.me/${business.telephone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}
