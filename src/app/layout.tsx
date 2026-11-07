import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: {
    template: "%s | أكاديمية فاستبقوا الخيرات",
    default: "أكاديمية فاستبقوا الخيرات | Fastabiqul Khairat Academy",
  },
  description: "صرح تعليمي قرآني رائد لتعليم القرآن الكريم وعلومه بالقراءات المتواترة والعلوم الشرعية بالسند المتصل",
  keywords: [
    "أكاديمية فاستبقوا الخيرات",
    "تعليم القرآن",
    "السند المتصل",
    "القراءات العشر",
    "العلوم الشرعية",
    "Fastabiqul Khairat",
  ],
  authors: [{ name: "Fastabiqul Khairat Academy" }],
  openGraph: {
    title: "أكاديمية فاستبقوا الخيرات | Fastabiqul Khairat Academy",
    description: "صرح تعليمي قرآني رائد لتعليم القرآن الكريم وعلومه بالقراءات المتواترة والعلوم الشرعية بالسند المتصل",
    url: "https://fastabiq.site",
    siteName: "أكاديمية فاستبقوا الخيرات",
    locale: "ar_SA",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${montserrat.variable} antialiased`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
