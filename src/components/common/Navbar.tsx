'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Flame, Globe, ChevronDown, Check, Download } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LOCALES, LOCALE_LABELS } from '@/lib/i18n';

export default function Navbar() {
  const pathname = usePathname();
  const { locale, setLocale, isRtl } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const flameClickTimer = useRef<NodeJS.Timeout | null>(null);
  const [flameClicks, setFlameClicks] = useState(0);

  const handleFlameClick = (e: React.MouseEvent) => {
    const next = flameClicks + 1;
    if (next >= 3) {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = '/terminal-925';
      setFlameClicks(0);
      return;
    }
    setFlameClicks(next);
    if (flameClickTimer.current) clearTimeout(flameClickTimer.current);
    flameClickTimer.current = setTimeout(() => setFlameClicks(0), 1200);
  };

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

  const getNavLabel = (key: string) => {
    switch (key) {
      case 'briquette':
        return locale === 'id' ? 'Briket Utama' : locale === 'ar' ? 'فحم الشيشة' : locale === 'zh' ? '主打椰炭' : 'Briquettes';
      case 'commodities':
        return locale === 'id' ? 'Komoditas' : locale === 'ar' ? 'المنتجات' : locale === 'zh' ? '大宗商品' : 'Commodities';
      case 'oem':
        return locale === 'id' ? 'Kemasan OEM' : locale === 'ar' ? 'تصميم العبوات' : locale === 'zh' ? 'OEM包装' : 'OEM Packaging';
      case 'audit':
        return locale === 'id' ? 'Pabrik & Audit' : locale === 'ar' ? 'المصنع والتدقيق' : locale === 'zh' ? '工厂验资' : 'Factory & Audit';
      case 'planner':
        return locale === 'id' ? 'Kalkulator Kargo' : locale === 'ar' ? 'حاسبة الحاويات' : locale === 'zh' ? '集装箱测算' : 'Cargo Planner';
      default:
        return '';
    }
  };

  const navLinks = [
    { name: getNavLabel('briquette'), href: '/products/100-briket-arang-batok-kelapa' },
    { name: getNavLabel('commodities'), href: '/products' },
    { name: getNavLabel('oem'), href: '/oem-studio' },
    { name: getNavLabel('audit'), href: '/factory-audit' },
    { name: getNavLabel('planner'), href: '/container-planner' },
  ];

  const getCtaLabel = () => {
    switch (locale) {
      case 'id':
        return (
          <>
            <span className="min-[380px]:hidden">RFQ</span>
            <span className="hidden min-[380px]:inline">Penawaran</span>
            <span className="hidden min-[480px]:inline"> FCL</span>
          </>
        );
      case 'ar':
        return (
          <>
            <span className="hidden min-[480px]:inline">طلب </span>
            <span>تسعير</span>
            <span className="hidden min-[480px]:inline"> FCL</span>
          </>
        );
      case 'zh':
        return (
          <>
            <span className="hidden min-[480px]:inline">集装箱</span>
            <span>报价</span>
          </>
        );
      case 'en':
      default:
        return (
          <>
            <span className="hidden 2xl:inline">Request </span>
            <span className="hidden min-[480px]:inline">FCL </span>
            <span>Quote</span>
          </>
        );
    }
  };

  return (
    <header className="sticky top-1 sm:top-2 md:top-3.5 z-50 w-full px-1.5 min-[360px]:px-2.5 sm:px-3 md:px-6">
      {/* Floating Pill Navbar — Ultra-responsive down to 340px screens */}
      <div className="max-w-[1360px] mx-auto h-[46px] min-[360px]:h-[50px] sm:h-[58px] md:h-[66px] rounded-full bg-[#1C1815]/95 backdrop-blur-xl border border-white/10 px-2 min-[360px]:px-3 sm:px-4 md:px-8 flex items-center justify-between shadow-[0_12px_36px_-6px_rgba(0,0,0,0.65)] transition-all">
        {/* Left: Brandmark — Scalable with Origin hidden on compact screens < 480px and truncate on narrow viewports */}
        <Link href="/" className="flex items-center gap-1 sm:gap-2 md:gap-3 group min-w-0 shrink me-1 sm:me-3 lg:me-4 xl:me-8 2xl:me-10">
          <div
            onClick={handleFlameClick}
            className="w-6 h-6 min-[360px]:w-7 min-[360px]:h-7 sm:w-8.5 sm:h-8.5 md:w-10 md:h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shadow-[0_0_12px_rgba(196,68,15,0.45)] group-hover:scale-105 transition-transform shrink-0"
            title="NusantaraOrigin"
          >
            <Flame className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-on-primary-container fill-current" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-headline font-extrabold text-[10px] min-[360px]:text-[11px] min-[400px]:text-[12px] sm:text-[14px] md:text-[17px] text-on-surface tracking-tight leading-none uppercase truncate">
              Nusantara<span className="text-primary font-bold hidden min-[480px]:inline">Origin</span>
            </span>
            <span className="font-mono text-[7px] sm:text-[8px] md:text-[9px] text-primary tracking-widest uppercase mt-0.5 hidden sm:block">
              EXPORTERS ID • SP925
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation with Rounded Pills */}
        <nav className="hidden xl:flex items-center gap-1 xl:gap-1.5 2xl:gap-2 mx-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2.5 2xl:px-3 py-1.5 rounded-full font-headline text-[12.5px] 2xl:text-[13px] transition-all whitespace-nowrap ${
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

        {/* Right: Actions, Language Switcher & Primary CTA */}
        <div className="flex items-center gap-1 min-[360px]:gap-1.5 sm:gap-2 md:gap-2.5 shrink-0 xl:ms-8 2xl:ms-10">
          {/* Language Selector Dropdown — Fixed uniform width across EN, ID, AR, ZH */}
          <div className="relative" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="h-7 min-[360px]:h-7.5 sm:h-8.5 md:h-10 px-1.5 min-[360px]:px-2 sm:px-2.5 md:px-3 rounded-full bg-surface-container-high/60 hover:bg-surface-container-high border border-outline-variant/30 hover:border-primary/50 font-mono text-[9.5px] min-[360px]:text-[10px] sm:text-[11px] md:text-[12px] text-on-surface flex items-center gap-1 cursor-pointer transition-all select-none shadow-sm shrink-0"
              aria-label="Select Language"
              aria-expanded={langMenuOpen}
            >
              <Globe className="w-2.5 h-2.5 min-[360px]:w-3 min-[360px]:h-3 sm:w-3.5 sm:h-3.5 text-primary shrink-0" />
              <span className="font-bold uppercase tracking-wider">{locale}</span>
              <ChevronDown
                className={`w-3 h-3 text-outline transition-transform duration-200 shrink-0 hidden sm:inline ${
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

          {/* Quick TDS Download Link (Adaptive: Visible on wide >= 1440px 2xl screens where ample space exists) */}
          <Link
            href="/products/100-briket-arang-batok-kelapa#lab-specs"
            className="hidden 2xl:inline-flex items-center gap-1.5 h-10 px-3 py-1.5 rounded-full border border-outline-variant/30 text-on-surface hover:text-primary hover:border-primary/50 transition-all font-mono text-[11px] bg-surface-container-high/50 shrink-0"
            title="Technical Data Sheet (.PDF)"
          >
            <Download className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>TDS (.PDF)</span>
          </Link>

          {/* Primary Action Button — Standardized consistent height, adaptive text for down to 340px screens */}
          <Link
            href="/container-planner"
            className="h-7 min-[360px]:h-7.5 sm:h-8.5 md:h-10 px-1.5 min-[360px]:px-2.5 sm:px-3.5 md:px-5 rounded-full bg-primary-container text-on-primary-container font-headline text-[9.5px] min-[360px]:text-[10px] sm:text-[11.5px] md:text-[13px] font-semibold tracking-normal hover:bg-[#D94E13] transition-all shadow-[0_0_14px_rgba(255,138,82,0.35)] whitespace-nowrap inline-flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 shrink-0"
          >
            <span>{getCtaLabel()}</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 rtl:rotate-180 shrink-0 hidden sm:inline" />
          </Link>

          {/* Mobile / Tablet Hamburger Button — Properly sized to never exceed the pill radius */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden h-7 w-7 min-[360px]:h-7.5 min-[360px]:w-7.5 sm:h-8.5 sm:w-8.5 md:h-10 md:w-10 flex items-center justify-center text-on-surface-variant hover:text-on-surface rounded-full bg-surface-container border border-outline-variant/30 transition-colors shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            ) : (
              <Menu className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (Rounded-2xl floating card) */}
      {mobileMenuOpen && (
        <div className="xl:hidden max-w-[1360px] mx-auto mt-2 bg-[#1C1815]/95 backdrop-blur-xl border border-white/10 rounded-2xl px-4 sm:px-6 py-3.5 sm:py-4 flex flex-col gap-3 shadow-2xl">
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
            {/* Quick Action: Direct TDS Download */}
            <Link
              href="/products/100-briket-arang-batok-kelapa#lab-specs"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-surface-container border border-outline-variant/30 text-primary font-headline text-[13px] font-semibold hover:border-primary-container transition-all"
            >
              <Download className="w-4 h-4 text-primary shrink-0" />
              <span>
                {locale === 'id'
                  ? 'Unduh TDS & COA (.PDF)'
                  : locale === 'ar'
                  ? 'تحميل وثائق TDS وCOA (.PDF)'
                  : locale === 'zh'
                  ? '下载官方 TDS 与 COA 报告 (.PDF)'
                  : 'Download TDS & COA (.PDF)'}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
