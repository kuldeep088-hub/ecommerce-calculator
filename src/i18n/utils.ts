import { ui, defaultLang, languages, type SupportedLanguage } from './ui';

export function getLangFromUrl(url: URL): SupportedLanguage {
  const [, lang] = url.pathname.split('/');
  if (lang && lang in languages) {
    return lang as SupportedLanguage;
  }
  return defaultLang;
}

export function useTranslations(lang: SupportedLanguage) {
  const localizedUI = ui[lang] || ui[defaultLang];
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return (localizedUI as Record<string, string>)[key] || (ui[defaultLang] as Record<string, string>)[key] || (key as string);
  };
}

export interface HreflangEntry {
  lang: string;
  url: string;
}

export function getHreflangList(domain: string = 'https://freesellerprofitcalculator.com'): HreflangEntry[] {
  const list: HreflangEntry[] = [];

  // x-default points to default root
  list.push({
    lang: 'x-default',
    url: `${domain}/`
  });

  // Default English points to root /
  list.push({
    lang: 'en',
    url: `${domain}/`
  });

  // Other languages
  const otherLangs: SupportedLanguage[] = ['es', 'ja', 'fr', 'de', 'pt', 'ko', 'it'];
  for (const l of otherLangs) {
    list.push({
      lang: l,
      url: `${domain}/${l}/`
    });
  }

  return list;
}
