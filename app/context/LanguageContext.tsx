"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "id";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language | ((prev: Language) => Language)) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem("portfolio_lang") as Language;
      if (savedLanguage === "en" || savedLanguage === "id") {
        setLanguage(savedLanguage);
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleSetLanguage = (lang: Language | ((prev: Language) => Language)) => {
    setLanguage((prev) => {
      const nextLang = typeof lang === "function" ? lang(prev) : lang;
      try {
        localStorage.setItem("portfolio_lang", nextLang);
      } catch {
        // Ignore
      }
      return nextLang;
    });
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
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
