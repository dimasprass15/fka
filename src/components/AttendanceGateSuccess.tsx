"use client";

import React, { useEffect, useState } from "react";
import {
  IoCheckmarkCircle,
  IoVideocam,
  IoGlobeOutline,
  IoArrowForward,
  IoCopyOutline,
  IoCheckmark,
} from "react-icons/io5";
import {
  buildZoomAppUrl,
  buildZoomWebUrl,
  getDualText,
  translateTeacherNameToAr,
  type SupportedGateLang,
} from "@/lib/attendance.utils";
import type { AttendanceSession, Student } from "@/lib/supabase";

interface AttendanceGateSuccessProps {
  session: AttendanceSession;
  student: Student;
  lang?: SupportedGateLang;
  onReset?: () => void;
}

export default function AttendanceGateSuccess({
  session,
  student,
  lang = "ID",
  onReset,
}: AttendanceGateSuccessProps) {
  const activeLang: SupportedGateLang = lang === "EN" ? "EN" : "ID";
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const successTitle = getDualText("successTitle", activeLang);
  const successSubtitle = getDualText("successSubtitle", activeLang);
  const manualNotice = getDualText("manualOpenNotice", activeLang);
  const nameLabel = getDualText("nameLabel", activeLang);
  const lockedBadge = getDualText("lockedDisplayName", activeLang);
  const teacherLabel = getDualText("teacherLabel", activeLang);
  const openAppBtn = getDualText("openAppBtn", activeLang);
  const openBrowserBtn = getDualText("openBrowserBtn", activeLang);
  const copyBtn = getDualText("copyMeetingInfo", activeLang);
  const copiedText = getDualText("copied", activeLang);

  const zoomAppUrl = buildZoomAppUrl(
    session.zoom_meeting_id,
    session.zoom_passcode,
    student.full_name
  );
  const zoomWebUrl = buildZoomWebUrl(
    session.zoom_meeting_id,
    session.zoom_passcode,
    student.full_name
  );

  // Auto-launch Zoom app after countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = zoomAppUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [zoomAppUrl]);

  const copyMeetingInfo = () => {
    const info = `Zoom Meeting: ${session.zoom_meeting_id}\nPasscode: ${session.zoom_passcode}`;
    navigator.clipboard.writeText(info);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div dir="ltr" className="w-full max-w-xl mx-auto rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-indigo-50/80 text-left">
      {/* Top Success Badge */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-3 sm:mb-4 animate-bounce shrink-0">
          <IoCheckmarkCircle className="h-10 w-10 sm:h-12 sm:w-12 text-emerald-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{successTitle.primary}</h2>
        <div className="text-xs sm:text-sm font-semibold text-emerald-700 font-arabic mt-0.5">
          {successTitle.ar}
        </div>

        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          {countdown > 0 ? `${successSubtitle.primary} (${countdown}s)` : manualNotice.primary}
        </p>
        <p className="text-xs text-slate-500 font-arabic mt-0.5">
          {countdown > 0 ? successSubtitle.ar : manualNotice.ar}
        </p>
      </div>

      {/* Student & Room Info Card */}
      <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 sm:p-5 mb-5 sm:mb-6 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              {nameLabel.primary}
            </span>
            <span className="text-[10px] text-slate-400 font-arabic block">
              {nameLabel.ar}
            </span>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-semibold inline-flex items-center gap-1">
            <span>{lockedBadge.primary}</span>
            <span className="text-[10px] font-arabic font-normal text-indigo-500">• {lockedBadge.ar}</span>
          </span>
        </div>

        <div className="text-lg sm:text-xl font-bold text-slate-900">{student.full_name}</div>

        {session.halaqahs?.teacher_name && (
          <div className="text-xs text-indigo-800 font-medium">
            <span>🎙️ {teacherLabel.primary} </span>
            <span className="font-bold text-indigo-900">{session.halaqahs.teacher_name}</span>
            <span className="text-slate-400 mx-1.5">•</span>
            <span className="font-arabic text-indigo-600 font-semibold">
              {teacherLabel.ar} {translateTeacherNameToAr(session.halaqahs.teacher_name)}
            </span>
          </div>
        )}

        {onReset && (
          <div className="pt-0.5">
            <button
              type="button"
              onClick={onReset}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>{activeLang === "EN" ? "← Not you? Switch number" : "← Bukan Anda? Ganti nomor HP"}</span>
            </button>
          </div>
        )}

        <div className="border-t border-slate-200/60 pt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
          <div>
            Meeting ID:{" "}
            <span className="font-mono font-semibold text-slate-800">
              {session.zoom_meeting_id}
            </span>
            {session.zoom_passcode && (
              <span className="ml-3">
                Pass:{" "}
                <span className="font-mono font-semibold text-slate-800">
                  {session.zoom_passcode}
                </span>
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={copyMeetingInfo}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium transition-colors cursor-pointer"
          >
            {copied ? <IoCheckmark className="h-3.5 w-3.5 text-emerald-600" /> : <IoCopyOutline className="h-3.5 w-3.5" />}
            <span>{copied ? copiedText.primary : copyBtn.primary}</span>
          </button>
        </div>
      </div>

      {/* Direct Launch Buttons */}
      <div className="space-y-2.5 sm:space-y-3">
        <a
          href={zoomAppUrl}
          className="w-full flex flex-col items-center justify-center rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 sm:py-3.5 px-6 shadow-lg shadow-indigo-600/25 transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-2 text-sm sm:text-base font-bold">
            <IoVideocam className="h-5 w-5" />
            <span>{openAppBtn.primary}</span>
            <IoArrowForward className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
          <span className="text-xs font-normal opacity-90 font-arabic mt-0.5">
            {openAppBtn.ar}
          </span>
        </a>

        <a
          href={zoomWebUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex flex-col items-center justify-center rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2.5 sm:py-3 px-6 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
            <IoGlobeOutline className="h-4 w-4" />
            <span>{openBrowserBtn.primary}</span>
          </div>
          <span className="text-[11px] font-normal text-slate-500 font-arabic mt-0.5">
            {openBrowserBtn.ar}
          </span>
        </a>
      </div>
    </div>
  );
}
