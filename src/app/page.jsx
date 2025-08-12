"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLanguage } from "../app/LanguageProvider";

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
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: undefined, y: undefined, radius: 150 });
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

  // --- Canvas effect ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationFrameId;

    const getPrimaryColorRGB = () => {
      const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
      return primaryColor;
    };

    let accentColorRGB = getPrimaryColorRGB();

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.originX = x;
        this.originY = y;
        this.vx = 0;
        this.vy = 0;
        this.radius = 1.5;
        this.spring = 0.03;
        this.friction = 0.85;
      }

      update() {
        const dx = this.x - mousePos.current.x;
        const dy = this.y - mousePos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        if (dist < mousePos.current.radius) {
          const force = (mousePos.current.radius - dist) / mousePos.current.radius;
          this.vx += Math.cos(angle) * force * 1.5;
          this.vy += Math.sin(angle) * force * 1.5;
        }

        this.vx += (this.originX - this.x) * this.spring;
        this.vy += (this.originY - this.y) * this.spring;
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentColorRGB}, 0.5)`;
        ctx.fill();
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      accentColorRGB = getPrimaryColorRGB();
      createParticles();
    };

    const createParticles = () => {
      particles = [];
      const gap = 40;
      for (let y = gap / 2; y < canvas.height; y += gap) {
        for (let x = gap / 2; x < canvas.width; x += gap) {
          particles.push(new Particle(x, y));
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 60) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${accentColorRGB}, ${1 - dist / 60})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event) => {
      mousePos.current.x = event.clientX;
      mousePos.current.y = event.clientY;
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  const accentColor = "hsl(var(--primary))";

  return (
    <div className="bg-background p-4 sm:p-8 flex items-center justify-center min-h-screen overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-50" />

      <motion.section
        className="w-full max-w-4xl bg-card-bg/80 backdrop-blur-sm text-foreground border-2 border-border rounded-none p-6 sm:p-10 relative flex flex-col-reverse md:flex-row items-center gap-8 z-10"
        style={{ boxShadow: `8px 8px 0px ${accentColor}` }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={`flex-1 z-10 text-center ${lang === "en" ? "md:text-right" : "md:text-right"}  `}>
          <motion.h1
            className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {t.name} <span className="inline-block animate-wave">👋</span>
          </motion.h1>

          <motion.p
            className="text-lg text-foreground/80 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {t.intro}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-8 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
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
            transition={{ delay: 0.5, duration: 0.5 }}
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
          className="relative z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
        >
          <div 
            className="w-40 h-40 sm:w-48 sm:h-48 bg-secondary border-2 border-border transition-all duration-200"
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
