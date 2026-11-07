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
    title: "Tahsin atau Tashih",
    subtitle: "Perbaikan Bacaan Al-Quran",
    p1: "Membaca Al-Quran dengan tajwid yang benar adalah kewajiban setiap muslim. Program Tahsin dan Tashih hadir untuk memfasilitasi Anda dalam membenarkan pengucapan (makharijul huruf) serta sifat-sifat huruf secara komprehensif.",
    ul1Title: "Apa yang Akan Anda Pelajari?",
    li1: "Makharijul Huruf: Mempelajari tempat keluarnya huruf hijaiyah dengan presisi.",
    li2: "Sifatul Huruf: Mengetahui karakteristik setiap huruf agar tidak tertukar.",
    li3: "Ahkamut Tajwid: Aturan tebal tipis (tafkhim/tarqiq), panjang pendek (mad), dan hukum nun mati/mim mati.",
    ul2Title: "Kenapa Memilih Program Kami?",
    p2: "Fastabiqul Khairat Academy bekerja sama dengan pengajar tersertifikasi yang ahli dalam bidang Qiraat dan Tajwid. Program ini disusun secara sistematis agar peserta dari berbagai kalangan usia dapat dengan mudah menguasai praktik membaca Al-Quran yang tartil.",
    ctaTitle: "Ingin Mendaftar?",
    ctaText: "Pendaftaran program ini dibuka secara berkala. Hubungi admin kami untuk informasi gelombang pendaftaran terdekat.",
    btn: "Hubungi Admin via WhatsApp",
  },
  EN: {
    back: "Back to Programs",
    title: "Tahsin or Tashih",
    subtitle: "Quran Reading Improvement",
    p1: "Reading the Quran with correct tajweed is the obligation of every Muslim. The Tahsin and Tashih program is here to facilitate you in correcting pronunciation (makharijul huruf) and letter characteristics comprehensively.",
    ul1Title: "What Will You Learn?",
    li1: "Makharijul Huruf: Learning the points of articulation with precision.",
    li2: "Sifatul Huruf: Knowing the characteristics of each letter to avoid confusion.",
    li3: "Ahkamut Tajwid: Rules of thickness (tafkhim/tarqiq), length (madd), and the rules of noon/meem saakinah.",
    ul2Title: "Why Choose Our Program?",
    p2: "Fastabiqul Khairat Academy collaborates with certified teachers who are experts in Qiraat and Tajweed. This program is structured systematically so that participants of all ages can easily master the practice of tartil reading.",
    ctaTitle: "Want to Register?",
    ctaText: "Registration opens periodically. Contact our admin for information on the upcoming intake.",
    btn: "Contact Admin via WhatsApp",
  },
  AR: {
    back: "العودة إلى قائمة البرامج",
    title: "تحسين وتصحيح",
    subtitle: "تحسين تلاوة القرآن",
    p1: "قراءة القرآن بالتجويد الصحيح واجب على كل مسلم. جاء برنامج التحسين والتصحيح لمساعدتك في تصحيح النطق (مخارج الحروف) وصفات الحروف بشكل شامل.",
    ul1Title: "ماذا ستتعلم؟",
    li1: "مخارج الحروف: تعلم أماكن خروج الحروف بدقة.",
    li2: "صفات الحروف: معرفة خصائص كل حرف لتجنب الخلط.",
    li3: "أحكام التجويد: قواعد التفخيم والترقيق، والمدود، وأحكام النون والميم الساكنتين.",
    ul2Title: "لماذا تختار برنامجنا؟",
    p2: "تتعاون أكاديمية فاستبقوا الخيرات مع معلمين معتمدين وخبراء في القراءات والتجويد. تم تصميم هذا البرنامج بشكل منهجي حتى يتمكن المشاركون من مختلف الأعمار من إتقان التلاوة المرتلة بسهولة.",
    ctaTitle: "هل تريد التسجيل؟",
    ctaText: "يفتح باب التسجيل بشكل دوري. تواصل مع الإدارة لمعرفة مواعيد الدفعة القادمة.",
    btn: "تواصل مع الإدارة عبر واتساب",
  }
};

export default function TahsinPage() {
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
            <Image src="/2.jpeg" alt={t.title} fill className="object-cover" priority />
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
