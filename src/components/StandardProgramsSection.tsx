"use client";

import React from "react";
import Link from "next/link";

export interface StandardProgramItem {
  id: string;
  href: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

interface StandardProgramsSectionProps {
  programs: StandardProgramItem[];
  title: string;
  onProgramClick: (e: React.MouseEvent, href: string) => void;
}

export function StandardProgramsSection({
  programs,
  title,
  onProgramClick,
}: StandardProgramsSectionProps) {
  if (programs.length === 0) return null;

  return (
    <div className="mb-12 w-full">
      <h2 className="mb-6 text-2xl font-semibold text-emerald-800">{title}</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {programs.map((prog) => (
          <Link
            key={prog.id}
            href={prog.href}
            onClick={(e) => onProgramClick(e, prog.href)}
            className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl group block cursor-pointer"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-[#C9A24D] transition-all group-hover:w-full group-hover:opacity-10" />
            <div className="relative z-10">
              {prog.icon}
              <h3 className="mb-2 text-xl font-bold text-emerald-900">{prog.title}</h3>
              <p className="text-sm text-slate-600">{prog.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

