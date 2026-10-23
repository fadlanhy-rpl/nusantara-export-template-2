'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Flame,
  LayoutDashboard,
  Container,
  ShieldCheck,
  Package,
  Layers,
  Lock,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Activity,
  HardDrive
} from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useLanguage } from '@/context/LanguageContext';

interface AdminSidebarProps {
  collapsed: boolean;
  setCollapsed: (c: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (o: boolean) => void;
}

export default function AdminSidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const { lockTerminal, officerName } = useAdminAuth();
  const { locale } = useLanguage();

  const navItems = [
    {
      name: locale === 'id' ? 'RFQ Pipeline' : locale === 'ar' ? 'عروض الأسعار RFQ' : locale === 'zh' ? '外贸 RFQ 漏斗' : 'RFQ Pipeline',
      href: '/admin/rfq',
      icon: LayoutDashboard,
      badge: '14',
      badgeColor: 'bg-primary-container text-on-primary-container',
    },
    {
      name: locale === 'id' ? 'Kalkulator Kontainer' : locale === 'ar' ? 'حاسبة الحاويات' : locale === 'zh' ? '集装箱测算' : 'Cargo Planner',
      href: '/container-planner',
      icon: Container,
      badge: 'FCL',
      badgeColor: 'bg-secondary-container text-on-secondary-container',
    },
    {
      name: locale === 'id' ? 'Audit Mutu & SGS' : locale === 'ar' ? 'فحص الجودة SGS' : locale === 'zh' ? 'SGS 验资报告' : 'Factory & SGS Audit',
      href: '/factory-audit',
      icon: ShieldCheck,
      badge: 'SGS',
      badgeColor: 'bg-tertiary-container text-on-tertiary-container',
    },
    {
      name: locale === 'id' ? 'OEM Box Studio' : locale === 'ar' ? 'استوديو OEM' : locale === 'zh' ? 'OEM 包装设计' : 'OEM Box Studio',
      href: '/oem-studio',
      icon: Package,
    },
    {
      name: locale === 'id' ? 'Katalog Komoditas' : locale === 'ar' ? 'كتالوج المنتجات' : locale === 'zh' ? '大宗商品目录' : 'Commodity Catalog',
      href: '/products',
      icon: Layers,
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between p-3.5 bg-[#17120F] text-on-surface">
      {/* Top Header & Brandmark */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
          <Link
            href="/admin/rfq"
            className="flex items-center gap-2.5 group overflow-hidden"
            onClick={() => setMobileOpen(false)}
          >
            <div className="w-8 h-8 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container shadow-[0_0_12px_rgba(196,68,15,0.4)] shrink-0">
              <Flame className="w-4 h-4 fill-current" />
            </div>
            {!collapsed && (
              <div className="flex flex-col leading-none">
                <span className="font-headline font-extrabold text-[13px] tracking-tight uppercase text-on-surface">
                  Nusantara<span className="text-primary font-bold">Origin</span>
                </span>
                <span className="font-mono text-[8.5px] text-primary tracking-widest uppercase mt-0.5">
                  DEAL DESK • IDMES
                </span>
              </div>
            )}
          </Link>

          {/* Mobile close button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Nav Items */}
        <div className="flex flex-col gap-1.5">
          {!collapsed && (
            <span className="font-mono text-[9.5px] text-outline uppercase tracking-wider px-2.5 mb-1">
              {locale === 'id' ? 'NAVIGASI UTAMA' : locale === 'ar' ? 'القائمة الرئيسية' : locale === 'zh' ? '系统导航' : 'MAIN NAVIGATION'}
            </span>
          )}

          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? item.name : undefined}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-headline text-[12.5px] font-medium transition-all group ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-semibold shadow-md'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-on-primary-container' : 'text-outline group-hover:text-primary transition-colors'}`} />
                {!collapsed && (
                  <span className="truncate flex-1">{item.name}</span>
                )}
                {!collapsed && item.badge && (
                  <span className={`px-1.5 py-0.5 rounded text-[9.5px] font-mono font-bold shrink-0 ${item.badgeColor || 'bg-surface-container text-on-surface'}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Area: System Status & Terminal Lock */}
      <div className="flex flex-col gap-3 pt-3 border-t border-outline-variant/30">
        {!collapsed && (
          <div className="p-2.5 rounded-xl bg-surface-container/60 border border-outline-variant/30 flex flex-col gap-1.5 text-[10px] font-mono">
            <div className="flex items-center justify-between text-outline">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
                <span>Gresik Node: Online</span>
              </span>
              <span className="text-secondary font-bold">IDMES</span>
            </div>
            <div className="text-on-surface truncate font-semibold">
              {officerName}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1">
          {/* Public Portal Link */}
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            title={collapsed ? 'Portal Publik' : undefined}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-outline hover:text-primary hover:bg-surface-container font-mono text-[11px] transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            {!collapsed && <span className="truncate">Lihat Portal Publik →</span>}
          </Link>

          {/* Lock Terminal / Logout */}
          <button
            type="button"
            onClick={lockTerminal}
            title={collapsed ? 'Kunci Terminal' : undefined}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-error/90 hover:text-error hover:bg-error/10 font-mono text-[11px] font-bold transition-all cursor-pointer w-full text-left"
          >
            <Lock className="w-3.5 h-3.5 shrink-0" />
            {!collapsed && <span className="truncate">Kunci Terminal (Logout)</span>}
          </button>
        </div>

        {/* Desktop Collapse Toggle */}
        <div className="hidden lg:flex justify-end pt-1">
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
            title={collapsed ? 'Perluas Sidebar' : 'Ciutkan Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer (Left slide-in) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-64 z-50 lg:hidden transform transition-transform duration-300 ease-in-out border-r border-outline-variant/30 shadow-2xl ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop Sticky Sidebar */}
      <aside
        className={`hidden lg:flex flex-col border-r border-outline-variant/30 sticky top-0 h-screen transition-all duration-300 z-30 ${
          collapsed ? 'w-18' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
