"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ProgramPage() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];

  return (
    <div
      className={`min-h-screen bg-transparent text-slate-950 ${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      <Navigation />

      {/* Main Content */}
      <main
        className={`mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl flex-col items-start px-4 pb-24 pt-6 md:px-6 md:pt-8 lg:px-8 lg:pt-10 ${
          isRTL ? "text-right items-end" : "text-left"
        }`}
      >
        <div className="w-full">
          <h1 className="mb-4 text-3xl font-semibold text-emerald-900 sm:text-4xl lg:text-5xl">
            {t.nav.program}
          </h1>
          <p className="text-lg text-slate-700">{t.common.helloWorld}</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

