"use client";

import React, { useRef, useEffect, useState } from "react";
import type { KnowledgePost } from "@/types/pustaka";

interface PustakaAudioPlayerProps {
  post: KnowledgePost | null;
  language: "ID" | "AR" | "EN";
  isRTL: boolean;
  onClose: () => void;
}

export function PustakaAudioPlayer({
  post,
  language,
  isRTL,
  onClose,
}: PustakaAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const isAr = language === "AR";
  const isEn = language === "EN";

  useEffect(() => {
    if (!post || !audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [post]);

  if (!post) return null;

  const title = isAr ? post.title_ar : isEn ? post.title_en : post.title_id;
  const teacher = isAr ? post.teacher_name_ar : isEn ? post.teacher_name_en : post.teacher_name;

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div
      className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-xl bg-emerald-950/95 backdrop-blur-md text-white rounded-2xl p-3.5 shadow-2xl border border-emerald-800/60 z-50 flex items-center justify-between gap-3 animate-slideUp"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <audio
        ref={audioRef}
        src={post.media_url}
        onEnded={() => setIsPlaying(false)}
        preload="auto"
      />

      <div className="flex items-center gap-3 min-w-0">
        <div className="h-10 w-10 rounded-xl bg-[#C9A24D] text-slate-950 flex items-center justify-center shrink-0 text-base font-bold shadow-sm">
          🎙️
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold truncate text-white">{title}</p>
          <p className={`text-[10px] text-[#C9A24D] truncate ${isAr ? "font-arabic" : ""}`}>{teacher}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={togglePlay}
          className="h-9 w-9 rounded-full bg-white text-emerald-950 font-bold flex items-center justify-center hover:scale-105 transition-transform text-xs cursor-pointer shadow-sm"
          aria-label={isPlaying ? "Jeda" : "Putar"}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button
          type="button"
          onClick={() => {
            if (audioRef.current) audioRef.current.pause();
            onClose();
          }}
          className="h-8 w-8 rounded-full bg-emerald-900 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-xs cursor-pointer"
          aria-label="Tutup Player"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

