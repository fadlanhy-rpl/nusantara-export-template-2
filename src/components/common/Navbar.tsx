'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Download, Flame, Globe, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Briket Utama', href: '/products/100-briket-arang-batok-kelapa' },
    { name: 'Katalog Komoditas', href: '/products' },
    { name: 'Kemasan OEM', href: '/oem-studio' },
    { name: 'Pabrik & Audit', href: '/factory-audit' },
    { name: 'Container Planner', href: '/container-planner' },
  ];

  return (
    <header className="sticky top-3.5 z-50 w-full px-3 sm:px-6">
      {/* Floating Pill Navbar — Width is wider than sections (max-w-[1360px] vs max-w-[1280px]) */}
      <div className="max-w-[1360px] mx-auto h-[66px] rounded-full bg-[#1C1815]/90 backdrop-blur-xl border border-white/10 px-4 sm:px-7 flex items-center justify-between shadow-[0_12px_36px_-6px_rgba(0,0,0,0.65)] transition-all">
        {/* Left: Brandmark with Rounded-Full Icon Badge */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shadow-[0_0_16px_rgba(196,68,15,0.45)] group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5 text-on-primary-container fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="font-headline font-extrabold text-[17px] text-on-surface tracking-tight leading-none uppercase">
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
                className={`px-3.5 py-1.5 rounded-full font-headline text-[13px] transition-all ${
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

        {/* Right: Actions, Currency/Lang Pill & Rounded-Full CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Currency & Language Indicator Pill (Style inspired by MoneFin reference) */}
          <div className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high/60 border border-outline-variant/30 font-mono text-[11px] text-on-surface-variant hover:text-on-surface hover:border-primary/40 transition-all select-none">
            <Globe className="w-3.5 h-3.5 text-primary" />
            <span className="font-semibold text-on-surface">EN</span>
            <span className="text-outline-variant/60">•</span>
            <span>$ USD</span>
            <ChevronDown className="w-3 h-3 text-outline" />
          </div>

          {/* Quick TDS Download Button */}
          <Link
            href="/products/100-briket-arang-batok-kelapa#lab-specs"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-outline-variant/40 text-on-surface hover:border-primary-container hover:text-primary transition-all font-mono text-[11px] bg-surface-container/40"
          >
            <Download className="w-3.5 h-3.5 text-primary" />
            <span>TDS (.PDF)</span>
          </Link>

          {/* Primary Action Button — Rounded-Full Pill */}
          <Link
            href="/container-planner"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-container text-on-primary-container font-headline text-[12px] uppercase font-bold tracking-wider hover:bg-[#D94E13] transition-all shadow-[0_0_18px_rgba(255,138,82,0.4)] whitespace-nowrap"
          >
            <span>Penawaran FCL</span>
            <ArrowRight className="w-3.5 h-3.5" />
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
        <div className="lg:hidden max-w-[1360px] mx-auto mt-2 bg-[#1C1815]/95 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 flex flex-col gap-2 shadow-2xl">
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
