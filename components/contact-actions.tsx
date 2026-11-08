'use client';
import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { business, whatsappHref } from '@/lib/business';
import { getLeadAttribution } from '@/lib/lead-attribution';

export function ContactActions() {
  const locale = useLocale();
  const t = useTranslations('contact');
  const [fromGoogle, setFromGoogle] = useState(false);
  useEffect(() => { setFromGoogle(getLeadAttribution().source === 'google'); }, []);
  const linkClass = 'inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm font-medium text-white transition hover:border-brand-400/50 hover:bg-white/10';
  return <div className="flex flex-wrap gap-3" aria-label={t('directContact')}>
    <a href={whatsappHref(locale, fromGoogle)} target="_blank" rel="noopener noreferrer" className={linkClass}><MessageCircle aria-hidden="true" className="h-4 w-4" />WhatsApp</a>
    <a href={`tel:${business.telephone}`} className={linkClass} aria-label={`${t('call')} ${business.phoneLabel}`}><Phone aria-hidden="true" className="h-4 w-4" />{business.phoneLabel}</a>
    <a href={`mailto:${business.email}`} className={linkClass}><Mail aria-hidden="true" className="h-4 w-4" />{t('email')}</a>
  </div>;
}
