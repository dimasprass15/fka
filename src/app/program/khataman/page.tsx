"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const content = {
  ID: {
    back: "Kembali ke Daftar Program",
    title: "Khataman Sanad 30 Juz",
    subtitle: "Bi Nadzor dan Bilghoib",
    p1: "Program Khataman Sanad 30 Juz di Fastabiqul Khairat Academy merupakan program unggulan khusus yang dirancang untuk menjembatani Anda dengan para Masyaikh Timur Tengah dalam upaya mendapatkan sanad Al-Quran yang muttashil (bersambung) hingga ke Rasulullah Muhammad ﷺ.",
    ul1Title: "Keunggulan Program Kami",
    li1: "Talaqqi Langsung: Dibimbing secara privat oleh Masyaikh bersanad yang kompeten.",
    li2: "Fleksibilitas Metode: Tersedia pilihan jalur Bi Nadzor (membaca) maupun Bilghoib (hafalan).",
    li3: "Ijazah Resmi: Sertifikasi dan pemberian ijazah sanad setelah dinyatakan lulus ujian khataman.",
    ul2Title: "Siapa yang Cocok Mengikuti Program Ini?",
    p2: "Program ini sangat direkomendasikan bagi pengajar Al-Quran, imam masjid, santri tahfidz, dan kaum muslimin secara umum yang ingin menyempurnakan kualitas bacaannya dan menjaga keotentikan transmisi Al-Quran melalui jalur sanad yang shahih.",
    ctaTitle: "Ingin Mendaftar?",
    ctaText: "Pendaftaran program ini dibuka secara berkala. Hubungi admin kami untuk informasi gelombang pendaftaran terdekat.",
    btn: "Hubungi Admin via WhatsApp",
  },
  EN: {
    back: "Back to Programs",
    title: "30 Juz Sanad Khataman",
    subtitle: "Bi Nadzor and Bilghoib",
    p1: "The 30 Juz Sanad Khataman program at Fastabiqul Khairat Academy is a flagship program designed to connect you with Middle Eastern scholars to obtain a continuous chain of transmission (sanad) of the Quran back to Prophet Muhammad ﷺ.",
    ul1Title: "Our Program Advantages",
    li1: "Direct Talaqqi: Privately guided by competent scholars with sanad.",
    li2: "Flexible Methods: Available in both Bi Nadzor (reading) and Bilghoib (memorization) tracks.",
    li3: "Official Certificate: Certification and sanad diploma awarded upon passing the final exam.",
    ul2Title: "Who Should Join?",
    p2: "This program is highly recommended for Quran teachers, imams, tahfidz students, and Muslims in general who want to perfect their reading quality and preserve the authenticity of Quranic transmission.",
    ctaTitle: "Want to Register?",
    ctaText: "Registration opens periodically. Contact our admin for information on the upcoming intake.",
    btn: "Contact Admin via WhatsApp",
  },
  AR: {
    back: "العودة إلى قائمة البرامج",
    title: "ختمة السند 30 جزءا",
    subtitle: "بالنظر وبالغيب",
    p1: "برنامج ختمة السند 30 جزءا في أكاديمية فاستبقوا الخيرات هو برنامج متميز صمم لربطك بمشايخ الشرق الأوسط للحصول على إسناد متصل للقرآن الكريم إلى النبي محمد ﷺ.",
    ul1Title: "مميزات برنامجنا",
    li1: "التلقي المباشر: توجيه خاص من مشايخ مجازين ومختصين.",
    li2: "مرونة الطرق: متاح بمساري النظر (القراءة) والغيب (الحفظ).",
    li3: "شهادة رسمية: منح شهادة الإسناد بعد اجتياز الاختبار النهائي بنجاح.",
    ul2Title: "لمن هذا البرنامج؟",
    p2: "يوصى بهذا البرنامج بشدة لمعلمي القرآن والأئمة وطلاب التحفيظ وعموم المسلمين الذين يرغبون في إتقان قراءتهم والحفاظ على أصالة نقل القرآن.",
    ctaTitle: "هل تريد التسجيل؟",
    ctaText: "يفتح باب التسجيل بشكل دوري. تواصل مع الإدارة لمعرفة مواعيد الدفعة القادمة.",
    btn: "تواصل مع الإدارة عبر واتساب",
  }
};

export default function KhatamanPage() {
  const { language, isRTL } = useLanguage();
  const t = content[language as keyof typeof content] || content.ID;

  return (
    <div className={`min-h-screen bg-transparent text-slate-950 ${isRTL ? "rtl" : "ltr"}`}>
      <Navigation />
      <main className="mx-auto flex min-h-[calc(100vh-64px)] max-w-5xl flex-col items-start px-4 py-12 md:px-8">
        <Link href="/program" className={`mb-8 inline-flex items-center text-slate-600 hover:text-emerald-700 transition ${isRTL ? "flex-row-reverse" : ""}`}>
          <ArrowLeft className={`h-5 w-5 ${isRTL ? "ml-2 rotate-180" : "mr-2"}`} />
          {t.back}
        </Link>
        <article className="w-full overflow-hidden rounded-3xl bg-white shadow-xl shadow-emerald-900/5 border border-emerald-100">
          <div className="relative h-64 w-full md:h-80 lg:h-96">
            <Image src="/1.jpeg" alt={t.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent"></div>
            <div className={`absolute bottom-0 p-8 w-full ${isRTL ? "text-right" : "text-left"}`}>
              <h1 className="mb-2 text-3xl font-bold text-white md:text-5xl leading-tight">
                {t.title}
              </h1>
              <h2 className="text-xl font-medium text-[#C9A24D]">
                {t.subtitle}
              </h2>
            </div>
          </div>
          
          <div className={`p-8 md:p-12 text-lg leading-relaxed text-slate-700 ${isRTL ? "text-right" : "text-left"}`}>
            <p className="mb-6">{t.p1}</p>
            
            <h3 className="text-2xl font-semibold text-emerald-800 mt-8 mb-4">{t.ul1Title}</h3>
            <ul className={`space-y-3 mb-6 list-disc ${isRTL ? "list-inside pr-4" : "list-inside pl-4"}`}>
              <li>{t.li1}</li>
              <li>{t.li2}</li>
              <li>{t.li3}</li>
            </ul>

            <h3 className="text-2xl font-semibold text-emerald-800 mt-8 mb-4">{t.ul2Title}</h3>
            <p className="mb-6">{t.p2}</p>

            <div className="mt-10 rounded-2xl bg-emerald-50 p-6 border border-emerald-100">
              <h4 className="text-xl font-bold text-emerald-900 mb-2">{t.ctaTitle}</h4>
              <p className="text-slate-600 mb-6">{t.ctaText}</p>
              <Link href="/kontak-kami" className="inline-block rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 shadow-lg shadow-emerald-700/30">
                {t.btn}
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
