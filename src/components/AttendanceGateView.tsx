'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  IoVideocam,
  IoArrowForward,
  IoDocumentText,
  IoAlertCircle,
} from 'react-icons/io5';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  getDualText,
  sanitizePhoneNumber,
  sanitizeInputText,
  type SupportedGateLang,
} from '@/lib/attendance.utils';
import {
  supabase,
  type AttendanceSession,
  type Student,
  type AttendanceRecord,
  type DynamicFormField,
} from '@/lib/supabase';
import {
  evaluateScheduleWindow,
  type ScheduleWindowResult,
} from '@/lib/schedule.utils';
import AttendanceGateSuccess from './AttendanceGateSuccess';
import AttendanceExcuseModal from './AttendanceExcuseModal';
import AttendanceFormHeader from './AttendanceFormHeader';
import DynamicFormQuestions from './DynamicFormQuestions';
import { AttendanceGateHeader } from './AttendanceGateHeader';
import { AttendanceRecognizedStudent } from './AttendanceRecognizedStudent';
import AttendanceGateClosedView from './AttendanceGateClosedView';

interface AttendanceGateViewProps {
  session: AttendanceSession;
}

export default function AttendanceGateView({ session }: AttendanceGateViewProps) {
  const { language, setLanguage } = useLanguage();
  const activeLang: SupportedGateLang = language === 'EN' ? 'EN' : 'ID';

  const badgeText = getDualText('badge', activeLang);
  const titleSuffix = getDualText('titleSuffix', activeLang);
  const teacherText = getDualText('teacherLabel', activeLang);
  const welcomeBack = getDualText('welcomeBack', activeLang);
  const changeNumber = getDualText('changeNumber', activeLang);
  const alreadyAttended = getDualText('alreadyAttendedNote', activeLang);
  const joinBtnText = getDualText('joinZoomBtn', activeLang);
  const rejoinBtnText = getDualText('rejoinZoomBtn', activeLang);
  const submittingText = getDualText('submitting', activeLang);
  const excuseBtnText = getDualText('excuseBtn', activeLang);

  const defaultFields: DynamicFormField[] = [
    { id: 'phone', label: 'Nomor WhatsApp Santri', type: 'phone', required: true, is_student_phone: true },
    { id: 'name', label: 'Nama Lengkap Santri', type: 'text', required: true, is_student_name: true },
    { id: 'gender', label: 'Kategori Santri', type: 'radio', options: ['Ikhwan (Laki-laki)', 'Akhwat (Perempuan)'], required: true },
  ];

  const cfg = session.form_config;
  const fields: DynamicFormField[] =
    cfg?.fields && cfg.fields.length > 0 ? cfg.fields : defaultFields;

  const phoneField =
    fields.find((f) => f.is_student_phone || f.type === 'phone' || f.id === 'phone') || fields[0];
  const nameField =
    fields.find((f) => f.is_student_name || f.id === 'name') || fields[1];

  const computeSchedule = useCallback((): ScheduleWindowResult | null => {
    if (
      session.halaqahs?.utc_hour !== undefined &&
      session.halaqahs?.utc_minute !== undefined
    ) {
      return evaluateScheduleWindow({
        utcHour: session.halaqahs.utc_hour,
        utcMinute: session.halaqahs.utc_minute,
        openMinutesBefore: cfg?.open_minutes_before,
        sessionDurationMinutes: cfg?.session_duration_minutes,
        lateToleranceMinutes: cfg?.late_tolerance_minutes,
        activeDays: cfg?.active_days,
      });
    }
    return null;
  }, [session, cfg]);

  const [schedule, setSchedule] = useState<ScheduleWindowResult | null>(() => computeSchedule());
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [student, setStudent] = useState<Student | null>(null);
  const [todayRecord, setTodayRecord] = useState<AttendanceRecord | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAutoChecking, setIsAutoChecking] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccessView, setIsSuccessView] = useState(false);
  const [showExcuseModal, setShowExcuseModal] = useState(false);

  const formTitle = cfg?.form_title || session.title;
  const formDesc = cfg?.form_description || cfg?.announcement;

  const checkTodayAttendance = useCallback(
    async (studentId: string): Promise<boolean> => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const { data, error } = await supabase
          .from('attendance_records')
          .select('*')
          .eq('session_id', session.id)
          .eq('student_id', studentId)
          .eq('session_date', today)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          const record = data as AttendanceRecord;
          // Jika sudah hadir/terlambat hari ini ➡️ langsung reconnect tanpa isi form lagi!
          if (record.status === 'hadir' || record.status === 'terlambat') {
            const nowIso = new Date().toISOString();
            const nextReconnect = (record.reconnect_count || 0) + 1;

            await supabase
              .from('attendance_records')
              .update({
                reconnect_count: nextReconnect,
                zoom_join_time: nowIso,
                zoom_leave_time: null,
              })
              .eq('id', record.id);

            setTodayRecord({
              ...record,
              reconnect_count: nextReconnect,
              zoom_join_time: nowIso,
              zoom_leave_time: null,
            });
            setIsSuccessView(true);
            return true;
          }

          setTodayRecord(record);
          return false;
        }

        setTodayRecord(null);
        return false;
      } catch {
        return false;
      }
    },
    [session.id]
  );

  const lookupPhone = useCallback(
    async (rawPhone: string) => {
      const formatted = sanitizePhoneNumber(rawPhone);
      if (formatted.length < 9) return;

      setIsSearching(true);
      setErrorMessage('');

      try {
        const { data, error } = await supabase
          .from('students')
          .select('*')
          .eq('phone_number', formatted)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          const found = data as Student;
          setStudent(found);
          localStorage.setItem('fka_student_phone', formatted);
          setAnswers((prev) => ({
            ...prev,
            [phoneField.id]: formatted,
            ...(nameField ? { [nameField.id]: found.full_name } : {}),
          }));
          await checkTodayAttendance(found.id);
        } else {
          setStudent(null);
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Gagal memeriksa nomor';
        setErrorMessage(msg);
      } finally {
        setIsSearching(false);
      }
    },
    [checkTodayAttendance, phoneField.id, nameField]
  );

  useEffect(() => {
    // Laman presensi WAJIB ber-layout Bahasa Indonesia (ID) & LTR secara default
    const savedGate = typeof window !== 'undefined' ? localStorage.getItem('fka_gate_lang') : null;
    const targetLang = savedGate === 'EN' ? 'EN' : 'ID';
    if (language !== targetLang) {
      setLanguage(targetLang);
    }
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', targetLang.toLowerCase());
  }, [language, setLanguage]);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('fka_student_phone') : null;
    if (saved) {
      const sanitized = sanitizePhoneNumber(saved);
      setAnswers((prev) => ({ ...prev, [phoneField.id]: sanitized }));
      setIsAutoChecking(true);
      lookupPhone(sanitized).finally(() => {
        setIsAutoChecking(false);
      });
    }
  }, [lookupPhone, phoneField.id]);

  const handleSelectGateLang = (newLang: 'AR' | 'ID' | 'EN') => {
    const validGateLang = newLang === 'EN' ? 'EN' : 'ID';
    setLanguage(validGateLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('fka_gate_lang', validGateLang);
    }
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', validGateLang.toLowerCase());
  };

  const handleAnswerChange = (fieldId: string, value: string) => {
    const sanitizedVal = sanitizeInputText(value, 200, false);
    setAnswers((prev) => ({ ...prev, [fieldId]: sanitizedVal }));

    if (fieldId === phoneField.id) {
      if (sanitizedVal.replace(/\D/g, '').length >= 9) {
        lookupPhone(sanitizedVal);
      } else {
        setStudent(null);
      }
    }
  };

  const handleJoinZoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const currentSchedule = computeSchedule();
      if (currentSchedule && !currentSchedule.isOpen) {
        setSchedule(currentSchedule);
        throw new Error(
          activeLang === 'EN'
            ? 'Attendance for this session is currently closed.'
            : 'Waktu presensi untuk pertemuan ini telah berakhir.'
        );
      }

      let currentStudent = student;
      const rawPhone = answers[phoneField.id] || '';
      const formattedPhone = sanitizePhoneNumber(rawPhone);

      if (formattedPhone.length < 9 || formattedPhone.length > 20) {
        throw new Error(
          activeLang === 'EN'
            ? 'Invalid WhatsApp number. Please enter a valid active number.'
            : 'Nomor WhatsApp tidak valid. Mohon masukkan nomor aktif yang benar.'
        );
      }

      const rawFullName = currentStudent
        ? currentStudent.full_name
        : (nameField ? answers[nameField.id] : '') || 'Santri';
      const studentFullName = sanitizeInputText(rawFullName, 80, true);

      if (!studentFullName.trim()) {
        throw new Error(
          activeLang === 'EN'
            ? 'Please complete your name on the form.'
            : 'Mohon lengkapi nama Anda pada formulir.'
        );
      }

      if (!currentStudent) {
        const studentGender = (answers['gender'] || '').toLowerCase().includes('akhwat')
          ? 'akhwat'
          : 'ikhwan';

        const { data: newStudent, error: studentErr } = await supabase
          .from('students')
          .upsert(
            {
              phone_number: formattedPhone,
              full_name: studentFullName.trim(),
              gender: studentGender,
            },
            { onConflict: 'phone_number' }
          )
          .select()
          .single();

        if (studentErr) throw studentErr;
        currentStudent = newStudent as Student;
        setStudent(currentStudent);
        localStorage.setItem('fka_student_phone', formattedPhone);

        if (session.halaqah_id) {
          await supabase.from('halaqah_members').upsert(
            {
              halaqah_id: session.halaqah_id,
              student_id: currentStudent.id,
              status: 'active',
            },
            { onConflict: 'halaqah_id,student_id' }
          );
        }
      }

      const otherAnswers = fields
        .filter((f) => f.id !== phoneField.id && f.id !== nameField?.id)
        .map((f) => `${sanitizeInputText(f.label, 40, true)}: ${sanitizeInputText(answers[f.id] || '-', 100, true)}`)
        .join(' | ');

      const calculatedStatus: 'hadir' | 'terlambat' =
        currentSchedule && currentSchedule.isLate ? 'terlambat' : 'hadir';

      const today = new Date().toISOString().split('T')[0];
      const nowIso = new Date().toISOString();
      const reconnectCount = (todayRecord?.reconnect_count || 0) + (todayRecord ? 1 : 0);

      const { error: attErr } = await supabase.from('attendance_records').upsert(
        {
          session_id: session.id,
          student_id: currentStudent.id,
          session_date: today,
          status: todayRecord?.status === 'terlambat' ? 'terlambat' : calculatedStatus,
          notes: otherAnswers,
          web_submitted_at: todayRecord?.web_submitted_at || nowIso,
          zoom_join_time: nowIso,
          zoom_leave_time: null,
          zoom_duration_minutes: todayRecord?.zoom_duration_minutes || 0,
          reconnect_count: reconnectCount,
        },
        { onConflict: 'session_id,student_id,session_date' }
      );

      if (attErr) throw attErr;

      setIsSuccessView(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Terjadi kesalahan saat presensi.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAccount = () => {
    localStorage.removeItem('fka_student_phone');
    setStudent(null);
    setTodayRecord(null);
    setAnswers({});
    setIsSuccessView(false);
  };

  // ── Render Case 0: Auto-Checking Attendance Spinner ─────────────────────────
  if (isAutoChecking && !isSuccessView) {
    return (
      <div dir="ltr" className="min-h-screen bg-[#F6F8FC] py-8 px-4 flex flex-col items-center justify-center text-center text-left">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin mb-4" />
        <h3 className="text-base font-bold text-slate-800">
          {activeLang === 'EN' ? 'Connecting to Halaqah...' : 'Menghubungkan ke Halaqah...'}
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          {activeLang === 'EN'
            ? 'Checking attendance and reconnecting to Zoom...'
            : 'Mengecek kehadiran & langsung masuk ke Zoom...'}
        </p>
        <span className="text-xs text-indigo-600 font-arabic mt-1.5">
          جارٍ التحقق من الحضور وإعادة التوجيه إلى زووم...
        </span>
      </div>
    );
  }

  // ── Render Case 1: Attendance Success / Reconnect Direct View ───────────────
  if (isSuccessView && student) {
    return (
      <div dir="ltr" className="min-h-screen bg-[#F6F8FC] py-8 sm:py-12 px-3 sm:px-4 flex items-center justify-center text-left">
        <AttendanceGateSuccess
          session={session}
          student={student}
          lang={activeLang}
          onReset={resetAccount}
        />
      </div>
    );
  }

  // ── Render Case 2: Manually Disabled or Outside Scheduled Window ────────────
  const isManuallyClosed = !session.is_active;
  const isOutsideSchedule = schedule !== null && !schedule.isOpen;

  if (isManuallyClosed || isOutsideSchedule) {
    const fallbackSchedule =
      schedule ||
      evaluateScheduleWindow({
        utcHour: session.halaqahs?.utc_hour ?? 0,
        utcMinute: session.halaqahs?.utc_minute ?? 0,
      });

    return (
      <AttendanceGateClosedView
        session={session}
        schedule={fallbackSchedule}
        isManuallyClosed={isManuallyClosed}
        activeLang={activeLang}
        titleSuffix={titleSuffix}
        onSelectLang={handleSelectGateLang}
        onAutoUnlock={() => setSchedule(computeSchedule())}
      />
    );
  }

  // ── Render Case 3: Attendance Gate Open & Active ────────────────────────────
  const currentSubmitBtn = todayRecord ? rejoinBtnText : joinBtnText;
  const remainingFields = student
    ? fields.filter((f) => f.id !== phoneField.id && f.id !== nameField?.id)
    : fields;

  return (
    <div dir="ltr" className="min-h-screen bg-[#F6F8FC] text-slate-900 py-4 sm:py-8 px-3.5 sm:px-6 flex flex-col justify-between text-left">
      <AttendanceGateHeader
        slug={session.slug}
        titlePrimary={titleSuffix.primary}
        titleAr={titleSuffix.ar}
        activeLang={activeLang}
        onSelectLang={handleSelectGateLang}
      />

      <main className="max-w-xl mx-auto w-full my-auto">
        <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
          <AttendanceFormHeader
            session={session}
            formTitle={formTitle}
            formDesc={formDesc}
            badgeText={badgeText}
            teacherText={teacherText}
            lang={activeLang}
          />

          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
              <IoAlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleJoinZoom} className="space-y-4 sm:space-y-5">
            {student && (
              <AttendanceRecognizedStudent
                student={student}
                todayRecord={todayRecord}
                welcomeBack={welcomeBack}
                changeNumber={changeNumber}
                alreadyAttended={alreadyAttended}
                onReset={resetAccount}
              />
            )}

            <DynamicFormQuestions
              fields={remainingFields}
              answers={answers}
              onAnswerChange={handleAnswerChange}
              phoneFieldId={phoneField.id}
              isSearchingPhone={isSearching}
              lang={activeLang}
            />

            <button
              type="submit"
              disabled={isSubmitting || isSearching}
              className="w-full flex flex-col items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold py-3.5 sm:py-4 px-6 shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
            >
              <div className="flex items-center gap-2 text-sm sm:text-base font-bold">
                <IoVideocam className="h-5 w-5 text-indigo-200" />
                <span>{isSubmitting ? submittingText.primary : currentSubmitBtn.primary}</span>
                <IoArrowForward className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
              <span className="text-xs font-normal opacity-90 font-arabic mt-0.5">
                {isSubmitting ? submittingText.ar : currentSubmitBtn.ar}
              </span>
            </button>

            {session.form_config?.allow_excuse && student && (
              <button
                type="button"
                onClick={() => setShowExcuseModal(true)}
                className="w-full flex flex-col items-center justify-center rounded-xl text-slate-600 hover:text-slate-900 py-2 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  <IoDocumentText className="h-3.5 w-3.5 text-slate-500" />
                  <span>{excuseBtnText.primary}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-arabic mt-0.5">
                  {excuseBtnText.ar}
                </span>
              </button>
            )}
          </form>
        </div>
      </main>

      {showExcuseModal && student && (
        <AttendanceExcuseModal
          session={session}
          student={student}
          lang={activeLang}
          onClose={() => setShowExcuseModal(false)}
          onSubmitted={() => checkTodayAttendance(student.id)}
        />
      )}

      <footer className="text-center text-xs text-slate-400 py-4 sm:py-6">
        © {new Date().getFullYear()} Fastabiqul Khairat Academy. All rights reserved.
      </footer>
    </div>
  );
}
