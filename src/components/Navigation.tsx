"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ID, SA, GB } from "country-flag-icons/react/3x2";
import { Home as HomeIcon, Info, BookOpen, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

export default function Navigation() {
  const { language, setLanguage, isRTL } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const t = translations[language];

  const navItems = [
    { id: "home", label: t.nav.home, icon: HomeIcon, href: "/" },
    { id: "about", label: t.nav.about, icon: Info, href: "/tentang-kami" },
    { id: "program", label: t.nav.program, icon: BookOpen, href: "/program" },
    { id: "contact", label: t.nav.contact, icon: Phone, href: "/kontak-kami" },
  ];

  return (
    <>
      {/* Top navigation */}
      <header className="sticky top-0 z-20 bg-gradient-to-b from-white/90 via-white/75 to-transparent backdrop-blur">
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6 lg:px-8 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
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
          </Link>

          {/* Desktop nav */}
          <nav
            className={`hidden items-center gap-8 text-sm font-medium text-emerald-900 md:flex ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`hover:text-emerald-800 ${
                  pathname === item.href ? "text-emerald-900 font-semibold" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
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
                    isRTL ? "flex-row-reverse text-right" : "text-left"
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

      {/* Bottom Navigation - Mobile Only */}
      <nav
        className={`fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-slate-200 bg-white/95 backdrop-blur-sm md:hidden ${
          isRTL ? "flex-row-reverse" : ""
        }`}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
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
            </Link>
          );
        })}
      </nav>
    </>
  );
}

