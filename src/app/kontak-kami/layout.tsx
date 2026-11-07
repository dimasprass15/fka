import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak Kami",
  description: "Hubungi Fastabiqul Khairat Academy. Kami siap membantu Anda dengan informasi pendaftaran dan program pendidikan Islam.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
