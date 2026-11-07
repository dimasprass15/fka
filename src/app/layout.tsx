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
    template: "%s | Fastabiqul Khairat Academy",
    default: "Fastabiqul Khairat Academy",
  },
  description: "Platform Belajar Quran dan Ilmu Syariah Islam Bersanad",
  keywords: ["Belajar Quran", "Ilmu Syariah", "Sanad", "Timur Tengah", "Fastabiqul Khairat"],
  authors: [{ name: "Fastabiqul Khairat Academy" }],
  openGraph: {
    title: "Fastabiqul Khairat Academy",
    description: "Platform Belajar Quran dan Ilmu Syariah Islam Bersanad",
    url: "https://fastabiqulkhairat.academy",
    siteName: "Fastabiqul Khairat Academy",
    locale: "id_ID",
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
    <html lang="id" dir="ltr">
      <body
        className={`${montserrat.variable} antialiased`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
