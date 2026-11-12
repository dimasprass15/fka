'use client';

import React from 'react';
import {
  IoVideocam,
  IoArrowForward,
  IoDocumentText,
  IoAlertCircle,
} from 'react-icons/io5';
import { getDualText, type SupportedGateLang } from '@/lib/attendance.utils';
import type { AttendanceSession, Student, AttendanceRecord, DynamicFormField } from '@/lib/supabase';
import AttendanceFormHeader from './AttendanceFormHeader';
import DynamicFormQuestions from './DynamicFormQuestions';
import { AttendanceRecognizedStudent } from './AttendanceRecognizedStudent';

interface AttendanceGateActiveFormProps {
  session: AttendanceSession;
  formTitle: string;
  formDesc?: string;
  activeLang: SupportedGateLang;
  errorMessage?: string;
  student: Student | null;
  todayRecord: AttendanceRecord | null;
  onResetAccount: () => void;
  remainingFields: DynamicFormField[];
  answers: Record<string, string>;
  onAnswerChange: (fieldId: string, value: string) => void;
  phoneFieldId: string;
  isSearching: boolean;
  isSubmitting: boolean;
  onOpenExcuseModal: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function AttendanceGateActiveForm({
  session,
  formTitle,
  formDesc,
  activeLang,
  errorMessage,
  student,
  todayRecord,
  onResetAccount,
  remainingFields,
  answers,
  onAnswerChange,
  phoneFieldId,
  isSearching,
  isSubmitting,
  onOpenExcuseModal,
  onSubmit,
}: AttendanceGateActiveFormProps) {
  const badgeText = getDualText('badge', activeLang);
  const teacherText = getDualText('teacherLabel', activeLang);
  const welcomeBack = getDualText('welcomeBack', activeLang);
  const changeNumber = getDualText('changeNumber', activeLang);
  const alreadyAttended = getDualText('alreadyAttendedNote', activeLang);
  const joinBtnText = getDualText('joinZoomBtn', activeLang);
  const rejoinBtnText = getDualText('rejoinZoomBtn', activeLang);
  const submittingText = getDualText('submitting', activeLang);
  const excuseBtnText = getDualText('excuseBtn', activeLang);

  const currentSubmitBtn = todayRecord ? rejoinBtnText : joinBtnText;

  return (
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

      <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
        {student && (
          <AttendanceRecognizedStudent
            student={student}
            todayRecord={todayRecord}
            welcomeBack={welcomeBack}
            changeNumber={changeNumber}
            alreadyAttended={alreadyAttended}
            onReset={onResetAccount}
          />
        )}

        <DynamicFormQuestions
          fields={remainingFields}
          answers={answers}
          onAnswerChange={onAnswerChange}
          phoneFieldId={phoneFieldId}
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
            onClick={onOpenExcuseModal}
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
  );
}
