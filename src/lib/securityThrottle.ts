/**
 * Security Throttling & Progressive IP/Client Lockout Engine
 * Patterned after Monefin enterprise progressive security architecture.
 */

const FAILS_KEY = 'nusantara_terminal_fails_v2';
const PENALTY_KEY = 'nusantara_terminal_penalty_v2';

export interface ThrottleStatus {
  isBlocked: boolean;
  timeLeftMs: number;
  timeLeftSeconds: number;
  formattedTime: string;
  failsCount: number;
  remainingAttempts: number;
}

export function getThrottleStatus(): ThrottleStatus {
  if (typeof window === 'undefined') {
    return {
      isBlocked: false,
      timeLeftMs: 0,
      timeLeftSeconds: 0,
      formattedTime: '',
      failsCount: 0,
      remainingAttempts: 5,
    };
  }

  const storedFails = parseInt(localStorage.getItem(FAILS_KEY) || '0', 10);
  const penaltyUntilStr = localStorage.getItem(PENALTY_KEY);

  if (penaltyUntilStr) {
    const penaltyUntil = parseInt(penaltyUntilStr, 10);
    const now = Date.now();

    if (now < penaltyUntil) {
      const diffMs = penaltyUntil - now;
      const diffSec = Math.ceil(diffMs / 1000);
      const minutes = Math.floor(diffSec / 60);
      const seconds = diffSec % 60;

      let formattedTime = '';
      if (minutes >= 60) {
        const hours = Math.ceil(minutes / 60);
        formattedTime = `${hours} jam`;
      } else if (minutes > 0) {
        formattedTime = `${minutes} menit ${seconds} detik`;
      } else {
        formattedTime = `${seconds} detik`;
      }

      return {
        isBlocked: true,
        timeLeftMs: diffMs,
        timeLeftSeconds: diffSec,
        formattedTime,
        failsCount: storedFails,
        remainingAttempts: 0,
      };
    } else {
      // Penalty expired, clean up penalty key
      localStorage.removeItem(PENALTY_KEY);
    }
  }

  // Not blocked: calculate remaining attempts until next penalty tier
  const remainingAttempts = 5 - (storedFails % 5);

  return {
    isBlocked: false,
    timeLeftMs: 0,
    timeLeftSeconds: 0,
    formattedTime: '',
    failsCount: storedFails,
    remainingAttempts: remainingAttempts === 0 ? 5 : remainingAttempts,
  };
}

export function recordFailedAttempt(): ThrottleStatus {
  if (typeof window === 'undefined') {
    return getThrottleStatus();
  }

  const currentFails = parseInt(localStorage.getItem(FAILS_KEY) || '0', 10);
  const newFails = currentFails + 1;
  localStorage.setItem(FAILS_KEY, newFails.toString());

  // Monefin progressive penalty tiers (at 5, 10, 15, >= 20 fails)
  if (newFails >= 5 && newFails % 5 === 0) {
    let penaltyDurationMs = 0;

    if (newFails === 5) {
      penaltyDurationMs = 5 * 60 * 1000; // 5 minutes
    } else if (newFails === 10) {
      penaltyDurationMs = 15 * 60 * 1000; // 15 minutes
    } else if (newFails === 15) {
      penaltyDurationMs = 30 * 60 * 1000; // 30 minutes
    } else {
      // 20 or more failed attempts -> 24-hour lockout
      penaltyDurationMs = 24 * 60 * 60 * 1000; // 24 hours
    }

    const blockUntil = Date.now() + penaltyDurationMs;
    localStorage.setItem(PENALTY_KEY, blockUntil.toString());

    // Also set a browser cookie for server/middleware compatibility
    document.cookie = `terminal_penalty=${blockUntil}; path=/; max-age=${Math.floor(penaltyDurationMs / 1000)}; SameSite=Strict`;
  }

  return getThrottleStatus();
}

export function clearFailedAttempts(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(FAILS_KEY);
  localStorage.removeItem(PENALTY_KEY);
  document.cookie = `terminal_penalty=; path=/; max-age=0; SameSite=Strict`;
}
