'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  IoSchool,
  IoAlertCircle,
  IoArrowForward,
  IoKey,
  IoGlobeOutline,
} from 'react-icons/io5';
import TeacherAutoLaunchView from './TeacherAutoLaunchView';
import {
  buildZoomAppUrl,
  buildZoomWebUrl,
  sanitizeInputText,
  translateTitleToAr,
  translateTeacherNameToAr,
} from '@/lib/attendance.utils';
import { teacherStrings, type TeacherGateLang } from '@/lib/teacher.strings';
import { supabase, type AttendanceSession } from '@/lib/supabase';

interface TeacherGateViewProps {
  session: AttendanceSession;
}

export default function TeacherGateView({ session }: TeacherGateViewProps) {
  // 1. Language Priority: Default Arabic (AR), or restore saved preference
  const [lang, setLang] = useState<TeacherGateLang>('AR');

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('fka_teacher_lang') as TeacherGateLang | null;
      if (savedLang && (savedLang === 'AR' || savedLang === 'ID' || savedLang === 'EN')) {
        setLang(savedLang);
      } else {
        setLang('AR'); // Prioritas utama: Bahasa Arab
      }
    } catch {
      setLang('AR');
    }
  }, []);

  const handleLanguageChange = (newLang: TeacherGateLang) => {
    setLang(newLang);
    try {
      localStorage.setItem('fka_teacher_lang', newLang);
    } catch {
      // Ignore if localStorage unavailable
    }
  };

  const isRtl = lang === 'AR';
  const t = teacherStrings[lang];

  useEffect(() => {
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang.toLowerCase());
  }, [isRtl, lang]);

  const teacherName =
    session.halaqahs?.teacher_name?.trim() ||
    session.title?.trim() ||
    'Syaikh / Pengampu';

  const isFemaleTeacher =
    teacherName.toLowerCase().includes('syaikhah') ||
    teacherName.toLowerCase().includes('sheikha') ||
    teacherName.toLowerCase().includes('ustadzah') ||
    teacherName.toLowerCase().includes('ustazah') ||
    teacherName.toLowerCase().includes('samar') ||
    (session.title || '').toLowerCase().includes('akhwat');

  const displayTeacherName =
    lang === 'AR' ? translateTeacherNameToAr(teacherName) || teacherName : teacherName;
  const displayTitle =
    lang === 'AR' ? translateTitleToAr(session.title) || session.title : session.title;

  const teacherBadge =
    lang === 'AR'
      ? isFemaleTeacher
        ? 'بوابة دخول فضيلة الشيخة / المعلّمة'
        : 'بوابة دخول فضيلة الشيخ / المعلّم'
      : t.badge;

  const teacherRoleLabel =
    lang === 'AR'
      ? isFemaleTeacher
        ? 'فضيلة الشيخة / المعلّمة:'
        : 'فضيلة الشيخ / المعلّم:'
      : t.teacherLabel;

  const greetingPrefix =
    lang === 'AR'
      ? isFemaleTeacher
        ? 'أهلاً وسهلاً بفضيلة الشيخة،'
        : 'أهلاً وسهلاً بفضيلة الشيخ،'
      : t.greetingPrefix;

  const expectedPin = session.teacher_pin?.trim() || '1234';
  const storageKey = `fka_teacher_pin_${session.id}`;

  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isRedirectingToSantri, setIsRedirectingToSantri] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(2);

  const zoomAppUrl = buildZoomAppUrl(
    session.zoom_meeting_id,
    session.zoom_passcode,
    teacherName
  );
  const zoomWebUrl = buildZoomWebUrl(
    session.zoom_meeting_id,
    session.zoom_passcode,
    teacherName
  );

  // Merekam waktu masuk pengajar ke Supabase
  const recordTeacherJoin = useCallback(async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const nowIso = new Date().toISOString();

      await supabase
        .from('attendance_sessions')
        .update({
          teacher_joined_at: nowIso,
          teacher_join_date: today,
        })
        .eq('id', session.id);
    } catch (e) {
      console.warn('Gagal mencatat timestamp kehadiran pengajar:', e);
    }
  }, [session.id]);

  // Cek apakah perangkat HP/Laptop pengajar sudah pernah terverifikasi sebelumnya
  useEffect(() => {
    try {
      const savedPin = localStorage.getItem(storageKey);
      if (savedPin === expectedPin) {
        setIsVerified(true);
        recordTeacherJoin();
      }
    } catch {
      // Ignore
    }
  }, [storageKey, expectedPin, recordTeacherJoin]);

  // Auto-launch Zoom jika sudah terverifikasi
  useEffect(() => {
    if (!isVerified) return;

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
  }, [isVerified, zoomAppUrl]);

  // Handle Verifikasi PIN Pengajar
  const handleVerifyPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const cleanPin = sanitizeInputText(pinInput, 10, true);

    if (cleanPin === expectedPin) {
      try {
        localStorage.setItem(storageKey, cleanPin);
      } catch {
        // Ignore
      }
      setIsVerified(true);
      await recordTeacherJoin();
    } else {
      setErrorMessage(t.errorWrongPin);
      setIsRedirectingToSantri(true);

      // Melempar santri yang salah memasukkan PIN ke formulir presensi santri
      setTimeout(() => {
        window.location.href = `/${session.slug}`;
      }, 2500);
    }
    setIsSubmitting(false);
  };

  // Language Switcher Component
  const LanguageSwitcher = (
    <div className="flex items-center justify-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-2xl border border-slate-200/90 shadow-xs text-xs font-semibold mb-5">
      <IoGlobeOutline className="h-4 w-4 text-violet-600 mx-1 shrink-0" />
      {[
        { code: 'AR', label: 'العربية' },
        { code: 'ID', label: 'Indonesia' },
        { code: 'EN', label: 'English' },
      ].map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => handleLanguageChange(code as TeacherGateLang)}
          className={`px-3 py-1 rounded-xl transition-all ${
            lang === code
              ? 'bg-violet-600 text-white font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );

  // ── KASUS 1: Pengajar Sudah Terverifikasi (Auto-Launch Zoom) ───────────────
  if (isVerified) {
    return (
      <TeacherAutoLaunchView
        isRtl={isRtl}
        languageSwitcherNode={LanguageSwitcher}
        verifiedBadge={t.verifiedBadge}
        greetingPrefix={greetingPrefix}
        displayTeacherName={displayTeacherName}
        countdownText={countdown > 0 ? t.redirectingZoom(countdown) : t.openingZoom}
        halaqahLabel={t.halaqahLabel}
        displayTitle={displayTitle}
        zoomNameLabel={t.zoomNameLabel}
        meetingIdLabel={t.meetingIdLabel}
        zoomMeetingId={session.zoom_meeting_id}
        zoomAppUrl={zoomAppUrl}
        zoomWebUrl={zoomWebUrl}
        openZoomAppBtn={t.openZoomAppBtn}
        openZoomWebBtn={t.openZoomWebBtn}
      />
    );
  }

  // ── KASUS 2: Belum Terverifikasi / Input PIN Pengajar ──────────────────────
  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-[#F6F8FC] py-8 px-4 flex flex-col items-center justify-center ${
        isRtl ? 'font-arabic text-right' : 'text-left'
      }`}
    >
      {LanguageSwitcher}

      <div className="w-full max-w-md mx-auto rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-slate-200/80">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="h-16 w-16 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 mb-4 shadow-inner">
            <IoKey className="h-8 w-8 text-violet-600" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-violet-50 text-violet-700 border border-violet-200 mb-2">
            <IoSchool className="h-3.5 w-3.5" />
            <span>{teacherBadge}</span>
          </span>

          <h2 className="text-xl font-bold text-slate-900 mb-1">
            {t.title}
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            {t.halaqahLabel} <span className="font-semibold text-slate-700">{displayTitle}</span>
            <br />
            {teacherRoleLabel} <span className="font-semibold text-violet-700">{displayTeacherName}</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            {t.deviceNote}
          </p>
        </div>

        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-700 text-xs">
            <IoAlertCircle className="h-5 w-5 shrink-0 text-rose-600 mt-0.5" />
            <div>
              <p className="font-bold">{errorMessage}</p>
              {isRedirectingToSantri && (
                <p className="text-[11px] text-rose-600 mt-1">
                  {t.errorRedirectNotice}
                </p>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleVerifyPin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {t.pinLabel}
            </label>
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
              placeholder={t.pinPlaceholder}
              disabled={isSubmitting || isRedirectingToSantri}
              autoFocus
              className="w-full px-4 py-3 text-center text-2xl tracking-[0.4em] font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all disabled:bg-slate-100"
            />
          </div>

          <button
            type="submit"
            disabled={pinInput.length < 4 || isSubmitting || isRedirectingToSantri}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-violet-600 hover:bg-violet-700 active:scale-[0.98] text-white shadow-lg shadow-violet-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>{t.verifyingBtn}</span>
              </>
            ) : (
              <>
                <span>{t.verifyBtn}</span>
                <IoArrowForward className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`} />
              </>
            )}
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-slate-100 text-center">
          <a
            href={`/${session.slug}`}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            {t.notTeacherPrompt}{' '}
            <span className="text-indigo-600 underline">{t.notTeacherLink}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
