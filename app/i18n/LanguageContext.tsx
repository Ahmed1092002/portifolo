"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, any>;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguageState] = useState<Language>("en");
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load language from localStorage or default to 'en'
    const savedLanguage = localStorage.getItem("language") as Language;
    const initialLanguage = savedLanguage || "en";
    setLanguageState(initialLanguage);
    loadTranslations(initialLanguage);
  }, []);

  const loadTranslations = async (lang: Language) => {
    setIsLoading(true);
    try {
      const translationModule = await import(`./translations/${lang}.json`);
      setTranslations(translationModule.default);
    } catch (error) {
      console.error(`Failed to load translations for ${lang}:`, error);
      // Fallback to English if translation fails
      if (lang !== "en") {
        const translationModule = await import(`./translations/en.json`);
        setTranslations(translationModule.default);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    loadTranslations(lang);
    // Update document direction for RTL support
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    // Update document direction when language changes
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, translations, isLoading }}
    >
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

