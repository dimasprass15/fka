/**
 * Pure utility functions for attendance gate, phone number sanitization,
 * Zoom deep-linking, and bilingual (ID/EN + Arabic Fushah) translations.
 */

export type SupportedGateLang = "ID" | "EN";

export interface DualText {
  primary: string;
  ar: string;
}

export function sanitizePhoneNumber(input: string): string {
  let cleaned = input.replace(/[\s\-\(\)]/g, '').trim();

  if (cleaned.startsWith('08')) {
    cleaned = '+62' + cleaned.substring(1);
  } else if (cleaned.startsWith('8')) {
    cleaned = '+62' + cleaned;
  } else if (cleaned.startsWith('62') && !cleaned.startsWith('+62')) {
    cleaned = '+' + cleaned;
  } else if (!cleaned.startsWith('+') && cleaned.length > 0) {
    cleaned = '+' + cleaned;
  }

  return cleaned;
}

/**
 * Sanitizes user input text (strips HTML, JS injection, trims, limits length).
 */
export function sanitizeInputText(input: string, maxLen = 120): string {
  if (!input) return "";
  return input
    .replace(/<[^>]*>?/gm, "") // Strip HTML/script tags
    .replace(/javascript:/gi, "")
    .replace(/data:/gi, "")
    .trim()
    .slice(0, maxLen);
}

export function buildZoomWebUrl(meetingId: string, passcode: string, uname: string): string {
  const cleanId = meetingId.replace(/[\s\-]/g, '');
  const encodedName = encodeURIComponent(uname.trim());
  const encodedPwd = encodeURIComponent(passcode.trim());
  return `https://zoom.us/j/${cleanId}?pwd=${encodedPwd}&uname=${encodedName}`;
}

export function buildZoomAppUrl(meetingId: string, passcode: string, uname: string): string {
  const cleanId = meetingId.replace(/[\s\-]/g, '');
  const encodedName = encodeURIComponent(uname.trim());
  const encodedPwd = encodeURIComponent(passcode.trim());
  return `zoomus://zoom.us/join?confno=${cleanId}&pwd=${encodedPwd}&uname=${encodedName}`;
}

/**
 * High-quality bilingual strings (Indonesian, English, and Arabic Fushah).
 */
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

// ─────────────────────────────────────────────────────────────────────────────
// INTELLIGENT ARABIC TRANSLATORS & DICTIONARIES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Translates day labels (e.g. "Jumat", "Senin & Kamis") to Arabic.
 */
export function translateDaysToAr(days?: string): string {
  if (!days) return "";
  const d = days.toLowerCase();
  if (d.includes("jumat") || d.includes("jum'at") || d.includes("friday")) return "الجمعة";
  if (d.includes("senin") && d.includes("kamis")) return "الإثنين والخميس";
  if (d.includes("senin") || d.includes("monday")) return "الإثنين";
  if (d.includes("selasa") || d.includes("tuesday")) return "الثلاثاء";
  if (d.includes("rabu") || d.includes("wednesday")) return "الأربعاء";
  if (d.includes("kamis") || d.includes("thursday")) return "الخميس";
  if (d.includes("sabtu") || d.includes("saturday")) return "السبت";
  if (d.includes("ahad") || d.includes("minggu") || d.includes("sunday")) return "الأحد";
  if (d.includes("setiap hari") || d.includes("daily")) return "يومياً";
  return days;
}

/**
 * Translates time to Arabic with KSA / WIB context.
 */
export function translateTimeToAr(utcHour?: number, utcMinute?: number): string {
  if (utcHour === undefined) return "";
  const wibHour = (utcHour + 7) % 24;
  const ksaHour = (utcHour + 3) % 24;
  const minStr = (utcMinute || 0).toString().padStart(2, "0");
  const wibStr = `${wibHour.toString().padStart(2, "0")}:${minStr}`;
  const ksaStr = `${ksaHour.toString().padStart(2, "0")}:${minStr}`;
  return `${wibStr} بتوقيت إندونيسيا (${ksaStr} مكة)`;
}

/**
 * Translates program category to Arabic.
 */
export function translateCategoryToAr(cat?: string): string {
  if (!cat) return "حلقة تعليمية";
  const c = cat.toLowerCase();
  if (c.includes("majelis sama")) return "مجلس السماع";
  if (c.includes("tahsin")) return "التحسين والتجويد";
  if (c.includes("tahfizh") || c.includes("tahfiz")) return "تحفيظ القرآن الكريم";
  if (c.includes("daurah")) return "الدورة العلمية";
  if (c.includes("khataman")) return "ختمة القرآن الكريم";
  if (c.includes("bahasa arab")) return "اللغة العربية";
  if (c.includes("matan")) return "دراسة المتون العلمية";
  return cat;
}

/**
 * Translates Form / Session Title to Arabic Fushah.
 */
export function translateTitleToAr(title?: string): string {
  if (!title) return "تسجيل الحضور وبوابة الحلقة";
  // If title has a pipe "ID | AR", extract Arabic part
  if (title.includes("|")) {
    const parts = title.split("|");
    if (parts.length > 1 && parts[1].trim()) return parts[1].trim();
  }

  const t = title.toLowerCase();
  if (t.includes("majelis sama syaikh") || t.includes("majelis sama syekh")) {
    return "مجلس السماع مع الشيخ";
  }
  if (t.includes("majelis sama")) return "مجلس السماع المبارك";
  if (t.includes("tahsin") && (t.includes("dewasa") || t.includes("umum"))) return "حلقة تحسين التلاوة للكبار";
  if (t.includes("tahsin") && t.includes("anak")) return "حلقة تحسين التلاوة للأطفال";
  if (t.includes("tahsin")) return "حلقة تحسين وتصحيح التلاوة";
  if (t.includes("tahfizh") || t.includes("tahfiz")) return "حلقة تحفيظ وضبط القرآن الكريم";
  if (t.includes("khataman")) return "مجلس ختمة القرآن الكريم";
  if (t.includes("daurah")) return "الدورة العلمية الشرعية";
  if (t.includes("matan jazariyyah")) return "شرح متن الجزرية";
  if (t.includes("matan tuhfatul athfal")) return "شرح تحفة الأطفال";
  if (t.includes("bahasa arab")) return "دروس تعلم اللغة العربية";
  if (t.includes("presensi") && t.includes("halaqah")) return "تسجيل الحضور وبوابة الحلقة";

  return `حلقة ${title}`;
}

/**
 * Translates teacher name & title (e.g. "Syaikh Ahmad" -> "الشيخ أحمد").
 */
export function translateTeacherNameToAr(teacher?: string): string {
  if (!teacher) return "";
  let res = teacher.trim();

  // Transliterate Islamic Titles
  res = res.replace(/^syaikh\s+/i, "الشيخ ");
  res = res.replace(/^syekh\s+/i, "الشيخ ");
  res = res.replace(/^sheikh\s+/i, "الشيخ ");
  res = res.replace(/^ustadzah\s+/i, "الأستاذة ");
  res = res.replace(/^ustazah\s+/i, "الأستاذة ");
  res = res.replace(/^ustadz\s+/i, "الأستاذ ");
  res = res.replace(/^ustaz\s+/i, "الأستاذ ");
  res = res.replace(/^kyai\s+/i, "الشيخ المربي ");
  res = res.replace(/^dr\.\s*/i, "د. ");

  // Common Arabic Teacher Names
  const nameMap: Record<string, string> = {
    "ahmad": "أحمد",
    "ahmed": "أحمد",
    "muhammad": "محمد",
    "mohammed": "محمد",
    "abdullah": "عبد الله",
    "abdurrahman": "عبد الرحمن",
    "abdurrahim": "عبد الرحيم",
    "abdul aziz": "عبد العزيز",
    "ali": "علي",
    "hasan": "حسن",
    "hassan": "حسن",
    "husain": "حسين",
    "hussein": "حسين",
    "ibrahim": "إبراهيم",
    "khalid": "خالد",
    "tariq": "طارق",
    "yusuf": "يوسف",
    "zaid": "زيد",
    "fauzi": "فوزي",
    "hamzah": "حمزة",
    "hamza": "حمزة",
    "salman": "سلمان",
    "umar": "عمر",
    "usman": "عثمان",
    "othman": "عثمان",
    "bilal": "بلال",
    "yahya": "يحيى",
    "zakariya": "زكريا",
    "shalahuddin": "صلاح الدين",
    "nuruddin": "نور الدين",
    "faisal": "فيصل",
    "adimas": "أديماس",
    "prasetya": "براسيتيا",
  };

  const words = res.split(" ");
  const translatedWords = words.map((w) => {
    const clean = w.toLowerCase().replace(/[^a-z]/g, "");
    if (nameMap[clean]) {
      return nameMap[clean];
    }
    return w;
  });

  return translatedWords.join(" ");
}

/**
 * Translates announcement / description text to Arabic.
 */
export function translateAnnouncementToAr(desc?: string): string {
  if (!desc) return "";
  if (desc.includes("|")) {
    const parts = desc.split("|");
    if (parts.length > 1 && parts[1].trim()) return parts[1].trim();
  }

  const d = desc.toLowerCase();
  if (d.includes("harap mengisi formulir presensi") || d.includes("mendapatkan akses ke room zoom")) {
    return "يرجى تعبئة استمارة الحضور للحصول على رابط قاعة زووم.";
  }
  if (d.includes("berwudhu") && d.includes("kitab")) {
    return "يرجى الوضوء وتحضير الكتاب قبل الدخول إلى قاعة زووم.";
  }
  if (d.includes("selamat datang")) {
    return "أهلاً وسهلاً بكم في قاعة اللقاء المبارك.";
  }

  return "يرجى ملء البيانات المطلوبة أعلاه لمتابعة الحضور.";
}

/**
 * Intelligent dictionary for dynamic questions added by admin.
 */
export function translateQuestionLabelToAr(
  label: string,
  index = 0,
  labelArOverride?: string
): string {
  // If an explicit Arabic override was given, use it
  if (labelArOverride && labelArOverride.trim()) {
    return labelArOverride.trim();
  }

  // If label has format "Judul ID | العنوان العربي"
  if (label.includes("|")) {
    const parts = label.split("|");
    if (parts.length > 1 && parts[1].trim()) return parts[1].trim();
  }

  const l = label.toLowerCase().trim();

  // 1. Core Fields
  if (l.includes("whatsapp") || l.includes("nomor wa") || l.includes("no wa") || l.includes("phone")) {
    return "رقم الواتساب للطالب";
  }
  if (l.includes("nama lengkap") || l.includes("nama santri") || l.includes("full name")) {
    return "الاسم الكامل للطالب";
  }
  if (l.includes("kategori") || l.includes("gender") || l.includes("jenis kelamin") || l.includes("ikhwan") || l.includes("akhwat")) {
    return "فئة الطالب";
  }

  // 2. Demographic & Personal Info
  if (l.includes("kota asal") || l.includes("kota") || l.includes("asal daerah") || l.includes("city")) {
    return "المدينة / البلد";
  }
  if (l.includes("provinsi") || l.includes("province")) {
    return "المحافظة / الإقليم";
  }
  if (l.includes("alamat") || l.includes("domisili") || l.includes("address")) {
    return "عنوان السكن الحالي";
  }
  if (l.includes("usia") || l.includes("umur") || l.includes("age")) {
    return "العمر / السن";
  }
  if (l.includes("pekerjaan") || l.includes("profesi") || l.includes("occupation")) {
    return "المهنة / العمل";
  }
  if (l.includes("pendidikan") || l.includes("education")) {
    return "المؤهل العلمي الأخير";
  }
  if (l.includes("status pernikahan") || l.includes("marital")) {
    return "الحالة الاجتماعية";
  }
  if (l.includes("wali") || l.includes("orang tua") || l.includes("parent")) {
    return "رقم هاتف ولي الأمر";
  }
  if (l.includes("email") || l.includes("surel")) {
    return "البريد الإلكتروني";
  }
  if (l.includes("tanggal lahir") || l.includes("tgl lahir") || l.includes("birth date")) {
    return "تاريخ الميلاد";
  }
  if (l.includes("tempat lahir") || l.includes("birth place")) {
    return "مكان الميلاد";
  }

  // 3. Halaqah & Mutaba'ah Questions
  if (l.includes("jumlah hafalan") || l.includes("hafalan") || l.includes("memorization")) {
    return "مقدار الحفظ من القرآن الكريم";
  }
  if (l.includes("juz")) {
    return "رقم الجزء";
  }
  if (l.includes("surah") || l.includes("surat")) {
    return "اسم السورة";
  }
  if (l.includes("halaman") || l.includes("page")) {
    return "الصفحة";
  }
  if (l.includes("mutabaah") || l.includes("mutaba'ah") || l.includes("tilawah")) {
    return "تقرير المتابعة والتلاوة اليومية";
  }
  if (l.includes("catatan") || l.includes("keterangan") || l.includes("notes")) {
    return "ملاحظات إضافية";
  }
  if (l.includes("alasan") || l.includes("kendala") || l.includes("reason")) {
    return "السبب أو الملاحظات";
  }
  if (l.includes("matan")) {
    return "هل سبق لك دراسة المتن وحفظه؟";
  }
  if (l.includes("halaqah") || l.includes("kelompok") || l.includes("kelas")) {
    return "اختيار الحلقة أو المجموعة";
  }

  // 4. Default Generic Question Counter
  const ordinalAr = [
    "الأول", "الثاني", "الثالث", "الرابع", "الخامس",
    "السادس", "السابع", "الثامن", "التاسع", "العاشر"
  ];
  const ord = ordinalAr[index] || `#${index + 1}`;
  return `السؤال ${ord}`;
}

/**
 * Translates radio/select option to Arabic.
 */
export function translateOptionToAr(opt: string): string {
  if (opt.includes("|")) {
    const parts = opt.split("|");
    if (parts.length > 1 && parts[1].trim()) return parts[1].trim();
  }

  const o = opt.toLowerCase().trim();
  if (o.includes("ikhwan") || o.includes("laki-laki") || o.includes("male") || o.includes("pria")) {
    return "إخوان (بنين / رجال)";
  }
  if (o.includes("akhwat") || o.includes("perempuan") || o.includes("female") || o.includes("wanita")) {
    return "أخوات (بنات / نساء)";
  }
  if (o === "ya" || o === "yes" || o === "sudah") return "نعم";
  if (o === "tidak" || o === "no" || o === "belum") return "لا";
  if (o.includes("opsi 1") || o.includes("option 1")) return "الخيار الأول";
  if (o.includes("opsi 2") || o.includes("option 2")) return "الخيار الثاني";
  if (o.includes("opsi 3") || o.includes("option 3")) return "الخيار الثالث";
  if (o.includes("opsi 4") || o.includes("option 4")) return "الخيار الرابع";

  return opt;
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
