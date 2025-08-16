"use client";
import Loading from "@app/loading.jsx";
import { useTheme } from "@app/themeprovider.jsx";
import { useLanguage } from "../../LanguageProvider";

export default function Page() {
  const { theme, toggleTheme } = useTheme();
  const { lang } = useLanguage();

  // النصوص باللغتين
  const translations = {
    EN: {
      toggleButton: `Toggle Theme (Current: ${theme})`,
      welcome: `Welcome to ${theme} mode`,
      description: "Here you can see the simple toggle between light and dark mode.",
    },
    AR: {
      toggleButton: `تغيير السمة (الحالية: ${theme === 'dark' ? 'داكن' : 'فاتح'})`,
      welcome: `مرحبا بك في الوضع ${theme === 'dark' ? 'الداكن' : 'الفاتح'}`,
      description: "هنا يمكنك رؤية التبديل بين الوضع الفاتح والداكن بشكل بسيط جداً.",
    },
  };

  const t = translations[lang] || translations.EN;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-8 transition-colors duration-300">
      <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 transition"
      >
        {t.toggleButton}
      </button>

      <h1 className="mt-8 text-3xl font-bold">{t.welcome}</h1>
      <p>{t.description}</p>

      <Loading />
    </div>
  );
}