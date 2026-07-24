'use client';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { locales } from '@/i18n';

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
    const rest = segments.join('/');
    return `/${nextLocale}${rest ? `/${rest}` : ''}`;
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
            router.replace(`${getHref(nextLocale)}${window.location.hash}`);
          }}
          className={`inline-flex min-h-11 items-center rounded-full px-3 py-2 transition ${
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
