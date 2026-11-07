"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Check, CheckCircle2, MessageCircle, Send, Loader2 } from "lucide-react";
import { translations } from "@/translations";
import { Poster } from "@/components/ProgramPosterCard";

interface ProgramDetailModalProps {
  poster: Poster | null;
  isOpen: boolean;
  onClose: () => void;
  isRTL: boolean;
  language: "AR" | "ID" | "EN";
  t: (typeof translations)["AR"];
  categoryLabel?: string;
}

export default function ProgramDetailModal({
  poster,
  isOpen,
  onClose,
  isRTL,
  language,
  t,
  categoryLabel,
}: ProgramDetailModalProps) {
  const [activeTab, setActiveTab] = useState<
    "description" | "facilities" | "requirements" | "infaq"
  >("description");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Reset tab and form state whenever a new poster is opened
  useEffect(() => {
    if (isOpen) {
      setActiveTab("description");
      setSubmitSuccess(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, poster]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !poster) return null;

  const isClosed = poster.status === "closed";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate short submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  const handleWhatsAppConsult = () => {
    const greeting =
      language === "AR"
        ? `السلام عليكم ورحمة الله، أود الاستفسار عن تفاصيل ومواعيد برنامج: *${poster.title}* في أكاديمية فاستبقوا الخيرات.`
        : language === "EN"
        ? `Assalamu'alaikum Admin, I would like to inquire about registration details for: *${poster.title}* at Fastabiqul Khairat Academy.`
        : `Assalamu'alaikum Admin Fastabiqul Khairat, saya ingin bertanya mengenai detail pendaftaran program: *${poster.title}*.`;

    const encoded = encodeURIComponent(greeting);
    window.open(`https://wa.me/6281234567890?text=${encoded}`, "_blank");
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-900/65 backdrop-blur-sm transition-all duration-300 ${
        isRTL ? "font-arabic rtl" : "ltr"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div
          className={`flex items-center justify-between border-b border-slate-200/80 px-5 sm:px-7 py-3.5 bg-slate-50/80 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <div
            className={`flex items-center gap-3 overflow-hidden ${
              isRTL ? "flex-row-reverse text-right" : "text-left"
            }`}
          >
            {categoryLabel && (
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 shrink-0">
                {categoryLabel}
              </span>
            )}
            <div className="overflow-hidden">
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 truncate">
                {poster.title}
              </h2>
              <span
                className={`text-xs font-semibold ${
                  isClosed ? "text-rose-600" : "text-emerald-600"
                }`}
              >
                ●{" "}
                {isClosed
                  ? t.program.status?.closed || "مغلق"
                  : t.program.status?.open || "متاح"}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200/80 text-slate-600 hover:bg-slate-300 hover:text-slate-900 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body: Split Screen */}
        <div
          className={`flex-1 overflow-y-auto flex flex-col lg:flex-row ${
            isRTL ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* LEFT COLUMN: 4 Complete Tabs */}
          <div
            className={`w-full lg:w-[58%] p-5 sm:p-7 border-b lg:border-b-0 border-slate-200/80 flex flex-col justify-between ${
              isRTL ? "lg:border-l text-right" : "lg:border-r text-left"
            }`}
          >
            <div>
              {/* Tab Navigation Buttons */}
              <div
                className={`flex border-b border-slate-200 gap-1 sm:gap-2 overflow-x-auto pb-1 text-xs sm:text-sm font-semibold ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveTab("description")}
                  className={`px-3 py-2 border-b-2 whitespace-nowrap transition cursor-pointer ${
                    activeTab === "description"
                      ? "border-emerald-700 text-emerald-800 font-bold"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {t.program.detail.description}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("facilities")}
                  className={`px-3 py-2 border-b-2 whitespace-nowrap transition cursor-pointer ${
                    activeTab === "facilities"
                      ? "border-emerald-700 text-emerald-800 font-bold"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {t.program.detail.facilities}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("requirements")}
                  className={`px-3 py-2 border-b-2 whitespace-nowrap transition cursor-pointer ${
                    activeTab === "requirements"
                      ? "border-emerald-700 text-emerald-800 font-bold"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {t.program.detail.requirements}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("infaq")}
                  className={`px-3 py-2 border-b-2 whitespace-nowrap transition cursor-pointer ${
                    activeTab === "infaq"
                      ? "border-emerald-700 text-emerald-800 font-bold"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {t.program.detail.infaq}
                </button>
              </div>

              {/* Tab 1: Description */}
              {activeTab === "description" && (
                <div className="py-4 space-y-3 animate-in fade-in duration-150">
                  <p className="text-sm sm:text-base leading-relaxed text-slate-700 whitespace-pre-line">
                    {poster.description}
                  </p>
                </div>
              )}

              {/* Tab 2: Facilities Checklist */}
              {activeTab === "facilities" && (
                <div className="py-4 space-y-3 animate-in fade-in duration-150">
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                    {poster.facilities.map((fac, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start gap-2.5 ${
                          isRTL ? "flex-row-reverse text-right" : "text-left"
                        }`}
                      >
                        <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{fac}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tab 3: Requirements Checklist */}
              {activeTab === "requirements" && (
                <div className="py-4 space-y-3 animate-in fade-in duration-150">
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                    {poster.requirements.map((req, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start gap-2.5 ${
                          isRTL ? "flex-row-reverse text-right" : "text-left"
                        }`}
                      >
                        <CheckCircle2 className="h-4 w-4 text-[#C9A24D] shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tab 4: Infaq Card */}
              {activeTab === "infaq" && (
                <div className="py-4 animate-in fade-in duration-150">
                  <div className="rounded-2xl border-2 border-[#C9A24D] bg-gradient-to-br from-[#C9A24D]/15 to-[#C9A24D]/5 p-5">
                    <span className="text-xs font-semibold text-emerald-900 block">
                      {t.program.detail.infaq}
                    </span>
                    <span className="text-2xl font-black text-[#C9A24D] block mt-1">
                      {poster.infaq}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Infaq Indicator */}
            <div
              className={`mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <span className="text-slate-500 font-medium">
                {t.program.detail.infaq}:
              </span>
              <span className="text-sm font-extrabold text-[#C9A24D]">
                {poster.infaq}
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Quick Registration Form */}
          <div
            className={`w-full lg:w-[42%] bg-slate-50/60 p-5 sm:p-7 flex flex-col justify-between ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            <div>
              <div className="mb-4">
                <span className="rounded-full bg-emerald-600 text-white px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase inline-block mb-1">
                  {language === "AR"
                    ? "تسجيل فوري مباشر"
                    : language === "EN"
                    ? "Direct Registration"
                    : "Pendaftaran Langsung"}
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  {t.program.registration.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t.program.registration.subtitle}
                </p>
              </div>

              {submitSuccess ? (
                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5 text-center my-4 animate-in zoom-in-95 duration-200">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-2.5">
                    <Check className="h-6 w-6 stroke-[3]" />
                  </div>
                  <h4 className="font-bold text-emerald-950 text-sm">
                    {t.program.registration.success}
                  </h4>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-4 inline-flex items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-800 transition"
                  >
                    {language === "AR"
                      ? "إغلاق وتصفح البرامج الأخرى"
                      : language === "EN"
                      ? "Close & Explore Other Programs"
                      : "Tutup & Pilih Program Lain"}
                  </button>
                </div>
              ) : isClosed ? (
                <div className="rounded-2xl bg-rose-50 border border-rose-200 p-5 text-center my-4">
                  <p className="text-sm font-bold text-rose-800">
                    {t.program.status?.closed || "Sudah Tutup"}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    {language === "AR"
                      ? "التسجيل في هذا البرنامج غير متاح حالياً. تواصل معنا للاستفسار عن موعد الدفعة القادمة."
                      : language === "EN"
                      ? "Registration for this program is currently closed. Contact us for the next batch."
                      : "Pendaftaran program ini sedang ditutup. Hubungi admin untuk informasi angkatan berikutnya."}
                  </p>
                  <button
                    type="button"
                    onClick={handleWhatsAppConsult}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 text-white px-4 py-2 text-xs font-semibold hover:bg-emerald-700 transition"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>
                      {language === "AR"
                        ? "استفسر عبر واتساب"
                        : language === "EN"
                        ? "Inquire on WhatsApp"
                        : "Tanya Admin via WhatsApp"}
                    </span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-xs sm:text-sm">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block font-semibold text-slate-700 mb-1"
                    >
                      {t.program.registration.fullName}
                    </label>
                    <input
                      required
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder={t.program.registration.fullNamePlaceholder}
                      className={`w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-slate-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block font-semibold text-slate-700 mb-1"
                    >
                      {t.program.registration.phone}
                    </label>
                    <input
                      required
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={t.program.registration.phonePlaceholder}
                      className={`w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-slate-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block font-semibold text-slate-700 mb-1"
                    >
                      {t.program.registration.address}
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder={t.program.registration.addressPlaceholder}
                      className={`w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-slate-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block font-semibold text-slate-700 mb-1"
                    >
                      {t.program.registration.message}
                    </label>
                    <textarea
                      rows={2}
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t.program.registration.messagePlaceholder}
                      className={`w-full resize-none rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-slate-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 ${
                        isRTL ? "text-right" : "text-left"
                      }`}
                    />
                  </div>

                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-4 shadow-md shadow-emerald-700/20 transition cursor-pointer text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>{t.program.registration.submitting}</span>
                        </>
                      ) : (
                        <>
                          <Send className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
                          <span>{t.program.registration.submit}</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppConsult}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 font-semibold py-2 px-3 border border-emerald-300 transition cursor-pointer text-xs"
                    >
                      <MessageCircle className="h-4 w-4 text-emerald-600" />
                      <span>
                        {language === "AR"
                          ? "الاستفسار المباشر عبر واتساب"
                          : language === "EN"
                          ? "Inquire directly on WhatsApp"
                          : "Tanya Dulu via WhatsApp Admin"}
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            <p className="text-[11px] text-slate-400 text-center mt-3">
              © Fastabiqul Khairat Academy • All rights reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
