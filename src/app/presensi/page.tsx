import React from "react";
import Image from "next/image";
import {
  IoLockClosed,
  IoShieldCheckmark,
  IoLogoWhatsapp,
  IoInformationCircleOutline,
} from "react-icons/io5";

export default function PresensiPrivatePortalPage() {
  return (
    <div className="min-h-screen bg-[#F6F8FC] text-slate-900 py-8 px-4 flex flex-col justify-between items-center">
      {/* ── Top Header ──────────────────────────────────────────────────────── */}
      <header className="max-w-md w-full flex items-center justify-center gap-3 pt-2 pb-6">
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
        <div className="flex flex-col text-start">
          <span className="font-bold text-sm tracking-tight text-slate-800">
            Fastabiqul Khairat Academy
          </span>
          <span className="text-[11px] text-slate-500 font-arabic leading-tight">
            أكاديمية فاستبق الخيرات
          </span>
        </div>
      </header>

      {/* ── Main Private Notice Card ────────────────────────────────────────── */}
      <main className="max-w-md w-full my-auto">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 text-center">
          {/* Private Access Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-4">
            <IoLockClosed className="h-3.5 w-3.5 text-indigo-600" />
            <span>Akses Tertutup (Private Access)</span>
            <span className="text-indigo-300">•</span>
            <span className="font-arabic font-normal text-indigo-600">بوابة خاصة</span>
          </div>

          {/* Titles */}
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
            Akses Khusus Santri Terdaftar
          </h1>
          <p className="text-sm font-bold text-indigo-600 font-arabic mt-1">
            بوابة الدخول الخاصة بالطلاب المسجلين
          </p>

          {/* Information & Privacy Note with Dual Language (ID & AR) */}
          <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-start space-y-3.5">
            <div className="flex items-start gap-2.5">
              <IoShieldCheckmark className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                  Laman presensi Fastabiqul Khairat Academy bersifat tertutup dan hanya diperuntukkan bagi santri yang telah terdaftar resmi.
                </p>
                <p className="text-[11px] text-slate-500 font-arabic leading-relaxed mt-1" dir="rtl">
                  صفحة تسجيل الحضور لأكاديمية فاستبق الخيرات خاصة ومخصصة فقط للطلاب المسجلين رسمياً.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-2.5 border-t border-slate-200/60">
              <IoInformationCircleOutline className="h-4 w-4 text-indigo-600 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Tautan presensi lengkap beserta akses ruang Zoom dibagikan secara berkala di grup WhatsApp resmi halaqah masing-masing santri. Silakan gunakan tautan lengkap yang Anda terima di grup.
                </p>
                <p className="text-[11px] text-slate-500 font-arabic leading-relaxed mt-1" dir="rtl">
                  يتم إرسال روابط الحضور المباشرة مع رابط الزوم دورياً في مجموعات الواتساب الرسمية لكل حلقة. يُرجى استخدام الرابط الكامل المرسل في مجموعتكم.
                </p>
              </div>
            </div>
          </div>

          {/* WhatsApp Admin Help Button with Arabic Subtitle */}
          <div className="mt-6">
            <a
              href="https://wa.me/6281234567890?text=Assalamu'alaikum%20Admin%20FKA,%20saya%20santri%20terdaftar%20ingin%20menanyakan%20tautan%20presensi%20halaqah%20saya."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex flex-col items-center justify-center rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 sm:py-3.5 px-4 shadow-md shadow-emerald-600/20 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
                <IoLogoWhatsapp className="h-4 w-4 shrink-0 text-white" />
                <span>Bantuan Presensi via WhatsApp Admin</span>
              </div>
              <span className="text-[11px] font-normal text-emerald-100 font-arabic mt-0.5">
                لطلب المساعدة عبر واتساب الإدارة
              </span>
            </a>
          </div>
        </div>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="text-center text-xs text-slate-400 py-4">
        © {new Date().getFullYear()} Fastabiqul Khairat Academy. All rights reserved.
      </footer>
    </div>
  );
}
