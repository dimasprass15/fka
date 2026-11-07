"use client";

import React, { useEffect } from "react";
import type { KnowledgePost } from "@/types/pustaka";

interface PustakaVideoModalProps {
  post: KnowledgePost | null;
  language: "ID" | "AR" | "EN";
  isRTL: boolean;
  onClose: () => void;
}

function getYouTubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[2].length === 11 ? match[2] : null;
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
}

export function PustakaVideoModal({
  post,
  language,
  isRTL,
  onClose,
}: PustakaVideoModalProps) {
  useEffect(() => {
    if (!post) return;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [post, onClose]);

  if (!post) return null;

  const isAr = language === "AR";
  const isEn = language === "EN";
  const title = isAr ? post.title_ar : isEn ? post.title_en : post.title_id;
  const teacher = isAr ? post.teacher_name_ar : isEn ? post.teacher_name_en : post.teacher_name;
  const embedUrl = getYouTubeEmbedUrl(post.media_url);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="bg-slate-950 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-800 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between text-white">
          <div className="min-w-0 pr-2">
            <span className="text-[10px] font-bold text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded-full border border-rose-800/80">
              YouTube HD
            </span>
            <h4 className="font-bold text-sm text-slate-100 mt-1 truncate">
              {title}
            </h4>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors shrink-0"
            aria-label="Tutup"
          >
            ✕
          </button>
        </div>

        {/* Video Frame */}
        <div className="aspect-video bg-black flex items-center justify-center relative">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="text-center p-6 text-slate-400 text-xs">
              {isAr
                ? "عذراً، رابط الفيديو غير متاح حالياً."
                : isEn
                ? "Video URL is currently unavailable."
                : "Tautan video belum tersedia saat ini."}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900 text-xs text-slate-400 flex items-center justify-between">
          <span className="truncate">🎙️ {teacher}</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold cursor-pointer shrink-0 transition-all"
          >
            {isAr ? "إغلاق الفيديو" : isEn ? "Close Video" : "Tutup Video"}
          </button>
        </div>
      </div>
    </div>
  );
}

