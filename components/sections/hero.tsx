'use client';
import { useTranslations } from 'next-intl';
import HeroShaderBg from '@/components/ui/hero-shader';
import Image from 'next/image';

export function Hero() {
  const t = useTranslations('hero');
  return (
    <section id="top" className="relative min-h-[92vh] overflow-hidden flex items-end">
      <HeroShaderBg />

      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-[1] hidden w-[42%] lg:block"
        aria-hidden="true"
      >
        <Image
          src="/chamsoudine-thienta-portrait.webp"
          alt=""
          fill
          priority
          className="object-cover object-top"
          sizes="(min-width: 1024px) 42vw, 0px"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/15" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-20 pt-32">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-medium text-white/90 tracking-wide">{t('badge')}</span>
        </div>

        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/75">
          {t('name')}
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight max-w-5xl lg:max-w-4xl">
          <span
            className="block font-light text-white/90"
            style={{
              background:
                'linear-gradient(135deg, #ffffff 0%, #06b6d4 30%, #f97316 70%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {t('line1')}
          </span>
          <span className="block font-black">{t('line2')}</span>
          <span className="block font-light italic text-white/70">{t('line3')}</span>
        </h1>

        <p className="mt-6 text-lg text-white/70 max-w-xl">{t('subtitle')}</p>
        <p className="mt-4 text-sm text-white/60 max-w-xl">{t('brand')}</p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="inline-flex min-h-11 items-center px-8 py-4 rounded-full bg-brand-500 text-black font-semibold text-sm hover:bg-brand-400 transition"
          >
            {t('primary')}
          </a>
          <a
            href="https://github.com/dinegamer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-medium text-sm hover:bg-white/10 hover:border-brand-400/50 transition"
          >
            {t('secondary')}
          </a>
          <a
            href="#contact"
            className="inline-flex min-h-11 items-center px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-medium text-sm hover:bg-white/10 hover:border-brand-400/50 transition"
          >
            {t('tertiary')}
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
          {[
            { n: t('metric1'), l: t('metric1Label') },
            { n: t('metric2'), l: t('metric2Label') },
            { n: t('metric3'), l: t('metric3Label') }
          ].map((m) => (
            <div key={m.l} className="border-l border-white/10 pl-4">
              <div className="text-3xl md:text-4xl font-bold">{m.n}</div>
              <div className="text-xs text-white/50 mt-1 uppercase tracking-wider">{m.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
