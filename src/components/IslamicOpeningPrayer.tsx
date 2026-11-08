'use client';

import React from 'react';
import type { SupportedGateLang } from '@/lib/attendance.utils';

interface IslamicOpeningPrayerProps {
  lang?: SupportedGateLang;
  compact?: boolean;
  className?: string;
}

export default function IslamicOpeningPrayer({
  lang = 'ID',
  compact = false,
  className = '',
}: IslamicOpeningPrayerProps) {
  const isEn = lang === 'EN';

  return (
    <div
      dir="ltr"
      className={`rounded-2xl bg-gradient-to-b from-indigo-50/70 via-white to-slate-50/50 border border-indigo-100/90 shadow-2xs text-center select-none ${
        compact ? 'p-3 sm:p-3.5 mb-4' : 'p-4 sm:p-5 mb-5'
      } ${className}`}
    >
      {/* 1. Basmalah */}
      <div className="font-arabic text-base sm:text-lg font-bold text-slate-800 tracking-wide leading-relaxed">
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </div>
      <p className="text-[10.5px] sm:text-xs text-slate-500 italic mt-0.5 font-normal">
        {isEn
          ? 'In the name of Allah, the Entirely Merciful, the Especially Merciful'
          : 'Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang'}
      </p>

      {/* Decorative Divider */}
      <div className="flex items-center justify-center gap-2 my-2 sm:my-2.5">
        <div className="h-px w-8 sm:w-12 bg-indigo-200/70" />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50/90 px-2 py-0.5 rounded-full border border-indigo-100">
          {isEn ? 'Prayer Before Learning' : 'Doa Sebelum Belajar'}
        </span>
        <div className="h-px w-8 sm:w-12 bg-indigo-200/70" />
      </div>

      {/* 2. Doa Sebelum Belajar */}
      <div className="font-arabic text-sm sm:text-base font-bold text-indigo-700 tracking-wide leading-relaxed">
        رَبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهْمًا
      </div>
      <p className="text-[11px] sm:text-xs font-medium text-slate-600 mt-1">
        {isEn
          ? '"My Lord, increase me in knowledge and grant me comprehension."'
          : '"Ya Rabb-ku, tambahkanlah ilmuku dan anugerahilah aku pemahaman."'}
      </p>
    </div>
  );
}
