"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  IoLockClosed,
  IoShieldCheckmark,
  IoArrowForward,
  IoLogoWhatsapp,
  IoLinkOutline,
  IoAlertCircle,
} from "react-icons/io5";

export default function PresensiPrivatePortalPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    let cleaned = code.trim();
    if (!cleaned) {
      setError("Silakan masukkan kode atau tautan sesi halaqah Anda.");
      return;
    }

    // Jika santri menempelkan URL lengkap (misal: https://presensi.fastabiq.site/majelis-sama)
    try {
      if (cleaned.startsWith("http://") || cleaned.startsWith("https://")) {
        const parsed = new URL(cleaned);
        cleaned = parsed.pathname.replace(/^\/+/, "");
      }
    } catch {
      // Abaikan jika bukan URL valid, gunakan teks aslinya
    }

    // Bersihkan slash di awal atau akhir
    cleaned = cleaned.replace(/^\/+/, "").replace(/\/+$/, "").toLowerCase();

    if (!cleaned) {
      setError("Kode halaqah tidak valid. Periksa kembali tautan Anda.");
      return;
    }

    router.push(`/${cleaned}`);
  };

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

      {/* ── Main Private Card ──────────────────────────────────────────────── */}
      <main className="max-w-md w-full my-auto">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 text-center">
          {/* Private Access Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-4">
            <IoLockClosed className="h-3.5 w-3.5 text-indigo-600" />
            <span>Gerbang Tertutup (Private Access)</span>
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

          {/* Information & Privacy Note */}
          <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-start space-y-2">
            <div className="flex items-start gap-2.5">
              <IoShieldCheckmark className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
              <p className="text-xs text-slate-600 leading-relaxed">
                Demi menjaga privasi dan ketertiban majelis pembelajaran Zoom, daftar halaqah tidak dipublikasikan secara umum.
              </p>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed pt-1.5 border-t border-slate-200/50 font-normal">
              Silakan gunakan tautan langsung yang Anda terima dari Admin atau pengampu untuk mengisi presensi dan bergabung ke ruang Zoom.
            </p>
          </div>

          {/* Form Direct Slug / Code Input */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
            <div className="text-start">
              <label htmlFor="session-code" className="block text-xs font-bold text-slate-700 mb-1.5">
                Punya Kode / Tautan Sesi?
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <IoLinkOutline className="h-4 w-4" />
                </div>
                <input
                  id="session-code"
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Contoh: majelis-sama atau daurah-quran"
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-3.5 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all bg-white"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2 text-start">
                <IoAlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 shadow-md shadow-indigo-600/20 transition-all text-xs sm:text-sm cursor-pointer group"
            >
              <span>Buka Presensi Sesi</span>
              <IoArrowForward className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          {/* WhatsApp Admin Help Button */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <a
              href="https://wa.me/6281234567890?text=Assalamu'alaikum%20Admin%20FKA,%20saya%20santri%20terdaftar%20ingin%20menanyakan%20tautan%20presensi%20halaqah%20saya."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              <IoLogoWhatsapp className="h-4 w-4 text-emerald-600" />
              <span>Belum memiliki tautan? Hubungi Admin WhatsApp</span>
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
