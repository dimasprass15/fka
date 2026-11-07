"use client";

import React from "react";
import type { KnowledgePost } from "@/types/pustaka";

interface PustakaCardProps {
  post: KnowledgePost;
  language: "ID" | "AR" | "EN";
  isRTL: boolean;
  onOpenArticle: (post: KnowledgePost) => void;
  onPlayAudio: (post: KnowledgePost) => void;
  onOpenVideo: (post: KnowledgePost) => void;
  activeAudioId?: string | null;
}

export function PustakaCard({
  post,
  language,
  isRTL,
  onOpenArticle,
  onPlayAudio,
  onOpenVideo,
  activeAudioId,
}: PustakaCardProps) {
  const isAr = language === "AR";
  const isEn = language === "EN";

  const title = isAr ? post.title_ar : isEn ? post.title_en : post.title_id;
  const excerpt = isAr ? post.excerpt_ar : isEn ? post.excerpt_en : post.excerpt_id;
  const teacher = isAr ? post.teacher_name_ar : isEn ? post.teacher_name_en : post.teacher_name;

  const isAudioActive = activeAudioId === post.id;

  return (
    <article
      className="content-card relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl group flex flex-col justify-between"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Signature Gold Accent Line */}
      <div
        className={`absolute top-0 w-1.5 h-full bg-[#C9A24D] transition-all group-hover:w-full group-hover:opacity-5 ${
          isRTL ? "right-0" : "left-0"
        }`}
      />

      <div className="relative z-10">
        {/* Header Badges */}
        <div className="flex items-center justify-between mb-3 gap-2">
          {post.type === "article" && (
            <span className="text-xs font-semibold text-[#977323] bg-[#C9A24D]/15 px-2.5 py-1 rounded-full">
              📝 {isAr ? "رسالة علمية" : isEn ? "Treatise" : "Risalah Ilmu"}
            </span>
          )}
          {post.type === "audio" && (
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
              🎙️ {isAr ? "تسجيل صوتي" : isEn ? "Audio Talaqqi" : "Audio Talaqqi"}
            </span>
          )}
          {post.type === "video" && (
            <span className="text-xs font-semibold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
              🎥 {isAr ? "محاضرة مرئية" : isEn ? "Video Lecture" : "Video Kajian"}
            </span>
          )}

          {post.read_time_minutes && (
            <span className="text-xs text-slate-400">
              {post.read_time_minutes} {isAr ? "دقائق" : isEn ? "min read" : "mnt baca"}
            </span>
          )}
          {post.duration_text && (
            <span className="text-xs font-mono font-semibold text-slate-500">
              {post.duration_text}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="mb-2 text-lg font-bold text-emerald-900 group-hover:text-emerald-700 transition-colors leading-snug">
          {title}
        </h3>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {excerpt}
          </p>
        )}

        {/* Soundwave representation for Audio */}
        {post.type === "audio" && (
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 p-3 rounded-xl border border-emerald-100 flex items-center justify-between mb-4">
            <div className="flex items-center gap-1 h-5">
              <span className={`w-1 rounded-full bg-emerald-700 transition-all ${isAudioActive ? "h-5 animate-pulse" : "h-3"}`} />
              <span className={`w-1 rounded-full bg-[#C9A24D] transition-all ${isAudioActive ? "h-6 animate-pulse" : "h-4"}`} />
              <span className={`w-1 rounded-full bg-emerald-600 transition-all ${isAudioActive ? "h-4 animate-pulse" : "h-2"}`} />
              <span className={`w-1 rounded-full bg-[#C9A24D] transition-all ${isAudioActive ? "h-5 animate-pulse" : "h-4"}`} />
              <span className={`w-1 rounded-full bg-emerald-700 transition-all ${isAudioActive ? "h-3 animate-pulse" : "h-2"}`} />
            </div>
            <span className="text-[11px] text-emerald-800 font-medium">
              {isAudioActive
                ? (isAr ? "جاري التشغيل..." : isEn ? "Now Playing..." : "Sedang Diputar...")
                : (isAr ? "تسجيل مسموع" : isEn ? "Clean Audio" : "Audio Jernih")}
            </span>
          </div>
        )}

        {/* Video Thumbnail banner simulation */}
        {post.type === "video" && (
          <div
            onClick={() => onOpenVideo(post)}
            className="relative rounded-xl overflow-hidden aspect-video bg-slate-900 flex items-center justify-center cursor-pointer mb-4 group/vid"
          >
            <div className="h-10 w-10 rounded-full bg-emerald-700/90 text-white flex items-center justify-center text-sm shadow-md group-hover/vid:scale-110 transition-transform">
              ▶
            </div>
            <span className="absolute bottom-2 left-2 text-[10px] text-white/90 font-semibold bg-black/60 px-2 py-0.5 rounded-md">
              YouTube HD
            </span>
          </div>
        )}
      </div>

      {/* Card Footer: Teacher Name & Action Button */}
      <div className="relative z-10 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-emerald-800 truncate">
          🎙️ {teacher}
        </span>

        {post.type === "article" && (
          <button
            type="button"
            onClick={() => onOpenArticle(post)}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold hover:bg-emerald-700 hover:text-white transition-all cursor-pointer shrink-0"
          >
            {isAr ? "قراءة الرسالة ←" : isEn ? "Read Treatise →" : "Baca Risalah →"}
          </button>
        )}

        {post.type === "audio" && (
          <button
            type="button"
            onClick={() => onPlayAudio(post)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm shrink-0 ${
              isAudioActive
                ? "bg-[#C9A24D] text-white hover:bg-[#b08c3d]"
                : "bg-emerald-700 hover:bg-emerald-800 text-white"
            }`}
          >
            <span>{isAudioActive ? "⏸" : "▶"}</span>
            <span>{isAudioActive ? (isAr ? "إيقاف" : isEn ? "Pause" : "Jeda") : (isAr ? "استماع" : isEn ? "Play" : "Putar")}</span>
          </button>
        )}

        {post.type === "video" && (
          <button
            type="button"
            onClick={() => onOpenVideo(post)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-700 hover:text-white text-emerald-900 text-xs font-semibold transition-all cursor-pointer shrink-0"
          >
            {isAr ? "مشاهدة ◀" : isEn ? "Watch ▶" : "Tonton Video ▶"}
          </button>
        )}
      </div>
    </article>
  );
}

