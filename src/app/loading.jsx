"use client";

import { useRef, useEffect } from "react";
import { useLanguage } from "./LanguageProvider";

export default function ParticleLoading() {
  const { lang } = useLanguage();
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: null, y: null });

  // النصوص باللغتين
  const translations = {
    EN: {
      loading: "Loading...",
    },
    AR: {
      loading: "جاري التحميل...",
    },
  };

  const t = translations[lang] || translations.EN;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width, height;
    let particles = [];
    let animationFrameId;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = 2 + Math.random() * 2;
        this.wander = 0.15 + Math.random() * 0.5;
      }

      update() {
        this.vx += (Math.random() - 0.5) * this.wander;
        this.vy += (Math.random() - 0.5) * this.wander;

        this.vx = Math.max(-2, Math.min(2, this.vx));
        this.vy = Math.max(-2, Math.min(2, this.vy));

        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) {
          this.vx *= -1;
          this.x = Math.max(0, Math.min(width, this.x));
        }
        if (this.y < 0 || this.y > height) {
          this.vy *= -1;
          this.y = Math.max(0, Math.min(height, this.y));
        }

        if (mousePos.current.x !== null && mousePos.current.y !== null) {
          const dx = mousePos.current.x - this.x;
          const dy = mousePos.current.y - this.y;
          const distance = Math.hypot(dx, dy);

          if (distance < 100) {
            const force = (100 - distance) / 100;
            this.vx += (dx / distance) * force * 0.5;
            this.vy += (dy / distance) * force * 0.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${0.4 + Math.sin(Date.now() * 0.003 + this.x * 0.01) * 0.3})`;
        ctx.fill();
      }
    }

    function connectParticles(pulse) {
      const maxDist = 60 + pulse * 40;

      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dist = Math.hypot(
            particles[a].x - particles[b].x,
            particles[a].y - particles[b].y
          );

          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * (0.2 + pulse * 0.3);
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.lineWidth = 1 + pulse * 1.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      const pulse = (Math.sin(Date.now() * 0.001) + 1) / 2;

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      connectParticles(pulse);
      animationFrameId = requestAnimationFrame(animate);
    }

    function init() {
      resize();
      particles = [];
      const count = Math.floor((width * height) / 7000);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animate();
    }

    function handleMouseMove(e) {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    }

    function handleMouseLeave() {
      mousePos.current.x = null;
      mousePos.current.y = null;
    }

    function handleClick(e) {
      const clickX = e.clientX;
      const clickY = e.clientY;
      const blastRadius = 200;

      particles.forEach((p) => {
        const dx = p.x - clickX;
        const dy = p.y - clickY;
        const distance = Math.hypot(dx, dy);

        if (distance < blastRadius) {
          const force = (blastRadius - distance) / blastRadius;
          p.vx += (dx / distance) * force * 8;
          p.vy += (dy / distance) * force * 8;
        }
      });
    }

    window.addEventListener("resize", init);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleClick);

    init();

    return () => {
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-[#3f3251] via-[#002025] to-[#002025] flex items-center justify-center select-none overflow-hidden z-50">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      <div className="relative z-10 flex flex-col items-center text-white space-y-8">
        <div className="relative">
          <div className="loader-circle border-8 border-t-transparent border-white rounded-full w-20 h-20 animate-spin"></div>
          <div className="absolute inset-0 border-8 border-blue-500/20 rounded-full animate-pulse"></div>
        </div>
        <div className="text-center space-y-4">
          <p className="text-2xl font-medium tracking-wide">{t.loading}</p>
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
