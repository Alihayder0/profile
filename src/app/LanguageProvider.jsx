"use client";
import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("");

  useEffect(() => {
    const storedLang = localStorage.getItem("language");
    if (storedLang) {
      setLang(storedLang);
    }
  }, []);

  const toggleLang = () => {
    const newLang = lang === "EN" ? "AR" : "EN";
    setLang(newLang);
    localStorage.setItem("language", newLang);
    
     document.documentElement.lang = newLang === "EN" ? "en" : "ar";
        document.documentElement.dir = newLang === "EN" ? "ltr" : "rtl";
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
