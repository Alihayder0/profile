"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../app/LanguageProvider";
// You would import your actual useTheme hook here.
const useTheme = () => {
  const [theme, setTheme] = useState('dark');
   const { lang, toggleLang } = useLanguage();
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

// --- Data for Navigation Links ---
const navLinks = [
  { href: "/", labelEN: "Home", labelAR: "الرئيسية" },
  { href: "/about", labelEN: "About", labelAR: "حول" },
  { href: "/projects", labelEN: "Projects", labelAR: "المشاريع" },
  { href: "/contact", labelEN: "Contact", labelAR: "اتصل بنا" },
];

// --- SVG Icon Components ---
const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
);

// --- Theme Toggle Component ---
const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <motion.button
            onClick={toggleTheme}
            className="w-12 h-12 flex items-center justify-center border-2 bg-secondary border-foreground/50"
            style={{
                boxShadow: `3px 3px 0px rgb(var(--shadow))`,
            }}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9, rotate: -15 }}
            aria-label="Toggle theme"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={isDark ? "moon" : "sun"}
                    initial={{ y: -20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                    className="text-primary"
                >
                    {isDark ? <MoonIcon /> : <SunIcon />}
                </motion.div>
            </AnimatePresence>
        </motion.button>
    );
};

// --- Language Toggle Component ---

const LanguageToggle = () => {
    const { lang, toggleLang } = useLanguage(); // من الكونتكست

    return (
        <motion.button
            onClick={toggleLang}
            className="w-12 h-12 flex items-center justify-center border-2 border-foreground/50 bg-secondary font-bold text-foreground"
            style={{ boxShadow: `3px 3px 0px rgb(var(--shadow))` }}
            whileHover={{ y: -2 }}
            whileTap={{ y: 1 }}
            aria-label="Toggle Language"
        >
          {lang === 'EN' ? 'AR' : 'EN'}
        </motion.button>
    );
};


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const accentColor = "hsl(var(--primary))";
const { lang } = useLanguage();
  const toggleMenu = () => setIsOpen(!isOpen);
  
  return (
    <>
      <nav className="sticky top-0 z-50 border-b-2 bg-card-bg border-border">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="text-2xl font-black uppercase tracking-tighter" style={{ color: accentColor }}>
           {lang === "EN" ? "Ali Hayder" : "علي حيدر"} 
          </Link>

          <div className="hidden md:flex">
            <NavLinks />
          </div>

          <div className="md:hidden">
            <motion.button
              onClick={toggleMenu}
              className="text-2xl z-50 relative text-foreground"
              animate={isOpen ? "open" : "closed"}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path stroke="currentColor" strokeWidth="2" strokeLinecap="round" variants={{ closed: { d: "M4 6H20" }, open: { d: "M6 18L18 6" } }} />
                <motion.path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 12H20" variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }} transition={{ duration: 0.1 }} />
                <motion.path stroke="currentColor" strokeWidth="2" strokeLinecap="round" variants={{ closed: { d: "M4 18H20" }, open: { d: "M6 6L18 18" } }} />
              </svg>
            </motion.button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-background md:hidden"
          >
            <NavLinks isMobile={true} closeMenu={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const NavLinks = ({ isMobile = false, closeMenu = () => {} }) => {
  const pathname = usePathname();
  const accentColor = "hsl(var(--primary))";
  const { lang } = useLanguage();

  const handleLinkClick = () => {
    if (isMobile) closeMenu();
  };

  return (
    <ul className={`flex gap-4 ${isMobile ? "flex-col text-center text-3xl gap-8" : "items-center"}`}>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <li key={link.href} onClick={handleLinkClick}>
            <Link
              href={link.href}
              className={`relative font-medium transition-colors text-foreground/80 hover:text-foreground px-2 py-1 ${
                isActive && 'text-foreground'
              }`}
            >
              {lang === "EN" ? link.labelEN : link.labelAR}
              {isActive && (
                <motion.div
                  className="absolute bottom-[-6px] left-0 h-[3px] w-full"
                  style={{ backgroundColor: accentColor }}
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          </li>
        );
      })}
      {/* Utility Buttons */}
      <li className="flex items-center gap-4 mt-4 md:mt-0">
        <LanguageToggle />
        <ThemeToggle />
      </li>
    </ul>
  );
};

export default Navbar;
