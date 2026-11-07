"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Home() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];

  return (
    <div
      className={`min-h-screen bg-transparent text-slate-950 ${
        isRTL ? "rtl font-arabic" : "ltr"
      }`}
    >
      <Navigation />

      {/* Hero section */}
      <main
        className={`mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl flex-col items-center gap-10 px-4 pb-24 pt-10 md:flex-row md:items-start md:gap-16 md:px-6 md:pb-24 lg:px-8 lg:pb-24 lg:pt-14 ${
          isRTL ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Left: phone mockup */}
        <section className="relative flex w-full justify-center md:w-[40%]">
          <div className="relative w-full max-w-[350px]">
            <Image
              src="/image-hero.png"
              alt="Fastabiqul Khairat Academy App"
              width={350}
              height={750}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </section>

        {/* Right: text & CTAs */}
        <section
          className={`flex w-full flex-col md:w-[60%] ${
            isRTL ? "items-end text-right" : "items-start text-left"
          }`}
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#C9A24D]">
            {t.hero.subtitle}
          </p>
          <h1 className="max-w-xl text-balance text-3xl font-semibold leading-tight tracking-tight text-emerald-900 sm:text-4xl lg:text-5xl">
            {t.hero.title}{" "}
            <span className="text-[#C9A24D]">{t.hero.titleHighlight}</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-black sm:text-base">
            {t.hero.descriptionPrefix}
            <span className="font-bold">{t.hero.descriptionBold1}</span>
            {t.hero.descriptionMiddle}
            <span className="font-bold">{t.hero.descriptionBold2}</span>
            {t.hero.descriptionSuffix}
          </p>

          {/* Store buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href="https://chat.whatsapp.com/JNEM5d454vTJ5Kv4ZqdHOJ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-700/40 hover:bg-emerald-800"
            >
              {t.hero.cta}
            </a>
          </div>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap gap-6 sm:gap-10 text-sm text-emerald-900">
            <div>
              <p className="text-3xl font-semibold text-emerald-800">
                {language === "ID" ? "1,8M+" : language === "AR" ? "+1.8M" : "1.8M+"}
              </p>
              <p className="mt-1 text-xs text-emerald-700/80">{t.hero.stats.users}</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-emerald-800">50+</p>
              <p className="mt-1 text-xs text-emerald-700/80">{t.hero.stats.teachers}</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-emerald-800">10+</p>
              <p className="mt-1 text-xs text-emerald-700/80">{t.hero.stats.programs}</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/6281234567890"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-20 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_15px_40px_rgba(16,185,129,0.7)] hover:bg-emerald-600 transition-colors md:bottom-6 ${
          isRTL ? "left-5" : "right-5"
        }`}
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
}
