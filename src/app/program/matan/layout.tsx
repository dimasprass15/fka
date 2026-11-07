import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Setoran Matan Ilmiah | Fastabiqul Khairat Academy",
  description: "Program Setoran Matan Ilmiah hafalan bersanad untuk disiplin ilmu syar'i seperti Tuhfatul Athfal, Jazariyah, dan lainnya di Fastabiqul Khairat Academy.",
  keywords: "setoran matan ilmiah, matan tajwid, tuhfatul athfal, al jazariyah, hafalan matan bersanad, ilmu syari online, fastabiqul khairat academy",
};

export default function MatanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
