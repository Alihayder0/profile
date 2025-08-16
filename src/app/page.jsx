"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLanguage } from "../app/LanguageProvider";
import CompactDeveloperScene from "../components/CompactDeveloperScene";

const useTheme = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      return newTheme;
    });
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return { theme, toggleTheme };
};

export default function Home() {
  const { lang } = useLanguage();
  const { theme } = useTheme();

  // النصوص باللغتين
  const translations = {
    EN: {
      name: "Ali Hayder",
      intro: "A passionate software developer specializing in building impactful digital experiences with modern web technologies.",
      projects: "My Projects",
      contact: "Contact Me",
    },
    AR: {
      name: "علي حيدر",
      intro: "مطور برمجيات شغوف متخصص في إنشاء تجارب رقمية مؤثرة باستخدام أحدث تقنيات الويب.",
      projects: "مشاريعي",
      contact: "تواصل معي",
    },
  };

  const t = translations[lang] || translations.EN;

  const accentColor = "hsl(var(--primary))";

  return (
    <div className="bg-background min-h-screen flex">
      {/* المحتوى الأساسي - الجانب الأيسر */}
      <div className="flex-1 p-4 sm:p-8 flex items-center justify-center relative z-10">
        <motion.section
          className="w-full max-w-2xl bg-card-bg/90 backdrop-blur-sm text-foreground border-2 border-border rounded-none p-6 sm:p-10 relative"
          style={{ boxShadow: `8px 8px 0px ${accentColor}` }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className={`text-center ${lang === "AR" ? "md:text-right" : "md:text-left"}`} style={{ direction: lang === "AR" ? "rtl" : "ltr" }}>
            <motion.h1
              className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {t.name} <span className="inline-block animate-wave">👋</span>
            </motion.h1>

            <motion.p
              className="text-lg text-foreground/80 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {t.intro}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <motion.div whileHover={{ x: 2, y: -2 }} whileTap={{ x: 0, y: 0 }}>
                <Link
                  href="/projects"
                  className="block text-button-text bg-button-bg px-8 py-3 font-bold rounded-none transition-all duration-200"
                  style={{
                    boxShadow: `4px 4px 0px ${theme === 'dark' ? '#111' : '#000'}`,
                  }}
                >
                  {t.projects}
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 2, y: -2 }} whileTap={{ x: 0, y: 0 }}>
                <Link
                  className="block bg-transparent text-foreground px-8 py-3 font-bold border-2 border-foreground rounded-none transition-all duration-200 hover:bg-foreground hover:text-background"
                  href="/contact"
                  style={{
                    boxShadow: `4px 4px 0px ${theme === 'dark' ? '#111' : '#000'}`,
                  }}
                >
                  {t.contact}
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex gap-6 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <a href="https://github.com/Alihayder0" target="_blank" rel="noopener noreferrer" className="text-3xl text-foreground/70 hover:text-foreground transition-transform hover:scale-110">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer" className="text-3xl text-foreground/70 hover:text-foreground transition-transform hover:scale-110">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com/your-twitter" target="_blank" rel="noopener noreferrer" className="text-3xl text-foreground/70 hover:text-foreground transition-transform hover:scale-110">
                <FaTwitter />
              </a>
            </motion.div>
          </div>

          <motion.div
            className="absolute top-4 right-4 md:relative md:top-0 md:right-0 md:mt-8 md:flex md:justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
          >
            <div 
              className="w-32 h-32 md:w-40 md:h-40 bg-secondary border-2 border-border transition-all duration-200"
              style={{ 
                boxShadow: `6px 6px 0px ${theme === 'dark' ? '#111' : '#000'}`,
                borderColor: accentColor,
              }}
            >
              <img
                src="https://avatars.githubusercontent.com/Alihayder0"
                alt={t.name}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </motion.div>
        </motion.section>
      </div>

      {/* المشهد ثلاثي الأبعاد - الجانب الأيمن */}
      <motion.div 
        className="hidden lg:flex w-1/2 h-screen relative overflow-hidden items-center justify-center"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/10 to-background/30 z-10 pointer-events-none" />
        <div className="w-full h-full max-h-[700px] pointer-events-auto">
          <CompactDeveloperScene theme={theme} />
        </div>
      </motion.div>

      {/* للشاشات الصغيرة - مشهد خلفي مصغر */}
      <div className="lg:hidden absolute inset-0 opacity-20 pointer-events-none">
        <CompactDeveloperScene theme={theme} />
      </div>
      
      <style>
        {`
          .animate-wave {
            animation: wave 2.5s infinite;
            display: inline-block;
            transform-origin: 70% 70%;
          }
          @keyframes wave {
            0% { transform: rotate(0deg); }
            10% { transform: rotate(14deg); }
            20% { transform: rotate(-8deg); }
            30% { transform: rotate(14deg); }
            40% { transform: rotate(-4deg); }
            50% { transform: rotate(10deg); }
            60% { transform: rotate(0deg); }
            100% { transform: rotate(0deg); }
          }
        `}
      </style>
    </div>
  );
}
