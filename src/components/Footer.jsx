"use client";

import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useLanguage } from "../app/LanguageProvider";

const useTheme = () => {
  return { theme: 'dark' };
};

const Footer = () => {
  const { lang } = useLanguage();
  const shadowColor = "rgb(var(--shadow))";

  const translations = {
    EN: {
      copyright: `© ${new Date().getFullYear()} Ali Hayder. All rights reserved.`,
    },
    AR: {
      copyright: `© ${new Date().getFullYear()} علي حيدر. جميع الحقوق محفوظة.`,
    }
  };

  return (
    <footer className="bg-background border-t-2 border-border">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 px-6 py-8"
        style={{ direction: lang === "AR" ? "rtl" : "ltr" }}
      >
        {/* نص الحقوق */}
        <div className="text-sm text-foreground/80 text-center sm:text-left">
          {translations[lang]?.copyright}
        </div>

        {/* أيقونات السوشيال */}
        <div className="flex gap-4">
          <a 
            href="https://github.com/Alihayder0" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-12 h-12 flex items-center justify-center border-2 border-foreground bg-secondary"
            style={{ boxShadow: `3px 3px 0px ${shadowColor}` }}
            aria-label="GitHub"
          >
            <FaGithub className="text-foreground text-2xl" />
          </a>
          <a 
            href="https://linkedin.com/in/your-linkedin" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-12 h-12 flex items-center justify-center border-2 border-foreground bg-secondary"
            style={{ boxShadow: `3px 3px 0px ${shadowColor}` }}
            aria-label="LinkedIn"
          >
            <FaLinkedin className="text-foreground text-2xl" />
          </a>
          <a 
            href="https://twitter.com/your-twitter" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-12 h-12 flex items-center justify-center border-2 border-foreground bg-secondary"
            style={{ boxShadow: `3px 3px 0px ${shadowColor}` }}
            aria-label="Twitter"
          >
            <FaTwitter className="text-foreground text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
