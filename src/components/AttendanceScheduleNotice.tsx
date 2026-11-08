'use client';

import React, { useEffect, useState } from 'react';
import {
  IoTimeOutline,
  IoCheckmarkCircleOutline,
  IoCalendarOutline,
  IoLogoWhatsapp,
  IoHourglassOutline,
  IoLockClosedOutline,
} from 'react-icons/io5';
import type { SupportedGateLang } from '@/lib/attendance.utils';
import { ScheduleWindowResult } from '@/lib/schedule.utils';
import IslamicOpeningPrayer from './IslamicOpeningPrayer';

interface AttendanceScheduleNoticeProps {
  schedule: ScheduleWindowResult;
  sessionTitle: string;
  isManuallyDisabled?: boolean;
  lang?: SupportedGateLang;
  onAutoUnlock?: () => void;
}

export function AttendanceScheduleNotice({
  schedule,
  sessionTitle,
  isManuallyDisabled,
  lang = 'ID',
  onAutoUnlock,
}: AttendanceScheduleNoticeProps) {
  const [prevSecondsUntilOpen, setPrevSecondsUntilOpen] = useState(schedule.secondsUntilOpen);
  const [secondsLeft, setSecondsLeft] = useState<number>(schedule.secondsUntilOpen);

  if (schedule.secondsUntilOpen !== prevSecondsUntilOpen) {
    setPrevSecondsUntilOpen(schedule.secondsUntilOpen);
    setSecondsLeft(schedule.secondsUntilOpen);
  }

  const isEn = lang === 'EN';

  useEffect(() => {
    if (schedule.status !== 'beforeOpen' || secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (onAutoUnlock) onAutoUnlock();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [schedule.status, secondsLeft, onAutoUnlock]);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  const nextDesc = isEn
    ? schedule.nextSessionDescEn || schedule.nextSessionDescId
    : schedule.nextSessionDescId;

  // ── Manual Disabled by Admin ───────────────────────────────────────────────
  if (isManuallyDisabled) {
    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600">
          <IoLockClosedOutline className="h-8 w-8" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold mb-3">
          <span>{isEn ? 'Attendance Disabled' : 'Presensi Dinonaktifkan'}</span>
          <span>•</span>
          <span className="font-arabic font-normal">مغلق مؤقتاً</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {isEn ? 'Attendance is Closed' : 'Presensi Sedang Ditutup'}
        </h2>
        <p className="text-sm font-bold text-amber-700 font-arabic mt-1">
          تم إيقاف رابط الحضور مؤقتاً من قبل الإدارة
        </p>
        <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
          {isEn
            ? `The attendance gate for session "${sessionTitle}" is currently disabled by Admin.`
            : `Gerbang presensi untuk sesi "${sessionTitle}" saat ini sedang dinonaktifkan sementara oleh Admin.`}
        </p>
        <p className="text-[11px] text-slate-500 font-arabic leading-relaxed mt-1" dir="rtl">
          رابط تسجيل الحضور لهذه الجلسة مغلق حالياً من قِبل المشرف
        </p>
        <div className="mt-6 pt-5 border-t border-slate-100">
          <a
            href="https://wa.me/6281234567890?text=Assalamu'alaikum%20Admin%20FKA,%20saya%20ingin%20menanyakan%20status%20presensi%20halaqah%20saya."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <IoLogoWhatsapp className="h-4 w-4" />
            <span>{isEn ? 'Contact Admin via WhatsApp' : 'Hubungi Admin via WhatsApp'}</span>
          </a>
        </div>
      </div>
    );
  }

  // ── Case 1: Before Open (Countdown) ────────────────────────────────────────
  if (schedule.status === 'beforeOpen') {
    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 text-center">
        {/* 0. Bismillah & Doa Sebelum Belajar */}
        <IslamicOpeningPrayer lang={lang} />

        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 animate-pulse">
          <IoHourglassOutline className="h-8 w-8" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-3">
          <IoTimeOutline className="h-3.5 w-3.5 text-indigo-600" />
          <span>{isEn ? 'Waiting for Session Gate' : 'Menunggu Waktu Buka'}</span>
          <span className="text-indigo-300">•</span>
          <span className="font-arabic font-normal">يفتح قريباً</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {isEn ? 'Attendance Will Open Soon' : 'Presensi Segera Dibuka'}
        </h2>
        <p className="text-sm font-bold text-indigo-600 font-arabic mt-1">
          سيتم فتح تسجيل الحضور تلقائياً في الموعد المحدد
        </p>

        {/* Big Countdown Timer */}
        <div className="mt-6 grid grid-cols-3 gap-2.5 max-w-xs mx-auto">
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl py-3 px-2 flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black text-indigo-600 font-mono tracking-tight">
              {hours.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-500 mt-1">
              {isEn ? 'Hours / س' : 'Jam / س'}
            </span>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl py-3 px-2 flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black text-indigo-600 font-mono tracking-tight">
              {minutes.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-500 mt-1">
              {isEn ? 'Mins / د' : 'Menit / د'}
            </span>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl py-3 px-2 flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black text-indigo-600 font-mono tracking-tight">
              {seconds.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-500 mt-1">
              {isEn ? 'Secs / ث' : 'Detik / ث'}
            </span>
          </div>
        </div>

        {/* Schedule Info Box */}
        <div className="mt-6 p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100/80 text-left space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-950">
            <IoCalendarOutline className="h-4 w-4 text-indigo-600 shrink-0" />
            <span>
              {isEn
                ? `Class Schedule: ${schedule.startFormatted}`
                : `Jadwal Pembelajaran: ${schedule.startFormatted}`}
            </span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            {isEn
              ? `Attendance opens ${schedule.openMinutesBefore} minutes before class begins (at ${schedule.openFormatted}) and closes automatically when the session ends (at ${schedule.closeFormatted}).`
              : `Presensi dibuka ${schedule.openMinutesBefore} menit sebelum kelas dimulai (pukul ${schedule.openFormatted}) dan ditutup otomatis saat pembelajaran selesai (pukul ${schedule.closeFormatted}).`}
          </p>
          <p className="text-[11px] text-slate-500 font-arabic leading-relaxed" dir="rtl">
            يُفتح تسجيل الحضور قبل {schedule.openMinutesBefore} دقيقة من موعد البداية ويُغلق تلقائياً بنهاية الجلسة.
          </p>
        </div>

        <p className="mt-4 text-[11px] text-slate-400">
          {isEn
            ? 'This page will automatically unlock when attendance starts without needing to refresh.'
            : 'Halaman ini akan terbuka otomatis saat waktu presensi tiba tanpa perlu dimuat ulang.'}
        </p>
        <p className="text-[11px] text-slate-400 font-arabic mt-0.5" dir="rtl">
          سيتم فتح هذه الصفحة تلقائياً عند حلول موعد الحضور دون الحاجة لتحديث الصفحة.
        </p>
      </div>
    );
  }

  // ── Case 2: Meeting Finished / Closed ──────────────────────────────────────
  if (schedule.status === 'closed') {
    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
          <IoTimeOutline className="h-8 w-8" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold mb-3">
          <span>{isEn ? "Today's Session Ended" : 'Sesi Hari Ini Selesai'}</span>
          <span className="text-rose-300">•</span>
          <span className="font-arabic font-normal">انتهت الجلسة</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {isEn ? 'Attendance is Closed' : 'Presensi Telah Ditutup'}
        </h2>
        <p className="text-sm font-bold text-rose-600 font-arabic mt-1">
          انتهت جلسة تسجيل الحضور لهذا اليوم
        </p>

        <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
          {isEn
            ? `The class session for "${sessionTitle}" ended at ${schedule.closeFormatted}.`
            : `Pembelajaran untuk sesi "${sessionTitle}" telah selesai pada pukul ${schedule.closeFormatted}.`}
        </p>
        <p className="text-[11px] text-slate-500 font-arabic leading-relaxed mt-1" dir="rtl">
          انتهت جلسة هذه الحلقة في الساعة المحددة
        </p>

        {/* Next Session Box */}
        <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-start space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {isEn ? 'Next Attendance Schedule:' : 'Jadwal Presensi Berikutnya:'}
          </span>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800">
            <IoCalendarOutline className="h-4 w-4 text-indigo-600 shrink-0" />
            <span>{nextDesc}</span>
          </div>
          <p className="text-[11px] text-slate-500 font-arabic pt-0.5" dir="rtl">
            {schedule.nextSessionDescAr}
          </p>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-100">
          <a
            href="https://wa.me/6281234567890?text=Assalamu'alaikum%20Admin%20FKA,%20saya%20terlambat%20mengisi%20presensi%20halaqah."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <IoLogoWhatsapp className="h-4 w-4" />
            <span>
              {isEn
                ? 'Confirm Late Attendance via WhatsApp'
                : 'Konfirmasi Keterlambatan ke Admin'}
            </span>
          </a>
        </div>
      </div>
    );
  }

  // ── Case 3: Not Scheduled Today ───────────────────────────────────────────
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
        <IoCalendarOutline className="h-8 w-8" />
      </div>

      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-3">
        <span>{isEn ? 'Outside Class Schedule' : 'Di Luar Jadwal'}</span>
        <span className="text-indigo-300">•</span>
        <span className="font-arabic font-normal">خارج أوقات الحلقة</span>
      </div>

      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
        {isEn ? 'No Class Scheduled Today' : 'Tidak Ada Pertemuan Hari Ini'}
      </h2>
      <p className="text-sm font-bold text-indigo-600 font-arabic mt-1">
        لا توجد جلسة مخصصة للحلقة في هذا اليوم
      </p>

      <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
        {isEn
          ? `The attendance gate for halaqah "${sessionTitle}" is only accessible during scheduled days and times.`
          : `Laman presensi untuk halaqah "${sessionTitle}" hanya dapat diisi pada hari dan jam yang telah dijadwalkan.`}
      </p>
      <p className="text-[11px] text-slate-500 font-arabic leading-relaxed mt-1" dir="rtl">
        رابط تسجيل الحضور متاح فقط في الأيام والأوقات المحددة للجدول الدراسي
      </p>

      {/* Next Session Box */}
      <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left space-y-1.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          {isEn ? 'Next Scheduled Meeting:' : 'Pertemuan Selanjutnya:'}
        </span>
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800">
          <IoCheckmarkCircleOutline className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{nextDesc}</span>
        </div>
        <p className="text-[11px] text-slate-500 font-arabic pt-0.5" dir="rtl">
          {schedule.nextSessionDescAr}
        </p>
      </div>

      <div className="mt-6 pt-5 border-t border-slate-100">
        <a
          href="https://wa.me/6281234567890?text=Assalamu'alaikum%20Admin%20FKA,%20saya%20ingin%20menanyakan%20jadwal%20halaqah%20saya."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
        >
          <IoLogoWhatsapp className="h-4 w-4" />
          <span>
            {isEn ? 'Inquire Schedule via WhatsApp Admin' : 'Tanya Jadwal via WhatsApp Admin'}
          </span>
        </a>
      </div>
    </div>
  );
}
