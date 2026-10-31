'use client';
import { useLocale, useTranslations } from 'next-intl';
import { Github, Linkedin, Mail } from 'lucide-react';
import { business } from '@/lib/business';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  return (
    <footer className="border-t border-white/5 py-10 bg-black">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="text-xs text-white/60">{t('rights')}</p>
          <p className="mt-2 text-xs text-white/50">{locale === 'fr' ? 'Entreprise individuelle' : 'Sole proprietorship'} · RCCM {business.rccm}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs sm:justify-start">
            <a href={`/${locale}/shamsi-digital`} className="inline-flex min-h-11 items-center text-white/70 hover:text-white">SHAMSI DIGITAL</a>
            <a href={`/${locale}/mentions-legales`} className="inline-flex min-h-11 items-center text-white/70 hover:text-white">{locale === 'fr' ? 'Mentions légales & confidentialité' : 'Legal notice & privacy'}</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/dinegamer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/chamsoudine-thienta-146b21183"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:teenagerdine@gmail.com"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
