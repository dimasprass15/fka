import type { Metadata } from "next";
import { supabase, type AttendanceSession } from "@/lib/supabase";
import DynamicIdClient from "./DynamicIdClient";

type Props = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

function getCategoryDefaultImage(category?: string): string {
  switch (category) {
    case "Tahsin":
      return "/8.jpeg";
    case "Tahfizh":
      return "/1.jpeg";
    case "Daurah":
      return "/5.jpeg";
    case "Majelis Sama":
    case "Majelis Sama'":
      return "/4.jpeg";
    case "Khataman":
      return "/3.jpeg";
    case "Bahasa Arab":
      return "/6.jpeg";
    case "Kajian Umum":
      return "/2.jpeg";
    default:
      return "/image-hero.png";
  }
}

async function fetchSessionServer(rawId: string): Promise<AttendanceSession | null> {
  if (/^[1-8]$/.test(rawId)) return null;
  try {
    const { data, error } = await supabase
      .from("attendance_sessions")
      .select(
        "*, halaqahs(id, name, teacher_name, category, days_label, utc_hour, utc_minute)"
      )
      .eq("slug", rawId.toLowerCase())
      .maybeSingle();

    if (error || !data) return null;
    return data as AttendanceSession;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const rawId = (id || "").trim();
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://fastabiqulkhairat.academy";

  // 1. Poster route numerik legacy (1 - 8)
  if (/^[1-8]$/.test(rawId)) {
    const posterImages: Record<string, string> = {
      "1": "/1.jpeg",
      "2": "/2.jpeg",
      "3": "/3.jpeg",
      "4": "/4.jpeg",
      "5": "/5.jpeg",
      "6": "/6.jpeg",
      "7": "/7.jpeg",
      "8": "/8.jpeg",
    };
    const imgPath = posterImages[rawId] || "/image-hero.png";
    const fullImg = `${siteUrl}${imgPath}`;
    return {
      title: `Program Pembelajaran #${rawId} | Fastabiqul Khairat Academy`,
      description:
        "Daftar dan ikuti program pembelajaran Al-Qur'an dan Dirasah Islamiyah di Fastabiqul Khairat Academy.",
      openGraph: {
        title: `Program Pembelajaran #${rawId} | Fastabiqul Khairat Academy`,
        description:
          "Daftar dan ikuti program pembelajaran Al-Qur'an dan Dirasah Islamiyah di Fastabiqul Khairat Academy.",
        url: `${siteUrl}/${rawId}`,
        siteName: "Fastabiqul Khairat Academy",
        images: [
          {
            url: fullImg,
            width: 1200,
            height: 630,
            alt: `Poster Program #${rawId}`,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `Program Pembelajaran #${rawId} | Fastabiqul Khairat Academy`,
        description:
          "Daftar dan ikuti program pembelajaran Al-Qur'an dan Dirasah Islamiyah di Fastabiqul Khairat Academy.",
        images: [fullImg],
      },
    };
  }

  // 2. Dynamic Attendance Sesi Pembelajaran by Slug
  const session = await fetchSessionServer(rawId);

  if (!session) {
    return {
      title: "Presensi Santri | Fastabiqul Khairat Academy",
      description:
        "Gerbang Presensi & Akses Masuk Room Zoom Pembelajaran Fastabiqul Khairat Academy.",
    };
  }

  const title = `${session.title} - Presensi & Masuk Zoom`;
  const teacher = session.halaqahs?.teacher_name || "Syaikh / Pengampu";
  const days = session.halaqahs?.days_label || "Setiap Hari";
  const rawHour = session.halaqahs?.utc_hour ?? 1;
  const wibHour = (rawHour + 7) % 24;
  const wibMinute = session.halaqahs?.utc_minute ?? 0;
  const timeStr = `${wibHour.toString().padStart(2, "0")}:${wibMinute
    .toString()
    .padStart(2, "0")} WIB`;
  const description = `🎙️ Pengampu: ${teacher} • ${days} • ${timeStr}. Silakan isi formulir presensi untuk masuk ke room Zoom.`;

  const rawOgImage =
    session.form_config?.og_image_url?.trim() ||
    getCategoryDefaultImage(session.halaqahs?.category);

  const fullImageUrl = rawOgImage.startsWith("http")
    ? rawOgImage
    : `${siteUrl}${rawOgImage.startsWith("/") ? "" : "/"}${rawOgImage}`;

  const pageUrl = `${siteUrl}/${session.slug || rawId}`;

  return {
    title: `${session.title} | Fastabiqul Khairat Academy`,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "Fastabiqul Khairat Academy",
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: session.title,
        },
      ],
      type: "website",
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [fullImageUrl],
    },
  };
}

export default async function DynamicIdPage({ params, searchParams }: Props) {
  const { id } = await params;
  const rawId = (id || "").trim();
  const session = await fetchSessionServer(rawId);
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const isTeacher = resolvedSearchParams.role === "pengajar";

  return (
    <DynamicIdClient
      rawId={rawId}
      initialSession={session}
      isTeacher={isTeacher}
    />
  );
}
