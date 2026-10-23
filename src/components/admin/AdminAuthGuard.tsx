'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldAlert, Lock, KeyRound, Eye, EyeOff, ArrowRight, ShieldCheck, Flame, AlertTriangle } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const { isAuthenticated, login, isLockedOut, failedAttempts } = useAdminAuth();

  const [username, setUsername] = useState<string>('admin');
  const [passkey, setPasskey] = useState<string>('');
  const [showPasskey, setShowPasskey] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // If already authenticated, render children (Admin Workspace)
  if (isAuthenticated) {
    return <>{children}</>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkey.trim()) {
      setErrorMsg('Masukkan Access Passkey atau PIN terminal.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await login(passkey, username);
      if (!res.success) {
        setErrorMsg(res.message || 'Kredensial ditolak.');
      }
    } catch {
      setErrorMsg('Terjadi kesalahan verifikasi terminal.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickFill = (code: string) => {
    setPasskey(code);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-[#120D0A] flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Background CAD grid & subtle radiant glow */}
      <div className="absolute inset-0 cad-grid opacity-20 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

      {/* Security Terminal Card */}
      <div className="w-full max-w-[440px] bg-[#1C1815]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.85)] relative z-10 flex flex-col gap-6">
        {/* Terminal Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-primary-container/20 border border-primary/40 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(196,68,15,0.3)]">
            <Lock className="w-6 h-6 text-primary" />
          </div>

          <div className="flex items-center gap-1.5 mt-2">
            <Flame className="w-4 h-4 text-primary fill-current" />
            <span className="font-headline font-extrabold text-[15px] tracking-tight uppercase text-on-surface">
              Nusantara<span className="text-primary">Origin</span>
            </span>
          </div>

          <span className="font-mono text-[10px] text-primary tracking-widest uppercase bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full mt-1">
            RESTRICTED • INTERNAL DEAL DESK
          </span>
          <p className="font-body text-[12px] text-outline mt-1 max-w-[340px]">
            Halaman ini khusus untuk Authorized Export Officer & Deal Desk PT Nusantara Origin Industri.
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-error/10 border border-error/30 text-error flex items-start gap-2.5 text-xs font-mono animate-shake">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Lockout Notice */}
        {isLockedOut && (
          <div className="p-3 rounded-xl bg-secondary-container/20 border border-secondary text-secondary flex items-start gap-2.5 text-xs font-mono">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Terminal terkunci karena batas kesalahan tercapai. Mohon tunggu 60 detik.</span>
          </div>
        )}

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[11px] text-outline uppercase tracking-wider flex items-center justify-between">
              <span>Officer Username / ID</span>
              <span className="text-[10px] text-primary font-bold">DEFAULT: admin</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              disabled={isLockedOut || isSubmitting}
              className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface font-mono text-xs focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="font-mono text-[11px] text-outline uppercase tracking-wider">
                Passkey / Master PIN
              </label>
              <button
                type="button"
                onClick={() => handleQuickFill('nusantara2026')}
                className="font-mono text-[10px] text-primary hover:underline cursor-pointer"
              >
                Gunakan: nusantara2026
              </button>
            </div>
            <div className="relative">
              <input
                type={showPasskey ? 'text' : 'password'}
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="Masukkan passkey atau PIN (8819)"
                disabled={isLockedOut || isSubmitting}
                className="h-10 pl-3 pr-10 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface font-mono text-xs focus:outline-none focus:border-primary transition-colors w-full disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPasskey(!showPasskey)}
                className="absolute right-3 top-2.5 text-outline hover:text-on-surface transition-colors cursor-pointer"
              >
                {showPasskey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick Access Badges for Developer / Staff */}
          <div className="p-2.5 rounded-xl bg-surface-container/60 border border-outline-variant/20 flex flex-col gap-1.5 text-[11px] font-mono text-outline">
            <span className="text-[10px] uppercase font-bold text-outline">Kredensial Resmi Terminal:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('nusantara2026')}
                className="px-2 py-1 rounded bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface text-[10px] font-bold transition-all cursor-pointer"
              >
                Key: nusantara2026
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('8819')}
                className="px-2 py-1 rounded bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface text-[10px] font-bold transition-all cursor-pointer"
              >
                PIN Cepat: 8819
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLockedOut || isSubmitting}
            className="h-11 rounded-xl bg-primary-container text-on-primary-container font-headline text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#D94E13] transition-all shadow-[0_0_16px_rgba(255,138,82,0.35)] cursor-pointer disabled:opacity-50 mt-1"
          >
            <KeyRound className="w-4 h-4" />
            <span>{isSubmitting ? 'VERIFYING...' : 'OTORISASI & BUKA TERMINAL'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Return to Public Portal */}
        <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between text-[11px] font-mono text-outline">
          <Link
            href="/"
            className="hover:text-primary transition-colors flex items-center gap-1.5"
          >
            <span>← Kembali ke Portal Publik</span>
          </Link>
          <span className="text-tertiary flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>256-Bit SSL</span>
          </span>
        </div>
      </div>
    </div>
  );
}
