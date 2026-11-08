'use client';

import React from 'react';
import type { AttendanceSession } from '@/lib/supabase';
import type { ScheduleWindowResult } from '@/lib/schedule.utils';
import type { SupportedGateLang } from '@/lib/attendance.utils';
import { AttendanceGateHeader } from './AttendanceGateHeader';
import { AttendanceScheduleNotice } from './AttendanceScheduleNotice';

interface AttendanceGateClosedViewProps {
  session: AttendanceSession;
  schedule: ScheduleWindowResult;
  isManuallyClosed: boolean;
  activeLang: SupportedGateLang;
  titleSuffix: { primary: string; ar: string };
  onSelectLang: (lang: 'AR' | 'ID' | 'EN') => void;
  onAutoUnlock: () => void;
}

export default function AttendanceGateClosedView({
  session,
  schedule,
  isManuallyClosed,
  activeLang,
  titleSuffix,
  onSelectLang,
  onAutoUnlock,
}: AttendanceGateClosedViewProps) {
  return (
    <div className="min-h-screen bg-[#F6F8FC] text-slate-900 py-4 sm:py-8 px-3.5 sm:px-6 flex flex-col justify-between">
      <AttendanceGateHeader
        slug={session.slug}
        titlePrimary={titleSuffix.primary}
        titleAr={titleSuffix.ar}
        activeLang={activeLang}
        onSelectLang={onSelectLang}
      />
      <main className="max-w-xl mx-auto w-full my-auto">
        <AttendanceScheduleNotice
          schedule={schedule}
          sessionTitle={session.title}
          isManuallyDisabled={isManuallyClosed}
          lang={activeLang}
          onAutoUnlock={onAutoUnlock}
        />
      </main>
      <footer className="text-center text-xs text-slate-400 py-4 sm:py-6">
        © {new Date().getFullYear()} Fastabiqul Khairat Academy. All rights reserved.
      </footer>
    </div>
  );
}

