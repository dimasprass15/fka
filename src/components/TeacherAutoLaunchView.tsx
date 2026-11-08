'use client';

import React from 'react';
import {
  IoSchool,
  IoCheckmarkCircle,
  IoArrowForward,
  IoVideocam,
  IoPersonOutline,
} from 'react-icons/io5';

interface TeacherAutoLaunchViewProps {
  isRtl: boolean;
  languageSwitcherNode: React.ReactNode;
  verifiedBadge: string;
  greetingPrefix: string;
  displayTeacherName: string;
  countdownText: string;
  halaqahLabel: string;
  displayTitle: string;
  zoomNameLabel: string;
  meetingIdLabel: string;
  zoomMeetingId: string;
  zoomAppUrl: string;
  zoomWebUrl: string;
  openZoomAppBtn: string;
  openZoomWebBtn: string;
}

export default function TeacherAutoLaunchView({
  isRtl,
  languageSwitcherNode,
  verifiedBadge,
  greetingPrefix,
  displayTeacherName,
  countdownText,
  halaqahLabel,
  displayTitle,
  zoomNameLabel,
  meetingIdLabel,
  zoomMeetingId,
  zoomAppUrl,
  zoomWebUrl,
  openZoomAppBtn,
  openZoomWebBtn,
}: TeacherAutoLaunchViewProps) {
  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-[#F6F8FC] py-8 px-4 flex flex-col items-center justify-center ${
        isRtl ? 'font-arabic text-right' : 'text-left'
      }`}
    >
      {languageSwitcherNode}

      <div className="w-full max-w-lg mx-auto rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-violet-100">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="h-16 w-16 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 mb-4 animate-bounce shrink-0 shadow-inner">
            <IoSchool className="h-9 w-9 text-violet-700" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-violet-50 text-violet-700 border border-violet-200 mb-2">
            <IoCheckmarkCircle className="h-3.5 w-3.5 text-violet-600" />
            <span>{verifiedBadge}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1">
            {greetingPrefix} {displayTeacherName}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {countdownText}
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-4 mb-5">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-500 font-medium">{halaqahLabel}</span>
            <span className="font-bold text-slate-800">{displayTitle}</span>
          </div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-500 font-medium">{zoomNameLabel}</span>
            <span className="font-bold text-violet-700 flex items-center gap-1">
              <IoPersonOutline className="h-3.5 w-3.5" />
              {displayTeacherName}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">{meetingIdLabel}</span>
            <span className="font-mono font-bold text-slate-700">{zoomMeetingId}</span>
          </div>
        </div>

        <div className="space-y-2.5">
          <a
            href={zoomAppUrl}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-violet-600 hover:bg-violet-700 active:scale-[0.98] text-white shadow-lg shadow-violet-500/25 transition-all"
          >
            <IoVideocam className="h-4 w-4" />
            <span>{openZoomAppBtn}</span>
            <IoArrowForward className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
          </a>

          <a
            href={zoomWebUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-600 hover:bg-slate-100 transition-all"
          >
            {openZoomWebBtn}
          </a>
        </div>
      </div>
    </div>
  );
}
