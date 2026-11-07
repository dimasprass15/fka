"use client";

import React from "react";
import { IoSparkles } from "react-icons/io5";
import {
  translateDaysToAr,
  translateDaysToEn,
  translateTimeToAr,
  translateCategoryToAr,
  translateCategoryToEn,
  translateTitleToAr,
  translateTeacherNameToAr,
  translateAnnouncementToAr,
  translateAnnouncementToEn,
  type SupportedGateLang,
} from "@/lib/attendance.utils";
import type { AttendanceSession } from "@/lib/supabase";

interface AttendanceFormHeaderProps {
  session: AttendanceSession;
  formTitle: string;
  formDesc?: string;
  badgeText: { primary: string; ar: string };
  teacherText: { primary: string; ar: string };
  lang?: SupportedGateLang;
}

export default function AttendanceFormHeader({
  session,
  formTitle,
  formDesc,
  badgeText,
  teacherText,
  lang = "ID",
}: AttendanceFormHeaderProps) {
  const isEn = lang === "EN";
  const displayCategory = isEn
    ? translateCategoryToEn(session.halaqahs?.category) || badgeText.primary
    : session.halaqahs?.category || badgeText.primary;
  const displayDays = isEn
    ? translateDaysToEn(session.halaqahs?.days_label)
    : session.halaqahs?.days_label;
  const displayAnnouncement = isEn
    ? translateAnnouncementToEn(formDesc)
    : formDesc;
  return (
    <div className="mb-5 sm:mb-6 text-center border-b border-slate-100 pb-5">
      {/* Metadata Chips (Category, Day, Time) */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-3 sm:mb-4">
        {/* Category Chip */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
          <IoSparkles className="h-3.5 w-3.5 shrink-0 text-indigo-500" />
          <span>{displayCategory}</span>
          <span className="text-indigo-300">•</span>
          <span className="font-arabic font-normal text-indigo-600">
            {translateCategoryToAr(session.halaqahs?.category) || badgeText.ar}
          </span>
        </div>

        {/* Day Chip */}
        {displayDays && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-slate-700 text-xs font-medium">
            <span>📅 {displayDays}</span>
            <span className="text-slate-300">•</span>
            <span className="font-arabic text-slate-500">
              {translateDaysToAr(session.halaqahs?.days_label)}
            </span>
          </div>
        )}

        {/* Time Chip */}
        {session.halaqahs?.utc_hour !== undefined && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-800 text-xs font-semibold">
            <span>
              🕒 {((session.halaqahs.utc_hour + 7) % 24).toString().padStart(2, "0")}:
              {(session.halaqahs.utc_minute || 0).toString().padStart(2, "0")} WIB
            </span>
            <span className="text-cyan-300">•</span>
            <span className="font-arabic text-cyan-700 font-normal">
              {translateTimeToAr(session.halaqahs.utc_hour, session.halaqahs.utc_minute)}
            </span>
          </div>
        )}
      </div>

      {/* Form Title & Centered Arabic Title */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
        {formTitle}
      </h1>
      <div className="text-sm sm:text-base font-bold text-indigo-600 font-arabic mt-1">
        {translateTitleToAr(formTitle)}
      </div>

      {/* Teacher Name Pill */}
      {session.halaqahs?.teacher_name && (
        <div className="flex items-center justify-center mt-2.5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-50 border border-slate-200/70 text-xs">
            <span className="text-slate-400">🎙️</span>
            <span className="text-slate-500 font-normal">{teacherText.primary}</span>
            <span className="font-bold text-indigo-900">{session.halaqahs.teacher_name}</span>
            <span className="text-slate-300">•</span>
            <span className="font-arabic font-semibold text-indigo-700">
              {translateTeacherNameToAr(session.halaqahs.teacher_name)}
            </span>
          </div>
        </div>
      )}

      {/* Announcement Box */}
      {displayAnnouncement && (
        <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-start flex items-start gap-2.5">
          <span className="text-amber-600 text-sm mt-0.5 shrink-0">ℹ️</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
              {displayAnnouncement}
            </p>
            <p className="text-[11px] sm:text-xs text-slate-500 font-arabic leading-relaxed pt-1.5 mt-1.5 border-t border-amber-200/50">
              {translateAnnouncementToAr(formDesc)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
