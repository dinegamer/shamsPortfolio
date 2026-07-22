'use client';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import Image from 'next/image';

export function About() {
  const t = useTranslations('about');
  const points = t.raw('points') as string[];

  return (
    <section id="about" className="relative py-24 md:py-32 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2 flex flex-col items-center md:items-start gap-6">
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-2 ring-brand-400/40 ring-offset-2 ring-offset-black">
            <Image
              src="/me.jpg"
              alt={t('imageAlt')}
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-400 mb-3">{t('kicker')}</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              {t('title')}
            </h2>
          </div>
        </div>
        <div className="md:col-span-3 space-y-6">
          <p className="text-lg text-white/70 leading-relaxed">{t('body')}</p>
          <ul className="space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-brand-500/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-brand-400" />
                </span>
                <span className="text-white/80">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
