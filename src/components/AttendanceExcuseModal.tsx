"use client";

import React, { useState } from "react";
import {
  IoClose,
  IoPaperPlane,
  IoAlertCircle,
  IoCheckmarkCircle,
} from "react-icons/io5";
import {
  getDualText,
  sanitizeInputText,
  type SupportedGateLang,
} from "@/lib/attendance.utils";
import { supabase, type AttendanceSession, type Student } from "@/lib/supabase";

interface AttendanceExcuseModalProps {
  session: AttendanceSession;
  student: Student;
  lang?: SupportedGateLang;
  onClose: () => void;
  onSubmitted: () => void;
}

export default function AttendanceExcuseModal({
  session,
  student,
  lang = "ID",
  onClose,
  onSubmitted,
}: AttendanceExcuseModalProps) {
  const activeLang: SupportedGateLang = lang === "EN" ? "EN" : "ID";
  const [excuseType, setExcuseType] = useState<"izin" | "sakit">("izin");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const titleText = getDualText("excuseTitle", activeLang);
  const typeLabelText = getDualText("excuseTypeLabel", activeLang);
  const izinText = getDualText("excuseIzin", activeLang);
  const sakitText = getDualText("excuseSakit", activeLang);
  const reasonLabelText = getDualText("excuseReasonLabel", activeLang);
  const reasonPlaceholderText = getDualText("excuseReasonPlaceholder", activeLang);
  const submitBtnText = getDualText("submitExcuseBtn", activeLang);
  const submittingText = getDualText("submitting", activeLang);
  const successText = getDualText("excuseSuccess", activeLang);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const today = new Date().toISOString().split("T")[0];
      const sanitizedReason = sanitizeInputText(reason, 300, true);

      // Upsert record with excuse status
      const { error } = await supabase.from("attendance_records").upsert(
        {
          session_id: session.id,
          student_id: student.id,
          session_date: today,
          status: excuseType,
          web_submitted_at: new Date().toISOString(),
          notes: sanitizedReason || `${excuseType === "izin" ? "Izin" : "Sakit"} via Form`,
        },
        { onConflict: "session_id,student_id,session_date" }
      );

      if (error) throw error;

      setIsSuccess(true);
      setTimeout(() => {
        onSubmitted();
        onClose();
      }, 2000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Gagal mengirim keterangan izin.";
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div dir="ltr" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100 text-left">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
        >
          <IoClose className="h-5 w-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 flex flex-col items-center text-center space-y-3">
            <IoCheckmarkCircle className="h-12 w-12 text-emerald-500" />
            <h3 className="text-xl font-bold text-slate-900">{successText.primary}</h3>
            <p className="text-sm font-semibold text-emerald-700 font-arabic">
              {successText.ar}
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">{titleText.primary}</h3>
              <p className="text-xs font-semibold text-slate-500 font-arabic mt-0.5">
                {titleText.ar}
              </p>
              <p className="text-xs text-indigo-600 font-bold mt-2">
                👤 {student.full_name}
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 flex items-center gap-2 p-3 bg-red-50 text-red-700 text-xs rounded-xl">
                <IoAlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    {typeLabelText.primary}
                  </span>
                  <span className="text-[10px] text-slate-500 font-arabic block">
                    {typeLabelText.ar}
                  </span>
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setExcuseType("izin")}
                    className={`py-3 px-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                      excuseType === "izin"
                        ? "border-amber-500 bg-amber-50 text-amber-900 font-semibold shadow-sm"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <div className="text-xs font-bold">{izinText.primary}</div>
                    <div className="text-[10px] font-semibold text-amber-700 font-arabic mt-0.5">
                      {izinText.ar}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setExcuseType("sakit")}
                    className={`py-3 px-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                      excuseType === "sakit"
                        ? "border-rose-500 bg-rose-50 text-rose-900 font-semibold shadow-sm"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <div className="text-xs font-bold">{sakitText.primary}</div>
                    <div className="text-[10px] font-semibold text-rose-700 font-arabic mt-0.5">
                      {sakitText.ar}
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block mb-1.5">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    {reasonLabelText.primary}
                  </span>
                  <span className="text-[10px] text-slate-500 font-arabic block">
                    {reasonLabelText.ar}
                  </span>
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder={`${reasonPlaceholderText.primary} | ${reasonPlaceholderText.ar}`}
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 flex flex-col items-center justify-center rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-4 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <div className="flex items-center gap-2 text-sm font-bold">
                  <IoPaperPlane className="h-4 w-4" />
                  <span>{isSubmitting ? submittingText.primary : submitBtnText.primary}</span>
                </div>
                <span className="text-[10px] font-normal opacity-85 font-arabic mt-0.5">
                  {isSubmitting ? submittingText.ar : submitBtnText.ar}
                </span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
