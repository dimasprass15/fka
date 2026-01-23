"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
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

export default function ProgramDetailPage() {
  const params = useParams();
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const [isZoomed, setIsZoomed] = useState(false);

  // Get poster data based on ID
  const getPosterData = (id: string): Poster | null => {
    const posters: Poster[] = [
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

    return posters.find((p) => p.id === parseInt(id as string)) || null;
  };

  const posterId = params?.id as string;
  const poster = getPosterData(posterId);

  const filters = [
    { key: "qiraat", label: t.program.filters.qiraat },
    { key: "bahasa", label: t.program.filters.bahasa },
    { key: "fiqh", label: t.program.filters.fiqh },
    { key: "quran", label: t.program.filters.quran },
    { key: "tahsin", label: t.program.filters.tahsin },
    { key: "khataman", label: t.program.filters.khataman },
    { key: "daurah", label: t.program.filters.daurah },
  ];

  // Zoom animation on mount
  useEffect(() => {
    setIsZoomed(true);
  }, []);

  if (!poster) {
    return (
      <div
        className={`min-h-screen bg-transparent text-slate-950 ${
          isRTL ? "rtl" : "ltr"
        }`}
      >
        <Navigation />
        <main className="mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl flex-col items-center justify-center px-4 py-20">
          <h1 className="mb-4 text-2xl font-semibold text-slate-900">
            Program tidak ditemukan
          </h1>
          <Link
            href="/program"
            className="text-emerald-700 hover:text-emerald-800 underline"
          >
            Kembali ke Program
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const categoryFilter = filters.find((f) => f.key === poster.category);

  return (
    <div
      className={`min-h-screen bg-transparent text-slate-950 ${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      <Navigation />

      {/* Main Content */}
      <main
        className={`mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl flex-col gap-8 px-4 pb-24 pt-6 md:flex-row md:items-start md:gap-12 md:px-6 md:pt-8 lg:px-8 lg:pt-10 ${
          isRTL ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Back Button */}
        <div className="w-full md:hidden">
          <Link
            href="/program"
            className={`flex items-center gap-2 text-slate-700 transition-colors hover:text-emerald-700 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <ArrowLeft className={`h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
            <span className="text-sm font-medium">
              {isRTL ? "العودة" : "Kembali"}
            </span>
          </Link>
        </div>

        {/* Content with Zoom Animation */}
        <div
          className={`w-full transform transition-all duration-500 ease-out ${
            isZoomed ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
            {/* Image Section - Left Side */}
            <div className={`w-full md:w-[40%] ${isRTL ? "md:order-2" : ""}`}>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-lg">
                <Image
                  src={poster.image}
                  alt={poster.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Category Badge */}
                {categoryFilter && (
                  <div
                    className={`absolute top-4 z-10 ${
                      isRTL ? "right-4" : "left-4"
                    }`}
                  >
                    <span className="rounded-full bg-white/90 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-emerald-700 shadow-md">
                      {categoryFilter.label}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Text Content - Right Side */}
            <div className={`flex-1 space-y-6 ${isRTL ? "md:order-1" : ""}`}>
              {/* Back Button - Desktop */}
              <div className="hidden md:block">
                <Link
                  href="/program"
                  className={`flex items-center gap-2 text-slate-700 transition-colors hover:text-emerald-700 ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <ArrowLeft
                    className={`h-5 w-5 ${isRTL ? "rotate-180" : ""}`}
                  />
                  <span className="text-sm font-medium">
                    {isRTL ? "العودة" : "Kembali"}
                  </span>
                </Link>
              </div>

              <div className="space-y-4">
                <h1
                  className={`text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {poster.title}
                </h1>
                <p
                  className={`text-lg text-slate-600 md:text-xl ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {poster.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

