"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

export default function Footer() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-transparent pb-20 md:pb-6">
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 lg:px-8">
        <p
          className={`text-center text-sm text-slate-600 ${
            isRTL ? "text-right" : "text-center"
          }`}
        >
          {t.common.footer.copyright} © {new Date().getFullYear()} - {t.common.footer.academy}
        </p>
      </div>
    </footer>
  );
}

