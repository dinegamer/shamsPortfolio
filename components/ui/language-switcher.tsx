'use client';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { locales } from '@/i18n';
import { contactLocaleChangeEvent } from '@/lib/contact-draft';
import { maintenanceBamakoPath } from '@/lib/service-routes';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const labels = {
    en: locale === 'fr' ? 'Afficher le site en anglais' : 'View site in English',
    fr: locale === 'fr' ? 'Afficher le site en français' : 'View site in French'
  };

  const getHref = (nextLocale: string) => {
    const segments = pathname.split('/').filter(Boolean);
    if (locales.includes(segments[0] as any)) segments.shift();
    const rest = segments.length ? `/${segments.join('/')}` : '';
    // Maintenance has no English translation: link directly to the English agency page.
    if (nextLocale === 'en' && rest === maintenanceBamakoPath) return '/en/shamsi-digital';
    return `/${nextLocale}${rest}`;
  };

  return (
    <div
      className="flex items-center gap-1 text-xs"
      aria-label={locale === 'fr' ? 'Choix de la langue' : 'Language selection'}
    >
      {locales.map((nextLocale) => (
        <a
          key={nextLocale}
          href={getHref(nextLocale)}
          onClick={(event) => {
            event.preventDefault();
            if (nextLocale === locale) return;
            const nextPathname = getHref(nextLocale);
            const canNavigate = window.dispatchEvent(new CustomEvent(contactLocaleChangeEvent, {
              cancelable: true, detail: { pathname: nextPathname }
            }));
            if (canNavigate) router.replace(`${nextPathname}${window.location.search}${window.location.hash}`);
          }}
          className={`inline-flex min-h-11 items-center rounded-full px-2 sm:px-3 py-2 transition ${
            locale === nextLocale
              ? 'bg-white text-black'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          }`}
          aria-label={labels[nextLocale]}
          aria-current={locale === nextLocale ? 'true' : undefined}
        >
          {nextLocale.toUpperCase()}
        </a>
      ))}
    </div>
  );
}
