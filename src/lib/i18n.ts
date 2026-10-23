export type LocaleCode = 'en' | 'ar' | 'zh' | 'id';

export const LOCALES: LocaleCode[] = ['en', 'id', 'ar', 'zh'];
export const DEFAULT_LOCALE: LocaleCode = 'en';

export interface LocaleInfo {
  code: LocaleCode;
  label: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

export const LOCALE_LABELS: Record<LocaleCode, LocaleInfo> = {
  en: { code: 'en', label: 'English', nativeName: 'English', flag: '🇺🇸', dir: 'ltr' },
  id: { code: 'id', label: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', dir: 'ltr' },
  ar: { code: 'ar', label: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  zh: { code: 'zh', label: 'Chinese', nativeName: '中文 (简体)', flag: '🇨🇳', dir: 'ltr' },
};

export function isRtl(locale: string): boolean {
  return locale === 'ar';
}

export function isValidLocale(locale: string): locale is LocaleCode {
  return LOCALES.includes(locale as LocaleCode);
}
