
"use client";

import { motion } from "framer-motion";
import ProjectCard from "C:/Users/pc/Desktop/program/pro2/src/components/ProjectCard";
import { useLanguage } from "../LanguageProvider";
import { useState, useEffect } from "react";

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

export default function Projects() {
  const { lang } = useLanguage();
  const { theme } = useTheme();

  // النصوص باللغتين
  const translations = {
    EN: {
      title: "My Projects",
      subtitle: "Explore my portfolio of innovative solutions",
      description: "Here are some of the projects I've worked on, showcasing my skills in modern web development and creative problem-solving.",
      projectTitle: "Personal Portfolio",
      projectDescription: "A personal website to showcase my work and skills using modern web technologies.",
      projectTitle2: "E-Commerce Platform",
      projectDescription2: "A full-stack e-commerce solution with advanced features and smooth user experience.",
      projectTitle3: "Task Management App",
      projectDescription3: "A productivity app for managing tasks and projects with real-time collaboration.",
    },
    AR: {
      title: "مشاريعي",
      subtitle: "استكشف مجموعة أعمالي المبتكرة",
      description: "هنا بعض المشاريع التي عملت عليها، والتي تُظهر مهاراتي في تطوير الويب الحديث وحل المشكلات بطرق إبداعية.",
      projectTitle: "الموقع الشخصي",
      projectDescription: "موقع شخصي لعرض أعمالي ومهاراتي باستخدام أحدث تقنيات الويب.",
      projectTitle2: "منصة تجارة إلكترونية",
      projectDescription2: "حل تجارة إلكترونية متكامل مع ميزات متقدمة وتجربة مستخدم سلسة.",
      projectTitle3: "تطبيق إدارة المهام",
      projectDescription3: "تطبيق إنتاجية لإدارة المهام والمشاريع مع التعاون في الوقت الفعلي.",
    },
  };

  const t = translations[lang] || translations.EN;

  const projects = [
    {
      title: t.projectTitle,
      description: t.projectDescription,
      link: "https://your-portfolio-link.com",
      tags: ["Next.js", "Tailwind CSS", "TypeScript", "Three.js"]
    },
    {
      title: t.projectTitle2,
      description: t.projectDescription2,
      link: "#",
      tags: ["React", "Node.js", "MongoDB", "Stripe"]
    },
    {
      title: t.projectTitle3,
      description: t.projectDescription3,
      link: "#",
      tags: ["Vue.js", "Firebase", "Socket.io", "PWA"]
    },
  ];

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
        className="max-w-6xl mx-auto space-y-12"
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
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div 
                className="bg-card-bg/90 backdrop-blur-sm border-2 border-border p-6 h-full transition-all duration-200 hover:border-primary"
                style={{ boxShadow: `6px 6px 0px ${shadowColor}` }}
              >
                <ProjectCard {...project} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center bg-card-bg/90 backdrop-blur-sm border-2 border-border p-8"
          style={{ boxShadow: `8px 8px 0px ${shadowColor}` }}
          variants={itemVariants}
        >
          <h3 className="text-2xl font-bold mb-4 text-primary">
            {lang === "EN" ? "Interested in working together?" : "مهتم بالعمل معاً؟"}
          </h3>
          <p className="text-lg text-foreground/80 mb-6">
            {lang === "EN" 
              ? "Let's discuss your next project and bring your ideas to life."
              : "دعنا نناقش مشروعك القادم ونحول أفكارك إلى واقع."
            }
          </p>
          <motion.a
            href="/contact"
            className="inline-block text-button-text bg-button-bg px-8 py-3 font-bold transition-all duration-200 hover:bg-primary-hover"
            style={{ boxShadow: `4px 4px 0px ${shadowColor}` }}
            whileHover={{ x: 2, y: -2 }}
            whileTap={{ x: 0, y: 0 }}
          >
            {lang === "EN" ? "Get In Touch" : "تواصل معي"}
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
}