"use client";

import React from "react";
import { IoReload } from "react-icons/io5";
import type { DynamicFormField } from "@/lib/supabase";
import {
  getDualText,
  translateQuestionLabelToAr,
  translateOptionToAr,
  type SupportedGateLang,
} from "@/lib/attendance.utils";

interface DynamicFormQuestionsProps {
  fields: DynamicFormField[];
  answers: Record<string, string>;
  onAnswerChange: (fieldId: string, value: string) => void;
  phoneFieldId?: string;
  isSearchingPhone?: boolean;
  lang?: SupportedGateLang;
}

export default function DynamicFormQuestions({
  fields,
  answers,
  onAnswerChange,
  phoneFieldId,
  isSearchingPhone = false,
  lang = "ID",
}: DynamicFormQuestionsProps) {
  const phoneText = getDualText("phoneLabel", lang);
  const nameText = getDualText("nameLabel", lang);
  const genderText = getDualText("genderLabel", lang);
  const nameLockedNote = getDualText("nameLockedNote", lang);

  const maleText = getDualText("genderMale", lang);
  const femaleText = getDualText("genderFemale", lang);

  return (
    <div className="space-y-3.5 sm:space-y-4">
      {fields.map((field, idx) => {
        const val = answers[field.id] || "";
        const isPhone =
          field.id === phoneFieldId ||
          field.type === "phone" ||
          field.is_student_phone;
        const isName = field.is_student_name || field.id === "name";
        const isGender =
          field.id === "gender" ||
          (field.type === "radio" &&
            (field.label.toLowerCase().includes("kategori") ||
              field.label.toLowerCase().includes("gender") ||
              field.label.toLowerCase().includes("jenis kelamin")));

        // Determine Primary & Arabic label
        let primaryLabel = field.label;
        let arabicLabel = "";

        if (field.label && field.label.includes("|")) {
          const parts = field.label.split("|");
          primaryLabel = parts[0].trim();
          arabicLabel = parts[1].trim();
        } else if (isPhone) {
          primaryLabel = phoneText.primary;
          arabicLabel = phoneText.ar;
        } else if (isName) {
          primaryLabel = nameText.primary;
          arabicLabel = nameText.ar;
        } else if (isGender) {
          primaryLabel = genderText.primary;
          arabicLabel = genderText.ar;
        } else {
          primaryLabel = field.label;
          arabicLabel = translateQuestionLabelToAr(field.label, idx, field.label_ar);
        }

        return (
          <div
            key={field.id}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm transition-all hover:border-indigo-200"
          >
            {/* Bilingual Question Label (Left-aligned stacked pair) */}
            <div className="mb-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
                <span className="text-indigo-600 font-extrabold">#{idx + 1}.</span>
                <span>{primaryLabel}</span>
                {field.required && (
                  <span className="text-rose-500 font-bold ml-0.5">*</span>
                )}
              </div>
              {arabicLabel && (
                <div className="text-[11px] sm:text-xs font-medium text-slate-500 font-arabic mt-0.5 tracking-normal">
                  {arabicLabel}{" "}
                  {field.required && (
                    <span className="text-rose-400 font-bold">*</span>
                  )}
                </div>
              )}
            </div>

            {/* Input by Type */}
            {isPhone ? (
              <div className="relative">
                <input
                  type="tel"
                  value={val}
                  onChange={(e) => onAnswerChange(field.id, e.target.value)}
                  placeholder={
                    lang === "EN"
                      ? "e.g. 08123456789 | مثال: 08123456789"
                      : "Contoh: 08123456789 | مثال: 08123456789"
                  }
                  required={field.required}
                  className="w-full rounded-xl border border-slate-200 py-2.5 sm:py-3 px-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors"
                />
                {isSearchingPhone && (
                  <IoReload className="absolute top-3 right-3 h-4 w-4 text-indigo-500 animate-spin" />
                )}
              </div>
            ) : isName ? (
              <div>
                <input
                  type="text"
                  value={val}
                  onChange={(e) => onAnswerChange(field.id, e.target.value)}
                  placeholder={
                    lang === "EN"
                      ? "Enter your full name | أدخل اسمك الكامل"
                      : "Masukkan nama lengkap Anda | أدخل اسمك الكامل"
                  }
                  required={field.required}
                  className="w-full rounded-xl border border-slate-200 py-2.5 sm:py-3 px-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors"
                />
                {/* Locked Name Note */}
                <div className="mt-2.5 p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 text-indigo-950">
                  <div className="text-[11px] font-semibold flex items-center gap-1.5">
                    <span className="text-indigo-600">🔒</span>
                    <span>{nameLockedNote.primary}</span>
                  </div>
                  <div className="text-[11px] font-medium text-indigo-700 font-arabic mt-0.5 pl-5">
                    {nameLockedNote.ar}
                  </div>
                </div>
              </div>
            ) : field.type === "radio" ? (
              <div className="space-y-2 pt-1">
                {isGender ? (
                  // Pre-configured bilingual options for Gender/Category
                  [
                    { key: "ikhwan", opt: maleText },
                    { key: "akhwat", opt: femaleText },
                  ].map(({ key, opt }) => {
                    const isSelected =
                      val === opt.primary ||
                      val.toLowerCase().includes(key) ||
                      (key === "ikhwan" && val.includes("Laki-laki")) ||
                      (key === "akhwat" && val.includes("Perempuan"));

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => onAnswerChange(field.id, opt.primary)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl border text-start transition-all ${
                          isSelected
                            ? "border-indigo-600 bg-indigo-50/70 text-indigo-900 shadow-sm ring-1 ring-indigo-500/30"
                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span
                          className={`h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected
                              ? "border-indigo-600 bg-indigo-600"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {isSelected && (
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                          )}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-slate-800 leading-snug">
                            {opt.primary}
                          </div>
                          <div className="text-[11px] font-medium text-slate-500 font-arabic mt-0.5 leading-snug">
                            {opt.ar}
                          </div>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  // Any newly added radio question automatically translates options!
                  (field.options && field.options.length > 0
                    ? field.options
                    : ["Opsi 1", "Opsi 2"]
                  ).map((opt) => {
                    const isSelected = val === opt || val.includes(opt);
                    const optPrimary = opt.includes("|") ? opt.split("|")[0].trim() : opt;
                    const optArabic = opt.includes("|") ? opt.split("|")[1].trim() : translateOptionToAr(opt);

                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => onAnswerChange(field.id, opt)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl border text-start transition-all ${
                          isSelected
                            ? "border-indigo-600 bg-indigo-50/70 text-indigo-900 shadow-sm ring-1 ring-indigo-500/30"
                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span
                          className={`h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected
                              ? "border-indigo-600 bg-indigo-600"
                              : "border-slate-300 bg-white"
                          }`}
                        >
                          {isSelected && (
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                          )}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-slate-800 leading-snug">
                            {optPrimary}
                          </div>
                          {optArabic && optArabic !== optPrimary && (
                            <div className="text-[11px] font-medium text-slate-500 font-arabic mt-0.5 leading-snug">
                              {optArabic}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            ) : field.type === "textarea" ? (
              <textarea
                rows={3}
                value={val}
                onChange={(e) => onAnswerChange(field.id, e.target.value)}
                placeholder={
                  field.placeholder ||
                  (lang === "EN"
                    ? "Write your answer here... | اكتب إجابتك هنا..."
                    : "Tuliskan jawaban Anda di sini... | اكتب إجابتك هنا...")
                }
                required={field.required}
                className="w-full rounded-xl border border-slate-200 py-2.5 sm:py-3 px-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 resize-none transition-colors"
              />
            ) : field.type === "select" ? (
              <select
                value={val}
                onChange={(e) => onAnswerChange(field.id, e.target.value)}
                required={field.required}
                className="w-full rounded-xl border border-slate-200 py-2.5 sm:py-3 px-3.5 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              >
                <option value="">
                  {lang === "EN" ? "-- Select Option --" : "-- Pilih Jawaban --"}
                </option>
                {(field.options || []).map((opt) => {
                  const optPrimary = opt.includes("|") ? opt.split("|")[0].trim() : opt;
                  const optAr = opt.includes("|") ? opt.split("|")[1].trim() : translateOptionToAr(opt);
                  const displayOpt = optAr && optAr !== optPrimary ? `${optPrimary} • ${optAr}` : optPrimary;
                  return (
                    <option key={opt} value={opt}>
                      {displayOpt}
                    </option>
                  );
                })}
              </select>
            ) : (
              <input
                type="text"
                value={val}
                onChange={(e) => onAnswerChange(field.id, e.target.value)}
                placeholder={
                  field.placeholder ||
                  (lang === "EN"
                    ? "Short answer... | إجابة قصيرة..."
                    : "Jawaban singkat... | إجابة قصيرة...")
                }
                required={field.required}
                className="w-full rounded-xl border border-slate-200 py-2.5 sm:py-3 px-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
