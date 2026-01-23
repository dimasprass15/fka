"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation as SwiperNavigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

type Poster = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  category: string;
};

export default function ProgramPage() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [clickedPoster, setClickedPoster] = useState<Poster | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const handlePosterClick = (e: React.MouseEvent, poster: Poster) => {
    e.preventDefault();
    setClickedPoster(poster);
    // Add zoom effect
    const target = e.currentTarget as HTMLElement;
    target.style.transform = "scale(1.05)";
    target.style.transition = "transform 0.2s ease-out";
    
    // Navigate after zoom effect
    setTimeout(() => {
      router.push(`/${poster.id}`);
    }, 150);
  };

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
      image: "/1.jpeg",
      category: "quran",
    },
    {
      id: 2,
      title: t.program.posters.fiqih.title,
      subtitle: t.program.posters.fiqih.subtitle,
      image: "/2.jpeg",
      category: "fiqh",
    },
    {
      id: 3,
      title: t.program.posters.tafsir.title,
      subtitle: t.program.posters.tafsir.subtitle,
      image: "/3.jpeg",
      category: "quran",
    },
    {
      id: 4,
      title: t.program.posters.hadits.title,
      subtitle: t.program.posters.hadits.subtitle,
      image: "/4.jpeg",
      category: "qiraat",
    },
    {
      id: 5,
      title: t.program.posters.aqidah.title,
      subtitle: t.program.posters.aqidah.subtitle,
      image: "/5.jpeg",
      category: "daurah",
    },
    {
      id: 6,
      title: t.program.posters.bahasaArab.title,
      subtitle: t.program.posters.bahasaArab.subtitle,
      image: "/6.jpeg",
      category: "bahasa",
    },
    {
      id: 7,
      title: t.program.posters.ushulFiqih.title,
      subtitle: t.program.posters.ushulFiqih.subtitle,
      image: "/7.jpeg",
      category: "fiqh",
    },
    {
      id: 8,
      title: t.program.posters.sirah.title,
      subtitle: t.program.posters.sirah.subtitle,
      image: "/8.jpeg",
      category: "tahsin",
    },
  ];

  const q = query.trim().toLowerCase();
  const filteredPosters = posters.filter((p) => {
    const categoryLabel =
      filters.find((f) => f.key === p.category)?.label?.toLowerCase() ?? "";
    const matchesText =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      categoryLabel.includes(q);
    const matchesCategory = !activeFilter || p.category === activeFilter;
    return matchesText && matchesCategory;
  });

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

          {/* Search */}
          <div className="mb-6 w-full">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.program.search.placeholder}
              className={`w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100 ${
                isRTL ? "text-right" : "text-left"
              }`}
            />
          </div>

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
              {filteredPosters.length === 0 ? (
                <div className="col-span-2 rounded-2xl border border-slate-200 bg-white/70 p-6 text-center text-sm text-slate-600">
                  {t.program.search.empty}
                </div>
              ) : (
                filteredPosters.map((poster) => {
                const categoryFilter = filters.find((f) => f.key === poster.category);
                return (
                  <Link
                    key={poster.id}
                    href={`/${poster.id}`}
                    onClick={(e) => handlePosterClick(e, poster)}
                    className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-lg transition-transform hover:scale-105 hover:shadow-xl cursor-pointer"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={poster.image}
                        alt={poster.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    
                    {/* Overlay untuk readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

                    {/* Category Badge - Top Right */}
                    {categoryFilter && (
                      <div className={`absolute top-4 z-20 ${
                        isRTL ? "left-4" : "right-4"
                      }`}>
                        <span className="rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-emerald-700 shadow-md">
                          {categoryFilter.label}
                        </span>
                      </div>
                    )}

                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                      <h3 className="mb-2 text-xl font-bold text-white">
                        {poster.title}
                      </h3>
                      <p className="text-sm text-white/90">{poster.subtitle}</p>
                    </div>
                  </Link>
                );
              })
              )}
            </div>

            {/* Desktop/Tablet Swiper */}
            <div
              className="hidden md:block relative"
              dir={isRTL ? "rtl" : "ltr"}
            >
              {filteredPosters.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white/70 p-10 text-center text-sm text-slate-600">
                  {t.program.search.empty}
                </div>
              ) : (
                <>
                  <Swiper
                    key={language}
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
                    className={`!pb-12 ${isRTL ? "swiper-rtl" : ""}`}
                  >
                    {filteredPosters.map((poster) => {
                      const categoryFilter = filters.find(
                        (f) => f.key === poster.category
                      );
                      return (
                        <SwiperSlide key={poster.id}>
                          <Link
                            href={`/${poster.id}`}
                            onClick={(e) => handlePosterClick(e, poster)}
                            className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-lg transition-transform hover:scale-105 hover:shadow-xl cursor-pointer block"
                          >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                              <Image
                                src={poster.image}
                                alt={poster.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 25vw, 25vw"
                              />
                            </div>

                            {/* Overlay untuk readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

                            {/* Category Badge - Top Right */}
                            {categoryFilter && (
                              <div
                                className={`absolute top-4 z-20 ${
                                  isRTL ? "left-4" : "right-4"
                                }`}
                              >
                                <span className="rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-emerald-700 shadow-md">
                                  {categoryFilter.label}
                                </span>
                              </div>
                            )}

                            {/* Content */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                              <h3 className="mb-2 text-xl font-bold text-white">
                                {poster.title}
                              </h3>
                              <p className="text-sm text-white/90">
                                {poster.subtitle}
                              </p>
                            </div>
                          </Link>
                        </SwiperSlide>
                      );
                    })}
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
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
