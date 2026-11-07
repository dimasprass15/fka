"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Check, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchAboutUs, AboutUsData } from "@/lib/appwrite";

export default function TentangKamiPage() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];

  const [dbData, setDbData] = useState<AboutUsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutUs().then(data => {
      setDbData(data);
      setLoading(false);
    });
  }, []);

  // Memecah teks misi menjadi array, atau fallback ke default
  // Menangani newline asli atau user yang mengetik "\n" secara manual
  const missionItems = dbData?.misi 
    ? dbData.misi.split(/\\n|\n/).map(i => i.trim()).filter(i => i !== '') 
    : t.about.mission.items;
  
  // Memparsing JSON keunggulan, atau fallback ke default
  let featureItems = t.about.features.items;
  if (dbData?.keunggulan) {
    try {
      const parsed = JSON.parse(dbData.keunggulan);
      if (Array.isArray(parsed) && parsed.length > 0) {
        featureItems = parsed.map((item: { title?: string; description?: string }) => ({
          title: item.title || "",
          description: item.description || ""
        }));
      }
    } catch (e) {
      console.error('Failed to parse keunggulan', e);
    }
  }

  return (
    <div
      className={`min-h-screen bg-transparent text-slate-950 ${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      <Navigation />

      {/* Main Content */}
      <main
        className={`mx-auto flex min-h-[calc(100vh-64px)] max-w-4xl flex-col items-start px-4 pb-24 pt-10 md:px-6 md:pt-16 lg:px-8 ${
          isRTL ? "text-right items-end" : "text-left"
        }`}
      >
        <div className="w-full">
          <div className="mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#C9A24D]">
              {t.about.subtitle}
            </p>
            <h1 className="text-3xl font-semibold text-emerald-900 sm:text-4xl lg:text-5xl">
              {t.about.title}
            </h1>
          </div>

          <div className="space-y-12">
            {/* Description */}
            <section>
              {loading ? (
                <div className="flex items-center gap-2 text-emerald-600">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="text-sm">Memuat data...</span>
                </div>
              ) : (
                <p className="text-lg leading-relaxed text-slate-700 md:text-xl whitespace-pre-wrap">
                  {dbData?.description || t.about.description}
                </p>
              )}
            </section>

            {/* Vision & Mission */}
            <section className="grid gap-8 md:grid-cols-2">
              <div className="rounded-3xl bg-emerald-50 p-8 shadow-sm">
                <h2 className="mb-4 text-2xl font-bold text-emerald-900">
                  {t.about.vision.title}
                </h2>
                <p className="leading-relaxed text-emerald-800/80 whitespace-pre-wrap">
                  {dbData?.visi || t.about.vision.description}
                </p>
              </div>
              <div className="rounded-3xl bg-white border border-slate-100 p-8 shadow-sm">
                <h2 className="mb-4 text-2xl font-bold text-emerald-900">
                  {t.about.mission.title}
                </h2>
                <ul className="space-y-3">
                  {missionItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-700">
                      <Check className={`mt-0.5 h-5 w-5 flex-shrink-0 text-[#C9A24D] ${isRTL ? "order-2" : ""}`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Features */}
            <section>
              <h2 className="mb-6 text-2xl font-bold text-emerald-900">
                {t.about.features.title}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {featureItems.map((feature, index) => (
                  <div key={index} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="mb-2 text-lg font-bold text-emerald-800">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
