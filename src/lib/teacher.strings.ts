/**
 * Trilingual translations (Arabic Fushah, Bahasa Indonesia, English)
 * for the Teacher / Sheikh Gate (Link Guru & Pengajar).
 * Priority default: Arabic (AR) with RTL support.
 */

export type TeacherGateLang = 'AR' | 'ID' | 'EN';

export interface TeacherGateStrings {
  badge: string;
  title: string;
  halaqahLabel: string;
  teacherLabel: string;
  deviceNote: string;
  errorWrongPin: string;
  errorRedirectNotice: string;
  pinLabel: string;
  pinPlaceholder: string;
  verifyBtn: string;
  verifyingBtn: string;
  notTeacherPrompt: string;
  notTeacherLink: string;
  // Screen: Terverifikasi (Auto-Launch Zoom)
  verifiedBadge: string;
  greetingPrefix: string;
  redirectingZoom: (countdown: number) => string;
  openingZoom: string;
  zoomNameLabel: string;
  meetingIdLabel: string;
  openZoomAppBtn: string;
  openZoomWebBtn: string;
}

export const teacherStrings: Record<TeacherGateLang, TeacherGateStrings> = {
  AR: {
    badge: 'بوابة دخول فضيلة الشيخ / المعلّم',
    title: 'التحقق من رمز المرور للمعلّم',
    halaqahLabel: 'الحلقة:',
    teacherLabel: 'فضيلة الشيخ / المعلّم:',
    deviceNote: '(يتم إدخال رمز المرور لمرة واحدة فقط على هذا الجهاز)',
    errorWrongPin: 'رمز المرور غير صحيح. لست مسجلاً كمعلّم لهذه الحلقة.',
    errorRedirectNotice: 'جاري تحويلك إلى صفحة تسجيل حضور الطلاب خلال ثانيتين...',
    pinLabel: 'أدخل رمز مرور المعلّم (٤-٦ أرقام):',
    pinPlaceholder: '••••',
    verifyBtn: 'التحقق والدخول إلى زووم',
    verifyingBtn: 'جاري التحقق...',
    notTeacherPrompt: 'لست المعلّم؟',
    notTeacherLink: 'الانتقال إلى تسجيل حضور الطلاب',
    verifiedBadge: 'تم التحقق بنجاح • وصول خاص بالمعلّم',
    greetingPrefix: 'أهلاً وسهلاً بفضيلة الشيخ،',
    redirectingZoom: (countdown: number) =>
      `جاري التوجيه مباشرة إلى تطبيق زووم (${countdown} ثوانٍ)...`,
    openingZoom: 'يتم الآن فتح تطبيق زووم...',
    zoomNameLabel: 'الاسم في زووم:',
    meetingIdLabel: 'معرّف الاجتماع:',
    openZoomAppBtn: 'فتح تطبيق زووم الآن',
    openZoomWebBtn: 'استخدام متصفح الويب لزووم',
  },
  ID: {
    badge: 'Gerbang Masuk Pengampu / Syaikh',
    title: 'Verifikasi PIN Pengajar',
    halaqahLabel: 'Halaqah:',
    teacherLabel: 'Pengampu:',
    deviceNote: '(PIN hanya perlu dimasukkan satu kali pada perangkat HP / Laptop ini)',
    errorWrongPin: 'PIN Pengajar Salah. Anda bukan pengampu terdaftar.',
    errorRedirectNotice: 'Mengalihkan Anda ke formulir presensi santri dalam 2 detik...',
    pinLabel: 'Masukkan PIN Pengajar (4-6 Digit):',
    pinPlaceholder: '••••',
    verifyBtn: 'Verifikasi & Masuk Zoom',
    verifyingBtn: 'Memverifikasi...',
    notTeacherPrompt: 'Bukan Pengajar?',
    notTeacherLink: 'Buka Presensi Santri',
    verifiedBadge: 'Akses Khusus Pengampu / Syaikh Terverifikasi',
    greetingPrefix: 'Ahlan wa Sahlan,',
    redirectingZoom: (countdown: number) =>
      `Mengarahkan langsung ke aplikasi Zoom (${countdown}s)...`,
    openingZoom: 'Aplikasi Zoom sedang dibuka...',
    zoomNameLabel: 'Nama di Zoom:',
    meetingIdLabel: 'Meeting ID:',
    openZoomAppBtn: 'Buka Aplikasi Zoom Sekarang',
    openZoomWebBtn: 'Gunakan Zoom Web Browser',
  },
  EN: {
    badge: 'Teacher / Sheikh Entrance Gate',
    title: 'Teacher PIN Verification',
    halaqahLabel: 'Halaqah:',
    teacherLabel: 'Instructor / Sheikh:',
    deviceNote: '(PIN only needs to be entered once on this device)',
    errorWrongPin: 'Incorrect Teacher PIN. You are not registered as an instructor.',
    errorRedirectNotice: 'Redirecting you to the student attendance form in 2 seconds...',
    pinLabel: 'Enter Teacher PIN (4-6 Digits):',
    pinPlaceholder: '••••',
    verifyBtn: 'Verify & Join Zoom',
    verifyingBtn: 'Verifying...',
    notTeacherPrompt: 'Not the teacher?',
    notTeacherLink: 'Open Student Attendance',
    verifiedBadge: 'Verified Teacher / Sheikh Access',
    greetingPrefix: 'Welcome,',
    redirectingZoom: (countdown: number) =>
      `Redirecting directly to Zoom app (${countdown}s)...`,
    openingZoom: 'Opening Zoom app...',
    zoomNameLabel: 'Name in Zoom:',
    meetingIdLabel: 'Meeting ID:',
    openZoomAppBtn: 'Open Zoom App Now',
    openZoomWebBtn: 'Use Zoom Web Browser',
  },
};
