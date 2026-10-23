'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Download, ShieldCheck, Flame } from 'lucide-react';

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
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      <div className="w-full px-4 lg:px-8 py-2">
        <div className="max-w-[1160px] mx-auto h-[60px] rounded-xl bg-[#201A17]/85 backdrop-blur-md border border-outline-variant/30 px-4 md:px-6 flex items-center justify-between shadow-[0_8px_24px_-4px_rgba(0,0,0,0.7)]">
          {/* Brandmark */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container shadow-[0_0_12px_rgba(196,68,15,0.4)]">
              <Flame className="w-5 h-5 text-on-primary-container transform group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col">
              <span className="font-headline font-extrabold text-[16px] text-on-surface tracking-tight leading-none uppercase">
                Nusantara<span className="text-primary font-bold">Origin</span>
              </span>
              <span className="font-mono text-[9px] text-primary tracking-widest uppercase mt-0.5">
                EXPORTERS ID • SP925
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg font-headline text-[13px] transition-all ${
                    isActive
                      ? 'bg-surface-container-high text-primary font-semibold'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/products/100-briket-arang-batok-kelapa#lab-specs"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant/40 text-on-surface hover:border-primary-container hover:text-primary transition-all font-mono text-[12px] bg-surface-container/50"
            >
              <Download className="w-3.5 h-3.5 text-primary" />
              <span>TDS (.PDF)</span>
            </Link>

            <Link
              href="/container-planner"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-container text-on-primary-container font-headline text-[12px] uppercase font-bold tracking-wider hover:bg-[#D94E13] transition-all shadow-[0_0_14px_rgba(255,138,82,0.35)] whitespace-nowrap"
            >
              <span>Penawaran FCL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-on-surface-variant hover:text-on-surface rounded-lg bg-surface-container"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-low border-b border-outline-variant/30 px-6 py-4 flex flex-col gap-3 shadow-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg font-headline text-[14px] text-on-surface-variant hover:text-primary hover:bg-surface-container"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-outline-variant/20 flex flex-col gap-2">
            <Link
              href="/admin/rfq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg font-mono text-[12px] text-outline hover:text-on-surface"
            >
              Internal Deal Desk & RFQ Pipeline →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
