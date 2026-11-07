import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tahsin atau Tashih | Perbaikan Bacaan Al-Quran | Fastabiqul Khairat Academy",
  description: "Program Tahsin dan Tashih Al-Quran bersanad di Fastabiqul Khairat Academy. Perbaiki kualitas bacaan dan makharijul huruf Anda bersama para ahli.",
  keywords: "tahsin quran, tashih bacaan alquran, perbaikan tajwid, belajar tahsin online, makharijul huruf, fastabiqul khairat academy",
};

export default function TahsinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
