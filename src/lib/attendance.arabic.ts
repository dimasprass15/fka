/**
 * Intelligent Arabic translators & dictionaries for Attendance Gate.
 */

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
 * Translates day labels (e.g. "Jumat", "Senin & Kamis") to English.
 */
export function translateDaysToEn(days?: string): string {
  if (!days) return "";
  const d = days.toLowerCase();
  if (d.includes("setiap hari") || d.includes("daily")) return "Every Day";
  if (d.includes("senin") && d.includes("kamis")) return "Monday & Thursday";
  if (d.includes("sabtu") && d.includes("rabu")) return "Saturday - Wednesday";
  if (d.includes("senin") && d.includes("jumat")) return "Monday - Friday";
  if (d.includes("jumat") || d.includes("jum'at")) return "Friday";
  if (d.includes("senin")) return "Monday";
  if (d.includes("selasa")) return "Tuesday";
  if (d.includes("rabu")) return "Wednesday";
  if (d.includes("kamis")) return "Thursday";
  if (d.includes("sabtu")) return "Saturday";
  if (d.includes("ahad") || d.includes("minggu")) return "Sunday";
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
 * Translates program category to English.
 */
export function translateCategoryToEn(cat?: string): string {
  if (!cat) return "Halaqah";
  const c = cat.toLowerCase();
  if (c.includes("majelis sama")) return "Majelis Sama";
  if (c.includes("tahsin")) return "Tahsin & Tajweed";
  if (c.includes("tahfizh") || c.includes("tahfiz")) return "Quran Memorization";
  if (c.includes("daurah")) return "Intensive Course";
  if (c.includes("khataman")) return "Quran Khataman";
  if (c.includes("bahasa arab")) return "Arabic Language";
  if (c.includes("matan")) return "Matan Studies";
  return cat;
}

/**
 * Translates Form / Session Title to Arabic Fushah.
 */
export function translateTitleToAr(title?: string): string {
  if (!title) return "تسجيل الحضور وبوابة الحلقة";
  if (title.includes("|")) {
    const parts = title.split("|");
    if (parts.length > 1 && parts[1].trim()) return parts[1].trim();
  }

  const t = title.toLowerCase();

  // Qiraat / Qiroah / Asim / Hafs / Akhwat / Ikhwan
  if (t.includes("qiraat") || t.includes("qira'at") || t.includes("qiroah") || t.includes("qiraah")) {
    let q = "القراءات القرآنية";
    if (t.includes("ashim") || t.includes("asim")) q = "قراءة عاصم";
    else if (t.includes("hafs") || t.includes("hafsh")) q = "رواية حفص عن عاصم";
    else if (t.includes("syu'bah") || t.includes("syubah")) q = "رواية شعبة عن عاصم";
    else if (t.includes("nafi")) q = "قراءة نافع المدني";
    else if (t.includes("warsy") || t.includes("warsh")) q = "رواية ورش عن نافع";
    else if (t.includes("qalun") || t.includes("qolun")) q = "رواية قالون عن نافع";
    else if (t.includes("sab'ah") || t.includes("tujuh")) q = "القراءات السبع";
    else if (t.includes("asyarah") || t.includes("sepuluh")) q = "القراءات العشر";

    const aud = t.includes("akhwat") ? " (للأخوات)" : t.includes("ikhwan") ? " (للإخوة)" : "";
    if (t.includes("praktik") || t.includes("praktek") || t.includes("talaqqi")) {
      return `مقرأة ${q}${aud}`;
    }
    return `حلقة ${q}${aud}`;
  }

  if (t.includes("majelis sama syaikh") || t.includes("majelis sama syekh")) {
    return "مجلس السماع مع الشيخ";
  }
  if (t.includes("majelis sama")) return "مجلس السماع المبارك";
  if (t.includes("tahsin") && t.includes("akhwat")) return "حلقة تحسين وتصحيح التلاوة (للأخوات)";
  if (t.includes("tahsin") && t.includes("ikhwan")) return "حلقة تحسين وتصحيح التلاوة (للإخوة)";
  if (t.includes("tahsin") && (t.includes("dewasa") || t.includes("umum"))) return "حلقة تحسين التلاوة للكبار";
  if (t.includes("tahsin") && t.includes("anak")) return "حلقة تحسين التلاوة للأطفال";
  if (t.includes("tahsin")) return "حلقة تحسين وتصحيح التلاوة";
  if (t.includes("tahfizh") || t.includes("tahfiz")) {
    const aud = t.includes("akhwat") ? " (للأخوات)" : t.includes("ikhwan") ? " (للإخوة)" : "";
    return `حلقة تحفيظ وضبط القرآن الكريم${aud}`;
  }
  if (t.includes("khataman")) return "مجلس ختمة القرآن الكريم";
  if (t.includes("daurah")) return "الدورة العلمية الشرعية";
  if (t.includes("matan")) return "دراسة المتون العلمية";
  if (t.includes("bahasa arab")) return "دروس تعلم اللغة العربية";
  if (t.includes("presensi") && t.includes("halaqah")) return "تسجيل الحضور وبوابة الحلقة";

  return `حلقة ${title}`;
}

/**
 * Translates teacher name & title (e.g. "Syaikh Ahmad" -> "الشيخ أحمد", "Syaikhah Samar" -> "الشيخة سمر").
 */
export function translateTeacherNameToAr(teacher?: string): string {
  if (!teacher) return "";
  let res = teacher.trim();

  res = res.replace(/^(syaikhah|sheikhah|syikhah|syekhah)\s+/i, "الشيخة ");
  res = res.replace(/^(syaikh|sheikh|syikh|syekh)\s+/i, "الشيخ ");
  res = res.replace(/^(ustadzah|ustazah|ustadza)\s+/i, "الأستاذة ");
  res = res.replace(/^(ustadz|ustaz|ustad)\s+/i, "الأستاذ ");
  res = res.replace(/^(kyai|kiai)\s+/i, "الشيخ ");
  res = res.replace(/^(bu\s+nyai|bunyai)\s+/i, "الشيخة ");
  res = res.replace(/^dr\.\s*/i, "د. ");

  const nameMap: Record<string, string> = {
    samar: "سمر", sarah: "سارة", sara: "سارة", maryam: "مريم", mariam: "مريم",
    fatimah: "فاطمة", fatima: "فاطمة", khadijah: "خديجة", aisyah: "عائشة", aisha: "عائشة",
    asma: "أسماء", salma: "سلمى", huda: "هدى", amira: "أميرة", nura: "نورة",
    iman: "إيمان", hanan: "حنان", yasmin: "ياسمين", layla: "ليلى", zainab: "زينب",
    safiyyah: "صفية", hafshah: "حفصة", sumayyah: "سمية", ruqayyah: "رقية", hind: "هند",
    ahmad: "أحمد", ahmed: "أحمد", muhammad: "محمد", mohammed: "محمد", abdullah: "عبد الله",
    abdurrahman: "عبد الرحمن", abdurrahim: "عبد الرحيم", abdulaziz: "عبد العزيز", ali: "علي",
    hasan: "حسن", hassan: "حسن", husain: "حسين", hussein: "حسين", ibrahim: "إبراهيم",
    khalid: "خالد", tariq: "طارق", yusuf: "يوسف", zaid: "زيد", fauzi: "فوزي",
    hamzah: "حمزة", hamza: "حمزة", salman: "سلمان", umar: "عمر", usman: "عثمان",
    bilal: "بلال", yahya: "يحيى", zakariya: "زكريا", shalahuddin: "صلاح الدين",
    nuruddin: "نور الدين", faisal: "فيصل", dimas: "ديماس", adimas: "أديماس", prasetya: "براسيتيا",
  };

  const words = res.split(" ");
  const translatedWords = words.map((w) => {
    const clean = w.toLowerCase().replace(/[^a-z]/g, "");
    return nameMap[clean] || w;
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
 * Translates announcement / description text to English.
 */
export function translateAnnouncementToEn(desc?: string): string {
  if (!desc) return "";
  if (desc.includes("|")) {
    const parts = desc.split("|");
    if (parts.length > 2 && parts[2].trim()) return parts[2].trim();
  }

  const d = desc.toLowerCase();
  if (d.includes("harap mengisi formulir presensi") || d.includes("mendapatkan akses ke room zoom")) {
    return "Please fill out the attendance form to gain access to the Zoom room.";
  }
  if (d.includes("berwudhu") && d.includes("kitab")) {
    return "Please perform ablution and prepare your book before entering the Zoom room.";
  }
  if (d.includes("selamat datang")) {
    return "Welcome to the blessed halaqah room.";
  }

  return desc;
}

/**
 * Intelligent dictionary for dynamic questions added by admin.
 */
export function translateQuestionLabelToAr(
  label: string,
  index = 0,
  labelArOverride?: string
): string {
  if (labelArOverride && labelArOverride.trim()) {
    return labelArOverride.trim();
  }

  if (label.includes("|")) {
    const parts = label.split("|");
    if (parts.length > 1 && parts[1].trim()) return parts[1].trim();
  }

  const l = label.toLowerCase().trim();

  // Core Fields
  if (l.includes("whatsapp") || l.includes("nomor wa") || l.includes("no wa") || l.includes("phone")) {
    return "رقم الواتساب للطالب";
  }
  if (l.includes("nama lengkap") || l.includes("nama santri") || l.includes("full name")) {
    return "الاسم الكامل للطالب";
  }
  if (l.includes("kategori") || l.includes("gender") || l.includes("jenis kelamin") || l.includes("ikhwan") || l.includes("akhwat")) {
    return "فئة الطالب";
  }

  // Demographic & Personal Info
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

  // Halaqah & Mutaba'ah Questions
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

