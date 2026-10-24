'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Lock, KeyRound, Eye, EyeOff, ArrowRight, ShieldCheck, Flame, AlertTriangle, ShieldAlert } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const { isAuthenticated, login, throttle } = useAdminAuth();

  const [username, setUsername] = useState<string>('');
  const [passkey, setPasskey] = useState<string>('');
  const [showPasskey, setShowPasskey] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [errorField, setErrorField] = useState<'user' | 'password' | 'general' | null>(null);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hasGatePass, setHasGatePass] = useState<boolean | null>(null);

  // Check Ephemeral Gate Pass (issued via 10-click flame gesture or quad-key hotkey)
  useEffect(() => {
    try {
      const pass = sessionStorage.getItem('terminal_gate_pass_sp925');
      setHasGatePass(Boolean(pass));
    } catch {
      setHasGatePass(false);
    }
  }, [isAuthenticated]);

  // 1. If already authenticated, allow full access immediately (renders dashboard)
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // 2. Synchronizing handshake status
  if (hasGatePass === null) {
    return (
      <div className="min-h-screen bg-[#120D0A] flex items-center justify-center text-outline font-mono text-xs select-none">
        <span className="opacity-40 animate-pulse">VERIFYING GATE PROTOCOL...</span>
      </div>
    );
  }

  // 3. COLD DIRECT URL ACCESS (No gate pass handshake token):
  // Render authentic 404 Not Found stealth camouflage!
  // Anyone typing http://localhost:3000/terminal-925 directly into address bar will see this 404!
  if (!hasGatePass) {
    return (
      <div className="min-h-screen bg-[#17120F] text-[#ECE0DB] flex flex-col items-center justify-center p-6 text-center select-none font-mono">
        <div className="p-8 max-w-[480px] flex flex-col items-center gap-4">
          <span className="text-7xl font-headline font-black text-primary/80 tracking-tight">404</span>
          <h1 className="text-xl font-headline font-bold text-on-surface uppercase tracking-wider">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-xs text-outline leading-relaxed font-body">
            Halaman yang Anda tuju tidak tersedia, telah dipindahkan, atau rute akses langsung tidak diizinkan. Silakan kembali ke beranda portal ekspor utama.
          </p>
          <Link
            href="/"
            className="mt-2 px-6 py-2.5 rounded-full bg-primary-container text-on-primary-container font-headline text-xs font-bold uppercase tracking-wider hover:bg-[#D94E13] transition-all shadow-lg cursor-pointer"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkey.trim()) {
      setErrorMsg('Masukkan Passkey Token yang valid.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await login(passkey, username);
      if (!res.success) {
        setErrorMsg(res.message || 'Kredensial ditolak oleh sistem keamanan.');
        setErrorField(res.field || 'general');
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
      }
    } catch {
      setErrorMsg('Terjadi kesalahan verifikasi terminal.');
      setErrorField('general');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#120D0A] flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Background CAD grid & subtle radiant glow */}
      <div className="absolute inset-0 cad-grid opacity-20 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/10 blur-[130px] pointer-events-none" />

      {/* Security Terminal Card — Stealth, Zero-Clue Interface */}
      <div
        className={`w-full max-w-[420px] bg-[#1C1815]/95 backdrop-blur-2xl border ${
          errorField
            ? 'border-error/50 shadow-[0_0_30px_rgba(239,68,68,0.25)]'
            : 'border-white/10 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.85)]'
        } rounded-2xl p-6 sm:p-8 relative z-10 flex flex-col gap-6 transition-all duration-300 ${
          isShaking ? 'animate-shake' : ''
        }`}
      >
        {/* Terminal Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-surface-container-high border border-outline-variant/40 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(196,68,15,0.25)]">
            <Lock className="w-6 h-6 text-primary" />
          </div>

          <div className="flex items-center gap-1.5 mt-2">
            <Flame className="w-4 h-4 text-primary fill-current" />
            <span className="font-headline font-extrabold text-[15px] tracking-tight uppercase text-on-surface">
              Nusantara<span className="text-primary">Origin</span>
            </span>
          </div>

          <span className="font-mono text-[9px] text-outline tracking-widest uppercase bg-surface-container border border-outline-variant/30 px-3 py-1 rounded-full mt-1">
            TERMINAL AKSES TERBATAS
          </span>
        </div>

        {/* Lockout Notice (Monefin Progressive Lockout Display) */}
        {throttle.isBlocked ? (
          <div className="p-3.5 rounded-xl bg-error/15 border border-error/40 text-error flex flex-col gap-1.5 text-xs font-mono">
            <div className="flex items-center gap-2 font-bold">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>TERMINAL SECURITY LOCKOUT AKTIF</span>
            </div>
            <p className="text-[11px] text-error/90 leading-relaxed">
              Percobaan gagal melebihi batas toleransi. Sistem menerapkan protokol penalti bertingkat.
            </p>
            <div className="mt-1 pt-2 border-t border-error/20 flex items-center justify-between text-[11px]">
              <span>Sisa Waktu Pemblokiran:</span>
              <strong className="font-bold text-white tracking-wider">{throttle.formattedTime}</strong>
            </div>
          </div>
        ) : errorMsg ? (
          /* Error Message with Specific Field Label & Remaining Attempts */
          <div className="p-3.5 rounded-xl bg-error/15 border border-error/40 text-error flex items-start gap-2.5 text-xs font-mono animate-fade-in shadow-md">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1 w-full">
              <div className="flex items-center justify-between font-bold text-[11px] tracking-wider uppercase">
                <span>
                  {errorField === 'user'
                    ? 'IDENTIFIER TIDAK COCOK'
                    : errorField === 'password'
                    ? 'PASSWORD PASSKEY SALAH'
                    : 'OTORISASI DITOLAK'}
                </span>
                <span className="text-[10px] opacity-80 font-normal">
                  Sisa: {throttle.remainingAttempts}x
                </span>
              </div>
              <p className="text-[11px] text-error/95 leading-relaxed font-body">
                {errorMsg}
              </p>
            </div>
          </div>
        ) : null}

        {/* Stealth Form — No hints, no default values */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="font-mono text-[11px] text-outline uppercase tracking-wider">
                Identifier / Operator ID / Email
              </label>
              {errorField === 'user' && (
                <span className="font-mono text-[9px] text-error font-bold">Wajib Diperiksa</span>
              )}
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (errorField === 'user') setErrorField(null);
              }}
              placeholder="Operator ID / Email Login (default: admin)"
              disabled={throttle.isBlocked || isSubmitting}
              autoComplete="off"
              className={`h-10 px-3 bg-surface-container-lowest border rounded-xl text-on-surface font-mono text-xs focus:outline-none transition-colors disabled:opacity-40 ${
                errorField === 'user'
                  ? 'border-error/80 focus:border-error bg-error/5 text-on-surface ring-1 ring-error/50'
                  : 'border-outline-variant/30 focus:border-primary'
              }`}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="font-mono text-[11px] text-outline uppercase tracking-wider">
                Passkey Token
              </label>
              {errorField === 'password' && (
                <span className="font-mono text-[9px] text-error font-bold">Password Salah</span>
              )}
            </div>
            <div className="relative">
              <input
                type={showPasskey ? 'text' : 'password'}
                value={passkey}
                onChange={(e) => {
                  setPasskey(e.target.value);
                  if (errorField === 'password') setErrorField(null);
                }}
                placeholder="•••••••••••• (default: nusantara2026)"
                disabled={throttle.isBlocked || isSubmitting}
                autoComplete="new-password"
                className={`h-10 pl-3 pr-10 bg-surface-container-lowest border rounded-xl text-on-surface font-mono text-xs focus:outline-none transition-colors w-full disabled:opacity-40 ${
                  errorField === 'password'
                    ? 'border-error/80 focus:border-error bg-error/5 text-on-surface ring-1 ring-error/50'
                    : 'border-outline-variant/30 focus:border-primary'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPasskey(!showPasskey)}
                className="absolute right-3 top-2.5 text-outline hover:text-on-surface transition-colors cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPasskey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={throttle.isBlocked || isSubmitting}
            className="h-11 rounded-xl bg-primary-container text-on-primary-container font-headline text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#D94E13] transition-all shadow-[0_0_16px_rgba(255,138,82,0.3)] cursor-pointer disabled:opacity-40 mt-1"
          >
            <KeyRound className="w-4 h-4" />
            <span>{isSubmitting ? 'VERIFYING CREDENTIALS...' : 'OTORISASI TERMINAL'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Return to Public Portal */}
        <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between text-[11px] font-mono text-outline">
          <Link
            href="/"
            className="hover:text-primary transition-colors flex items-center gap-1.5"
          >
            <span>← Kembali ke Beranda</span>
          </Link>
          <span className="text-outline-variant flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-tertiary" />
            <span>TLS 1.3</span>
          </span>
        </div>
      </div>
    </div>
  );
}
