"use client";

import React, { createContext, useContext, useSyncExternalStore, useCallback } from "react";

type Language = "en" | "id";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language | ((prev: Language) => Language)) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("portfolio_lang_change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("portfolio_lang_change", callback);
  };
}

function getSnapshot(): Language {
  try {
    const saved = localStorage.getItem("portfolio_lang");
    if (saved === "en" || saved === "id") return saved;
  } catch {
    // Ignore
  }
  return "en";
}

function getServerSnapshot(): Language {
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLanguage = useCallback((lang: Language | ((prev: Language) => Language)) => {
    try {
      const currentLang = getSnapshot();
      const nextLang = typeof lang === "function" ? lang(currentLang) : lang;
      localStorage.setItem("portfolio_lang", nextLang);
      window.dispatchEvent(new Event("portfolio_lang_change"));
    } catch {
      // Ignore
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
