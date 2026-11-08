import { Globe2, MapPin } from 'lucide-react';

const copy = {
  fr: {
    title: 'Au Mali et à l’international',
    remoteTitle: 'Développement à distance',
    remoteBody: 'Applications web, API, données et maintenance logicielle pour des clients au Mali et à l’international. Les échanges, livraisons et tests peuvent être organisés à distance.',
    localTitle: 'Maintenance sur site au Mali',
    localBody: 'Installations et maintenance nécessitant une présence physique au Mali. La localité, les déplacements, le périmètre et les disponibilités sont confirmés avant le devis.'
  },
  en: {
    title: 'In Mali and internationally',
    remoteTitle: 'Remote development',
    remoteBody: 'Web applications, APIs, data work and software maintenance for clients in Mali and internationally. Discussions, delivery and acceptance testing can be organized remotely.',
    localTitle: 'On-site maintenance in Mali',
    localBody: 'Installations and maintenance requiring a physical presence in Mali. Location, travel, scope and availability are confirmed before a quote is issued.'
  }
};

export function DeliveryModes({ locale }: { locale: string }) {
  const c = locale === 'fr' ? copy.fr : copy.en;
  return (
    <section aria-labelledby="delivery-modes-title" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
      <h2 id="delivery-modes-title" className="text-2xl font-bold">{c.title}</h2>
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div>
          <Globe2 aria-hidden="true" className="mb-3 h-6 w-6 text-brand-400" />
          <h3 className="text-lg font-semibold">{c.remoteTitle}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/65">{c.remoteBody}</p>
        </div>
        <div>
          <MapPin aria-hidden="true" className="mb-3 h-6 w-6 text-brand-400" />
          <h3 className="text-lg font-semibold">{c.localTitle}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/65">{c.localBody}</p>
        </div>
      </div>
    </section>
  );
}
