"use client";

import { useParams } from "next/navigation";
import PosterDetailView from "@/components/PosterDetailView";

export default function ProgramDetailPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : (params?.id as string) || "1";
  return <PosterDetailView id={id} />;
}
