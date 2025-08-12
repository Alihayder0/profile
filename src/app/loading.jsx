"use client";

import { useEffect, useRef } from "react";

export default function ParticleLoading() {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: null, y: null });

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
        // الحركة العضوية (Wander Effect)
        this.wander += (Math.random() - 0.5) * 0.2;
        this.vx += Math.cos(this.wander) * 0.1;
        this.vy += Math.sin(this.wander) * 0.1;

        // تفاعل مع الماوس
        if (mousePos.current.x !== null && mousePos.current.y !== null) {
          const dx = this.x - mousePos.current.x;
          const dy = this.y - mousePos.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = 150;

          if (dist < minDist) {
            const force = (minDist - dist) / minDist;
            const angle = Math.atan2(dy, dx);
            this.vx += force * Math.cos(angle) * 1.2;
            this.vy += force * Math.sin(angle) * 1.2;
          }
        }
        
        // --- تعديل: تمت زيادة قوة الجذب للمركز ---
        const centerForce = 0.05; // كانت 0.005، زدناها لجذب أقوى
        const dxToCenter = width / 2 - this.x;
        const dyToCenter = height / 2 - this.y;

        this.vx += dxToCenter * centerForce * 0.01;
        this.vy += dyToCenter * centerForce * 0.01;


        // تحديث الموقع بناءً على السرعة
        this.x += this.vx;
        this.y += this.vy;

        // ارتداد الجسيمات عن الحواف
        const margin = 5;
        if (this.x < margin || this.x > width - margin) {
          this.vx *= -0.5;
          this.x = Math.max(margin, Math.min(width - margin, this.x));
        }
        if (this.y < margin || this.y > height - margin) {
          this.vy *= -0.5;
          this.y = Math.max(margin, Math.min(height - margin, this.y));
        }

        // تخفيف السرعة (احتكاك)
        this.vx *= 0.98;
        this.vy *= 0.98;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.fill();
      }
    }

    function connectParticles(pulse) {
      const maxDist = 80 + pulse * 60;

      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / maxDist})`;
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
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < blastRadius) {
          const force = (blastRadius - dist) / blastRadius;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 8;
          p.vy += Math.sin(angle) * force * 8;
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
    <div className="relative w-full h-screen bg-gradient-to-br from-[#3f3251] via-[#002025] to-[#002025] flex items-center justify-center select-none overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      <div className="relative z-10 flex flex-col items-center text-white space-y-4">
        <div className="loader-circle border-4 border-t-transparent border-white rounded-full w-16 h-16 animate-spin"></div>
        <p className="text-xl font-semibold tracking-wide">جاري التحميل...</p>
      </div>
    </div>
  );
}
