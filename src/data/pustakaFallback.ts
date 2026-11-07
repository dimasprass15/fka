import type { KnowledgePost } from "@/types/pustaka";

export const initialKnowledgePosts: KnowledgePost[] = [
  {
    id: "post-1",
    slug: "tafsir-ringkas-al-fatihah",
    type: "article",
    category: "quran",
    title_id: "Tafsir Ringkas Surat Al-Fatihah & Rahasia 7 Ayat yang Diulang",
    title_ar: "تفسير سورة الفاتحة وأسرار السبع المثاني",
    title_en: "Concise Exegesis of Surah Al-Fatihah and the Seven Often-Repeated Verses",
    excerpt_id:
      "Penjelasan mendalam tentang susunan ayat Surat Al-Fatihah, pembagian antara hak Allah dan permohonan hamba, serta rujukan qira'at mutawatirah.",
    excerpt_ar:
      "شرح موجز لبناء سورة الفاتحة والتقسيم النبوي بين حق الله وسؤال العبد مع الإشارة لأوجه القراءات المتواترة.",
    excerpt_en:
      "An in-depth explanation of the verse structure of Surah Al-Fatihah, the divine covenant, and references from authentic mutawatir qira'at.",
    content_markdown_id:
      "Surat Al-Fatihah dinamakan As-Sab'ul Matsani (Tujuh Ayat yang Diulang-ulang). Di dalamnya terkandung tauhid rububiyyah, uluhiyyah, dan asma wa shifat secara sempurna.\n\n### Faedah Makhraj & Tajwid dari Syaikhah Abeer:\nPerhatikan kejelasan makhraj huruf Ha (ح) pada lafaz Al-Hamdu agar keluar murni dari tengah tenggorokan (wasathul halq) tanpa desisan dada berlebih.",
    content_markdown_ar:
      "تعد سورة الفاتحة أم الكتاب والسبع المثاني والقرآن العظيم.\n\n### فوائد في التلاوة والتجويد:\nالعناية بمخرج حرف الحاء في قوله تعالى (الحمد لله) من وسط الحلق دون خلطه بالهاء أو كتم صوته.",
    content_markdown_en:
      "Surah Al-Fatihah is known as the Mother of the Book. It encapsulates core Islamic monotheism and prophetic supplication.\n\n### Tajweed Insight from Syaikhah Abeer:\nEnsure the crisp articulation of Ha (ح) in Al-Hamdu from the middle of the throat.",
    teacher_name: "Syaikhah Abeer Utsman Al-Yamaniyyah",
    teacher_name_ar: "الشيخة عبير عثمان اليمانية",
    teacher_name_en: "Syaikhah Abeer Utsman Al-Yamaniyyah",
    read_time_minutes: 4,
    sort_order: 1,
  },
  {
    id: "post-2",
    slug: "audio-makharijul-huruf-dhad-zha",
    type: "audio",
    category: "tajwid",
    title_id: "Praktik Makharijul Huruf: Perbedaan Huruf Dhad (ض) dan Zha (ظ)",
    title_ar: "تسجيل صوتي لمخارج الحروف: حرفا الضاد والظاء",
    title_en: "Audio Talaqqi: Articulation Points of Dhad (ض) vs Zha (ظ)",
    excerpt_id:
      "Bimbingan talaqqi audio membedakan sisi lidah pada huruf Dhad dengan ujung lidah pada huruf Zha disertai contoh ayat.",
    excerpt_ar:
      "تسجيل صوتي تعليمي في ضبط حافة اللسان للضاد وطرف اللسان للظاء مع أمثلة قرآنية تطبيقية.",
    excerpt_en:
      "Audio guidance demonstrating the difference between lateral tongue contact for Dhad and tip of the tongue for Zha.",
    media_url: "https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg",
    duration_text: "08:45",
    teacher_name: "Syaikhah Abeer Utsman Al-Yamaniyyah",
    teacher_name_ar: "الشيخة عبير عثمان اليمانية",
    teacher_name_en: "Syaikhah Abeer Utsman Al-Yamaniyyah",
    sort_order: 2,
  },
  {
    id: "post-3",
    slug: "video-majelis-waqaf-ibtida",
    type: "video",
    category: "tajwid",
    title_id: "Majelis Talaqqi: Kaidah Waqaf & Ibtida' Pada Ayat Panjang",
    title_ar: "تسجيل مجلس التلقي: قواعد الوقف والابتداء في الآيات الطويلة",
    title_en: "Talaqqi Lecture: Rules of Stopping and Resuming in Long Verses",
    excerpt_id:
      "Rekaman majelis ilmiah mengupas tempat-tempat waqaf yang tepat saat membaca ayat bertingkat agar makna tidak rusak.",
    excerpt_ar:
      "تسجيل لمجلس الإقراء العلمي في تبيين مواضع الوقف التام والكافي والحسن في الآيات الطويلة.",
    excerpt_en:
      "Scientific lecture recording discussing permissible and proper stopping places in extended Quranic verses.",
    media_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration_text: "42:15",
    teacher_name: "Syaikhah Abeer Utsman Al-Yamaniyyah",
    teacher_name_ar: "الشيخة عبير عثمان اليمانية",
    teacher_name_en: "Syaikhah Abeer Utsman Al-Yamaniyyah",
    sort_order: 3,
  },
  {
    id: "post-4",
    slug: "audio-matan-tuhfatul-athfal",
    type: "audio",
    category: "mutun",
    title_id: "Lantunan Matan Tuhfatul Athfal Lengkap (Tempo Murattal Lambat)",
    title_ar: "متن تحفة الأطفال بصوت هادئ للتدريب والحفظ",
    title_en: "Complete Tuhfatul Athfal Recitation (Murattal Tempo for Memorization)",
    excerpt_id:
      "Rekaman bait-bait matan tajwid Tuhfatul Athfal bait 1 s/d 61 dengan intonasi murattal lambat untuk memudahkan hafalan santri.",
    excerpt_ar:
      "منظومة تحفة الأطفال كاملة للإمام الجمزوري بأداء هادئ ميسر للحفظ والمراجعة.",
    excerpt_en:
      "Complete Tuhfatul Athfal poem recited at a moderate pace to assist students in memorization and review.",
    media_url: "https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg",
    duration_text: "14:10",
    teacher_name: "Syaikhah Abeer Utsman Al-Yamaniyyah",
    teacher_name_ar: "الشيخة عبير عثمان اليمانية",
    teacher_name_en: "Syaikhah Abeer Utsman Al-Yamaniyyah",
    sort_order: 4,
  },
  {
    id: "post-5",
    slug: "hukum-mad-lazim-kalimi-harfi",
    type: "article",
    category: "tajwid",
    title_id: "Memahami Hukum Mad Lazim Kalimi & Harfi Beserta Tingkatannya",
    title_ar: "شرح المد اللازم الكلمي والحرفي ومراتب المدود",
    title_en: "Understanding Compulsory Prolongation (Mad Lazim) and Its Degrees",
    excerpt_id:
      "Pembedahan kaidah mad 6 harakat mutsaqqal dan mukhaffaf disertai contoh-contoh praktis dari mushaf Madinah.",
    excerpt_ar:
      "بيان تفصيلي لمراتب المدود وضوابط المد اللازم الكلمي والحرفي بشقيه المثقل والمخفف.",
    excerpt_en:
      "A detailed breakdown of the 6-vowel count Mad Lazim in words and isolated letters according to Hafsh 'an 'Ashim.",
    content_markdown_id:
      "Mad Lazim adalah mad yang terjadi apabila huruf mad bertemu huruf sukun asli baik dalam satu kata maupun dalam huruf fawatihussuwar.\n\nPanjang bacaannya wajib 6 harakat (tul) tanpa kompromi.",
    content_markdown_ar:
      "المد اللازم هو ما جاء فيه بعد حرف المد ساكن أصلي وصلاً ووقفاً، ومقداره ست حركات وجوباً.",
    content_markdown_en:
      "Mad Lazim occurs when an original sukoon follows a madd letter. It must strictly be prolonged for 6 harakat.",
    teacher_name: "Syaikhah Abeer Utsman Al-Yamaniyyah",
    teacher_name_ar: "الشيخة عبير عثمان اليمانية",
    teacher_name_en: "Syaikhah Abeer Utsman Al-Yamaniyyah",
    read_time_minutes: 6,
    sort_order: 5,
  },
  {
    id: "post-6",
    slug: "video-daurah-sanad-jazariyyah",
    type: "video",
    category: "mutun",
    title_id: "Daurah Sanad Jazariyyah: Bab Sifat Huruf yang Memiliki Lawan",
    title_ar: "شرح منظومة المقدمة الجزرية: باب صفات الحروف",
    title_en: "Jazariyyah Masterclass: Attributes of Letters With Opposites",
    excerpt_id:
      "Penjelasan komprehensif sifat jahr vs hams, syiddah vs rakhawah, isti'la vs istifal, dan ithbaq vs infitah.",
    excerpt_ar:
      "شرح علمي دقيق لصفات الحروف المتضادة وكيفية تطبيقها العملي في التلاوة بأعلى معايير الإتقان.",
    excerpt_en:
      "A comprehensive exposition of paired phonetic attributes according to Ibn Al-Jazari.",
    media_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration_text: "55:30",
    teacher_name: "Syaikhah Abeer Utsman Al-Yamaniyyah",
    teacher_name_ar: "الشيخة عبير عثمان اليمانية",
    teacher_name_en: "Syaikhah Abeer Utsman Al-Yamaniyyah",
    sort_order: 6,
  },
];

