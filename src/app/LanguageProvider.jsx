"use client";
import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children, initialLang = "EN" }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    const storedLang = localStorage.getItem("language");
    if (storedLang) {
      setLang(storedLang);
      // تحديث خصائص HTML عند التحميل
      document.documentElement.lang = storedLang === "EN" ? "en" : "ar";
      document.documentElement.dir = storedLang === "EN" ? "ltr" : "rtl";
      document.documentElement.className = document.documentElement.className
        .replace(/\blang-\w+\b/g, '')
        .trim() + ` lang-${storedLang.toLowerCase()}`;
    }
  }, []);

  const toggleLang = () => {
    const newLang = lang === "EN" ? "AR" : "EN";
    setLang(newLang);
    localStorage.setItem("language", newLang);
    
    // تحديث خصائص HTML للاتجاه واللغة
    document.documentElement.lang = newLang === "EN" ? "en" : "ar";
    document.documentElement.dir = newLang === "EN" ? "ltr" : "rtl";
    
    // إضافة كلاس CSS للغة
    document.documentElement.className = document.documentElement.className
      .replace(/\blang-\w+\b/g, '')
      .trim() + ` lang-${newLang.toLowerCase()}`;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
