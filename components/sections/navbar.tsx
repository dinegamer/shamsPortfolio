'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';

export function Navbar() {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);
  const links = [
    { href: '#work', label: t('work') },
    { href: '#services', label: t('services') },
    { href: '#about', label: t('about') },
    { href: '#contact', label: t('contact') }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 bg-black/85 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <a href="#top" className="font-black text-lg tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400">
          SH☀MSI <span className="sr-only">Shamsi Digital</span>
        </a>
        <nav className="hidden md:flex items-center gap-1 text-sm" aria-label={t('primaryNav')}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="min-h-11 inline-flex items-center px-3 py-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <a
            href="#contact"
            className="hidden sm:inline-flex min-h-11 items-center px-4 py-2 text-xs font-medium bg-white text-black rounded-full hover:bg-white/90 transition"
          >
            {t('cta')}
          </a>
          <button
            type="button"
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white"
            aria-label={open ? t('closeMenu') : t('openMenu')}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open ? (
        <nav
          id="mobile-navigation"
          className="md:hidden max-w-7xl mx-auto mt-3 rounded-lg border border-white/10 bg-black p-2"
          aria-label={t('mobileNav')}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex min-h-11 items-center rounded-md px-3 py-2 text-white/80 hover:bg-white/10 hover:text-white"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
