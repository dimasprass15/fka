'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ID as FlagID, GB as FlagGB } from 'country-flag-icons/react/3x2';
import type { SupportedGateLang } from '@/lib/attendance.utils';

interface AttendanceGateHeaderProps {
  slug: string;
  titlePrimary: string;
  titleAr: string;
  activeLang: SupportedGateLang;
  onSelectLang: (lang: SupportedGateLang) => void;
}

export function AttendanceGateHeader({
  slug,
  titlePrimary,
  titleAr,
  activeLang,
  onSelectLang,
}: AttendanceGateHeaderProps) {
  return (
    <header className="max-w-xl mx-auto w-full flex items-center justify-between pb-3 sm:pb-5">
      <Link
        href={`/${slug}`}
        title="Beranda Presensi"
        className="flex items-center gap-2.5 group transition-transform active:scale-95"
      >
        <div className="relative h-10 w-10 sm:h-11 sm:w-11 shrink-0 p-0.5">
          <Image
            src="/logo.png"
            alt="Logo Fastabiqul Khairat Academy"
            width={44}
            height={44}
            className="object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
            priority
          />
        </div>
        <div className="flex flex-col text-left">
          <span className="font-bold text-xs sm:text-sm tracking-tight text-slate-800 group-hover:text-indigo-600 transition-colors">
            {titlePrimary}
          </span>
          <span className="text-[10px] text-slate-500 font-arabic leading-tight">
            {titleAr}
          </span>
        </div>
      </Link>

      {/* 2-Language Capsule Switcher (ID & EN) with Flags */}
      <div className="flex items-center gap-1 bg-white border border-slate-200/80 rounded-full p-1 shadow-sm text-xs font-semibold">
        <button
          type="button"
          onClick={() => onSelectLang('ID')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all cursor-pointer ${
            activeLang === 'ID'
              ? 'bg-indigo-600 text-white font-bold shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
          title="Bahasa Indonesia"
        >
          <span className="h-3 w-4.5 overflow-hidden rounded-xs inline-block shrink-0 shadow-2xs">
            <FlagID title="Indonesia" className="h-full w-full object-cover" />
          </span>
          <span>ID</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectLang('EN')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all cursor-pointer ${
            activeLang === 'EN'
              ? 'bg-indigo-600 text-white font-bold shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
          title="English"
        >
          <span className="h-3 w-4.5 overflow-hidden rounded-xs inline-block shrink-0 shadow-2xs">
            <FlagGB title="English" className="h-full w-full object-cover" />
          </span>
          <span>EN</span>
        </button>
      </div>
    </header>
  );
}

