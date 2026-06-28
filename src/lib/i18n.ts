import { useState, useEffect } from "react";

export type SupportedLang = "tr" | "en" | "ru";
export const SUPPORTED_LANGS: SupportedLang[] = ["tr", "en", "ru"];

export const langNames: Record<SupportedLang, string> = {
  tr: "Türkçe",
  en: "English",
  ru: "Русский",
};

export const langFlags: Record<SupportedLang, string> = {
  tr: "🇹🇷",
  en: "🇬🇧",
  ru: "🇷🇺",
};

const STORAGE_KEY = "enorpa_lang";

export function getInitialLang(): SupportedLang {
  if (typeof window === "undefined") return "tr";
  const stored = localStorage.getItem(STORAGE_KEY) as SupportedLang | null;
  if (stored && SUPPORTED_LANGS.includes(stored)) return stored;
  const pathLang = detectLangFromPath(window.location.pathname);
  if (pathLang) return pathLang;
  return "tr";
}

export function detectLangFromPath(pathname: string): SupportedLang | null {
  if (pathname.startsWith("/en")) return "en";
  if (pathname.startsWith("/ru")) return "ru";
  return "tr";
}

export function stripLangPrefix(pathname: string): string {
  return pathname.replace(/^\/en/, "").replace(/^\/ru/, "") || "/";
}

export function addLangPrefix(pathname: string, lang: SupportedLang): string {
  if (lang === "tr") return pathname;
  return `/${lang}${pathname}`;
}

export function changeLanguage(lang: SupportedLang) {
  const currentPath = window.location.pathname;
  const cleanPath = stripLangPrefix(currentPath);
  const newPath = addLangPrefix(cleanPath, lang);
  localStorage.setItem(STORAGE_KEY, lang);
  window.location.href = newPath + window.location.search;
}

export function useLanguage() {
  const [lang, setLang] = useState<SupportedLang>("tr");

  useEffect(() => {
    const initial = getInitialLang();
    setLang(initial);
  }, []);

  const switchLang = (newLang: SupportedLang) => {
    setLang(newLang);
    changeLanguage(newLang);
  };

  return { lang, switchLang };
}

export async function fetchWithLang<T>(path: string, lang: SupportedLang = "tr"): Promise<T | null> {
  try {
    const res = await fetch(path, {
      headers: { "Accept-Language": lang === "tr" ? "tr-TR" : lang === "en" ? "en-US" : "ru-RU" },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
