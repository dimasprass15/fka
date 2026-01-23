"use client";

import Image from "next/image";
import { useState } from "react";
import { ID, SA, GB } from "country-flag-icons/react/3x2";
import { Home as HomeIcon, Info, BookOpen, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

export default function Home() {
  const { language, setLanguage, isRTL } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("home");

  const t = translations[language];

  const navItems = [
    { id: "home", label: t.nav.home, icon: HomeIcon },
    { id: "about", label: t.nav.about, icon: Info },
    { id: "program", label: t.nav.program, icon: BookOpen },
    { id: "contact", label: t.nav.contact, icon: Phone },
  ];

  return (
    <div
      className={`min-h-screen bg-transparent text-slate-950 ${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      {/* Top navigation */}
      <header className="sticky top-0 z-20 bg-gradient-to-b from-white/90 via-white/75 to-transparent backdrop-blur">
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6 lg:px-8 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 sm:h-14 sm:w-14">
              <Image
                src="/logo.png"
                alt="Fastabiqul Khairat Academy"
                fill
                sizes="56px"
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Desktop nav */}
          <nav
            className={`hidden items-center gap-8 text-sm font-medium text-emerald-900 md:flex ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <button className="text-emerald-900">{t.nav.home}</button>
            <button className="hover:text-emerald-800">{t.nav.about}</button>
            <button className="hover:text-emerald-800">{t.nav.program}</button>
            <button className="hover:text-emerald-800">{t.nav.contact}</button>
          </nav>

          {/* Right controls */}
          <div
            className={`relative flex items-center gap-3 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            {/* Language selector combo box */}
            <button
              type="button"
              onClick={() => setLangOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-700 shadow-sm hover:border-slate-300"
            >
              <span className="flex items-center gap-1.5">
                <span className="h-4 w-5 overflow-hidden rounded-full">
                  {language === "ID" && (
                    <ID title="Indonesia" className="h-full w-full" />
                  )}
                  {language === "AR" && (
                    <SA title="Arab" className="h-full w-full" />
                  )}
                  {language === "EN" && (
                    <GB title="English" className="h-full w-full" />
                  )}
                </span>
                <span>{language}</span>
              </span>
              <span className="text-[9px] text-slate-400">▾</span>
            </button>

            {langOpen && (
              <div
                className={`absolute top-11 z-30 w-40 rounded-2xl border border-slate-200 bg-white py-1 text-xs shadow-lg ${
                  isRTL ? "left-0" : "right-0"
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setLanguage("ID");
                    setLangOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-3 py-1.5 hover:bg-slate-50 ${
                    isRTL ? "flex-row-reverse text-right" : "text-left"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-5 overflow-hidden rounded-full">
                      <ID title="Indonesia" className="h-full w-full" />
                    </span>
                    <span>ID - Indonesia</span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLanguage("AR");
                    setLangOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-3 py-1.5 hover:bg-slate-50 ${
                    isRTL ? "flex-row-reverse text-right" : "text-left"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-5 overflow-hidden rounded-full">
                      <SA title="Arab" className="h-full w-full" />
                    </span>
                    <span>AR - Arabic</span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLanguage("EN");
                    setLangOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-3 py-1.5 hover:bg-slate-50 ${
                    isRTL ? "flex-row-reverse text-right" : "text-right"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-5 overflow-hidden rounded-full">
                      <GB title="English" className="h-full w-full" />
                    </span>
                    <span>EN - English</span>
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

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

      {/* Bottom Navigation - Mobile Only */}
      <nav
        className={`fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-slate-200 bg-white/95 backdrop-blur-sm md:hidden ${
          isRTL ? "flex-row-reverse" : ""
        }`}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`flex flex-col items-center gap-1 px-4 py-3 transition-colors ${
                isActive
                  ? "text-emerald-700"
                  : "text-slate-600 hover:text-emerald-600"
              }`}
            >
              <Icon
                className={`h-5 w-5 ${isActive ? "fill-current" : ""}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

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
