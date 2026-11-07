"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import type { KnowledgePost, KnowledgeType } from "@/types/pustaka";
import { initialKnowledgePosts } from "@/data/pustakaFallback";
import { PustakaCard } from "@/components/pustaka/PustakaCard";
import { PustakaArticleModal } from "@/components/pustaka/PustakaArticleModal";
import { PustakaVideoModal } from "@/components/pustaka/PustakaVideoModal";
import { PustakaAudioPlayer } from "@/components/pustaka/PustakaAudioPlayer";

export default function PustakaPage() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];

  const [posts, setPosts] = useState<KnowledgePost[]>(initialKnowledgePosts);
  const [activeType, setActiveType] = useState<KnowledgeType | "all">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modal & Audio player state
  const [selectedArticle, setSelectedArticle] = useState<KnowledgePost | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<KnowledgePost | null>(null);
  const [activeAudio, setActiveAudio] = useState<KnowledgePost | null>(null);

  // Fetch live posts from Supabase if table is present
  useEffect(() => {
    async function loadLivePosts() {
      try {
        const { data, error } = await supabase
          .from("knowledge_posts")
          .select("*")
          .eq("is_published", true)
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          setPosts(data as KnowledgePost[]);
        }
      } catch {
        // Graceful fallback to initialKnowledgePosts
      }
    }
    loadLivePosts();
  }, []);

  // Filter & Search Logic
  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return posts.filter((post) => {
      // 1. Type Filter
      if (activeType !== "all" && post.type !== activeType) return false;

      // 2. Query Search
      if (!q) return true;
      const matchId = post.title_id?.toLowerCase().includes(q) || post.excerpt_id?.toLowerCase().includes(q);
      const matchAr = post.title_ar?.toLowerCase().includes(q) || post.excerpt_ar?.toLowerCase().includes(q);
      const matchEn = post.title_en?.toLowerCase().includes(q) || post.excerpt_en?.toLowerCase().includes(q);
      const matchTeacher =
        post.teacher_name?.toLowerCase().includes(q) || post.teacher_name_ar?.toLowerCase().includes(q);

      return matchId || matchAr || matchEn || matchTeacher;
    });
  }, [posts, activeType, searchQuery]);

  // Counts for tabs
  const counts = useMemo(() => {
    return {
      all: posts.length,
      article: posts.filter((p) => p.type === "article").length,
      audio: posts.filter((p) => p.type === "audio").length,
      video: posts.filter((p) => p.type === "video").length,
    };
  }, [posts]);

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
          {/* Header Banner */}
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#C9A24D]">
              {t.pustaka.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-semibold text-emerald-900 sm:text-4xl lg:text-5xl">
                  {t.pustaka.title} <span className="text-[#C9A24D]">{t.pustaka.titleHighlight}</span>
                </h1>
                <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
                  {t.pustaka.description}
                </p>
              </div>

              <p className="text-sm sm:text-base font-bold text-emerald-800 font-arabic text-left sm:text-right shrink-0" dir="rtl">
                المكتبة العلمية والمرئيات والصوتيات
              </p>
            </div>
          </div>

          {/* Search Input (Identical styling to Program page) */}
          <div className="mb-6 w-full">
            <div className="relative">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.pustaka.searchPlaceholder}
                className={`w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pl-11 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100 ${
                  isRTL ? "text-right pr-11 pl-4" : "text-left"
                }`}
              />
              <span
                className={`absolute top-3.5 text-slate-400 text-sm ${
                  isRTL ? "right-4" : "left-4"
                }`}
              >
                🔍
              </span>
            </div>
          </div>

          {/* Filter Chips (Identical styling to Program page) */}
          <div className="mb-8 w-full">
            <div
              className={`flex flex-wrap gap-3 overflow-x-auto pb-2 ${
                isRTL ? "flex-row-reverse justify-end" : ""
              }`}
            >
              {/* All */}
              <button
                type="button"
                onClick={() => setActiveType("all")}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                  activeType === "all"
                    ? "bg-[#C9A24D] text-white shadow-md"
                    : "bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300"
                }`}
              >
                <span>🌐 {t.pustaka.filters.all}</span>
                <span className={`text-xs px-1.5 py-0.2 rounded-full ${activeType === "all" ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-700"}`}>
                  {counts.all}
                </span>
              </button>

              {/* Articles */}
              <button
                type="button"
                onClick={() => setActiveType("article")}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                  activeType === "article"
                    ? "bg-[#C9A24D] text-white shadow-md"
                    : "bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300"
                }`}
              >
                <span>📝 {t.pustaka.filters.article}</span>
                <span className={`text-xs px-1.5 py-0.2 rounded-full ${activeType === "article" ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-700"}`}>
                  {counts.article}
                </span>
              </button>

              {/* Audio */}
              <button
                type="button"
                onClick={() => setActiveType("audio")}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                  activeType === "audio"
                    ? "bg-[#C9A24D] text-white shadow-md"
                    : "bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300"
                }`}
              >
                <span>🎙️ {t.pustaka.filters.audio}</span>
                <span className={`text-xs px-1.5 py-0.2 rounded-full ${activeType === "audio" ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-700"}`}>
                  {counts.audio}
                </span>
              </button>

              {/* Video */}
              <button
                type="button"
                onClick={() => setActiveType("video")}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                  activeType === "video"
                    ? "bg-[#C9A24D] text-white shadow-md"
                    : "bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300"
                }`}
              >
                <span>🎥 {t.pustaka.filters.video}</span>
                <span className={`text-xs px-1.5 py-0.2 rounded-full ${activeType === "video" ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-700"}`}>
                  {counts.video}
                </span>
              </button>
            </div>
          </div>

          {/* Content Cards Grid */}
          {filteredPosts.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-10 text-center text-sm text-slate-600">
              {t.pustaka.labels.empty}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {filteredPosts.map((post) => (
                <PustakaCard
                  key={post.id}
                  post={post}
                  language={language}
                  isRTL={isRTL}
                  onOpenArticle={(p) => setSelectedArticle(p)}
                  onPlayAudio={(p) => {
                    if (activeAudio?.id === p.id) {
                      setActiveAudio(null);
                    } else {
                      setActiveAudio(p);
                    }
                  }}
                  onOpenVideo={(p) => setSelectedVideo(p)}
                  activeAudioId={activeAudio?.id}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Floating Audio Player */}
      <PustakaAudioPlayer
        post={activeAudio}
        language={language}
        isRTL={isRTL}
        onClose={() => setActiveAudio(null)}
      />

      {/* Article Reader Modal */}
      <PustakaArticleModal
        post={selectedArticle}
        language={language}
        isRTL={isRTL}
        onClose={() => setSelectedArticle(null)}
      />

      {/* Video Player Modal */}
      <PustakaVideoModal
        post={selectedVideo}
        language={language}
        isRTL={isRTL}
        onClose={() => setSelectedVideo(null)}
      />

      <Footer />
    </div>
  );
}

