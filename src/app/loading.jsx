"use client";

import { useEffect, useRef } from "react";

export default function ParticleLoading() {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
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
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = 3 + Math.random() * 3;
      }
      update() {
        // حركة الجزيئات العادية
        this.x += this.vx;
        this.y += this.vy;

        // تفاعل مع الماوس
        if (mousePos.current.x !== null && mousePos.current.y !== null) {
          const dx = this.x - mousePos.current.x;
          const dy = this.y - mousePos.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = 150;

          if (dist < minDist) {
            // قوة دفع بسيطة بعيد عن الماوس
            const force = (minDist - dist) / minDist;
            const angle = Math.atan2(dy, dx);
            this.vx += force * Math.cos(angle);
            this.vy += force * Math.sin(angle);
          }
        }

        // بقاء الجزيئات داخل الشاشة
        if (this.x > width || this.x < 0) this.vx = -this.vx;
        if (this.y > height || this.y < 0) this.vy = -this.vy;

        // تخفيف السرعة شوي عشان ما تسرع بدون تحكم
        this.vx *= 0.95;
        this.vy *= 0.95;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.fill();
      }
    }

    function connectParticles() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / 120})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    }

    function init() {
      resize();
      particles = [];
      const count = Math.floor((width * height) / 8000);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
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

    window.addEventListener("resize", init);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    init();

    return () => {
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-[#3f3251] via-[#002025] to-[#002025] flex items-center justify-center select-none">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      <div className="relative z-10 flex flex-col items-center text-white space-y-4">
        <div className="loader-circle border-4 border-t-transparent border-white rounded-full w-16 h-16 animate-spin"></div>
        <p className="text-xl font-semibold tracking-wide">جاري التحميل...</p>
      </div>
    </div>
  );
}
