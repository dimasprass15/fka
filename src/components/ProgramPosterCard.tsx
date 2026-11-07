"use client";

import Image from "next/image";
import Link from "next/link";
import { translations } from "@/translations";

export type Poster = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  category: string;
  status: "open" | "closed";
};

interface ProgramPosterCardProps {
  poster: Poster;
  categoryLabel?: string;
  isRTL: boolean;
  t: typeof translations["AR"];
  isClosedMessageVisible: boolean;
  onPosterClick: (e: React.MouseEvent, poster: Poster) => void;
  sizes?: string;
}

export default function ProgramPosterCard({
  poster,
  categoryLabel,
  isRTL,
  t,
  isClosedMessageVisible,
  onPosterClick,
  sizes = "(max-width: 768px) 50vw, 25vw",
}: ProgramPosterCardProps) {
  const isClosed = poster.status === "closed";

  return (
    <Link
      href={isClosed ? "#" : `/program/${poster.id}`}
      onClick={(e) => onPosterClick(e, poster)}
      className={`group relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-lg transition-transform block ${
        isClosed
          ? "cursor-not-allowed"
          : "hover:scale-105 hover:shadow-xl cursor-pointer"
      }`}
    >
      {/* Closed Message Overlay on Click */}
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

      {/* Overlay untuk readability */}
      <div
        className={`absolute inset-0 ${
          isClosed
            ? "bg-gradient-to-t from-black/90 via-black/60 to-black/40"
            : "bg-gradient-to-t from-black/80 via-black/40 to-black/20"
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

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
        <h3 className="mb-2 text-xl font-bold text-white">{poster.title}</h3>
        <p className="text-sm text-white/90">{poster.subtitle}</p>
      </div>
    </Link>
  );
}
