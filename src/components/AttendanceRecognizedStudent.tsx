'use client';

import React from 'react';
import { IoShieldCheckmark, IoCall } from 'react-icons/io5';
import type { Student, AttendanceRecord } from '@/lib/supabase';

interface AttendanceRecognizedStudentProps {
  student: Student;
  todayRecord: AttendanceRecord | null;
  welcomeBack: { primary: string; ar: string };
  changeNumber: { primary: string; ar: string };
  alreadyAttended: { primary: string; ar: string };
  onReset: () => void;
}

export function AttendanceRecognizedStudent({
  student,
  todayRecord,
  welcomeBack,
  changeNumber,
  alreadyAttended,
  onReset,
}: AttendanceRecognizedStudentProps) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-indigo-50/70 to-cyan-50/40 border border-indigo-100 p-4 sm:p-5 space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider">
          <IoShieldCheckmark className="h-4 w-4 shrink-0 text-indigo-600" />
          <div>
            <span>{welcomeBack.primary}</span>
            <span className="text-[10px] text-indigo-500 font-arabic ml-1.5 font-normal">
              {welcomeBack.ar}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-slate-500 hover:text-rose-600 underline font-medium cursor-pointer"
        >
          {changeNumber.primary}
        </button>
      </div>

      <div className="text-lg sm:text-xl font-bold text-slate-900">
        {student.full_name}
      </div>

      <div className="text-xs text-slate-600 flex items-center gap-1.5 font-mono">
        <IoCall className="h-3.5 w-3.5 text-indigo-500" />
        <span>{student.phone_number}</span>
      </div>

      {todayRecord && (
        <div className="pt-2 text-xs text-emerald-700 font-medium border-t border-indigo-100/80">
          <div>{alreadyAttended.primary}</div>
          <div className="text-[11px] font-arabic text-emerald-600 mt-0.5">
            {alreadyAttended.ar}
          </div>
        </div>
      )}
    </div>
  );
}
