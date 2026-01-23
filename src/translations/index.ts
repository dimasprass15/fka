export const translations = {
  ID: {
    nav: {
      home: "Beranda",
      about: "Tentang Kami",
      program: "Program",
      contact: "Kontak Kami",
    },
    hero: {
      subtitle: "Platform Belajar bersama Masyaikh Timur Tengah",
      title: "Belajar Quran dan Ilmu Syariah Islam",
      titleHighlight: "Bersanad",
      description: "Belajar ilmu qur'an dan ilmu syariah islam di mana saja bersama para pengajar dan masyaikh timur tengah bersanad.",
      descriptionBold1: "ilmu qur'an",
      descriptionBold2: "ilmu syariah islam",
      cta: "Belajar Sekarang",
      stats: {
        users: "Pengguna",
      },
    },
  },
  AR: {
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      program: "البرامج",
      contact: "اتصل بنا",
    },
    hero: {
      subtitle: "منصة التعلم مع مشايخ الشرق الأوسط",
      title: "تعلم القرآن وعلوم الشريعة الإسلامية",
      titleHighlight: "بالإسناد",
      description: "تعلم علوم القرآن وعلوم الشريعة الإسلامية في أي مكان مع المعلمين ومشايخ الشرق الأوسط بالإسناد.",
      descriptionBold1: "علوم القرآن",
      descriptionBold2: "علوم الشريعة الإسلامية",
      cta: "ابدأ التعلم الآن",
      stats: {
        users: "المستخدمون",
      },
    },
  },
  EN: {
    nav: {
      home: "Home",
      about: "About Us",
      program: "Programs",
      contact: "Contact Us",
    },
    hero: {
      subtitle: "Learning Platform with Middle Eastern Scholars",
      title: "Learn Quran and Islamic Sharia Sciences",
      titleHighlight: "with Sanad",
      description: "Learn Quranic sciences and Islamic Sharia sciences anywhere with teachers and Middle Eastern scholars with sanad.",
      descriptionBold1: "Quranic sciences",
      descriptionBold2: "Islamic Sharia sciences",
      cta: "Start Learning Now",
      stats: {
        users: "Users",
      },
    },
  },
};

export type TranslationKey = keyof typeof translations.ID;

