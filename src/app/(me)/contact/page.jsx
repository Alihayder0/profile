"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "../../LanguageProvider";

const useTheme = () => {
  const [theme, setTheme] = useState('dark');
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
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

  return { theme, toggleTheme };
};

export default function Contact() {
  const { lang } = useLanguage();
  const { theme } = useTheme();

  // النصوص باللغتين
  const translations = {
    EN: {
      title: "Get In Touch",
      subtitle: "Let's work together on something amazing",
      description: "I'm always interested in new opportunities and exciting projects. Whether you have a question, want to collaborate, or just say hello, I'd love to hear from you.",
      nameLabel: "Your Name",
      emailLabel: "Your Email",
      messageLabel: "Your Message",
      sendButton: "Send Message",
      namePlaceholder: "Enter your full name",
      emailPlaceholder: "Enter your email address", 
      messagePlaceholder: "Tell me about your project or inquiry...",
      directContact: "Direct Contact",
      emailDirect: "ali.hayder@example.com",
      phoneDirect: "+964 XXX XXX XXXX",
      socialMedia: "Social Media",
    },
    AR: {
      title: "تواصل معي",
      subtitle: "دعنا نعمل معاً على شيء مميز",
      description: "أنا مهتم دائماً بالفرص الجديدة والمشاريع المثيرة. سواء كان لديك سؤال، تريد التعاون، أو مجرد إلقاء التحية، أحب أن أسمع منك.",
      nameLabel: "اسمك",
      emailLabel: "بريدك الإلكتروني",
      messageLabel: "رسالتك",
      sendButton: "إرسال الرسالة",
      namePlaceholder: "أدخل اسمك الكامل",
      emailPlaceholder: "أدخل عنوان بريدك الإلكتروني",
      messagePlaceholder: "أخبرني عن مشروعك أو استفسارك...",
      directContact: "التواصل المباشر",
      emailDirect: "ali.hayder@example.com",
      phoneDirect: "+964 XXX XXX XXXX",
      socialMedia: "وسائل التواصل الاجتماعي",
    },
  };

  const t = translations[lang] || translations.EN;

  const accentColor = "hsl(var(--primary))";
  const shadowColor = theme === 'dark' ? '#111' : '#000';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-background min-h-screen py-12 px-4" style={{ direction: lang === "AR" ? "rtl" : "ltr" }}>
      <motion.div
        className="max-w-4xl mx-auto space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div
          className="text-center bg-card-bg/90 backdrop-blur-sm border-2 border-border p-8 relative"
          style={{ boxShadow: `12px 12px 0px ${shadowColor}` }}
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-foreground uppercase tracking-tighter">
            {t.title}
          </h1>
          <p className="text-xl text-primary font-semibold mb-4">
            {t.subtitle}
          </p>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="bg-card-bg/90 backdrop-blur-sm border-2 border-border p-8"
            style={{ boxShadow: `8px 8px 0px ${shadowColor}` }}
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold mb-6 text-primary">
              {lang === "EN" ? "Send a Message" : "إرسال رسالة"}
            </h3>
            <form className="space-y-6">
              <div>
                <label
                  className="block text-sm font-semibold mb-2 text-foreground"
                  htmlFor="name"
                >
                  {t.nameLabel}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder={t.namePlaceholder}
                  className="w-full border-2 border-border bg-background text-foreground px-4 py-3 focus:outline-none focus:border-primary transition-colors duration-200"
                  style={{ boxShadow: `2px 2px 0px ${shadowColor}` }}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-semibold mb-2 text-foreground"
                  htmlFor="email"
                >
                  {t.emailLabel}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder={t.emailPlaceholder}
                  className="w-full border-2 border-border bg-background text-foreground px-4 py-3 focus:outline-none focus:border-primary transition-colors duration-200"
                  style={{ boxShadow: `2px 2px 0px ${shadowColor}` }}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-semibold mb-2 text-foreground"
                  htmlFor="message"
                >
                  {t.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder={t.messagePlaceholder}
                  className="w-full border-2 border-border bg-background text-foreground px-4 py-3 focus:outline-none focus:border-primary transition-colors duration-200 resize-none"
                  style={{ boxShadow: `2px 2px 0px ${shadowColor}` }}
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full bg-button-bg text-button-text px-6 py-3 font-bold transition-all duration-200 hover:bg-primary-hover"
                style={{ boxShadow: `4px 4px 0px ${shadowColor}` }}
                whileHover={{ x: 2, y: -2 }}
                whileTap={{ x: 0, y: 0 }}
              >
                {t.sendButton}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            variants={itemVariants}
          >
            {/* Direct Contact */}
            <div 
              className="bg-card-bg/90 backdrop-blur-sm border-2 border-border p-6"
              style={{ boxShadow: `6px 6px 0px ${shadowColor}` }}
            >
              <h4 className="text-xl font-bold mb-4 text-primary">{t.directContact}</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📧</span>
                  <a href="mailto:ali.hayder@example.com" className="text-foreground hover:text-primary transition-colors">
                    {t.emailDirect}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📱</span>
                  <a href="tel:+964XXXXXXX" className="text-foreground hover:text-primary transition-colors">
                    {t.phoneDirect}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div 
              className="bg-card-bg/90 backdrop-blur-sm border-2 border-border p-6"
              style={{ boxShadow: `6px 6px 0px ${shadowColor}` }}
            >
              <h4 className="text-xl font-bold mb-4 text-primary">{t.socialMedia}</h4>
              <div className="flex gap-4">
                <a 
                  href="https://github.com/Alihayder0" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 flex items-center justify-center border-2 border-foreground bg-secondary hover:bg-primary hover:text-button-text transition-colors duration-200"
                  style={{ boxShadow: `3px 3px 0px ${shadowColor}` }}
                  aria-label="GitHub"
                >
                  <span className="text-xl">🐙</span>
                </a>
                <a 
                  href="https://linkedin.com/in/your-linkedin" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 flex items-center justify-center border-2 border-foreground bg-secondary hover:bg-primary hover:text-button-text transition-colors duration-200"
                  style={{ boxShadow: `3px 3px 0px ${shadowColor}` }}
                  aria-label="LinkedIn"
                >
                  <span className="text-xl">💼</span>
                </a>
                <a 
                  href="https://twitter.com/your-twitter" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 flex items-center justify-center border-2 border-foreground bg-secondary hover:bg-primary hover:text-button-text transition-colors duration-200"
                  style={{ boxShadow: `3px 3px 0px ${shadowColor}` }}
                  aria-label="Twitter"
                >
                  <span className="text-xl">🐦</span>
                </a>
              </div>
            </div>

            {/* Availability */}
            <div 
              className="bg-card-bg/90 backdrop-blur-sm border-2 border-border p-6"
              style={{ boxShadow: `6px 6px 0px ${shadowColor}` }}
            >
              <h4 className="text-xl font-bold mb-4 text-primary">
                {lang === "EN" ? "Availability" : "التوفر"}
              </h4>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-foreground">
                  {lang === "EN" ? "Available for new projects" : "متاح للمشاريع الجديدة"}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
