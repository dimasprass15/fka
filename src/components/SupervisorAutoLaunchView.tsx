'use client';

import React, { useState, useEffect } from 'react';
import {
  IoShieldCheckmark,
  IoCheckmarkCircle,
  IoVideocam,
  IoPersonOutline,
  IoGlobeOutline,
} from 'react-icons/io5';
import { buildZoomAppUrl, buildZoomWebUrl, translateTitleToAr } from '@/lib/attendance.utils';
import type { AttendanceSession, SessionSupervisor } from '@/lib/supabase';

export type SupervisorGateLang = 'AR' | 'ID' | 'EN';

interface SupervisorAutoLaunchViewProps {
  session: AttendanceSession;
  supervisor: SessionSupervisor;
}

const STRINGS: Record<
  SupervisorGateLang,
  {
    badge: string;
    greeting: string;
    countdown: (sec: number) => string;
    opening: string;
    halaqahLabel: string;
    zoomNameLabel: string;
    meetingIdLabel: string;
    openAppBtn: string;
    openWebBtn: string;
  }
> = {
  AR: {
    badge: 'تم التحقق بنجاح • وصول خاص بالمشرف',
    greeting: 'أهلاً وسهلاً بحضرة المشرف،',
    countdown: (s) => `جاري التوجيه مباشرة إلى تطبيق زووم (${s} ثوانٍ)...`,
    opening: 'يتم الآن فتح تطبيق زووم...',
    halaqahLabel: 'الحلقة:',
    zoomNameLabel: 'الاسم في زووم:',
    meetingIdLabel: 'معرّف الاجتماع:',
    openAppBtn: 'فتح تطبيق زووم الآن',
    openWebBtn: 'استخدام متصفح الويب لزووم',
  },
  ID: {
    badge: 'Terverifikasi • Akses Khusus Pengawas',
    greeting: 'Selamat datang Pengawas,',
    countdown: (s) => `Mengalihkan Anda ke aplikasi Zoom dalam ${s} detik...`,
    opening: 'Membuka aplikasi Zoom...',
    halaqahLabel: 'Halaqah:',
    zoomNameLabel: 'Nama di Zoom:',
    meetingIdLabel: 'Meeting ID:',
    openAppBtn: 'Buka Aplikasi Zoom Sekarang',
    openWebBtn: 'Gunakan Web Browser',
  },
  EN: {
    badge: 'Verified • Supervisor Access',
    greeting: 'Welcome Supervisor,',
    countdown: (s) => `Redirecting directly to Zoom in ${s} seconds...`,
    opening: 'Opening Zoom application...',
    halaqahLabel: 'Session:',
    zoomNameLabel: 'Name in Zoom:',
    meetingIdLabel: 'Meeting ID:',
    openAppBtn: 'Open Zoom App Now',
    openWebBtn: 'Use Zoom Web Browser',
  },
};

export default function SupervisorAutoLaunchView({
  session,
  supervisor,
}: SupervisorAutoLaunchViewProps) {
  const [lang, setLang] = useState<SupervisorGateLang>('AR');
  const [countdown, setCountdown] = useState<number>(2);

  const isRtl = lang === 'AR';
  const t = STRINGS[lang];

  useEffect(() => {
    try {
      const saved = localStorage.getItem('fka_supervisor_lang') as SupervisorGateLang | null;
      if (saved && (saved === 'AR' || saved === 'ID' || saved === 'EN')) {
        setLang(saved);
      }
    } catch {}
  }, []);

  const handleLangChange = (newLang: SupervisorGateLang) => {
    setLang(newLang);
    try {
      localStorage.setItem('fka_supervisor_lang', newLang);
    } catch {}
  };

  const zoomAppUrl = buildZoomAppUrl(
    session.zoom_meeting_id,
    session.zoom_passcode,
    supervisor.name
  );
  const zoomWebUrl = buildZoomWebUrl(
    session.zoom_meeting_id,
    session.zoom_passcode,
    supervisor.name
  );

  const displayTitle =
    lang === 'AR' ? translateTitleToAr(session.title) || session.title : session.title;

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          try {
            window.location.href = zoomAppUrl;
          } catch {}
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [zoomAppUrl]);

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-[#F6F8FC] py-8 px-4 flex flex-col items-center justify-center ${
        isRtl ? 'font-arabic text-right' : 'text-left'
      }`}
    >
      {/* Language Switcher */}
      <div className="flex items-center justify-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-2xl border border-slate-200/90 shadow-xs text-xs font-semibold mb-5">
        <IoGlobeOutline className="h-4 w-4 text-teal-600 mx-1 shrink-0" />
        {[
          { code: 'AR', label: 'العربية' },
          { code: 'ID', label: 'Indonesia' },
          { code: 'EN', label: 'English' },
        ].map(({ code, label }) => (
          <button
            key={code}
            type="button"
            onClick={() => handleLangChange(code as SupervisorGateLang)}
            className={`px-3 py-1 rounded-xl transition-all ${
              lang === code
                ? 'bg-teal-600 text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="w-full max-w-lg mx-auto rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-teal-100">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="h-16 w-16 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 mb-4 animate-bounce shrink-0 shadow-inner">
            <IoShieldCheckmark className="h-9 w-9 text-teal-700" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 mb-2">
            <IoCheckmarkCircle className="h-3.5 w-3.5 text-teal-600" />
            <span>{t.badge}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1">
            {t.greeting} {supervisor.name}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {countdown > 0 ? t.countdown(countdown) : t.opening}
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-4 mb-5">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-500 font-medium">{t.halaqahLabel}</span>
            <span className="font-bold text-slate-800">{displayTitle}</span>
          </div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-500 font-medium">{t.zoomNameLabel}</span>
            <span className="font-bold text-teal-700 flex items-center gap-1">
              <IoPersonOutline className="h-3.5 w-3.5" />
              {supervisor.name}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">{t.meetingIdLabel}</span>
            <span className="font-mono font-bold text-slate-700">{session.zoom_meeting_id}</span>
          </div>
        </div>

        <div className="space-y-2.5">
          <a
            href={zoomAppUrl}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-teal-600 hover:bg-teal-700 active:scale-[0.98] text-white shadow-lg shadow-teal-500/25 transition-all"
          >
            <IoVideocam className="h-4 w-4" />
            <span>{t.openAppBtn}</span>
          </a>

          <a
            href={zoomWebUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            {t.openWebBtn}
          </a>
        </div>
      </div>
    </div>
  );
}
