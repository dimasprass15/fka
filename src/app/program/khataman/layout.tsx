import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Khataman Sanad 30 Juz | Fastabiqul Khairat Academy",
  description: "Program unggulan Khataman Al-Quran 30 Juz Bi Nadzor dan Bilghoib bersertifikat dan bersanad muttashil bersama masyaikh Timur Tengah.",
  keywords: "khataman sanad 30 juz, bi nadzor, bilghoib, hafalan quran bersanad, tahfidz online, masyaikh timur tengah, fastabiqul khairat academy",
};

export default function KhatamanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
