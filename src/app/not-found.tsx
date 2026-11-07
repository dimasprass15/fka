import { IoAlertCircle } from "react-icons/io5";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F6F8FC] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-900/5 p-8 flex flex-col items-center">
        <div className="h-16 w-16 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 mb-5 shadow-inner">
          <IoAlertCircle className="h-10 w-10 text-rose-500" />
        </div>

        <span className="inline-flex flex-col items-center px-3 py-1.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 mb-3">
          <span>404 - Halaman Tidak Ditemukan</span>
          <span className="text-[10px] font-normal font-arabic" dir="rtl">
            ٤٠٤ - الصفحة غير موجودة
          </span>
        </span>

        <h1 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
          Halaman Tidak Tersedia
        </h1>
        <p className="text-sm font-semibold text-rose-800 font-arabic mb-3" dir="rtl">
          الصفحة المطلوبة غير متوفرة
        </p>

        <p className="text-xs md:text-sm text-slate-600 mb-1 leading-relaxed">
          Tautan yang Anda tuju tidak ditemukan atau telah dihapus dari sistem Fastabiqul Khairat Academy.
        </p>
        <p className="text-xs text-slate-500 font-arabic leading-relaxed" dir="rtl">
          الرابط الذي تحاول الوصول إليه غير موجود أو تمت إزالته من نظام الأكاديمية.
        </p>
      </div>
    </div>
  );
}

