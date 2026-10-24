'use client';

import React, { useState, useEffect } from 'react';
import {
  KeyRound,
  ShieldCheck,
  Lock,
  User,
  Mail,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  HelpCircle,
  ShieldAlert,
  Info,
  Calendar,
  Lightbulb,
  Ban,
  X,
} from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';

export default function SecuritySettingsPage() {
  const { getCredentialsInfo, updateCredentials } = useAdminAuth();

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [showCurrentPass, setShowCurrentPass] = useState<boolean>(false);
  const [showNewPass, setShowNewPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);

  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Load existing credentials info
  useEffect(() => {
    const info = getCredentialsInfo();
    setUsername(info.username);
    setEmail(info.email);
  }, []);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMsg({ type, text });
    setTimeout(() => setToastMsg(null), 4500);
  };

  // Password Security Criteria Validation
  const hasMinLength = newPassword.length >= 8;
  const hasUpperCase = /[A-Z]/.test(newPassword);
  const hasLowerCase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);
  const isRecommendedLength = newPassword.length >= 12;

  // Calculate Password Strength Score (0 to 5)
  const strengthScore = [
    hasMinLength,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSpecial,
  ].filter(Boolean).length;

  const getStrengthLabel = () => {
    if (!newPassword) return { label: 'Belum Diisi', color: 'bg-outline-variant/30', text: 'text-outline' };
    if (strengthScore <= 2) return { label: 'Sangat Lemah (Rentan Brute-force)', color: 'bg-error', text: 'text-error' };
    if (strengthScore === 3) return { label: 'Cukup (Bisa Ditingkatkan)', color: 'bg-secondary', text: 'text-secondary' };
    if (strengthScore === 4) return { label: 'Kuat (Standar Keamanan Terpenuhi)', color: 'bg-tertiary', text: 'text-tertiary' };
    return { label: 'Sangat Aman (Enterprise Military Grade)', color: 'bg-emerald-500', text: 'text-emerald-400' };
  };

  const isPasswordMatch = newPassword.length > 0 && newPassword === confirmPassword;

  // Generate Cryptographically Strong Password
  const handleGenerateStrongPassword = () => {
    const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const lower = 'abcdefghjkmnpqrstuvwxyz';
    const digits = '23456789';
    const symbols = '!@#$%&*';

    const words = ['Nusantara', 'Charcoal', 'Briket', 'Global', 'Export', 'Origin', 'Vessel', 'Freight'];
    const randomWord = words[Math.floor(Math.random() * words.length)];

    let randomPart = '';
    const allChars = upper + lower + digits + symbols;
    for (let i = 0; i < 6; i++) {
      randomPart += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    const randomDigit = digits.charAt(Math.floor(Math.random() * digits.length));
    const randomSymbol = symbols.charAt(Math.floor(Math.random() * symbols.length));

    const generated = `${randomWord}${randomSymbol}${randomDigit}${randomPart}`;
    setNewPassword(generated);
    setConfirmPassword(generated);

    navigator.clipboard?.writeText(generated);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);

    showToast('success', 'Password acak berkekuatan tinggi di-generate & disalin ke clipboard!');
  };

  const handleCopyPassword = () => {
    if (!newPassword) return;
    navigator.clipboard?.writeText(newPassword);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
    showToast('success', 'Password disalin ke clipboard.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword) {
      showToast('error', 'Masukkan password saat ini (lama) untuk verifikasi otorisasi.');
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      showToast('error', 'Konfirmasi password baru tidak cocok. Periksa kembali.');
      return;
    }

    if (newPassword && strengthScore < 5) {
      showToast(
        'error',
        'Password baru belum memenuhi semua syarat keamanan wajib (8+ karakter, huruf besar, huruf kecil, angka, dan simbol).'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await updateCredentials({
        currentPassword,
        newUsername: username,
        newEmail: email,
        newPassword: newPassword || undefined,
      });

      if (res.success) {
        showToast('success', res.message || 'Kredensial berhasil diperbarui!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        showToast('error', res.message || 'Gagal memperbarui kredensial.');
      }
    } catch {
      showToast('error', 'Terjadi kesalahan sistem saat memperbarui kredensial.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[1100px] mx-auto flex flex-col gap-6 sm:gap-8 pb-12">
      {/* Toast Notification */}
      {toastMsg && (
        <div
          className={`fixed top-20 right-6 z-50 p-4 px-5 rounded-xl font-mono text-xs font-bold shadow-2xl flex items-center gap-2.5 animate-bounce border ${
            toastMsg.type === 'success'
              ? 'bg-emerald-600 text-white border-white/20'
              : 'bg-error text-on-error border-error-container'
          }`}
        >
          {toastMsg.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{toastMsg.text}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-primary" />
            <h1 className="font-headline font-bold text-[22px] text-on-surface uppercase tracking-tight">
              Manajemen Kredensial & Keamanan Akun
            </h1>
          </div>
          <span className="font-mono text-[11px] text-outline">
            Atur username/email login baru, ubah password akses terminal rahasia, dan terapkan standar password aman.
          </span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant/30 text-[11px] font-mono text-primary self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>VAULT SHA-256 PROTECTED</span>
        </div>
      </div>

      {/* Grid: Form and Security Guidelines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Settings (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <form
            onSubmit={handleSubmit}
            className="p-6 rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col gap-6 shadow-xl"
          >
            {/* Section 1: Username & Email Identifier */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-2">
                <User className="w-4 h-4 text-primary" />
                <h2 className="font-headline font-bold text-sm text-on-surface uppercase tracking-wider">
                  1. Identitas Login Operator
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-outline uppercase font-bold">
                    Username / Operator Identifier
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full h-10 pl-9 pr-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface focus:border-primary outline-none"
                      placeholder="Contoh: admin, officer-gresik"
                      required
                    />
                    <User className="w-4 h-4 text-outline absolute left-3 top-3" />
                  </div>
                  <span className="text-[9px] text-outline">
                    Digunakan saat login di terminal atau passkey field.
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-outline uppercase font-bold">
                    Alamat Email Login / Pemulihan
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-10 pl-9 pr-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface focus:border-primary outline-none"
                      placeholder="Contoh: admin@nusantaraorigin.com"
                      required
                    />
                    <Mail className="w-4 h-4 text-outline absolute left-3 top-3" />
                  </div>
                  <span className="text-[9px] text-outline">
                    Bisa digunakan sebagai login identifier alternatif.
                  </span>
                </div>
              </div>
            </div>

            {/* Section 2: Password Saat Ini (Verifikasi Keamanan) */}
            <div className="flex flex-col gap-3 pt-2 border-t border-outline-variant/20">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-secondary" />
                <h2 className="font-headline font-bold text-sm text-on-surface uppercase tracking-wider">
                  2. Verifikasi Password Saat Ini (Lama)
                </h2>
              </div>

              <div className="flex flex-col gap-1.5 font-mono text-xs">
                <label className="text-[10px] text-outline uppercase font-bold">
                  Password Saat Ini (Wajib untuk Otorisasi)
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPass ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full h-10 pl-9 pr-10 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface focus:border-primary outline-none"
                    placeholder="Masukkan password saat ini (default: nusantara2026)"
                    required
                  />
                  <Lock className="w-4 h-4 text-outline absolute left-3 top-3" />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="p-1 text-outline hover:text-on-surface absolute right-3 top-2.5 transition-colors cursor-pointer"
                  >
                    {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <span className="text-[9px] text-outline">
                  Konfirmasi password lama Anda sebelum sistem menyetujui perubahan apapun.
                </span>
              </div>
            </div>

            {/* Section 3: Password Baru & Generator */}
            <div className="flex flex-col gap-4 pt-2 border-t border-outline-variant/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-primary" />
                  <h2 className="font-headline font-bold text-sm text-on-surface uppercase tracking-wider">
                    3. Password Login Baru
                  </h2>
                </div>

                {/* Generator Button */}
                <button
                  type="button"
                  onClick={handleGenerateStrongPassword}
                  className="px-3 py-1.5 rounded-lg bg-primary/15 hover:bg-primary/25 text-primary border border-primary/30 font-mono text-[10px] font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0"
                  title="Generate password acak berkekuatan tinggi otomatis"
                >
                  <Sparkles className="w-3.5 h-3.5 animate-spin shrink-0" />
                  <span className="whitespace-nowrap">Generate Password Kuat (1-Klik)</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                {/* New Password Input */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] text-outline uppercase font-bold">Password Baru</label>
                    {newPassword && (
                      <button
                        type="button"
                        onClick={handleCopyPassword}
                        className="text-[9px] text-primary hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{isCopied ? 'Tersalin' : 'Salin'}</span>
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showNewPass ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full h-10 pl-9 pr-10 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-on-surface focus:border-primary outline-none"
                      placeholder="Biarkan kosong jika hanya ubah username"
                    />
                    <KeyRound className="w-4 h-4 text-outline absolute left-3 top-3" />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="p-1 text-outline hover:text-on-surface absolute right-3 top-2.5 transition-colors cursor-pointer"
                    >
                      {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] text-outline uppercase font-bold">Konfirmasi Password Baru</label>
                    {confirmPassword && (
                      <span
                        className={`text-[9px] font-bold flex items-center gap-1 ${
                          isPasswordMatch ? 'text-emerald-400' : 'text-error'
                        }`}
                      >
                        {isPasswordMatch ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Password Cocok</span>
                          </>
                        ) : (
                          <>
                            <X className="w-3 h-3 text-error" />
                            <span>Belum Cocok</span>
                          </>
                        )}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showConfirmPass ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full h-10 pl-9 pr-10 bg-surface-container-lowest border rounded-xl text-on-surface outline-none transition-colors ${
                        confirmPassword
                          ? isPasswordMatch
                            ? 'border-emerald-500/60 focus:border-emerald-500'
                            : 'border-error/60 focus:border-error'
                          : 'border-outline-variant/30 focus:border-primary'
                      }`}
                      placeholder="Ulangi password baru Anda"
                    />
                    <KeyRound className="w-4 h-4 text-outline absolute left-3 top-3" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      className="p-1 text-outline hover:text-on-surface absolute right-3 top-2.5 transition-colors cursor-pointer"
                    >
                      {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Real-time Password Strength Meter */}
              {newPassword && (
                <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/20 flex flex-col gap-2 font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-outline">Kekuatan Password:</span>
                    <strong className={getStrengthLabel().text}>{getStrengthLabel().label}</strong>
                  </div>

                  {/* 5-Segment Progress Bar */}
                  <div className="w-full grid grid-cols-5 gap-1.5 h-1.5">
                    {[1, 2, 3, 4, 5].map((seg) => (
                      <div
                        key={seg}
                        className={`h-full rounded-full transition-all duration-300 ${
                          strengthScore >= seg ? getStrengthLabel().color : 'bg-surface-container-high'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Dynamic Security Checklist */}
              {newPassword && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 rounded-xl bg-surface-container-lowest/60 border border-outline-variant/20 font-mono text-[11px]">
                  <div className="flex items-center gap-2">
                    {hasMinLength ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-outline-variant/60 shrink-0" />
                    )}
                    <span className={hasMinLength ? 'text-on-surface' : 'text-outline'}>
                      Minimal 8 karakter {isRecommendedLength && '(12+ Lebih Disarankan)'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {hasUpperCase ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-outline-variant/60 shrink-0" />
                    )}
                    <span className={hasUpperCase ? 'text-on-surface' : 'text-outline'}>
                      Memiliki huruf besar (A-Z)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {hasLowerCase ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-outline-variant/60 shrink-0" />
                    )}
                    <span className={hasLowerCase ? 'text-on-surface' : 'text-outline'}>
                      Memiliki huruf kecil (a-z)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {hasNumber ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-outline-variant/60 shrink-0" />
                    )}
                    <span className={hasNumber ? 'text-on-surface' : 'text-outline'}>
                      Memiliki angka numerik (0-9)
                    </span>
                  </div>

                  <div className="flex items-center gap-2 sm:col-span-2">
                    {hasSpecial ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-outline-variant/60 shrink-0" />
                    )}
                    <span className={hasSpecial ? 'text-on-surface' : 'text-outline'}>
                      Memiliki simbol khusus (!@#$%^&*()_+-=)
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Form Action Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-outline-variant/30">
              <span className="font-mono text-[11px] text-outline leading-tight">
                Kredensial baru langsung aktif untuk login sesi berikutnya.
              </span>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    const info = getCredentialsInfo();
                    setUsername(info.username);
                    setEmail(info.email);
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-headline text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center justify-center"
                >
                  Reset Form
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-primary-container text-on-primary-container font-headline text-xs font-bold uppercase tracking-wider hover:bg-[#D94E13] transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 whitespace-nowrap shrink-0"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                  ) : (
                    <Check className="w-4 h-4 shrink-0" />
                  )}
                  <span className="whitespace-nowrap">Simpan Kredensial Baru</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right Column: Security Best Practices & Suggestions (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4 font-mono text-xs">
          {/* Card 1: Syarat Password Aman */}
          <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col gap-3 shadow-md">
            <div className="flex items-center gap-2 text-primary font-bold">
              <ShieldAlert className="w-4 h-4" />
              <h3 className="font-headline text-xs uppercase tracking-wider">Syarat Password Aman</h3>
            </div>
            <ul className="flex flex-col gap-2.5 text-[11px] text-on-surface-variant leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">Panjang Karakter:</strong> Wajib minimal 8 karakter. Sangat disarankan 12-16 karakter untuk standar ekspor B2B.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">Kombinasi Karakter:</strong> Harus menggabungkan huruf besar, huruf kecil, angka, dan minimal satu simbol khusus.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-on-surface">Kerahasiaan Mutlak:</strong> Jangan bagikan kredensial terminal kepada pihak surveyor atau buyer luar.
                </span>
              </li>
            </ul>
          </div>

          {/* Card 2: Saran & Rekomendasi Pemilihan Password */}
          <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant/30 flex flex-col gap-3 shadow-md">
            <div className="flex items-center gap-2 text-secondary font-bold">
              <HelpCircle className="w-4 h-4" />
              <h3 className="font-headline text-xs uppercase tracking-wider">Saran Praktis Keamanan</h3>
            </div>
            <div className="flex flex-col gap-2.5 text-[11px] text-on-surface-variant leading-relaxed">
              <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-primary/15 text-primary flex items-center justify-center shrink-0">
                    <Lightbulb className="w-3 h-3" />
                  </div>
                  <strong className="text-on-surface font-headline text-xs">Gunakan Teknik Passphrase</strong>
                </div>
                <p className="text-[11px] text-outline leading-relaxed pl-7">
                  Gabungkan 3-4 kata yang Anda ingat dengan pembatas simbol (contoh: <code>Arang#Gresik$Ekspor26!</code>). Lebih mudah dihafal manusia tapi mustahil dibobol bot kamus.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-error/15 text-error flex items-center justify-center shrink-0">
                    <Ban className="w-3 h-3" />
                  </div>
                  <strong className="text-on-surface font-headline text-xs">Hindari Kata yang Dapat Ditebak</strong>
                </div>
                <p className="text-[11px] text-outline leading-relaxed pl-7">
                  Jangan gunakan nama komoditas umum (<code>briket123</code>, <code>kopi2026</code>), tanggal lahir, nama PT, atau urutan keyboard (<code>qwerty</code>).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
                    <KeyRound className="w-3 h-3" />
                  </div>
                  <strong className="text-on-surface font-headline text-xs">Gunakan Password Manager</strong>
                </div>
                <p className="text-[11px] text-outline leading-relaxed pl-7">
                  Simpan password baru Anda pada pengelola kata sandi aman seperti <em>Bitwarden</em>, <em>1Password</em>, atau <em>Apple Keychain</em>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
