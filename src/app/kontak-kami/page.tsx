"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Mail, MessageCircle } from "lucide-react";

export default function KontakKamiPage() {
  const { language, isRTL } = useLanguage();
  const t = translations[language];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const title = language === "AR" ? "*رسالة استفسار من الموقع الإلكتروني*" : language === "EN" ? "*Inquiry from Website*" : "*Pesan dari Website*";
    const nameLabel = language === "AR" ? "الاسم" : language === "EN" ? "Name" : "Nama";
    const emailLabel = language === "AR" ? "البريد الإلكتروني" : language === "EN" ? "Email" : "Email";
    const msgLabel = language === "AR" ? "الرسالة" : language === "EN" ? "Message" : "Pesan";

    const message = [
      title,
      `${nameLabel}: ${formData.name}`,
      `${emailLabel}: ${formData.email}`,
      `${msgLabel}: ${formData.message}`,
    ].join("\n");

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/6281234567890?text=${encodedMessage}`, "_blank");
    
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div
      className={`min-h-screen bg-transparent text-slate-950 ${
        isRTL ? "rtl font-arabic" : "ltr"
      }`}
    >
      <Navigation />

      {/* Main Content */}
      <main
        className={`mx-auto flex min-h-[calc(100vh-64px)] max-w-5xl flex-col items-start px-4 pb-24 pt-10 md:px-6 md:pt-16 lg:px-8 ${
          isRTL ? "text-right items-end" : "text-left"
        }`}
      >
        <div className="w-full">
          <div className="mb-12 text-center md:text-left">
            <p className={`mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#C9A24D] ${isRTL ? "md:text-right" : ""}`}>
              {t.contact.subtitle}
            </p>
            <h1 className={`text-3xl font-semibold text-emerald-900 sm:text-4xl lg:text-5xl ${isRTL ? "md:text-right" : ""}`}>
              {t.contact.title}
            </h1>
          </div>

          <div className="grid gap-8 md:gap-12 md:grid-cols-2 lg:grid-cols-5">
            {/* Contact Info */}
            <div className={`space-y-6 md:col-span-1 lg:col-span-2 ${isRTL ? "order-2" : ""}`}>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-4 rounded-3xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{t.contact.info.whatsapp.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{t.contact.info.whatsapp.value}</p>
                </div>
              </a>

              <a
                href="mailto:fastabiqulkhairat.academy@gmail.com"
                className={`flex items-center gap-4 rounded-3xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-[#C9A24D]">
                  <Mail className="h-6 w-6" />
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-bold text-slate-900">{t.contact.info.email.title}</h3>
                  <p className="text-sm text-slate-500 mt-1 truncate">{t.contact.info.email.value}</p>
                </div>
              </a>
            </div>

            {/* Contact Form */}
            <div className={`rounded-3xl bg-white p-6 md:p-8 shadow-lg border border-slate-100 md:col-span-1 lg:col-span-3 ${isRTL ? "order-1" : ""}`}>
              <h2 className="mb-6 text-2xl font-bold text-emerald-900">
                {t.contact.form.title}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className={`mb-2 block text-sm font-medium text-slate-700 ${isRTL ? "text-right" : "text-left"}`}>
                    {t.contact.form.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white ${isRTL ? "text-right" : "text-left"}`}
                    placeholder={t.contact.form.namePlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={`mb-2 block text-sm font-medium text-slate-700 ${isRTL ? "text-right" : "text-left"}`}>
                    {t.contact.form.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white ${isRTL ? "text-right" : "text-left"}`}
                    placeholder={t.contact.form.emailPlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="message" className={`mb-2 block text-sm font-medium text-slate-700 ${isRTL ? "text-right" : "text-left"}`}>
                    {t.contact.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full resize-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white ${isRTL ? "text-right" : "text-left"}`}
                    placeholder={t.contact.form.messagePlaceholder}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-emerald-700 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-700/30 transition-all hover:bg-emerald-800 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  {t.contact.form.submit}
                </button>
                <p className="mt-3 text-center text-xs text-slate-500">
                  {t.contact.form.note}
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
