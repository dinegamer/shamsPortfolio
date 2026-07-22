'use client';
import { useTranslations } from 'next-intl';

export function MorphStrip() {
  const t = useTranslations('morph');
  const words = (t.raw('words') as string[]) || [];
  return (
    <section className="relative py-24 md:py-40 bg-black">
      <div className="relative max-w-4xl mx-auto px-6">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50 text-center mb-8">
          {t('prefix')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {words.map((word) => (
            <span
              key={word}
              className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-lg font-semibold text-white/85"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
