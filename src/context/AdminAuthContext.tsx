'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  officerName: string;
  login: (secret: string, username?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  lockTerminal: () => void;
  failedAttempts: number;
  isLockedOut: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAuthenticated: false,
  officerName: 'Authorized Export Officer',
  login: async () => ({ success: false }),
  logout: () => {},
  lockTerminal: () => {},
  failedAttempts: 0,
  isLockedOut: false,
});

const SESSION_KEY = 'nusantara_admin_session_v2';
const VALID_PASSKEYS = ['nusantara2026', 'admin2026', '8819'];
const VALID_USERS = ['admin', 'officer', 'desk'];

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [officerName, setOfficerName] = useState<string>('Export Officer ID-SUB-01');
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [isLockedOut, setIsLockedOut] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Restore session from sessionStorage on client mount
  useEffect(() => {
    try {
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
    } catch {
      // In case of parsing error
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (secret: string, username?: string): Promise<{ success: boolean; message?: string }> => {
    if (isLockedOut) {
      return { success: false, message: 'Terminal terkunci sementara karena percobaan gagal. Coba lagi dalam beberapa saat.' };
    }

    const trimmedSecret = secret.trim();
    const trimmedUser = (username || '').trim().toLowerCase();

    // Check credentials:
    // 1. Secret matches any valid passkey
    // 2. Or username/password matches
    const isSecretValid = VALID_PASSKEYS.includes(trimmedSecret);
    const isUserValid = !trimmedUser || VALID_USERS.includes(trimmedUser);

    if (isSecretValid && isUserValid) {
      setIsAuthenticated(true);
      setFailedAttempts(0);
      const name = trimmedUser ? `Officer: ${trimmedUser.toUpperCase()}` : 'Export Officer ID-SUB-01';
      setOfficerName(name);

      const sessionData = {
        authenticated: true,
        officer: name,
        expiresAt: Date.now() + 1000 * 60 * 60 * 12, // 12 hours
      };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
      return { success: true };
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      if (newAttempts >= 5) {
        setIsLockedOut(true);
        setTimeout(() => {
          setIsLockedOut(false);
          setFailedAttempts(0);
        }, 60000); // 1 minute lockout
        return { success: false, message: 'Terlalu banyak percobaan gagal. Terminal dikunci selama 60 detik.' };
      }
      return { success: false, message: 'Kredensial tidak valid. Akses ditolak oleh sistem keamanan.' };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(SESSION_KEY);
  };

  const lockTerminal = () => {
    logout();
  };

  // Render nothing during initial session check to avoid flicker
  if (loading) {
    return (
      <div className="min-h-screen bg-[#120D0A] flex items-center justify-center text-primary font-mono text-sm">
        <span className="animate-pulse">VERIFYING TERMINAL SECURITY CONTEXT...</span>
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
        failedAttempts,
        isLockedOut,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
