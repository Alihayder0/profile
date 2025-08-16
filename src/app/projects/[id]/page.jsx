"use client";

import { useLanguage } from "../../LanguageProvider";

export default function ProjectPage({ params }) {
  const { lang } = useLanguage();

  // النصوص باللغتين
  const translations = {
    EN: {
      projectIdLabel: "Project ID:",
      detailsText: "Details about project",
      willGoHere: "will go here.",
    },
    AR: {
      projectIdLabel: "معرف المشروع:",
      detailsText: "تفاصيل حول المشروع",
      willGoHere: "ستكون هنا.",
    },
  };

  const t = translations[lang] || translations.EN;

  return (
    <div className="h-[80vh] flex items-center justify-center" style={{ direction: lang === "AR" ? "rtl" : "ltr" }}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          {t.projectIdLabel} {params.id}
        </h1>
        <p className="text-gray-700">
          {t.detailsText} {params.id} {t.willGoHere}
        </p>
      </div>
    </div>
  );
}