'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { LocaleCode, DEFAULT_LOCALE, isRtl as checkIsRtl, isValidLocale, LOCALES } from '@/lib/i18n';
import { getDictionary, Messages } from '@/lib/dictionary';

interface LanguageContextType {
  locale: LocaleCode;
  setLocale: (newLocale: LocaleCode) => void;
  dict: Messages;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  dict: getDictionary(DEFAULT_LOCALE),
  isRtl: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleCode>(DEFAULT_LOCALE);

  useEffect(() => {
    // 1. Check URL query param (e.g. ?lang=id)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang && isValidLocale(urlLang)) {
        setLocaleState(urlLang);
        return;
      }

      // 2. Check localStorage
      const saved = localStorage.getItem('preferred_locale');
      if (saved && isValidLocale(saved)) {
        setLocaleState(saved);
        return;
      }

      // 3. Check browser language
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang && isValidLocale(browserLang)) {
        setLocaleState(browserLang as LocaleCode);
      }
    }
  }, []);

  const setLocale = (newLocale: LocaleCode) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred_locale', newLocale);
      document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

      // Update document direction and lang attribute
      document.documentElement.lang = newLocale;
      document.documentElement.dir = checkIsRtl(newLocale) ? 'rtl' : 'ltr';
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = locale;
      document.documentElement.dir = checkIsRtl(locale) ? 'rtl' : 'ltr';
    }
  }, [locale]);

  const dict = getDictionary(locale);
  const isRtl = checkIsRtl(locale);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, dict, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
