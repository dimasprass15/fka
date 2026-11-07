"use client";

import { useState, useRef } from "react";
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
import ProgramPosterCard, { Poster } from "@/components/ProgramPosterCard";

export default function ProgramPage() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [showClosedMessageId, setShowClosedMessageId] = useState<number | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const handlePosterClick = (e: React.MouseEvent, poster: Poster) => {
    e.preventDefault();
    if (poster.status === "closed") {
      setShowClosedMessageId(poster.id);
      setTimeout(() => setShowClosedMessageId(null), 2000);
      return;
    }

    const target = e.currentTarget as HTMLElement;
    target.style.transform = "scale(1.05)";
    target.style.transition = "transform 0.2s ease-out";

    setTimeout(() => {
      router.push(`/program/${poster.id}`);
    }, 150);
  };

  const handleStandardProgramClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLElement;
    target.style.transform = "scale(1.05)";
    target.style.transition = "transform 0.2s ease-out";

    setTimeout(() => {
      router.push(href);
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

  const posters: Poster[] = [
    {
      id: 1,
      title: t.program.posters.tahfidz.title,
      subtitle: t.program.posters.tahfidz.subtitle,
      image: "/1.jpeg",
      category: "quran",
      status: "open",
    },
    {
      id: 2,
      title: t.program.posters.fiqih.title,
      subtitle: t.program.posters.fiqih.subtitle,
      image: "/2.jpeg",
      category: "fiqh",
      status: "open",
    },
    {
      id: 3,
      title: t.program.posters.tafsir.title,
      subtitle: t.program.posters.tafsir.subtitle,
      image: "/3.jpeg",
      category: "quran",
      status: "closed",
    },
    {
      id: 4,
      title: t.program.posters.hadits.title,
      subtitle: t.program.posters.hadits.subtitle,
      image: "/4.jpeg",
      category: "quran",
      status: "closed",
    },
    {
      id: 5,
      title: t.program.posters.aqidah.title,
      subtitle: t.program.posters.aqidah.subtitle,
      image: "/5.jpeg",
      category: "daurah",
      status: "open",
    },
    {
      id: 6,
      title: t.program.posters.bahasaArab.title,
      subtitle: t.program.posters.bahasaArab.subtitle,
      image: "/6.jpeg",
      category: "bahasa",
      status: "closed",
    },
    {
      id: 7,
      title: t.program.posters.ushulFiqih.title,
      subtitle: t.program.posters.ushulFiqih.subtitle,
      image: "/7.jpeg",
      category: "fiqh",
      status: "open",
    },
    {
      id: 8,
      title: t.program.posters.sirah.title,
      subtitle: t.program.posters.sirah.subtitle,
      image: "/8.jpeg",
      category: "daurah",
      status: "closed",
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

  const standardProgramsList = [
    {
      id: "std-1",
      href: "/program/khataman",
      title: t.program.standardPrograms?.khataman.title || "Khataman Sanad 30 Juz",
      subtitle: t.program.standardPrograms?.khataman.subtitle || "Bi Nadzor dan Bilghoib",
      icon: (
        <svg className="w-8 h-8 text-[#C9A24D] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      id: "std-2",
      href: "/program/tahsin",
      title: t.program.standardPrograms?.tahsin.title || "Tahsin atau Tashih",
      subtitle: t.program.standardPrograms?.tahsin.subtitle || "Perbaikan bacaan Al-Quran",
      icon: (
        <svg className="w-8 h-8 text-[#C9A24D] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      id: "std-3",
      href: "/program/matan",
      title: t.program.standardPrograms?.matan.title || "Setoran Matan Ilmiah",
      subtitle: t.program.standardPrograms?.matan.subtitle || "Hafalan matan bersanad",
      icon: (
        <svg className="w-8 h-8 text-[#C9A24D] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className={`min-h-screen bg-transparent text-slate-950 ${
        isRTL ? "rtl font-arabic" : "ltr"
      }`}
    >
      <Navigation />

      <main
        className={`mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl flex-col items-start px-4 pb-24 pt-6 md:px-6 md:pt-8 lg:px-8 lg:pt-10 ${
          isRTL ? "text-right items-end" : "text-left"
        }`}
      >
        <div className="w-full">
          <h1 className="mb-6 text-3xl font-semibold text-emerald-900 sm:text-4xl lg:text-5xl">
            {t.nav.program}
          </h1>

          {/* Standard Programs */}
          <div className="mb-12 w-full">
            <h2 className="mb-6 text-2xl font-semibold text-emerald-800">
              {t.program.standardPrograms?.title || "Program Utama"}
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {standardProgramsList.map((prog) => (
                <Link
                  key={prog.id}
                  href={prog.href}
                  onClick={(e) => handleStandardProgramClick(e, prog.href)}
                  className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl group block"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#C9A24D] transition-all group-hover:w-full group-hover:opacity-10" />
                  <div className="relative z-10">
                    {prog.icon}
                    <h3 className="mb-2 text-xl font-bold text-emerald-900">{prog.title}</h3>
                    <p className="text-sm text-slate-600">{prog.subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-slate-200" />
            <h2 className="text-lg font-medium text-slate-500">
              {t.program.standardPrograms?.exploreMore || "Jelajahi Program Lainnya"}
            </h2>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

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

          {/* Posters - Mobile: Grid, Desktop/Tablet: Swiper */}
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
                    <ProgramPosterCard
                      key={poster.id}
                      poster={poster}
                      categoryLabel={categoryFilter?.label}
                      isRTL={isRTL}
                      t={t}
                      isClosedMessageVisible={showClosedMessageId === poster.id}
                      onPosterClick={handlePosterClick}
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
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
                      768: { slidesPerView: 2, spaceBetween: 16 },
                      1024: { slidesPerView: 3, spaceBetween: 20 },
                      1280: { slidesPerView: 4, spaceBetween: 24 },
                    }}
                    className={`!pb-12 ${isRTL ? "swiper-rtl" : ""}`}
                  >
                    {filteredPosters.map((poster) => {
                      const categoryFilter = filters.find((f) => f.key === poster.category);
                      return (
                        <SwiperSlide key={poster.id}>
                          <ProgramPosterCard
                            poster={poster}
                            categoryLabel={categoryFilter?.label}
                            isRTL={isRTL}
                            t={t}
                            isClosedMessageVisible={showClosedMessageId === poster.id}
                            onPosterClick={handlePosterClick}
                            sizes="(max-width: 1024px) 25vw, 25vw"
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>

                  {/* Navigation Arrows */}
                  <button
                    className={`swiper-button-prev-custom absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:bg-white ${
                      isRTL ? "right-0 translate-x-4" : "left-0 -translate-x-4"
                    }`}
                    onClick={() => swiperRef.current?.slidePrev()}
                    aria-label="Previous"
                  >
                    <svg
                      className={`h-6 w-6 text-emerald-700 ${isRTL ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    className={`swiper-button-next-custom absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all hover:bg-white ${
                      isRTL ? "left-0 -translate-x-4" : "right-0 translate-x-4"
                    }`}
                    onClick={() => swiperRef.current?.slideNext()}
                    aria-label="Next"
                  >
                    <svg
                      className={`h-6 w-6 text-emerald-700 ${isRTL ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
