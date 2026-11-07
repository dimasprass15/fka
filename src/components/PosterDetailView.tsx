"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, X, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  message: string;
};

type Poster = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  category: string;
  description: string;
  facilities: string[];
  requirements: string[];
  infaq: string;
};

interface PosterDetailViewProps {
  id: string;
}

export default function PosterDetailView({ id }: PosterDetailViewProps) {
  const { language, isRTL } = useLanguage();
  const t = translations[language];
  const [isZoomed] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "facilities" | "requirements" | "infaq">("description");
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const getPosterData = (posterId: string): Poster | null => {
    const posterKeyMap: Record<number, keyof typeof t.program.posters> = {
      1: "tahfidz",
      2: "fiqih",
      3: "tafsir",
      4: "hadits",
      5: "aqidah",
      6: "bahasaArab",
      7: "ushulFiqih",
      8: "sirah",
    };

    const numId = parseInt(posterId, 10);
    const posterKey = posterKeyMap[numId];
    if (!posterKey) return null;

    const posterData = t.program.posters[posterKey];
    const imageMap: Record<number, string> = {
      1: "/1.jpeg",
      2: "/2.jpeg",
      3: "/3.jpeg",
      4: "/4.jpeg",
      5: "/5.jpeg",
      6: "/6.jpeg",
      7: "/7.jpeg",
      8: "/8.jpeg",
    };

    const categoryMap: Record<number, string> = {
      1: "quran",
      2: "fiqh",
      3: "quran",
      4: "qiraat",
      5: "daurah",
      6: "bahasa",
      7: "fiqh",
      8: "tahsin",
    };

    return {
      id: numId,
      title: posterData.title,
      subtitle: posterData.subtitle,
      image: imageMap[numId],
      category: categoryMap[numId],
      description: posterData.description,
      facilities: posterData.facilities,
      requirements: posterData.requirements,
      infaq: posterData.infaq,
    };
  };

  const poster = getPosterData(id);

  const filters = [
    { key: "qiraat", label: t.program.filters.qiraat },
    { key: "bahasa", label: t.program.filters.bahasa },
    { key: "fiqh", label: t.program.filters.fiqh },
    { key: "quran", label: t.program.filters.quran },
    { key: "tahsin", label: t.program.filters.tahsin },
    { key: "khataman", label: t.program.filters.khataman },
    { key: "daurah", label: t.program.filters.daurah },
  ];



  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitStatus("success");
    setIsSubmitting(false);

    setTimeout(() => {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        message: "",
      });
      setSubmitStatus("idle");
      setIsModalOpen(false);
    }, 3000);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSubmitStatus("idle");
  };

  if (!poster) {
    return (
      <div className={`min-h-screen bg-transparent text-slate-950 ${isRTL ? "rtl font-arabic" : "ltr"}`}>
        <Navigation />
        <main className="mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl flex-col items-center justify-center px-4 py-20">
          <h1 className="mb-4 text-2xl font-semibold text-slate-900">{t.program.detail.notFound}</h1>
          <Link href="/program" className="text-emerald-700 hover:text-emerald-800 underline">
            {t.program.detail.backToProgram}
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const categoryFilter = filters.find((f) => f.key === poster.category);

  return (
    <div className={`min-h-screen bg-transparent text-slate-950 ${isRTL ? "rtl font-arabic" : "ltr"}`}>
      <Navigation />
      <main
        className={`mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl flex-col gap-8 px-4 pb-24 pt-6 md:flex-row md:items-start md:gap-12 md:px-6 md:pt-8 lg:px-8 lg:pt-10 ${
          isRTL ? "md:flex-row-reverse" : ""
        }`}
      >
        <div className="w-full md:hidden">
          <Link
            href="/program"
            className={`inline-flex items-center text-slate-700 transition-colors hover:text-emerald-700 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <ArrowLeft className={`h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
          </Link>
        </div>

        <div
          className={`w-full transform transition-all duration-500 ease-out ${
            isZoomed ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
            <div className={`w-full md:w-[40%] space-y-6 ${isRTL ? "md:order-2" : ""}`}>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-lg">
                <Image
                  src={poster.image}
                  alt={poster.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                {categoryFilter && (
                  <div className={`absolute top-4 z-10 ${isRTL ? "right-4" : "left-4"}`}>
                    <span className="rounded-full bg-white/90 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-emerald-700 shadow-md">
                      {categoryFilter.label}
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full rounded-lg bg-emerald-700 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-700/40 transition-all hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-center"
              >
                {t.program.detail.registerButton}
              </button>
            </div>

            <div className={`flex-1 space-y-6 ${isRTL ? "md:order-1" : ""}`}>
              <div className="hidden md:block">
                <Link
                  href="/program"
                  className={`inline-flex items-center text-slate-700 transition-colors hover:text-emerald-700 ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <ArrowLeft className={`h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
                </Link>
              </div>

              <div className="space-y-3">
                <h1
                  className={`text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {poster.title}
                </h1>
                <p className={`text-lg text-slate-600 md:text-xl ${isRTL ? "text-right" : "text-left"}`}>
                  {poster.subtitle}
                </p>
              </div>

              <div className="border-b border-slate-200">
                <nav className={`flex gap-2 overflow-x-auto scrollbar-hide ${isRTL ? "flex-row-reverse" : ""}`} role="tablist">
                  <button
                    onClick={() => setActiveTab("description")}
                    className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === "description"
                        ? "border-emerald-700 text-emerald-700"
                        : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900"
                    }`}
                    role="tab"
                  >
                    {t.program.detail.description}
                  </button>
                  <button
                    onClick={() => setActiveTab("facilities")}
                    className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === "facilities"
                        ? "border-emerald-700 text-emerald-700"
                        : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900"
                    }`}
                    role="tab"
                  >
                    {t.program.detail.facilities}
                  </button>
                  <button
                    onClick={() => setActiveTab("requirements")}
                    className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === "requirements"
                        ? "border-emerald-700 text-emerald-700"
                        : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900"
                    }`}
                    role="tab"
                  >
                    {t.program.detail.requirements}
                  </button>
                  <button
                    onClick={() => setActiveTab("infaq")}
                    className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === "infaq"
                        ? "border-emerald-700 text-emerald-700"
                        : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900"
                    }`}
                    role="tab"
                  >
                    {t.program.detail.infaq}
                  </button>
                </nav>
              </div>

              <div className="min-h-[200px]">
                {activeTab === "description" && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <p className={`text-base leading-relaxed text-slate-700 ${isRTL ? "text-right" : "text-left"}`}>
                      {poster.description}
                    </p>
                  </div>
                )}
                {activeTab === "facilities" && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <ul className={`space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
                      {poster.facilities.map((facility, index) => (
                        <li key={index} className="flex items-start gap-3 text-base text-slate-700">
                          <Check className={`mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 ${isRTL ? "order-2" : ""}`} />
                          <span className={isRTL ? "text-right" : "text-left"}>{facility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {activeTab === "requirements" && (
                  <div className="space-y-3 animate-in fade-in duration-200">
                    <ul className={`space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
                      {poster.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-3 text-base text-slate-700">
                          <Check className={`mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 ${isRTL ? "order-2" : ""}`} />
                          <span className={isRTL ? "text-right" : "text-left"}>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {activeTab === "infaq" && (
                  <div className="animate-in fade-in duration-200">
                    <div className="rounded-2xl border-2 border-[#C9A24D] bg-gradient-to-br from-[#C9A24D]/10 to-[#C9A24D]/5 p-6">
                      <div className="space-y-2">
                        <h2 className={`text-xl font-semibold text-emerald-900 ${isRTL ? "text-right" : "text-left"}`}>
                          {t.program.detail.infaq}
                        </h2>
                        <p className={`text-2xl font-bold text-[#C9A24D] ${isRTL ? "text-right" : "text-left"}`}>
                          {poster.infaq}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleCloseModal} />
          <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl ${isRTL ? "text-right" : "text-left"}`}>
            <button
              onClick={handleCloseModal}
              className={`absolute top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 ${
                isRTL ? "left-4" : "right-4"
              }`}
            >
              <X className="h-5 w-5" />
            </button>
            <div className="p-6 md:p-8">
              <div className="mb-6">
                <h2 className={`text-2xl font-bold text-slate-900 ${isRTL ? "text-right" : "text-left"}`}>
                  {t.program.registration.title}
                </h2>
                <p className={`mt-2 text-sm text-slate-600 ${isRTL ? "text-right" : "text-left"}`}>
                  {t.program.registration.subtitle}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="fullName" className={`mb-2 block text-sm font-medium text-slate-700 ${isRTL ? "text-right" : "text-left"}`}>
                    {t.program.registration.fullName}
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className={`w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${isRTL ? "text-right" : "text-left"}`}
                    placeholder={t.program.registration.fullNamePlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={`mb-2 block text-sm font-medium text-slate-700 ${isRTL ? "text-right" : "text-left"}`}>
                    {t.program.registration.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${isRTL ? "text-right" : "text-left"}`}
                    placeholder={t.program.registration.emailPlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className={`mb-2 block text-sm font-medium text-slate-700 ${isRTL ? "text-right" : "text-left"}`}>
                    {t.program.registration.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className={`w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${isRTL ? "text-right" : "text-left"}`}
                    placeholder={t.program.registration.phonePlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="address" className={`mb-2 block text-sm font-medium text-slate-700 ${isRTL ? "text-right" : "text-left"}`}>
                    {t.program.registration.address}
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${isRTL ? "text-right" : "text-left"}`}
                    placeholder={t.program.registration.addressPlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="message" className={`mb-2 block text-sm font-medium text-slate-700 ${isRTL ? "text-right" : "text-left"}`}>
                    {t.program.registration.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none ${isRTL ? "text-right" : "text-left"}`}
                    placeholder={t.program.registration.messagePlaceholder}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full rounded-lg bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-700/40 transition-all hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:cursor-not-allowed disabled:opacity-70 ${isRTL ? "text-right" : "text-left"}`}
                >
                  {isSubmitting ? t.program.registration.submitting : t.program.registration.submit}
                </button>
                {submitStatus === "success" && (
                  <div className={`rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800 ${isRTL ? "text-right" : "text-left"}`}>
                    {t.program.registration.success}
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className={`rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800 ${isRTL ? "text-right" : "text-left"}`}>
                    {t.program.registration.error}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
