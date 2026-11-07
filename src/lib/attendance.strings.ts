/**
 * Bilingual & Arabic translations for the Attendance Gate system.
 */

import type { SupportedGateLang, DualText } from './attendance.utils';

export const bilingualStrings = {
  badge: {
    id: "Gerbang Presensi Resmi",
    en: "Official Attendance Gate",
    ar: "بوابة تسجيل الحضور الرسمية",
  },
  titleSuffix: {
    id: "Fastabiqul Khairat Academy",
    en: "Fastabiqul Khairat Academy",
    ar: "أكاديمية فاستبقوا الخيرات",
  },
  phoneLabel: {
    id: "Nomor WhatsApp Santri",
    en: "Student WhatsApp Number",
    ar: "رقم الواتساب للطالب",
  },
  phonePlaceholder: {
    id: "Contoh: 08123456789",
    en: "e.g. 08123456789",
    ar: "مثال: 08123456789",
  },
  nameLabel: {
    id: "Nama Lengkap Santri",
    en: "Student Full Name",
    ar: "الاسم الكامل للطالب",
  },
  namePlaceholder: {
    id: "Masukkan nama lengkap Anda",
    en: "Enter your full name",
    ar: "أدخل اسمك الكامل",
  },
  nameLockedNote: {
    id: "Nama ini akan dikunci otomatis sebagai display name di Room Zoom.",
    en: "This name will be locked as your Zoom meeting display name.",
    ar: "سيتم قفل هذا الاسم تلقائياً كاسم العرض في قاعة زووم.",
  },
  genderLabel: {
    id: "Kategori Santri",
    en: "Student Category",
    ar: "فئة الطالب",
  },
  genderMale: {
    id: "Ikhwan (Laki-laki)",
    en: "Brothers (Male)",
    ar: "إخوان (بنين / رجال)",
  },
  genderFemale: {
    id: "Akhwat (Perempuan)",
    en: "Sisters (Female)",
    ar: "أخوات (بنات / نساء)",
  },
  teacherLabel: {
    id: "Pengampu:",
    en: "Instructor:",
    ar: "المشرف / المعلم:",
  },
  welcomeBack: {
    id: "Ahlan wa Sahlan kembali,",
    en: "Welcome back,",
    ar: "أهلاً وسهلاً بك مجدداً،",
  },
  registeredAs: {
    id: "Tercatat sebagai santri resmi FKA",
    en: "Enrolled student at FKA",
    ar: "طالب مسجل رسمياً في الأكاديمية",
  },
  changeNumber: {
    id: "Ganti nomor / akun lain",
    en: "Change phone number",
    ar: "تغيير الرقم / حساب آخر",
  },
  joinZoomBtn: {
    id: "Masuk Room Zoom",
    en: "Join Zoom Meeting",
    ar: "الدخول إلى قاعة زووم",
  },
  rejoinZoomBtn: {
    id: "Masuk Kembali ke Zoom",
    en: "Rejoin Zoom Meeting",
    ar: "إعادة الدخول إلى قاعة زووم",
  },
  submitting: {
    id: "Memverifikasi Presensi...",
    en: "Verifying Attendance...",
    ar: "جاري التحقق من الحضور...",
  },
  alreadyAttendedNote: {
    id: "Anda telah tercatat presensi hari ini. Silakan langsung masuk kembali ke room pembelajaran.",
    en: "You have already recorded attendance for today. You can rejoin directly.",
    ar: "لقد تم تسجيل حضورك اليوم بالفعل. تفضل بالدخول إلى القاعة مباشرة.",
  },
  excuseBtn: {
    id: "Ajukan Izin / Sakit",
    en: "Submit Excuse / Absence",
    ar: "تقديم طلب عذر / مرض",
  },
  excuseTitle: {
    id: "Form Keterangan Izin / Sakit",
    en: "Leave & Excuse Form",
    ar: "نموذج تقديم العذر والاعتذار",
  },
  excuseTypeLabel: {
    id: "Jenis Keterangan",
    en: "Excuse Type",
    ar: "نوع العذر",
  },
  excuseIzin: {
    id: "Izin (Keperluan Mendesak)",
    en: "Permission (Urgent Matter)",
    ar: "إذن (لأمر طارئ)",
  },
  excuseSakit: {
    id: "Sakit",
    en: "Sick",
    ar: "مرض",
  },
  excuseReasonLabel: {
    id: "Alasan / Catatan",
    en: "Reason / Notes",
    ar: "السبب / ملاحظات",
  },
  excuseReasonPlaceholder: {
    id: "Tuliskan alasan ketidakhadiran secara singkat...",
    en: "Provide a brief reason for your absence...",
    ar: "اكتب سبب الغياب باختصار...",
  },
  submitExcuseBtn: {
    id: "Kirim Keterangan",
    en: "Submit Excuse",
    ar: "إرسال العذر",
  },
  excuseSuccess: {
    id: "Keterangan izin Anda telah berhasil dicatat oleh musyrif/admin.",
    en: "Your excuse has been recorded by the admin.",
    ar: "تم تسجيل عذرك بنجاح وسيتواصل معك المشرف.",
  },
  successTitle: {
    id: "Presensi Berhasil Dicatat!",
    en: "Attendance Successfully Recorded!",
    ar: "تم تسجيل الحضور بنجاح!",
  },
  successSubtitle: {
    id: "Mengalihkan Anda secara otomatis ke Room Zoom...",
    en: "Redirecting you automatically to the Zoom Room...",
    ar: "جاري نقلك تلقائياً إلى قاعة زووم...",
  },
  openAppBtn: {
    id: "Buka Aplikasi Zoom",
    en: "Open Zoom App",
    ar: "فتح تطبيق زووم",
  },
  openBrowserBtn: {
    id: "Buka di Web Browser",
    en: "Open in Web Browser",
    ar: "فتح عبر المتصفح",
  },
  lockedDisplayName: {
    id: "Nama Terkunci",
    en: "Locked Display Name",
    ar: "اسم العرض المقفول",
  },
  copyMeetingInfo: {
    id: "Salin Info",
    en: "Copy Info",
    ar: "نسخ البيانات",
  },
  copied: {
    id: "Tersalin",
    en: "Copied",
    ar: "تم النسخ",
  },
  manualOpenNotice: {
    id: "Silakan gunakan tombol di bawah jika Zoom belum terbuka otomatis.",
    en: "Please use the buttons below if Zoom did not open automatically.",
    ar: "يرجى استخدام الأزرار أدناه إذا لم يُفتح تطبيق زووم تلقائياً.",
  },
  sessionNotFound: {
    id: "Sesi Pembelajaran Tidak Ditemukan",
    en: "Session Not Found",
    ar: "جلسة الحضور غير موجودة",
  },
  sessionNotFoundDesc: {
    id: "Tautan sesi presensi ini mungkin sudah tidak aktif atau salah penulisan.",
    en: "This attendance link may be inactive or misspelled.",
    ar: "قد يكون الرابط غير مفعل أو به خطأ في الكتابة.",
  },
  sessionInactiveBadge: {
    id: "Status: Program Non-Aktif",
    en: "Status: Program Inactive",
    ar: "الحالة: برنامج غير مفعّل",
  },
  sessionInactiveTitle: {
    id: "Program Ini Sedang Tidak Aktif",
    en: "This Program is Currently Inactive",
    ar: "هذا البرنامج غير مفعّل حالياً",
  },
  sessionInactiveDesc: {
    id: "Gerbang absensi dan ruang pembelajaran untuk program ini sedang dinonaktifkan sementara oleh pengajar/admin. Silakan hubungi pengajar atau tunggu hingga sesi dibuka kembali.",
    en: "The attendance gate for this program has been temporarily deactivated by the teacher/admin. Please contact your instructor or wait until the session is reopened.",
    ar: "قام المعلم أو المشرف بتعطيل بوابة الحضور لهذا البرنامج مؤقتاً. يرجى التواصل مع المعلم أو انتظار موعد اللقاء القادم.",
  },
  sessionUnavailableBadge: {
    id: "404 - Tidak Tersedia",
    en: "404 - Not Available",
    ar: "٤٠٤ - غير متوفر",
  },
  sessionUnavailableTitle: {
    id: "Halaqah / Program Tidak Tersedia",
    en: "Halaqah / Program Not Available",
    ar: "الحلقة أو البرنامج غير متوفر",
  },
  sessionUnavailableDesc: {
    id: "Tautan halaqah atau sesi presensi ini tidak ditemukan atau telah dihapus dari sistem Fastabiqul Khairat Academy.",
    en: "This halaqah or session link was not found or has been removed from the Fastabiqul Khairat Academy system.",
    ar: "رابط هذه الحلقة أو الجلسة غير موجود أو تم حذفه نهائياً من نظام أكاديمية فاستبقوا الخيرات.",
  },
  backToHome: {
    id: "Kembali ke Beranda",
    en: "Back to Home",
    ar: "العودة للرئيسية",
  },
};

export type BilingualKey = keyof typeof bilingualStrings;

export function getDualText(key: BilingualKey, lang: SupportedGateLang = "ID"): DualText {
  const item = bilingualStrings[key];
  if (!item) return { primary: "", ar: "" };
  return {
    primary: lang === "EN" ? item.en : item.id,
    ar: item.ar,
  };
}

// Backward-compatibility dictionary for legacy callers
export const gateI18n = {
  ID: Object.fromEntries(
    Object.entries(bilingualStrings).map(([k, v]) => [k, v.id])
  ),
  EN: Object.fromEntries(
    Object.entries(bilingualStrings).map(([k, v]) => [k, v.en])
  ),
  AR: Object.fromEntries(
    Object.entries(bilingualStrings).map(([k, v]) => [k, v.ar])
  ),
};

