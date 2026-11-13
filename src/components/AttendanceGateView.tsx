'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  getDualText,
  sanitizePhoneNumber,
  sanitizeInputText,
  type SupportedGateLang,
} from '@/lib/attendance.utils';
import {
  type AttendanceSession,
  type Student,
  type AttendanceRecord,
  type DynamicFormField,
} from '@/lib/supabase';
import {
  DEFAULT_DYNAMIC_FIELDS,
  lookupStudentByPhone,
  checkStudentTodayAttendance,
  reconnectStudentAttendance,
  upsertStudentAndRecord,
} from '@/lib/attendance.service';
import {
  evaluateScheduleWindow,
  type ScheduleWindowResult,
} from '@/lib/schedule.utils';
import { useAttendanceRoleDetection } from '@/hooks/useAttendanceRoleDetection';
import AttendanceGateSuccess from './AttendanceGateSuccess';
import AttendanceExcuseModal from './AttendanceExcuseModal';
import AttendanceGateActiveForm from './AttendanceGateActiveForm';
import { AttendanceGateHeader } from './AttendanceGateHeader';
import AttendanceGateClosedView from './AttendanceGateClosedView';
import TeacherGateView from './TeacherGateView';
import SupervisorAutoLaunchView from './SupervisorAutoLaunchView';

interface AttendanceGateViewProps {
  session: AttendanceSession;
}

export default function AttendanceGateView({ session }: AttendanceGateViewProps) {
  const { language, setLanguage } = useLanguage();
  const activeLang: SupportedGateLang = language === 'EN' ? 'EN' : 'ID';
  const titleSuffix = getDualText('titleSuffix', activeLang);

  const cfg = session.form_config;
  const fields: DynamicFormField[] =
    cfg?.fields && cfg.fields.length > 0 ? cfg.fields : DEFAULT_DYNAMIC_FIELDS;
  const phoneField =
    fields.find((f) => f.is_student_phone || f.type === 'phone' || f.id === 'phone') || fields[0];
  const nameField = fields.find((f) => f.is_student_name || f.id === 'name') || fields[1];

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
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccessView, setIsSuccessView] = useState(false);
  const [showExcuseModal, setShowExcuseModal] = useState(false);

  const { isTeacherDetected, detectedSupervisor, checkSpecialRole } =
    useAttendanceRoleDetection(session);

  const formTitle = cfg?.form_title || session.title;
  const formDesc = cfg?.form_description || cfg?.announcement;

  const checkTodayAttendance = useCallback(
    async (studentId: string): Promise<boolean> => {
      try {
        const record = await checkStudentTodayAttendance(session.id, studentId);
        if (record) {
          if (record.status === 'hadir' || record.status === 'terlambat') {
            const { nextReconnect, joinTime } = await reconnectStudentAttendance(
              record.id,
              record.reconnect_count
            );
            setTodayRecord({
              ...record,
              reconnect_count: nextReconnect,
              zoom_join_time: joinTime,
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

      // Cek apakah nomor WA pengampu atau pengawas
      const specialRole = await checkSpecialRole(formatted, rawPhone);
      if (specialRole) return;

      setIsSearching(true);
      setErrorMessage('');

      try {
        const found = await lookupStudentByPhone(formatted);
        if (found) {
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
    [checkSpecialRole, phoneField.id, nameField, checkTodayAttendance]
  );

  useEffect(() => {
    try {
      const savedPhone = localStorage.getItem('fka_student_phone');
      if (savedPhone) {
        setAnswers((prev) => ({ ...prev, [phoneField.id]: savedPhone }));
        lookupPhone(savedPhone);
      }
    } catch {}
  }, [lookupPhone, phoneField.id]);

  const handleFieldChange = (fieldId: string, val: string) => {
    setAnswers((prev) => ({ ...prev, [fieldId]: val }));
    if (fieldId === phoneField.id) {
      const cleanDigits = val.replace(/\D/g, '');
      if (cleanDigits.length >= 9) {
        lookupPhone(val);
      } else if (student) {
        setStudent(null);
      }
    }
  };

  const handleJoinZoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const rawPhone = answers[phoneField.id] || '';
      const formattedPhone = sanitizePhoneNumber(rawPhone);

      // Cek apakah nomor pengampu atau pengawas
      const specialRole = await checkSpecialRole(formattedPhone, rawPhone);
      if (specialRole) {
        setIsSubmitting(false);
        return;
      }

      const currentSchedule = computeSchedule();
      if (currentSchedule && !currentSchedule.isOpen) {
        setSchedule(currentSchedule);
        throw new Error(
          activeLang === 'EN'
            ? 'Attendance for this session is currently closed.'
            : 'Waktu presensi untuk pertemuan ini telah berakhir.'
        );
      }

      if (formattedPhone.length < 9 || formattedPhone.length > 20) {
        throw new Error(
          activeLang === 'EN'
            ? 'Invalid WhatsApp number. Please enter a valid active number.'
            : 'Nomor WhatsApp tidak valid. Mohon masukkan nomor aktif yang benar.'
        );
      }

      const rawFullName = student
        ? student.full_name
        : (nameField ? answers[nameField.id] : '') || 'Santri';
      const studentFullName = sanitizeInputText(rawFullName, 80, true);

      if (!studentFullName.trim()) {
        throw new Error(
          activeLang === 'EN'
            ? 'Please complete your name on the form.'
            : 'Mohon lengkapi nama Anda pada formulir.'
        );
      }

      const initialStatus =
        currentSchedule && currentSchedule.isLate ? 'terlambat' : 'hadir';

      const { student: updatedStudent, record } = await upsertStudentAndRecord({
        session,
        formattedPhone,
        fullName: studentFullName,
        gender: answers['gender'] || 'ikhwan',
        existingStudent: student,
        status: initialStatus,
        answers,
      });

      setStudent(updatedStudent);
      setTodayRecord(record);
      setIsSuccessView(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Terjadi kesalahan sistem';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectGateLang = (lang: 'ID' | 'EN' | 'AR') => {
    setLanguage(lang);
  };

  const resetAccount = () => {
    try {
      localStorage.removeItem('fka_student_phone');
    } catch {}
    setStudent(null);
    setTodayRecord(null);
    setIsSuccessView(false);
    setAnswers({});
  };

  // ── Render Case -1: Deteksi Nomor Pengawas -> Auto-Launch Zoom Pengawas ──────
  if (detectedSupervisor) {
    return <SupervisorAutoLaunchView session={session} supervisor={detectedSupervisor} />;
  }

  // ── Render Case 0: Deteksi Nomor Pengampu -> Langsung Masuk Gerbang Pengajar ──
  if (isTeacherDetected) {
    return <TeacherGateView session={session} />;
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
        <AttendanceGateActiveForm
          session={session}
          formTitle={formTitle}
          formDesc={formDesc}
          activeLang={activeLang}
          errorMessage={errorMessage}
          student={student}
          todayRecord={todayRecord}
          onResetAccount={resetAccount}
          remainingFields={remainingFields}
          answers={answers}
          onAnswerChange={handleFieldChange}
          phoneFieldId={phoneField.id}
          isSearching={isSearching}
          isSubmitting={isSubmitting}
          onOpenExcuseModal={() => setShowExcuseModal(true)}
          onSubmit={handleJoinZoom}
        />
      </main>

      <footer className="max-w-xl mx-auto w-full text-center text-xs text-slate-400 py-4">
        SM-FK Presence Engine &bull; Fastabiqul Khairat Academy
      </footer>

      {showExcuseModal && student && (
        <AttendanceExcuseModal
          session={session}
          student={student}
          lang={activeLang}
          onClose={() => setShowExcuseModal(false)}
          onSubmitted={() => {
            setShowExcuseModal(false);
            if (student) checkTodayAttendance(student.id);
          }}
        />
      )}
    </div>
  );
}
