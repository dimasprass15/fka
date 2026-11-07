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
    title: "Setoran Matan Ilmiah",
    subtitle: "Hafalan Matan Syar'i Bersanad",
    p1: "Hafalan matan adalah tradisi ulama salaf dalam menjaga pondasi ilmu-ilmu syariat. Melalui program Setoran Matan Ilmiah, Anda dapat menyetorkan berbagai matan disiplin ilmu agama untuk mendapatkan kelayakan akademik dan spiritual berupa sanad.",
    ul1Title: "Beberapa Matan Utama yang Tersedia:",
    li1: "Ilmu Tajwid: Matan Tuhfatul Athfal, Muqaddimah Al-Jazariyah.",
    li2: "Ilmu Aqidah: Matan Al-Ushul Ats-Tsalatsah, Kitabut Tauhid, Aqidah Wasithiyah.",
    li3: "Ilmu Bahasa Arab: Matan Al-Ajurrumiyah, Alfiyah Ibnu Malik.",
    li4: "Ilmu Fiqih & Ushul: Matan Abu Syuja', Al-Waraqat.",
    ul2Title: "Keistimewaan Program Setoran Matan",
    p2: "Setiap santri akan dibimbing agar tidak sekadar menghafal, tetapi memahami intisari bait-bait atau kalimat dalam matan tersebut. Hal ini guna memastikan ilmu terhujam kuat sebelum beralih ke pembahasan atau kitab yang lebih kompleks.",
    ctaTitle: "Ingin Mendaftar?",
    ctaText: "Pendaftaran program ini dibuka secara berkala. Hubungi admin kami untuk informasi gelombang pendaftaran terdekat.",
    btn: "Hubungi Admin via WhatsApp",
  },
  EN: {
    back: "Back to Programs",
    title: "Scientific Matn Memorization",
    subtitle: "Sanad-based Matn Memorization",
    p1: "Memorizing matn is a tradition of the early scholars to safeguard the foundations of Islamic sciences. Through this program, you can memorize and present various religious texts to obtain academic and spiritual qualification in the form of a sanad.",
    ul1Title: "Some Available Main Texts:",
    li1: "Tajweed: Tuhfatul Athfal, Al-Jazariyah.",
    li2: "Aqidah: Al-Ushul Ath-Thalathah, Kitabut Tauhid, Aqidah Wasithiyah.",
    li3: "Arabic Language: Al-Ajurrumiyah, Alfiyyah Ibn Malik.",
    li4: "Fiqh & Ushul: Matn Abu Shuja', Al-Waraqat.",
    ul2Title: "Special Features of the Program",
    p2: "Every student will be guided not only to memorize but also to understand the essence of the verses or sentences in the text. This is to ensure the knowledge is firmly rooted before moving on to more complex discussions or books.",
    ctaTitle: "Want to Register?",
    ctaText: "Registration opens periodically. Contact our admin for information on the upcoming intake.",
    btn: "Contact Admin via WhatsApp",
  },
  AR: {
    back: "العودة إلى قائمة البرامج",
    title: "تسميع المتون العلمية",
    subtitle: "حفظ المتون الشرعية بالسند",
    p1: "حفظ المتون هو تقليد علماء السلف في الحفاظ على أسس العلوم الشرعية. من خلال هذا البرنامج، يمكنك تسميع متون العلوم الدينية المختلفة للحصول على الأهلية الأكاديمية والروحية المتمثلة في السند.",
    ul1Title: "بعض المتون الأساسية المتاحة:",
    li1: "التجويد: تحفة الأطفال، الجزرية.",
    li2: "العقيدة: الأصول الثلاثة، كتاب التوحيد، العقيدة الواسطية.",
    li3: "اللغة العربية: الآجرومية، ألفية ابن مالك.",
    li4: "الفقه والأصول: متن أبي شجاع، الورقات.",
    ul2Title: "مميزات برنامج التسميع",
    p2: "سيتم توجيه كل طالب ليس فقط للحفظ بل لفهم جوهر أبيات المتن وكلماته. وذلك لضمان رسوخ العلم قبل الانتقال إلى نقاشات أو كتب أكثر تعقيداً.",
    ctaTitle: "هل تريد التسجيل؟",
    ctaText: "يفتح باب التسجيل بشكل دوري. تواصل مع الإدارة لمعرفة مواعيد الدفعة القادمة.",
    btn: "تواصل مع الإدارة عبر واتساب",
  }
};

export default function MatanPage() {
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
            <Image src="/3.jpeg" alt={t.title} fill className="object-cover" priority />
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
              <li>{t.li4}</li>
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
