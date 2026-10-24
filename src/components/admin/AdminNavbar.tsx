'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  Lock,
  Globe,
  ChevronDown,
  Check,
  ShieldCheck,
  Flame,
  Layers,
  Inbox,
  Ship,
  FileCheck2,
  LayoutDashboard
} from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { LOCALES, LOCALE_LABELS } from '@/lib/i18n';

interface AdminNavbarProps {
  onToggleMobileSidebar: () => void;
}

export default function AdminNavbar({ onToggleMobileSidebar }: AdminNavbarProps) {
  const pathname = usePathname();
  const { lockTerminal, officerName } = useAdminAuth();
  const { locale, setLocale, isRtl } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const getBreadcrumb = () => {
    if (pathname.includes('/terminal-925/rfq')) return 'RFQ Pipeline & Inquiries';
    if (pathname.includes('/terminal-925/catalog')) return 'Katalog Komoditas & Media Showcase';
    if (pathname.includes('/terminal-925/cargo')) return 'Kargo, Kontainer & Tarif FOB/CIF';
    if (pathname.includes('/terminal-925/inspections')) return 'Audit Pabrik & Laporan Lab SGS';
    if (pathname.includes('/terminal-925/settings')) return 'Keamanan Akun & Kredensial';
    return 'Ringkasan Terminal Ekspor';
  };

  return (
    <header className="sticky top-0 z-20 w-full h-14 bg-[#1C1815]/95 backdrop-blur-xl border-b border-outline-variant/30 px-3 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
          aria-label="Open Admin Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-outline hidden sm:inline">NusantaraOrigin OS</span>
          <span className="text-outline-variant hidden sm:inline">/</span>
          <span className="text-primary font-bold">{getBreadcrumb()}</span>
        </div>
      </div>

      {/* Center: Live Cluster Telemetry Pill */}
      <div className="hidden md:flex items-center gap-2.5 px-3 py-1 rounded-full bg-surface-container border border-outline-variant/30 text-[11px] font-mono select-none">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary" />
        </span>
        <span className="text-on-surface-variant font-semibold">Gresik Retort Hub: Active</span>
        <span className="text-outline-variant">•</span>
        <span className="text-secondary font-bold">FOB Surabaya: $1,320/MT</span>
      </div>

      {/* Right: Actions, Language & Terminal Lock */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Language Dropdown */}
        <div className="relative" ref={langDropdownRef}>
          <button
            type="button"
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="h-8 px-2 sm:px-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 font-mono text-[11px] text-on-surface flex items-center gap-1 cursor-pointer transition-all select-none"
            title="Ganti Bahasa Terminal"
          >
            <Globe className="w-3.5 h-3.5 text-primary" />
            <span className="font-bold uppercase">{locale}</span>
            <ChevronDown className={`w-3 h-3 text-outline transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {langMenuOpen && (
            <div
              className={`absolute top-full mt-2 ${
                isRtl ? 'left-0' : 'right-0'
              } bg-[#1C1815] border border-white/10 rounded-xl p-1.5 min-w-[160px] shadow-2xl z-50 flex flex-col gap-1`}
            >
              {LOCALES.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => {
                    setLocale(l);
                    setLangMenuOpen(false);
                  }}
                  className={`w-full px-2.5 py-1.5 rounded-lg text-left font-mono text-xs flex items-center justify-between transition-colors cursor-pointer ${
                    l === locale
                      ? 'bg-primary-container text-on-primary-container font-bold'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{LOCALE_LABELS[l].flag}</span>
                    <span>{LOCALE_LABELS[l].nativeName}</span>
                  </span>
                  {l === locale && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Officer Profile Badge */}
        <Link
          href="/terminal-925/settings"
          className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-[11px] font-mono text-on-surface transition-colors cursor-pointer"
          title="Buka Pengaturan Keamanan Akun & Kredensial"
        >
          <div className="w-5 h-5 rounded bg-primary-container flex items-center justify-center text-on-primary-container text-[10px] font-bold">
            <Flame className="w-3 h-3 fill-current" />
          </div>
          <span className="max-w-[120px] truncate">{officerName}</span>
        </Link>

        {/* Lock Terminal (Logout) */}
        <button
          type="button"
          onClick={lockTerminal}
          className="h-8 px-2.5 sm:px-3 rounded-lg bg-error/15 hover:bg-error/25 border border-error/30 text-error font-headline text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          title="Kunci Terminal & Keluar dari Sesi"
        >
          <Lock className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Kunci Terminal</span>
        </button>
      </div>
    </header>
  );
}
