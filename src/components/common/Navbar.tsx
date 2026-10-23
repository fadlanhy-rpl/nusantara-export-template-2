'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Download, Flame, Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LOCALES, LOCALE_LABELS, LocaleCode } from '@/lib/i18n';

export default function Navbar() {
  const pathname = usePathname();
  const { locale, setLocale, dict, isRtl } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLangMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const getNavLabel = (key: string, fallback: string) => {
    switch (key) {
      case 'briquette':
        return locale === 'id' ? 'Briket Utama' : locale === 'ar' ? 'فحم الشيشة' : locale === 'zh' ? '主打椰炭' : 'Core Briquettes';
      case 'commodities':
        return locale === 'id' ? 'Katalog Komoditas' : locale === 'ar' ? 'المنتجات والسلع' : locale === 'zh' ? '大宗商品' : 'Commodities';
      case 'oem':
        return locale === 'id' ? 'Kemasan OEM' : locale === 'ar' ? 'تصميم العبوات' : locale === 'zh' ? 'OEM包装' : 'OEM Packaging';
      case 'audit':
        return locale === 'id' ? 'Pabrik & Audit' : locale === 'ar' ? 'المصنع والتدقيق' : locale === 'zh' ? '工厂验资' : 'Factory & Audit';
      case 'planner':
        return locale === 'id' ? 'Container Planner' : locale === 'ar' ? 'حاسبة الحاويات' : locale === 'zh' ? '集装箱测算' : 'Container Planner';
      default:
        return fallback;
    }
  };

  const navLinks = [
    { name: getNavLabel('briquette', 'Briket Utama'), href: '/products/100-briket-arang-batok-kelapa' },
    { name: getNavLabel('commodities', 'Katalog Komoditas'), href: '/products' },
    { name: getNavLabel('oem', 'Kemasan OEM'), href: '/oem-studio' },
    { name: getNavLabel('audit', 'Pabrik & Audit'), href: '/factory-audit' },
    { name: getNavLabel('planner', 'Container Planner'), href: '/container-planner' },
  ];

  return (
    <header className="sticky top-3.5 z-50 w-full px-3 sm:px-6">
      {/* Floating Pill Navbar — Width is wider than sections (max-w-[1360px] vs max-w-[1280px]) */}
      <div className="max-w-[1360px] mx-auto h-[66px] rounded-full bg-[#1C1815]/90 backdrop-blur-xl border border-white/10 px-4 sm:px-6 md:px-7 flex items-center justify-between shadow-[0_12px_36px_-6px_rgba(0,0,0,0.65)] transition-all">
        {/* Left: Brandmark with Rounded-Full Icon Badge + Balanced Spacing */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0 mr-4 lg:mr-6 xl:mr-8">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shadow-[0_0_16px_rgba(196,68,15,0.45)] group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5 text-on-primary-container fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="font-headline font-extrabold text-[16px] sm:text-[17px] text-on-surface tracking-tight leading-none uppercase">
              Nusantara<span className="text-primary font-bold">Origin</span>
            </span>
            <span className="font-mono text-[9px] text-primary tracking-widest uppercase mt-0.5">
              EXPORTERS ID • SP925
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation with Rounded Pills */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 xl:px-3.5 rounded-full font-headline text-[12px] xl:text-[13px] transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-surface-container-high text-primary font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/70'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions, Language Switcher (Language Only) & Rounded-Full CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5 xl:gap-3 shrink-0 ml-auto pl-3 lg:pl-4 xl:pl-6">
          {/* Language Selector Dropdown (Language Selection Only — Clean Pill Button) */}
          <div className="relative" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="px-3 py-1.5 rounded-full bg-surface-container-high/60 hover:bg-surface-container-high border border-outline-variant/30 hover:border-primary/50 font-mono text-[11px] text-on-surface flex items-center gap-1.5 cursor-pointer transition-all select-none shadow-sm"
              aria-label="Select Language"
              aria-expanded={langMenuOpen}
            >
              <Globe className="w-3.5 h-3.5 text-primary" />
              <span className="font-bold uppercase tracking-wider">{locale}</span>
              <span className="text-outline-variant/70 text-[10px] hidden sm:inline">
                ({LOCALE_LABELS[locale].flag})
              </span>
              <ChevronDown
                className={`w-3 h-3 text-outline transition-transform duration-200 ${
                  langMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Language Selection Popover Dropdown */}
            {langMenuOpen && (
              <div
                className={`absolute top-full mt-2.5 ${
                  isRtl ? 'left-0' : 'right-0'
                } bg-[#1C1815]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 min-w-[200px] shadow-2xl z-50 flex flex-col gap-1`}
              >
                <div className="px-3 py-1 text-[10px] font-mono text-outline uppercase tracking-wider border-b border-outline-variant/20 mb-1">
                  {locale === 'id' ? 'PILIH BAHASA' : locale === 'ar' ? 'اختر اللغة' : locale === 'zh' ? '选择语言' : 'SELECT LANGUAGE'}
                </div>
                {LOCALES.map((l) => {
                  const info = LOCALE_LABELS[l];
                  const isActive = l === locale;
                  return (
                    <button
                      key={l}
                      type="button"
                      onClick={() => {
                        setLocale(l);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full px-3 py-2 rounded-xl text-left font-mono text-xs flex items-center justify-between transition-all cursor-pointer ${
                        isActive
                          ? 'bg-primary-container text-on-primary-container font-bold shadow-md'
                          : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="text-sm">{info.flag}</span>
                        <span>{info.nativeName}</span>
                      </span>
                      {isActive && <Check className="w-3.5 h-3.5 text-white stroke-[2.5]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick TDS Download Button (Visible on >= 1280px xl screens to avoid crowding) */}
          <Link
            href="/products/100-briket-arang-batok-kelapa#lab-specs"
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-outline-variant/40 text-on-surface hover:border-primary-container hover:text-primary transition-all font-mono text-[11px] bg-surface-container/40"
          >
            <Download className="w-3.5 h-3.5 text-primary" />
            <span>TDS (.PDF)</span>
          </Link>

          {/* Primary Action Button — Rounded-Full Pill (Well inset from the right curve) */}
          <Link
            href="/container-planner"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-primary-container text-on-primary-container font-headline text-[11px] sm:text-[12px] uppercase font-bold tracking-wider hover:bg-[#D94E13] transition-all shadow-[0_0_18px_rgba(255,138,82,0.4)] whitespace-nowrap"
          >
            <span>
              {locale === 'id'
                ? 'Penawaran FCL'
                : locale === 'ar'
                ? 'طلب عرض أسعار FCL'
                : locale === 'zh'
                ? '集装箱报价'
                : 'Request FCL Quote'}
            </span>
            <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? 'rotate-180' : ''}`} />
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-on-surface-variant hover:text-on-surface rounded-full bg-surface-container border border-outline-variant/30"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (Rounded-2xl floating card) */}
      {mobileMenuOpen && (
        <div className="lg:hidden max-w-[1360px] mx-auto mt-2 bg-[#1C1815]/95 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 flex flex-col gap-3 shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-4 rounded-xl font-headline text-[14px] text-on-surface-variant hover:text-primary hover:bg-surface-container transition-all"
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Language Switcher Row */}
          <div className="pt-3 border-t border-outline-variant/20 flex flex-col gap-2">
            <span className="font-mono text-[10px] text-outline uppercase tracking-wider px-2">
              {locale === 'id' ? 'PILIH BAHASA:' : locale === 'ar' ? 'اختر اللغة:' : locale === 'zh' ? '选择语言:' : 'SELECT LANGUAGE:'}
            </span>
            <div className="grid grid-cols-2 gap-2">
              {LOCALES.map((l) => {
                const info = LOCALE_LABELS[l];
                const isActive = l === locale;
                return (
                  <button
                    key={l}
                    type="button"
                    onClick={() => {
                      setLocale(l);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-2 rounded-xl text-xs font-mono flex items-center justify-between border ${
                      isActive
                        ? 'bg-primary-container text-on-primary-container border-primary/50 font-bold'
                        : 'bg-surface-container text-on-surface border-outline-variant/30 hover:border-primary/40'
                    }`}
                  >
                    <span>{info.flag} {info.nativeName}</span>
                    {isActive && <Check className="w-3 h-3 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-outline-variant/20 flex flex-col gap-2">
            <Link
              href="/admin/rfq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-4 rounded-xl font-mono text-[12px] text-outline hover:text-on-surface"
            >
              Internal Deal Desk & RFQ Pipeline →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
