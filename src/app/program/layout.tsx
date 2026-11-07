import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Program",
  description: "Daftar program belajar Quran dan Ilmu Syariah Islam bersanad di Fastabiqul Khairat Academy.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
