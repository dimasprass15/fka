"use client";

import { useEffect, useState } from "react";
import {
  IoAlertCircle,
  IoPauseCircle,
  IoGlobeOutline,
} from "react-icons/io5";
import PosterDetailView from "@/components/PosterDetailView";
import AttendanceGateView from "@/components/AttendanceGateView";
import TeacherGateView from "@/components/TeacherGateView";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  getDualText,
  type SupportedGateLang,
} from "@/lib/attendance.utils";
import { supabase, type AttendanceSession } from "@/lib/supabase";

interface DynamicIdClientProps {
  rawId: string;
  initialSession?: AttendanceSession | null;
  isTeacher?: boolean;
}

export default function DynamicIdClient({
  rawId,
  initialSession,
  isTeacher = false,
}: DynamicIdClientProps) {
  const { language, setLanguage } = useLanguage();
  const [effectiveIsTeacher, setEffectiveIsTeacher] = useState<boolean>(isTeacher);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search);
      if (sp.get("role") === "pengajar") {
        setEffectiveIsTeacher(true);
      }
    }
  }, []);
  const activeLang: SupportedGateLang = language === "EN" ? "EN" : "ID";

  const inactiveBadge = getDualText("sessionInactiveBadge", activeLang);
  const inactiveTitle = getDualText("sessionInactiveTitle", activeLang);
  const inactiveDesc = getDualText("sessionInactiveDesc", activeLang);

  const unavailableBadge = getDualText("sessionUnavailableBadge", activeLang);
  const unavailableTitle = getDualText("sessionUnavailableTitle", activeLang);
  const unavailableDesc = getDualText("sessionUnavailableDesc", activeLang);

  // Check if ID is a legacy numeric poster ID (1 to 8)
  const isNumericPoster = /^[1-8]$/.test(rawId);

  useEffect(() => {
    // Rute presensi santri ber-layout Indonesia (ID) & LTR secara default.
    // Jika rute pengajar (effectiveIsTeacher), biarkan TeacherGateView mengutamakan Bahasa Arab (AR) & RTL.
    if (!isNumericPoster && !effectiveIsTeacher) {
      if (language === "AR") {
        setLanguage("ID");
      }
      document.documentElement.setAttribute("dir", "ltr");
      document.documentElement.setAttribute("lang", language === "EN" ? "en" : "id");
    }
  }, [isNumericPoster, language, setLanguage, effectiveIsTeacher]);

  const [session, setSession] = useState<AttendanceSession | null>(
    initialSession !== undefined ? initialSession : null
  );
  const [loading, setLoading] = useState(
    !isNumericPoster && initialSession === undefined
  );

  useEffect(() => {
    if (isNumericPoster || initialSession !== undefined) return;

    async function fetchSession() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("attendance_sessions")
          .select(
            "*, halaqahs(id, name, teacher_name, category, days_label, utc_hour, utc_minute)"
          )
          .eq("slug", rawId.toLowerCase())
          .maybeSingle();

        if (error) throw error;
        setSession((data as AttendanceSession) || null);
      } catch {
        setSession(null);
      } finally {
        setLoading(false);
      }
    }

    if (rawId) {
      fetchSession();
    }
  }, [rawId, isNumericPoster, initialSession]);

  // Legacy program poster route
  if (isNumericPoster) {
    return <PosterDetailView id={rawId} />;
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F8FC] flex flex-col items-center justify-center p-4">
        <div className="h-10 w-10 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin mb-4" />
        <p className="text-sm font-medium text-slate-600">
          Memuat sesi pembelajaran...
        </p>
      </div>
    );
  }

  // Language switcher component (ID & EN only, Arabic is subtext)
  const LangSwitcher = (
    <div className="flex items-center gap-1 bg-white/80 backdrop-blur-md px-2 py-1 rounded-xl border border-slate-200/80 shadow-sm text-xs font-semibold mb-6">
      <IoGlobeOutline className="h-3.5 w-3.5 text-slate-400 mr-1" />
      {(["ID", "EN"] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`px-3 py-1 rounded-lg transition-all ${
            activeLang === lang
              ? "bg-indigo-600 text-white font-bold shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );

  // 1. Sesi Absensi Aktif -> Tampilkan Gerbang Pengajar atau Presensi Santri
  if (session && session.is_active) {
    if (effectiveIsTeacher) {
      return <TeacherGateView session={session} />;
    }
    return <AttendanceGateView session={session} />;
  }

  // 2. Sesi Absensi Ditemukan tapi DINONAKTIFKAN oleh Pengajar/Admin
  if (session && !session.is_active) {
    return (
      <div className="min-h-screen bg-[#F6F8FC] flex flex-col items-center justify-center p-6 text-center">
        {LangSwitcher}

        <div className="max-w-md w-full bg-white rounded-3xl border border-amber-200/80 shadow-xl shadow-amber-500/5 p-8 flex flex-col items-center">
          <div className="h-16 w-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 mb-5 shadow-inner">
            <IoPauseCircle className="h-10 w-10 text-amber-500" />
          </div>

          <span className="inline-flex flex-col items-center px-3 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 mb-3">
            <span>{inactiveBadge.primary}</span>
            <span className="text-[10px] font-normal font-arabic" dir="rtl">{inactiveBadge.ar}</span>
          </span>

          <h1 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
            {inactiveTitle.primary}
          </h1>
          <p className="text-sm font-semibold text-amber-800 font-arabic mb-3" dir="rtl">
            {inactiveTitle.ar}
          </p>

          <div className="w-full bg-slate-50 border border-slate-200/70 rounded-2xl p-4 my-3 text-start">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Program / Halaqah:
            </p>
            <p className="text-sm font-bold text-slate-800">
              {session.title || session.halaqahs?.name || rawId}
            </p>
            {session.halaqahs?.teacher_name && (
              <p className="text-xs text-slate-500 mt-1">
                Pengampu: {session.halaqahs.teacher_name}
              </p>
            )}
          </div>

          <p className="text-xs md:text-sm text-slate-600 mb-1 leading-relaxed">
            {inactiveDesc.primary}
          </p>
          <p className="text-xs text-slate-500 font-arabic leading-relaxed" dir="rtl">
            {inactiveDesc.ar}
          </p>
        </div>
      </div>
    );
  }

  // 3. Sesi Dihapus atau Tidak Ditemukan -> Tampilkan "Halaqah/Program Tidak Tersedia"
  return (
    <div className="min-h-screen bg-[#F6F8FC] flex flex-col items-center justify-center p-6 text-center">
      {LangSwitcher}

      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-900/5 p-8 flex flex-col items-center">
        <div className="h-16 w-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 mb-5 shadow-inner">
          <IoAlertCircle className="h-10 w-10 text-rose-500" />
        </div>

        <span className="inline-flex flex-col items-center px-3 py-1.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 mb-3">
          <span>{unavailableBadge.primary}</span>
          <span className="text-[10px] font-normal font-arabic" dir="rtl">{unavailableBadge.ar}</span>
        </span>

        <h1 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
          {unavailableTitle.primary}
        </h1>
        <p className="text-sm font-semibold text-rose-800 font-arabic mb-3" dir="rtl">
          {unavailableTitle.ar}
        </p>

        <p className="text-xs md:text-sm text-slate-600 mb-1 leading-relaxed">
          {unavailableDesc.primary}
        </p>
        <p className="text-xs text-slate-500 font-arabic leading-relaxed" dir="rtl">
          {unavailableDesc.ar}
        </p>
      </div>
    </div>
  );
}
