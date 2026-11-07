"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { Instagram, Youtube, Facebook } from "lucide-react";

export default function Footer() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-transparent pb-20 md:pb-6">
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 lg:px-8">
        <div className={`flex flex-col md:flex-row items-center justify-between gap-4 ${isRTL ? "md:flex-row-reverse" : ""}`}>
          <p className="text-sm text-slate-600 text-center md:text-left">
            {t.common.footer.copyright} © {new Date().getFullYear()} - {t.common.footer.academy}
          </p>
          
          <div className={`flex gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
            <a href="#" aria-label="Instagram" className="text-slate-400 hover:text-emerald-600 transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Youtube" className="text-slate-400 hover:text-emerald-600 transition-colors">
              <Youtube className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Facebook" className="text-slate-400 hover:text-emerald-600 transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
