"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "ID" | "AR" | "EN";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const STORAGE_KEY = "fka_user_lang_v2";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const host = window.location.hostname;
      const path = window.location.pathname;

      // Khusus sub-domain presensi atau rute form presensi halaqah: WAJIB Indonesia dulu!
      if (
        host.includes("presensi") ||
        path.startsWith("/presensi") ||
        (path.length > 1 && !path.startsWith("/pustaka") && !path.startsWith("/program") && !path.startsWith("/tentang-kami") && !path.startsWith("/kontak-kami"))
      ) {
        const savedGate = localStorage.getItem("fka_gate_lang");
        if (savedGate === "EN") return "EN";
        return "ID";
      }

      const savedLang = localStorage.getItem(STORAGE_KEY) as Language;
      if (savedLang === "ID" || savedLang === "AR" || savedLang === "EN") {
        return savedLang;
      }

      // Deteksi browser: jika dari Indonesia, prioritaskan Indonesia (ID)
      const nav = navigator.language?.toLowerCase() || "";
      if (nav.startsWith("id")) return "ID";
      if (nav.startsWith("en")) return "EN";
      if (nav.startsWith("ar")) return "AR";
    }
    return "ID";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, lang);
    }
    // Update HTML dir attribute for RTL
    if (lang === "AR") {
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.setAttribute("lang", "ar");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
      document.documentElement.setAttribute("lang", lang.toLowerCase());
    }
  };

  useEffect(() => {
    // Apply RTL on mount and language change
    if (language === "AR") {
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.setAttribute("lang", "ar");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
      document.documentElement.setAttribute("lang", language.toLowerCase());
    }
  }, [language]);

  const isRTL = language === "AR";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL }}>
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
