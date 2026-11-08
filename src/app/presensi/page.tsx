'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  IoLockClosed,
  IoShieldCheckmark,
  IoLogoWhatsapp,
  IoInformationCircleOutline,
} from 'react-icons/io5';
import { ID as FlagID, GB as FlagGB } from 'country-flag-icons/react/3x2';

type Language = 'ID' | 'EN';

export default function PresensiPrivatePortalPage() {
  const [lang, setLang] = useState<Language>('ID');
  const isEn = lang === 'EN';

  const strings = {
    badge: {
      primary: isEn
        ? 'Private Access Only'
        : 'Akses Tertutup (Private Access)',
      ar: 'بوابة خاصة للطلاب المسجلين',
    },
    title: {
      primary: isEn
        ? 'Registered Students Access Only'
        : 'Akses Khusus Santri Terdaftar',
      ar: 'بوابة الدخول الخاصة بالطلاب المسجلين رسمياً',
    },
    subtitle: {
      primary: isEn
        ? 'This attendance portal is private and restricted to enrolled students.'
        : 'Laman presensi ini bersifat tertutup khusus santri terdaftar.',
      ar: 'هذه البوابة مخصصة حصرياً للطلاب المسجلين في الحلقات العلمية',
    },
    info1: {
      primary: isEn
        ? 'Fastabiqul Khairat Academy attendance portal is private and restricted to officially registered students.'
        : 'Laman presensi Fastabiqul Khairat Academy bersifat tertutup dan hanya diperuntukkan bagi santri yang telah terdaftar resmi.',
      ar: 'صفحة تسجيل الحضور لأكاديمية فاستبقوا الخيرات خاصة ومخصصة فقط للطلاب المسجلين رسمياً في الحلقات العلمية.',
    },
    info2: {
      primary: isEn
        ? 'Complete attendance links along with Zoom room access are distributed periodically in official WhatsApp groups for each halaqah. Please use the complete link you received in your group.'
        : 'Tautan presensi lengkap beserta akses ruang Zoom dibagikan secara berkala di grup WhatsApp resmi halaqah masing-masing santri. Silakan gunakan tautan lengkap yang Anda terima di grup.',
      ar: 'يتم إرسال روابط الحضور المباشرة مع رابط غرفة الزوم دورياً في مجموعات الواتساب الرسمية لكل حلقة. يُرجى الدخول عبر الرابط المرسل في مجموعتكم.',
    },
    waBtn: {
      primary: isEn
        ? 'Attendance Help via WhatsApp Admin'
        : 'Bantuan Presensi via WhatsApp Admin',
      ar: 'لطلب المساعدة والاستفسار عبر واتساب الإدارة',
      message: isEn
        ? "Assalamu'alaikum%20Admin%20FKA,%20I%20am%20an%20enrolled%20student%20inquiring%20about%20my%20halaqah%20attendance%20link."
        : "Assalamu'alaikum%20Admin%20FKA,%20saya%20santri%20terdaftar%20ingin%20menanyakan%20tautan%20presensi%20halaqah%20saya.",
    },
    footer: {
      primary: isEn
        ? 'Fastabiqul Khairat Academy • All rights reserved'
        : 'Fastabiqul Khairat Academy • Hak Cipta Dilindungi',
      ar: 'جميع الحقوق محفوظة لأكاديمية فاستبقوا الخيرات',
    },
  };

  return (
    <div dir="ltr" className="min-h-screen bg-[#F6F8FC] text-slate-900 py-6 sm:py-8 px-4 flex flex-col justify-between items-center text-left">
      {/* ── Top Header with 2-Flag Capsule Switcher (ID & EN) ───────────────── */}
      <header className="max-w-md w-full flex items-center justify-between pt-2 pb-6">
        <div className="flex items-center gap-3 text-left">
          <div className="relative h-11 w-11 shrink-0 p-0.5">
            <Image
              src="/logo.png"
              alt="Logo Fastabiqul Khairat Academy"
              width={44}
              height={44}
              className="object-contain drop-shadow-sm"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-slate-800">
              Fastabiqul Khairat Academy
            </span>
            <span className="text-[11px] text-slate-500 font-arabic leading-tight">
              أكاديمية فاستبقوا الخيرات
            </span>
          </div>
        </div>

        {/* 2-Language Capsule Switcher (ID & EN) with Country Flags */}
        <div className="flex items-center gap-1 bg-white border border-slate-200/80 rounded-full p-1 shadow-sm text-xs font-semibold">
          {/* Indonesia Flag */}
          <button
            type="button"
            onClick={() => setLang('ID')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all cursor-pointer ${
              lang === 'ID'
                ? 'bg-indigo-600 text-white font-bold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Bahasa Indonesia"
          >
            <span className="h-3.5 w-5 overflow-hidden rounded-sm inline-block shadow-xs shrink-0">
              <FlagID title="Indonesia" className="h-full w-full object-cover" />
            </span>
            <span>ID</span>
          </button>

          {/* English Flag */}
          <button
            type="button"
            onClick={() => setLang('EN')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all cursor-pointer ${
              lang === 'EN'
                ? 'bg-indigo-600 text-white font-bold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="English"
          >
            <span className="h-3.5 w-5 overflow-hidden rounded-sm inline-block shadow-xs shrink-0">
              <FlagGB title="English" className="h-full w-full object-cover" />
            </span>
            <span>EN</span>
          </button>
        </div>
      </header>

      {/* ── Main Private Notice Card with Dual-Language (AR always below) ───── */}
      <main className="max-w-md w-full my-auto">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 text-center">
          {/* Private Access Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-4">
            <IoLockClosed className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
            <span>{strings.badge.primary}</span>
            <span className="text-indigo-300">•</span>
            <span className="font-arabic font-normal text-indigo-600">
              {strings.badge.ar}
            </span>
          </div>

          {/* Titles: Primary + Arabic Always Directly Underneath */}
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {strings.title.primary}
          </h1>
          <p
            className="text-sm font-bold text-indigo-600 font-arabic mt-1 leading-relaxed"
            dir="rtl"
          >
            {strings.title.ar}
          </p>

          {/* Notice Box: Dual-Language with Arabic Subtext for Every Sentence */}
          <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3.5 text-left">
            {/* Item 1: Closed Portal Notice */}
            <div className="flex items-start gap-2.5 text-left">
              <IoShieldCheckmark className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                  {strings.info1.primary}
                </p>
                <p
                  className="text-[11px] text-slate-500 font-arabic leading-relaxed mt-1"
                  dir="rtl"
                >
                  {strings.info1.ar}
                </p>
              </div>
            </div>

            {/* Item 2: Group Link & Zoom Notice */}
            <div className="flex items-start gap-2.5 pt-2.5 border-t border-slate-200/60 text-left">
              <IoInformationCircleOutline className="h-4 w-4 text-indigo-600 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {strings.info2.primary}
                </p>
                <p
                  className="text-[11px] text-slate-500 font-arabic leading-relaxed mt-1"
                  dir="rtl"
                >
                  {strings.info2.ar}
                </p>
              </div>
            </div>
          </div>

          {/* WhatsApp Admin Help Button with Arabic Subtitle */}
          <div className="mt-6">
            <a
              href={`https://wa.me/6281234567890?text=${strings.waBtn.message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex flex-col items-center justify-center rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 sm:py-3.5 px-4 shadow-md shadow-emerald-600/20 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
                <IoLogoWhatsapp className="h-4 w-4 shrink-0 text-white" />
                <span>{strings.waBtn.primary}</span>
              </div>
              <span
                className="text-[11px] font-normal text-emerald-100 font-arabic mt-0.5"
                dir="rtl"
              >
                {strings.waBtn.ar}
              </span>
            </a>
          </div>
        </div>
      </main>

      {/* ── Footer with Dual Language ───────────────────────────────────────── */}
      <footer className="text-center text-xs text-slate-400 py-4 space-y-0.5">
        <p>© {new Date().getFullYear()} {strings.footer.primary}</p>
        <p className="text-[11px] text-slate-400 font-arabic" dir="rtl">
          {strings.footer.ar}
        </p>
      </footer>
    </div>
  );
}
