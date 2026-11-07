import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Mengenal lebih dekat Fastabiqul Khairat Academy, visi, misi, dan keunggulan platform pendidikan Islam bersanad kami.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
