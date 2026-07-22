'use client';
import { useTranslations } from 'next-intl';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Contact() {
  const t = useTranslations('contact');
  return (
    <section id="contact" className="relative py-24 md:py-32 bg-black">
      <div className="max-w-4xl mx-auto px-6">
        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-8 text-center md:p-14">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-400 mb-3">{t('kicker')}</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">{t('title')}</h2>
          <p className="mt-4 text-lg text-white/70 max-w-lg mx-auto">{t('body')}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:teenagerdine@gmail.com"
              className="inline-flex min-h-11 items-center gap-2 px-8 py-4 rounded-full bg-brand-500 text-black font-semibold text-sm hover:bg-brand-400 transition"
            >
              <Mail className="w-4 h-4" /> {t('email')}
            </a>
            <a
              href="https://github.com/dinegamer"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-medium text-sm hover:bg-white/10 hover:border-brand-400/50 transition"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/chamsoudine-thienta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-medium text-sm hover:bg-white/10 hover:border-brand-400/50 transition"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
