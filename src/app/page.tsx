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
        isRTL ? "rtl" : "ltr"
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
            {language === "ID" ? (
              <>
                Belajar <span className="font-bold">{t.hero.descriptionBold1}</span> dan{" "}
                <span className="font-bold">{t.hero.descriptionBold2}</span> di mana saja bersama para pengajar dan masyaikh timur tengah bersanad.
              </>
            ) : language === "AR" ? (
              <>
                تعلم <span className="font-bold">{t.hero.descriptionBold1}</span> و{" "}
                <span className="font-bold">{t.hero.descriptionBold2}</span> في أي مكان مع المعلمين ومشايخ الشرق الأوسط بالإسناد.
              </>
            ) : (
              <>
                Learn <span className="font-bold">{t.hero.descriptionBold1}</span> and{" "}
                <span className="font-bold">{t.hero.descriptionBold2}</span> anywhere with teachers and Middle Eastern scholars with sanad.
              </>
            )}
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
          <div className="mt-8 flex flex-wrap gap-10 text-sm text-emerald-900">
            <div>
              <p className="text-3xl font-semibold text-emerald-800">1,8M+</p>
              <p className="mt-1 text-xs text-emerald-700/80">{t.hero.stats.users}</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating WhatsApp button */}
      <button
        className={`fixed bottom-20 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-2xl text-white shadow-[0_15px_40px_rgba(16,185,129,0.7)] hover:bg-emerald-600 md:bottom-6 ${
          isRTL ? "left-5" : "right-5"
        }`}
      >
        🟢
      </button>
    </div>
  );
}
