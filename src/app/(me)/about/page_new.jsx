"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FiCode, FiUserCheck, FiZap } from "react-icons/fi";
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

export default function About() {
    const { lang } = useLanguage();
    const { theme } = useTheme();

    // النصوص باللغتين
    const translations = {
        EN: {
            title: "About Me",
            intro: "Passionate about creating impactful digital experiences",
            description: "I'm a dedicated software developer who loves crafting clean, efficient code and building user-centric applications. With expertise in modern web technologies, I focus on creating solutions that make a difference.",
            skillsTitle: "My Skills",
            principlesTitle: "Development Principles",
            cleanCode: "Clean & Efficient Code",
            userCentric: "User-Centric Design", 
            performance: "Performance & Optimization",
        },
        AR: {
            title: "حولي",
            intro: "شغوف بإنشاء تجارب رقمية مؤثرة",
            description: "أنا مطور برمجيات مخصص أحب صياغة كود نظيف وفعال وبناء تطبيقات تركز على المستخدم. مع خبرة في تقنيات الويب الحديثة، أركز على إنشاء حلول تحدث فرقاً.",
            skillsTitle: "مهاراتي",
            principlesTitle: "مبادئ التطوير",
            cleanCode: "كود نظيف وفعال",
            userCentric: "تصميم يركز على المستخدم",
            performance: "الأداء والتحسين",
        },
    };

    const t = translations[lang] || translations.EN;

    const skills = [
        "React", "Next.js", "JavaScript (ES6+)", "TypeScript", 
        "Tailwind CSS", "Framer Motion", "Node.js", "Git & GitHub"
    ];

    const principles = [
        { icon: <FiCode />, text: t.cleanCode },
        { icon: <FiUserCheck />, text: t.userCentric },
        { icon: <FiZap />, text: t.performance },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const accentColor = "hsl(var(--primary))";
    const shadowColor = theme === 'dark' ? '#111' : '#000';

    const SkillsSection = ({ skills, accentColor, shadowColor }) => {
        const ref = useRef(null);
        const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

        const handleMouseMove = (e) => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }
        };

        return (
            <motion.div
                ref={ref}
                className="relative p-8 bg-card-bg border-2 border-border rounded-none overflow-hidden"
                style={{ boxShadow: `8px 8px 0px ${shadowColor}` }}
                onMouseMove={handleMouseMove}
                variants={itemVariants}
            >
                <div
                    className="absolute w-64 h-64 rounded-full opacity-10 pointer-events-none transition-all duration-300"
                    style={{
                        background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
                        left: mousePosition.x - 128,
                        top: mousePosition.y - 128,
                    }}
                />
                
                <h3 className="text-2xl font-bold mb-6 text-primary relative z-10">
                    {t.skillsTitle}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill}
                            className="bg-secondary text-foreground px-4 py-2 text-center font-medium border border-border transition-colors hover:bg-primary hover:text-button-text"
                            style={{ boxShadow: `3px 3px 0px ${shadowColor}` }}
                            whileHover={{ y: -2, scale: 1.05 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {skill}
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        );
    };

    return (
        <div className="bg-background min-h-screen py-12 px-4">
            <motion.div
                className="max-w-4xl mx-auto space-y-12"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header Section */}
                <motion.div
                    className="text-center bg-card-bg border-2 border-border p-8 relative"
                    style={{ boxShadow: `12px 12px 0px ${shadowColor}` }}
                    variants={itemVariants}
                >
                    <h1 className="text-4xl md:text-5xl font-black mb-4 text-foreground">
                        {t.title}
                    </h1>
                    <p className="text-xl text-primary font-semibold mb-4">
                        {t.intro}
                    </p>
                    <p className="text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
                        {t.description}
                    </p>
                </motion.div>

                {/* Skills Section */}
                <SkillsSection 
                    skills={skills} 
                    accentColor={accentColor} 
                    shadowColor={shadowColor} 
                />

                {/* Principles Section */}
                <motion.div
                    className="bg-card-bg border-2 border-border p-8"
                    style={{ boxShadow: `8px 8px 0px ${shadowColor}` }}
                    variants={itemVariants}
                >
                    <h3 className="text-2xl font-bold mb-6 text-primary">
                        {t.principlesTitle}
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {principles.map((principle, index) => (
                            <motion.div
                                key={index}
                                className="flex items-center space-x-4 rtl:space-x-reverse p-4 bg-secondary border border-border transition-colors hover:bg-primary hover:text-button-text"
                                style={{ boxShadow: `4px 4px 0px ${shadowColor}` }}
                                whileHover={{ y: -3, scale: 1.02 }}
                                initial={{ opacity: 0, x: lang === "AR" ? 30 : -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="text-2xl text-primary">{principle.icon}</div>
                                <p className="font-semibold text-foreground">{principle.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
