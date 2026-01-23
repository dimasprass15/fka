"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation as SwiperNavigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ProgramPage() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const filters = [
    { key: "qiraat", label: t.program.filters.qiraat },
    { key: "bahasa", label: t.program.filters.bahasa },
    { key: "fiqh", label: t.program.filters.fiqh },
    { key: "quran", label: t.program.filters.quran },
    { key: "tahsin", label: t.program.filters.tahsin },
    { key: "khataman", label: t.program.filters.khataman },
    { key: "daurah", label: t.program.filters.daurah },
  ];

  // Sample poster data
  const posters = [
    {
      id: 1,
      title: t.program.posters.tahfidz.title,
      subtitle: t.program.posters.tahfidz.subtitle,
      gradient: "from-emerald-500 to-emerald-700",
    },
    {
      id: 2,
      title: t.program.posters.fiqih.title,
      subtitle: t.program.posters.fiqih.subtitle,
      gradient: "from-amber-500 to-amber-700",
    },
    {
      id: 3,
      title: t.program.posters.tafsir.title,
      subtitle: t.program.posters.tafsir.subtitle,
      gradient: "from-blue-500 to-blue-700",
    },
    {
      id: 4,
      title: t.program.posters.hadits.title,
      subtitle: t.program.posters.hadits.subtitle,
      gradient: "from-purple-500 to-purple-700",
    },
    {
      id: 5,
      title: t.program.posters.aqidah.title,
      subtitle: t.program.posters.aqidah.subtitle,
      gradient: "from-rose-500 to-rose-700",
    },
    {
      id: 6,
      title: t.program.posters.bahasaArab.title,
      subtitle: t.program.posters.bahasaArab.subtitle,
      gradient: "from-teal-500 to-teal-700",
    },
    {
      id: 7,
      title: t.program.posters.ushulFiqih.title,
      subtitle: t.program.posters.ushulFiqih.subtitle,
      gradient: "from-indigo-500 to-indigo-700",
    },
    {
      id: 8,
      title: t.program.posters.sirah.title,
      subtitle: t.program.posters.sirah.subtitle,
      gradient: "from-pink-500 to-pink-700",
    },
  ];

  return (
    <div
      className={`min-h-screen bg-transparent text-slate-950 ${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      <Navigation />

      {/* Main Content */}
      <main
        className={`mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl flex-col items-start px-4 pb-24 pt-6 md:px-6 md:pt-8 lg:px-8 lg:pt-10 ${
          isRTL ? "text-right items-end" : "text-left"
        }`}
      >
        <div className="w-full">
          <h1 className="mb-6 text-3xl font-semibold text-emerald-900 sm:text-4xl lg:text-5xl">
            {t.nav.program}
          </h1>

          {/* Filter Buttons */}
          <div className="mb-8 w-full">
            <div
              className={`flex flex-wrap gap-3 overflow-x-auto pb-2 ${
                isRTL ? "flex-row-reverse justify-end" : ""
              }`}
            >
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() =>
                    setActiveFilter(activeFilter === filter.key ? null : filter.key)
                  }
                  className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                    activeFilter === filter.key
                      ? "bg-[#C9A24D] text-white shadow-md"
                      : "bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Posters - Mobile: Grid, Desktop/Tablet: Swiper Slider */}
          <div className="relative w-full">
            {/* Mobile Grid */}
            <div className="grid grid-cols-2 gap-4 md:hidden">
              {posters.map((poster) => (
                <div
                  key={poster.id}
                  className={`group relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-br ${poster.gradient} shadow-lg transition-transform hover:scale-105 hover:shadow-xl`}
                >
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    {/* Top decoration */}
                    <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-white/10 blur-2xl" />
                    <div className="absolute bottom-0 left-0 h-24 w-24 rounded-tr-full bg-white/10 blur-xl" />

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="mb-4 h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm" />
                    </div>

                    <div className="relative z-10">
                      <h3 className="mb-2 text-xl font-bold text-white">
                        {poster.title}
                      </h3>
                      <p className="text-sm text-white/90">{poster.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop/Tablet Swiper */}
            <div className="hidden md:block relative">
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                modules={[SwiperNavigation]}
                navigation={{
                  nextEl: ".swiper-button-next-custom",
                  prevEl: ".swiper-button-prev-custom",
                }}
                slidesPerView={4}
                spaceBetween={24}
                breakpoints={{
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                  },
                }}
                className="!pb-12"
              >
                {posters.map((poster) => (
                  <SwiperSlide key={poster.id}>
                    <div
                      className={`group relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-br ${poster.gradient} shadow-lg transition-transform hover:scale-105 hover:shadow-xl`}
                    >
                      <div className="absolute inset-0 p-6 flex flex-col justify-between">
                        {/* Top decoration */}
                        <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-white/10 blur-2xl" />
                        <div className="absolute bottom-0 left-0 h-24 w-24 rounded-tr-full bg-white/10 blur-xl" />

                        {/* Content */}
                        <div className="relative z-10">
                          <div className="mb-4 h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm" />
                        </div>

                        <div className="relative z-10">
                          <h3 className="mb-2 text-xl font-bold text-white">
                            {poster.title}
                          </h3>
                          <p className="text-sm text-white/90">
                            {poster.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Buttons */}
              <button
                className={`swiper-button-prev-custom absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:bg-white ${
                  isRTL ? "right-0 translate-x-4" : "left-0 -translate-x-4"
                }`}
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <svg
                  className={`h-6 w-6 text-emerald-700 ${
                    isRTL ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                className={`swiper-button-next-custom absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:bg-white ${
                  isRTL ? "left-0 -translate-x-4" : "right-0 translate-x-4"
                }`}
                onClick={() => swiperRef.current?.slideNext()}
              >
                <svg
                  className={`h-6 w-6 text-emerald-700 ${
                    isRTL ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
