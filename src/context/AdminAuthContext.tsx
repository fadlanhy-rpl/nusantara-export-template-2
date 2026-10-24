'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getThrottleStatus,
  recordFailedAttempt,
  clearFailedAttempts,
  ThrottleStatus
} from '@/lib/securityThrottle';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  officerName: string;
  login: (secret: string, username?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  lockTerminal: () => void;
  throttle: ThrottleStatus;
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
});

const SESSION_KEY = 'nusantara_admin_session_v3';
// Secure valid credentials for authorized export officers
const VALID_PASSKEYS = ['nusantara2026', 'admin2026', '8819'];
const VALID_USERS = ['admin', 'officer', 'desk', 'operator'];

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [officerName, setOfficerName] = useState<string>('Export Officer ID-SUB-01');
  const [throttle, setThrottle] = useState<ThrottleStatus>(defaultThrottle);
  const [loading, setLoading] = useState<boolean>(true);

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

  const login = async (secret: string, username?: string): Promise<{ success: boolean; message?: string }> => {
    // 1. Verify throttle status before processing
    const currentThrottle = getThrottleStatus();
    setThrottle(currentThrottle);

    if (currentThrottle.isBlocked) {
      return {
        success: false,
        message: `Akses terminal diblokir sementara karena aktivitas mencurigakan. Sisa waktu: ${currentThrottle.formattedTime}.`,
      };
    }

    const trimmedSecret = secret.trim();
    const trimmedUser = (username || '').trim().toLowerCase();

    const isSecretValid = VALID_PASSKEYS.includes(trimmedSecret);
    const isUserValid = !trimmedUser || VALID_USERS.includes(trimmedUser);

    if (isSecretValid && isUserValid) {
      // Clear security penalty on success
      clearFailedAttempts();
      setThrottle(getThrottleStatus());

      setIsAuthenticated(true);
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
      // Record failed attempt and compute new progressive penalty
      const updatedThrottle = recordFailedAttempt();
      setThrottle(updatedThrottle);

      if (updatedThrottle.isBlocked) {
        return {
          success: false,
          message: `Sisa percobaan telah habis. Akses terminal diblokir selama ${updatedThrottle.formattedTime}.`,
        };
      }

      return {
        success: false,
        message: `Kredensial tidak valid. Sisa percobaan: ${updatedThrottle.remainingAttempts}.`,
      };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(SESSION_KEY);
  };

  const lockTerminal = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#120D0A] flex items-center justify-center text-primary font-mono text-xs">
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
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
