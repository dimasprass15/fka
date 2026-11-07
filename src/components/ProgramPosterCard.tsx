"use client";

import Image from "next/image";
import { translations } from "@/translations";

export type Poster = {
  id: number | string;
  title: string;
  subtitle: string;
  image: string;
  category: string;
  status: "open" | "closed";
  description: string;
  facilities: string[];
  requirements: string[];
  infaq: string;
};

interface ProgramPosterCardProps {
  poster: Poster;
  categoryLabel?: string;
  isRTL: boolean;
  language?: "AR" | "ID" | "EN";
  t: (typeof translations)["AR"];
  isClosedMessageVisible?: boolean;
  onPosterClick: (e: React.MouseEvent, poster: Poster) => void;
  sizes?: string;
}

export default function ProgramPosterCard({
  poster,
  categoryLabel,
  isRTL,
  language = "ID",
  t,
  isClosedMessageVisible = false,
  onPosterClick,
  sizes = "(max-width: 768px) 50vw, 25vw",
}: ProgramPosterCardProps) {
  const isClosed = poster.status === "closed";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={(e) => onPosterClick(e, poster)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onPosterClick(e as unknown as React.MouseEvent, poster);
        }
      }}
      className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-lg transition-all duration-300 block hover:scale-105 hover:shadow-xl cursor-pointer"
    >
      {/* Closed Message Overlay on Click if active */}
      {isClosedMessageVisible && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md transition-all duration-300">
          <div className="transform -rotate-12 border-[6px] border-rose-500 p-4 shadow-[0_0_30px_rgba(244,63,94,0.3)]">
            <p className="text-3xl font-black text-rose-500 uppercase tracking-widest text-center drop-shadow-[0_0_10px_rgba(244,63,94,0.8)]">
              {t.program.status?.closedOverlay1 || "SUDAH"}
              <br />
              {t.program.status?.closedOverlay2 || "DITUTUP"}
            </p>
          </div>
        </div>
      )}

      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={poster.image}
          alt={poster.title}
          fill
          className={`object-cover transition-all duration-300 ${
            isClosed ? "grayscale" : ""
          }`}
          sizes={sizes}
        />
      </div>

      {/* Overlay gradient untuk readability */}
      <div
        className={`absolute inset-0 ${
          isClosed
            ? "bg-gradient-to-t from-black/90 via-black/60 to-black/40"
            : "bg-gradient-to-t from-black/85 via-black/40 to-black/20"
        }`}
      />

      {/* Status Badge - Top Left */}
      <div className={`absolute top-4 z-20 ${isRTL ? "right-4" : "left-4"}`}>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold shadow-md backdrop-blur-sm ${
            isClosed ? "bg-rose-500/90 text-white" : "bg-emerald-500/90 text-white"
          }`}
        >
          {isClosed
            ? t.program.status?.closed || "مغلق"
            : t.program.status?.open || "متاح"}
        </span>
      </div>

      {/* Category Badge - Top Right */}
      {categoryLabel && (
        <div className={`absolute top-4 z-20 ${isRTL ? "left-4" : "right-4"}`}>
          <span className="rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-emerald-700 shadow-md">
            {categoryLabel}
          </span>
        </div>
      )}

      {/* Card Bottom Content */}
      <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end z-10">
        <h3 className="mb-1 text-lg sm:text-xl font-bold text-white leading-snug">
          {poster.title}
        </h3>
        <p className="text-xs sm:text-sm text-white/90 line-clamp-2">
          {poster.subtitle}
        </p>

        {/* Quick Infaq preview */}
        <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between text-xs">
          <span className="font-bold text-[#F3C465]">{poster.infaq}</span>
          <span className="text-emerald-300 font-semibold group-hover:text-white transition">
            {isRTL
              ? "التفاصيل والتسجيل ←"
              : language === "EN"
              ? "View & Register →"
              : "Lihat & Daftar →"}
          </span>
        </div>
      </div>
    </div>
  );
}
