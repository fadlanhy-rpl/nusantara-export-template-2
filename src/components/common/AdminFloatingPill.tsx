'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';

export default function AdminFloatingPill() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, lockTerminal } = useAdminAuth();

  // Covert Hotkey: Press Ctrl + Shift + D anywhere to jump straight to the secret terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        e.preventDefault();
        router.push('/terminal-925');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  // Only render visual pill when an admin is actively authenticated and browsing public pages
  if (!isAuthenticated || pathname?.startsWith('/terminal-925')) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-1.5 p-1.5 pl-3 rounded-full bg-[#1C1815]/95 backdrop-blur-xl border border-primary/50 shadow-[0_8px_32px_rgba(0,0,0,0.7)] text-on-surface animate-fade-in select-none">
      <div className="flex items-center gap-2 text-xs font-mono">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
        </span>
        <span className="text-primary font-bold hidden sm:inline">Admin Mode:</span>
      </div>

      <Link
        href="/terminal-925"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-container text-on-primary-container font-headline text-[11px] font-bold hover:bg-[#D94E13] transition-all shadow-md"
      >
        <span>Kembali ke Dashboard</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>

      <button
        type="button"
        onClick={lockTerminal}
        title="Kunci Sesi Admin"
        className="p-1.5 rounded-full hover:bg-surface-container text-outline hover:text-error transition-colors cursor-pointer"
        aria-label="Lock Admin Session"
      >
        <Lock className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
