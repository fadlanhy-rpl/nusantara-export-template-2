import { LocaleCode } from './i18n';
import en from '../../messages/en.json';
import id from '../../messages/id.json';
import ar from '../../messages/ar.json';
import zh from '../../messages/zh.json';

const dictionaries: Record<LocaleCode, typeof en> = {
  en,
  id,
  ar,
  zh,
};

export type Messages = typeof en;

export function getDictionary(locale: LocaleCode): Messages {
  return dictionaries[locale] || dictionaries.en;
}
