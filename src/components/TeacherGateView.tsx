'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  IoSchool,
  IoCheckmarkCircle,
  IoAlertCircle,
  IoArrowForward,
  IoKey,
  IoVideocam,
  IoPersonOutline,
} from 'react-icons/io5';
import {
  buildZoomAppUrl,
  buildZoomWebUrl,
  sanitizeInputText,
} from '@/lib/attendance.utils';
import { supabase, type AttendanceSession } from '@/lib/supabase';

interface TeacherGateViewProps {
  session: AttendanceSession;
}

export default function TeacherGateView({ session }: TeacherGateViewProps) {
  const teacherName =
    session.halaqahs?.teacher_name?.trim() ||
    session.title?.trim() ||
    'Syaikh / Pengampu';

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
      // localStorage mungkin dinonaktifkan di private mode
    }
  }, [storageKey, expectedPin, recordTeacherJoin]);

  // Countdown & Auto-launch Zoom jika sudah terverifikasi
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
        // Abaikan jika private browsing
      }
      setIsVerified(true);
      await recordTeacherJoin();
    } else {
      setErrorMessage('PIN Pengajar Salah. Anda bukan pengampu terdaftar.');
      setIsRedirectingToSantri(true);

      // Melempar santri yang salah memasukkan PIN ke formulir presensi santri
      setTimeout(() => {
        window.location.href = `/${session.slug}`;
      }, 2500);
    }
    setIsSubmitting(false);
  };

  // ── KASUS 1: Pengajar Sudah Terverifikasi (Auto-Launch Zoom) ───────────────
  if (isVerified) {
    return (
      <div dir="ltr" className="min-h-screen bg-[#F6F8FC] py-8 px-4 flex flex-col items-center justify-center text-left">
        <div className="w-full max-w-lg mx-auto rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-violet-100 text-left">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="h-16 w-16 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 mb-4 animate-bounce shrink-0 shadow-inner">
              <IoSchool className="h-9 w-9 text-violet-700" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-violet-50 text-violet-700 border border-violet-200 mb-2">
              <IoCheckmarkCircle className="h-3.5 w-3.5 text-violet-600" />
              <span>Akses Khusus Pengampu / Syaikh Terverifikasi</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-1">
              Ahlan wa Sahlan, {teacherName}
            </h2>
            <p className="text-sm font-semibold text-violet-800 font-arabic mb-3" dir="rtl">
              أهلاً وسهلاً بفضيلة الشيخ، حياكم الله
            </p>

            <p className="text-xs sm:text-sm text-slate-600">
              {countdown > 0
                ? `Mengarahkan langsung ke aplikasi Zoom (${countdown}s)...`
                : 'Aplikasi Zoom sedang dibuka...'}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-4 mb-5">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-500 font-medium">Halaqah:</span>
              <span className="font-bold text-slate-800">{session.title}</span>
            </div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-500 font-medium">Nama di Zoom:</span>
              <span className="font-bold text-violet-700 flex items-center gap-1">
                <IoPersonOutline className="h-3.5 w-3.5" />
                {teacherName}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Meeting ID:</span>
              <span className="font-mono font-bold text-slate-700">{session.zoom_meeting_id}</span>
            </div>
          </div>

          <div className="space-y-2.5">
            <a
              href={zoomAppUrl}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-violet-600 hover:bg-violet-700 active:scale-[0.98] text-white shadow-lg shadow-violet-500/25 transition-all"
            >
              <IoVideocam className="h-4 w-4" />
              Buka Aplikasi Zoom Sekarang
              <IoArrowForward className="h-4 w-4" />
            </a>

            <a
              href={zoomWebUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-slate-600 hover:bg-slate-100 transition-all"
            >
              Gunakan Zoom Web Browser
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ── KASUS 2: Belum Terverifikasi / Input PIN Pengajar ──────────────────────
  return (
    <div dir="ltr" className="min-h-screen bg-[#F6F8FC] py-8 px-4 flex flex-col items-center justify-center text-left">
      <div className="w-full max-w-md mx-auto rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-slate-200/80 text-left">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="h-16 w-16 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 mb-4 shadow-inner">
            <IoKey className="h-8 w-8 text-violet-600" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-violet-50 text-violet-700 border border-violet-200 mb-2">
            <IoSchool className="h-3.5 w-3.5" />
            <span>Gerbang Masuk Pengampu / Syaikh</span>
          </span>

          <h2 className="text-xl font-bold text-slate-900 mb-1">
            Verifikasi PIN Pengajar
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Halaqah: <span className="font-semibold text-slate-700">{session.title}</span>
            <br />
            Pengampu: <span className="font-semibold text-violet-700">{teacherName}</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            (PIN hanya perlu dimasukkan satu kali pada perangkat HP / Laptop ini)
          </p>
        </div>

        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-700 text-xs">
            <IoAlertCircle className="h-5 w-5 shrink-0 text-rose-600 mt-0.5" />
            <div>
              <p className="font-bold">{errorMessage}</p>
              {isRedirectingToSantri && (
                <p className="text-[11px] text-rose-600 mt-1">
                  Mengalihkan Anda ke formulir presensi santri dalam 2 detik...
                </p>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleVerifyPin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Masukkan PIN Pengajar (4-6 Digit):
            </label>
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
              placeholder="••••"
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
                <span>Memverifikasi...</span>
              </>
            ) : (
              <>
                <span>Verifikasi & Masuk Zoom</span>
                <IoArrowForward className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-slate-100 text-center">
          <a
            href={`/${session.slug}`}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            Bukan Pengajar? <span className="text-indigo-600 underline">Buka Presensi Santri</span>
          </a>
        </div>
      </div>
    </div>
  );
}
