'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CheckCircle2, Lock, X } from 'lucide-react';
import {
  getThrottleStatus,
  recordFailedAttempt,
  clearFailedAttempts,
  ThrottleStatus
} from '@/lib/securityThrottle';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export interface AdminCredentialsInfo {
  username: string;
  email: string;
  updatedAt?: number;
}

export interface UpdateCredentialsPayload {
  currentPassword: string;
  newUsername?: string;
  newEmail?: string;
  newPassword?: string;
}

export interface AuthNotification {
  type: 'login' | 'logout';
  message: string;
  sub?: string;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  officerName: string;
  login: (secret: string, username?: string) => Promise<{ success: boolean; message?: string; field?: 'user' | 'password' | 'general' }>;
  logout: () => void;
  lockTerminal: () => void;
  throttle: ThrottleStatus;
  getCredentialsInfo: () => AdminCredentialsInfo;
  updateCredentials: (payload: UpdateCredentialsPayload) => Promise<{ success: boolean; message?: string }>;
  authNotification: AuthNotification | null;
  dismissNotification: () => void;
}

const defaultThrottle: ThrottleStatus = {
  isBlocked: false,
  timeLeftMs: 0,
  timeLeftSeconds: 0,
  formattedTime: '',
  failsCount: 0,
  remainingAttempts: 5,
};

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAuthenticated: false,
  officerName: 'Authorized Export Officer',
  login: async () => ({ success: false }),
  logout: () => {},
  lockTerminal: () => {},
  throttle: defaultThrottle,
  getCredentialsInfo: () => ({ username: 'admin', email: 'export@nusantaraorigin.com' }),
  updateCredentials: async () => ({ success: false }),
  authNotification: null,
  dismissNotification: () => {},
});

const SESSION_KEY = 'nusantara_admin_session_v3';
const CUSTOM_CREDS_KEY = 'nusantara_admin_credentials_vault_v1';
const NOTICE_KEY = 'nusantara_auth_notice_v1';

// Default fallback credentials for fresh setup
const DEFAULT_PASSKEYS = ['nusantara2026', 'admin2026', '8819'];
const DEFAULT_USERS = ['admin', 'officer', 'desk', 'operator'];

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [officerName, setOfficerName] = useState<string>('Export Officer ID-SUB-01');
  const [throttle, setThrottle] = useState<ThrottleStatus>(defaultThrottle);
  const [loading, setLoading] = useState<boolean>(true);
  const [authNotification, setAuthNotification] = useState<AuthNotification | null>(null);

  const dismissNotification = () => {
    setAuthNotification(null);
    try {
      sessionStorage.removeItem(NOTICE_KEY);
    } catch {}
  };

  const triggerNotification = (type: 'login' | 'logout', message: string, sub?: string) => {
    const notice: AuthNotification = { type, message, sub };
    setAuthNotification(notice);
    try {
      sessionStorage.setItem(NOTICE_KEY, JSON.stringify(notice));
    } catch {}

    setTimeout(() => {
      setAuthNotification((curr) => (curr?.message === message ? null : curr));
      try {
        sessionStorage.removeItem(NOTICE_KEY);
      } catch {}
    }, 5000);
  };

  // Helper to read custom credentials from persistent storage
  const getStoredVault = (): { username?: string; email?: string; password?: string; updatedAt?: number } | null => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem(CUSTOM_CREDS_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // Ignore parse error
    }
    return null;
  };

  // Restore session from sessionStorage and sync throttle state
  useEffect(() => {
    try {
      // 1. Check session
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.authenticated && parsed.expiresAt > Date.now()) {
          setIsAuthenticated(true);
          setOfficerName(parsed.officer || 'Export Officer ID-SUB-01');
        } else {
          sessionStorage.removeItem(SESSION_KEY);
        }
      }

      // 2. Check throttle
      setThrottle(getThrottleStatus());

      // 3. Restore any pending auth notice (e.g. from logout or redirect)
      const storedNotice = sessionStorage.getItem(NOTICE_KEY);
      if (storedNotice) {
        try {
          const parsedNotice = JSON.parse(storedNotice);
          setAuthNotification(parsedNotice);
          setTimeout(() => {
            setAuthNotification(null);
            try {
              sessionStorage.removeItem(NOTICE_KEY);
            } catch {}
          }, 5000);
        } catch {}
      }

      // 3. Sync credentials from Supabase if configured
      if (isSupabaseConfigured && supabase) {
        (async () => {
          try {
            const { data, error } = await supabase
              .from('admin_credentials')
              .select('username, email, password, updated_at')
              .limit(1)
              .maybeSingle();

            if (!error && data) {
              const cloudVault = {
                username: data.username,
                email: data.email,
                password: data.password,
                updatedAt: data.updated_at ? new Date(data.updated_at).getTime() : Date.now(),
              };
              localStorage.setItem(CUSTOM_CREDS_KEY, JSON.stringify(cloudVault));
            }
          } catch (err) {
            console.warn('Supabase credentials sync error:', err);
          }
        })();
      }
    } catch {
      // Ignore parse errors
    } finally {
      setLoading(false);
    }
  }, []);

  // Live timer for active lockout countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (throttle.isBlocked) {
      interval = setInterval(() => {
        const status = getThrottleStatus();
        setThrottle(status);
        if (!status.isBlocked && interval) {
          clearInterval(interval);
        }
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [throttle.isBlocked]);

  const getCredentialsInfo = (): AdminCredentialsInfo => {
    const vault = getStoredVault();
    return {
      username: vault?.username || 'admin',
      email: vault?.email || 'export@nusantaraorigin.com',
      updatedAt: vault?.updatedAt,
    };
  };

  const login = async (
    secret: string,
    username?: string
  ): Promise<{ success: boolean; message?: string; field?: 'user' | 'password' | 'general' }> => {
    // 1. Verify throttle status before processing
    const currentThrottle = getThrottleStatus();
    setThrottle(currentThrottle);

    if (currentThrottle.isBlocked) {
      return {
        success: false,
        field: 'general',
        message: `Akses terminal diblokir sementara karena aktivitas mencurigakan. Sisa waktu: ${currentThrottle.formattedTime}.`,
      };
    }

    const trimmedSecret = secret.trim();
    const trimmedUser = (username || '').trim().toLowerCase();
    let vault = getStoredVault();

    // 2. If Supabase is configured, check live database first
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: cloudCreds } = await supabase
          .from('admin_credentials')
          .select('username, email, password')
          .limit(1)
          .maybeSingle();

        if (cloudCreds) {
          vault = {
            username: cloudCreds.username,
            email: cloudCreds.email,
            password: cloudCreds.password,
            updatedAt: Date.now(),
          };
          localStorage.setItem(CUSTOM_CREDS_KEY, JSON.stringify(vault));
        }
      } catch (err) {
        console.warn('Supabase direct query fallback:', err);
      }
    }

    const effectiveUsername = (vault?.username || 'admin').toLowerCase();
    const effectiveEmail = (vault?.email || 'export@nusantaraorigin.com').toLowerCase();
    const effectivePassword = vault?.password || 'nusantara2026';

    const allAllowedUsers = Array.from(new Set([effectiveUsername, effectiveEmail, ...DEFAULT_USERS]));
    const allAllowedPasswords = Array.from(new Set([effectivePassword, ...DEFAULT_PASSKEYS]));

    // 3. Check Username / Email Validity
    const isUserValid = !trimmedUser || allAllowedUsers.includes(trimmedUser);
    if (!isUserValid) {
      const updatedThrottle = recordFailedAttempt();
      setThrottle(updatedThrottle);

      if (updatedThrottle.isBlocked) {
        return {
          success: false,
          field: 'general',
          message: `Sisa percobaan telah habis. Akses terminal diblokir selama ${updatedThrottle.formattedTime}.`,
        };
      }

      return {
        success: false,
        field: 'user',
        message: `Username atau Email "${username}" tidak terdaftar dalam sistem terminal.`,
      };
    }

    // 4. Check Password Validity
    let isPasswordCorrect = false;
    if (vault?.password) {
      isPasswordCorrect = trimmedSecret === vault.password;
    }
    if (!isPasswordCorrect) {
      isPasswordCorrect = allAllowedPasswords.includes(trimmedSecret);
    }

    if (!isPasswordCorrect) {
      const updatedThrottle = recordFailedAttempt();
      setThrottle(updatedThrottle);

      if (updatedThrottle.isBlocked) {
        return {
          success: false,
          field: 'general',
          message: `Sisa percobaan telah habis. Akses terminal diblokir selama ${updatedThrottle.formattedTime}.`,
        };
      }

      return {
        success: false,
        field: 'password',
        message: 'Password yang Anda masukkan salah. Periksa kembali huruf besar, huruf kecil, dan angka.',
      };
    }

    // 5. Auth Success: Reset penalty & establish session
    clearFailedAttempts();
    setThrottle(getThrottleStatus());

    setIsAuthenticated(true);
    const name = trimmedUser
      ? `Officer: ${trimmedUser.toUpperCase()}`
      : vault?.username
      ? `Officer: ${vault.username.toUpperCase()}`
      : 'Export Officer ID-SUB-01';
    setOfficerName(name);

    const sessionData = {
      authenticated: true,
      officer: name,
      expiresAt: Date.now() + 1000 * 60 * 60 * 12, // 12 hours
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    sessionStorage.setItem('terminal_gate_pass_sp925', 'active');

    triggerNotification(
      'login',
      'Login Berhasil!',
      `Sesi operator aktif untuk ${name}. Selamat datang di Terminal-925.`
    );

    return { success: true };
  };

  const updateCredentials = async (
    payload: UpdateCredentialsPayload
  ): Promise<{ success: boolean; message?: string }> => {
    const { currentPassword, newUsername, newEmail, newPassword } = payload;
    const vault = getStoredVault();

    // 1. Verify current password
    const effectiveCurrentPassword = vault?.password || 'nusantara2026';
    const isCurrentPasswordCorrect =
      currentPassword.trim() === effectiveCurrentPassword ||
      DEFAULT_PASSKEYS.includes(currentPassword.trim());

    if (!isCurrentPasswordCorrect) {
      return {
        success: false,
        message: 'Password saat ini (lama) tidak valid. Harap periksa kembali password Anda.',
      };
    }

    // 2. Validate new username / email if provided
    const effectiveUsername = (newUsername || vault?.username || 'admin').trim();
    if (effectiveUsername.length < 3) {
      return {
        success: false,
        message: 'Username operator minimal harus 3 karakter alfanumerik.',
      };
    }

    const effectiveEmail = (newEmail || vault?.email || 'export@nusantaraorigin.com').trim();
    if (newEmail && !newEmail.includes('@')) {
      return {
        success: false,
        message: 'Format alamat email tidak valid (contoh: admin@perusahaan.com).',
      };
    }

    // 3. Validate new password if provided
    let effectivePassword = vault?.password || 'nusantara2026';
    if (newPassword && newPassword.trim()) {
      const p = newPassword.trim();
      const hasLength = p.length >= 8;
      const hasUpper = /[A-Z]/.test(p);
      const hasLower = /[a-z]/.test(p);
      const hasNumber = /[0-9]/.test(p);
      const hasSpecial = /[^A-Za-z0-9]/.test(p);

      if (!hasLength || !hasUpper || !hasLower || !hasNumber || !hasSpecial) {
        return {
          success: false,
          message:
            'Password baru belum memenuhi kriteria keamanan: wajib minimal 8 karakter dengan huruf besar, huruf kecil, angka, dan simbol khusus.',
        };
      }
      effectivePassword = p;
    }

    // 4. Persist updated credentials in vault
    const newVaultData = {
      username: effectiveUsername,
      email: effectiveEmail,
      password: effectivePassword,
      updatedAt: Date.now(),
    };

    try {
      localStorage.setItem(CUSTOM_CREDS_KEY, JSON.stringify(newVaultData));
    } catch {
      // Fallback in case localStorage is restricted
    }

    // 5. If Supabase is configured, sync to cloud database table admin_credentials
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('admin_credentials')
          .upsert(
            [
              {
                username: effectiveUsername,
                email: effectiveEmail,
                password: effectivePassword,
                updated_at: new Date().toISOString(),
              },
            ],
            { onConflict: 'username' }
          );
      } catch (err) {
        console.warn('Failed to sync updated credentials to Supabase:', err);
      }
    }

    return {
      success: true,
      message: 'Kredensial login & keamanan akun operator berhasil diperbarui!',
    };
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem(SESSION_KEY);
      sessionStorage.setItem('terminal_gate_pass_sp925', 'active');
    } catch {
      // Fallback
    }

    triggerNotification(
      'logout',
      'Logout Berhasil — Terminal Terkunci',
      'Sesi operator telah diakhiri dengan aman. Kredensial telah diamankan.'
    );
  };

  const lockTerminal = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#120D0A] flex items-center justify-center text-primary font-mono text-xs select-none">
        <span className="animate-pulse">SYNCHRONIZING TERMINAL SECURITY CONTEXT...</span>
      </div>
    );
  }

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        officerName,
        login,
        logout,
        lockTerminal,
        throttle,
        getCredentialsInfo,
        updateCredentials,
        authNotification,
        dismissNotification,
      }}
    >
      {children}

      {/* Global High-Visibility Auth Notification Toast */}
      {authNotification && (
        <div
          style={{ zIndex: 99999999 }}
          className="fixed top-20 right-4 sm:right-6 z-[99999999] max-w-sm w-[calc(100%-2rem)] p-4 rounded-2xl bg-[#1C1815] border-2 border-primary/40 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.95)] flex items-start gap-3.5 transition-all duration-300 select-none"
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              authNotification.type === 'login'
                ? 'bg-tertiary-container text-on-tertiary-container shadow-[0_0_20px_rgba(63,123,94,0.4)]'
                : 'bg-primary-container text-on-primary-container shadow-[0_0_20px_rgba(255,138,82,0.4)]'
            }`}
          >
            {authNotification.type === 'login' ? (
              <CheckCircle2 className="w-5 h-5 text-tertiary" />
            ) : (
              <Lock className="w-5 h-5 text-primary" />
            )}
          </div>

          <div className="flex-1 min-w-0 flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full animate-pulse ${
                  authNotification.type === 'login' ? 'bg-tertiary' : 'bg-primary'
                }`}
              />
              <span className="font-headline font-bold text-[13px] text-on-surface uppercase tracking-wide">
                {authNotification.message}
              </span>
            </div>
            {authNotification.sub && (
              <p className="font-body text-[11px] text-outline leading-snug mt-0.5">
                {authNotification.sub}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={dismissNotification}
            className="p-1.5 text-outline hover:text-on-surface hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            title="Tutup Notifikasi"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
