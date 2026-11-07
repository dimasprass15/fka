"use client";

import React, { useEffect } from "react";
import type { KnowledgePost } from "@/types/pustaka";

interface PustakaArticleModalProps {
  post: KnowledgePost | null;
  language: "ID" | "AR" | "EN";
  isRTL: boolean;
  onClose: () => void;
}

export function PustakaArticleModal({
  post,
  language,
  isRTL,
  onClose,
}: PustakaArticleModalProps) {
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
  const content = isAr
    ? post.content_markdown_ar || post.excerpt_ar
    : isEn
    ? post.content_markdown_en || post.excerpt_en
    : post.content_markdown_id || post.excerpt_id;
  const teacher = isAr ? post.teacher_name_ar : isEn ? post.teacher_name_en : post.teacher_name;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-emerald-100">
        {/* Header */}
        <div className="p-5 border-b border-emerald-100 flex items-center justify-between bg-emerald-50/40">
          <div>
            <span className="text-xs font-semibold text-[#977323] bg-[#C9A24D]/15 px-2.5 py-0.5 rounded-full">
              {isAr ? "رسالة علمية موثقة" : isEn ? "Authentic Treatise" : "Risalah Keilmuan FKA"}
            </span>
            <h4 className="font-bold text-base text-emerald-950 mt-1 leading-snug">
              {title}
            </h4>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center cursor-pointer transition-colors shrink-0"
            aria-label="Tutup"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-700 leading-relaxed">
          {post.title_ar && (
            <div
              className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 text-center font-arabic text-lg sm:text-xl text-emerald-950 leading-loose"
              dir="rtl"
            >
              {post.title_ar}
            </div>
          )}

          <div className="whitespace-pre-line text-slate-700 leading-relaxed">
            {content}
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border-l-4 border-[#C9A24D] text-slate-800 font-medium text-xs sm:text-sm">
            💡 <b>{isAr ? "تحت إشراف:" : isEn ? "Under guidance of:" : "Bimbingan:"}</b> {teacher}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            Fastabiqul Khairat Academy
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold cursor-pointer transition-all"
          >
            {isAr ? "إغلاق" : isEn ? "Close" : "Tutup"}
          </button>
        </div>
      </div>
    </div>
  );
}

