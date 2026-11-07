'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  IoLockClosed,
  IoShieldCheckmark,
  IoLogoWhatsapp,
  IoInformationCircleOutline,
  IoGlobeOutline,
} from 'react-icons/io5';

type Language = 'AR' | 'ID' | 'EN';

export default function PresensiPrivatePortalPage() {
  const [lang, setLang] = useState<Language>('AR');
  const isAr = lang === 'AR';
  const isEn = lang === 'EN';

  const content = {
    AR: {
      badge: 'بوابة خاصة للطلاب المسجلين',
      title: 'خاص بالطلاب المسجلين رسمياً',
      subtitle: 'أكاديمية فاستبقوا الخيرات',
      info1:
        'بوابة تسجيل الحضور لأكاديمية فاستبقوا الخيرات خاصة ومخصصة فقط للطلاب المسجلين في الحلقات العلمية.',
      info2:
        'يتم إرسال روابط الحضور المباشرة مع رابط غرفة الزوم دورياً في مجموعات الواتساب الرسمية لكل حلقة. يُرجى الدخول عبر الرابط المرسل في مجموعتكم.',
      waBtn: 'طلب المساعدة عبر واتساب الإدارة',
      waSub: 'تواصل مباشرة مع المشرف عبر واتساب',
      waMessage:
        "السلام%20عليكم%20ورحمة%20الله،%20أنا%20طالب%20مسجل%20أود%20الاستفسار%20عن%20رابط%20حضور%20الحلقة",
      copyright: 'جميع الحقوق محفوظة لأكاديمية فاستبقوا الخيرات',
    },
    ID: {
      badge: 'Akses Tertutup (Private Access)',
      title: 'Akses Khusus Santri Terdaftar',
      subtitle: 'Fastabiqul Khairat Academy',
      info1:
        'Laman presensi Fastabiqul Khairat Academy bersifat tertutup dan hanya diperuntukkan bagi santri yang telah terdaftar resmi.',
      info2:
        'Tautan presensi lengkap beserta akses ruang Zoom dibagikan secara berkala di grup WhatsApp resmi halaqah masing-masing santri. Silakan gunakan tautan lengkap yang Anda terima di grup.',
      waBtn: 'Bantuan Presensi via WhatsApp Admin',
      waSub: 'Hubungi admin jika Anda belum menerima tautan',
      waMessage:
        "Assalamu'alaikum%20Admin%20FKA,%20saya%20santri%20terdaftar%20ingin%20menanyakan%20tautan%20presensi%20halaqah%20saya.",
      copyright: 'Hak Cipta Dilindungi Fastabiqul Khairat Academy',
    },
    EN: {
      badge: 'Private Student Access',
      title: 'Registered Students Only',
      subtitle: 'Fastabiqul Khairat Academy',
      info1:
        'Fastabiqul Khairat Academy attendance portal is private and restricted to officially registered students.',
      info2:
        'Direct attendance links along with Zoom access are distributed periodically in official WhatsApp groups for each halaqah. Please use the complete link you received in your group.',
      waBtn: 'Attendance Help via WhatsApp Admin',
      waSub: 'Contact admin if you have not received your link',
      waMessage:
        "Assalamu'alaikum%20Admin,%20I%20am%20a%20registered%20student%20inquiring%20about%20my%20halaqah%20attendance%20link.",
      copyright: 'All rights reserved by Fastabiqul Khairat Academy',
    },
  }[lang];

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-[#F6F8FC] text-slate-900 py-6 sm:py-8 px-4 flex flex-col justify-between items-center ${
        isAr ? 'font-arabic' : ''
      }`}
    >
      {/* ── Top Header with 3-Language Capsule Switcher ─────────────────────── */}
      <header
        className={`max-w-md w-full flex items-center justify-between pt-2 pb-6 ${
          isAr ? 'flex-row-reverse' : ''
        }`}
      >
        <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse text-right' : 'text-left'}`}>
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
              {isAr ? 'أكاديمية فاستبقوا الخيرات' : 'Fastabiqul Khairat Academy'}
            </span>
            <span className="text-[11px] text-slate-500 leading-tight">
              {isAr ? 'Fastabiqul Khairat Academy' : 'أكاديمية فاستبقوا الخيرات'}
            </span>
          </div>
        </div>

        {/* 3-Language Capsule Switcher */}
        <div className="flex items-center gap-1 bg-white border border-slate-200/80 rounded-full p-1 shadow-sm text-xs font-semibold">
          <IoGlobeOutline className="h-3.5 w-3.5 text-slate-400 ml-1.5 mr-0.5" />
          {(['AR', 'ID', 'EN'] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                lang === l
                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </header>

      {/* ── Main Private Notice Card ────────────────────────────────────────── */}
      <main className="max-w-md w-full my-auto">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 text-center">
          {/* Private Access Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-4">
            <IoLockClosed className="h-3.5 w-3.5 text-indigo-600" />
            <span>{content.badge}</span>
          </div>

          {/* Titles */}
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
            {content.title}
          </h1>
          <p className="text-xs font-medium text-slate-500 mt-1">
            {content.subtitle}
          </p>

          {/* Information Notice */}
          <div
            className={`mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3.5 ${
              isAr ? 'text-right' : 'text-left'
            }`}
          >
            <div className={`flex items-start gap-2.5 ${isAr ? 'flex-row-reverse' : ''}`}>
              <IoShieldCheckmark className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
              <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                {content.info1}
              </p>
            </div>

            <div
              className={`flex items-start gap-2.5 pt-2.5 border-t border-slate-200/60 ${
                isAr ? 'flex-row-reverse' : ''
              }`}
            >
              <IoInformationCircleOutline className="h-4 w-4 text-indigo-600 mt-0.5 shrink-0" />
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {content.info2}
              </p>
            </div>
          </div>

          {/* WhatsApp Admin Help Button */}
          <div className="mt-6">
            <a
              href={`https://wa.me/6281234567890?text=${content.waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex flex-col items-center justify-center rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 sm:py-3.5 px-4 shadow-md shadow-emerald-600/20 transition-all cursor-pointer group"
            >
              <div className={`flex items-center gap-2 text-xs sm:text-sm font-bold ${isAr ? 'flex-row-reverse' : ''}`}>
                <IoLogoWhatsapp className="h-4 w-4 shrink-0 text-white" />
                <span>{content.waBtn}</span>
              </div>
              <span className="text-[11px] font-normal text-emerald-100 mt-0.5">
                {content.waSub}
              </span>
            </a>
          </div>
        </div>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="text-center text-xs text-slate-400 py-4">
        © {new Date().getFullYear()} {content.copyright}
      </footer>
    </div>
  );
}
