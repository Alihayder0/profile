"use client";
import { useLanguage } from "C:/Users/pc/Desktop/program/pro2/src/app/LanguageProvider";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FiCode, FiUserCheck, FiZap } from "react-icons/fi";

// تختار اللغة هنا "EN" للإنجليزي أو "AR" للعربي
const lang = useLanguage(); // جرب تغيرها لـ "EN"

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

const skills = [
    "React", "Next.js", "JavaScript (ES6+)", "TypeScript", 
    "Tailwind CSS", "Framer Motion", "Node.js", "Git & GitHub"
];

const principles = [
    { icon: <FiCode />, text: lang === "EN" ? "Clean & Efficient Code" : "كود نظيف وفعال" },
    { icon: <FiUserCheck />, text: lang === "EN" ? "User-Centric Design" : "تصميم يركز على المستخدم" },
    { icon: <FiZap />, text: lang === "EN" ? "Performance & Optimization" : "الأداء والتحسين" },
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
        <section
            className="bg-card-bg/90 backdrop-blur-lg text-foreground border-2 border-border rounded-none p-8 sm:p-12 relative"
            style={{ boxShadow: `8px 8px 0px ${accentColor}` }}
        >
            <h3 
                className="text-2xl md:text-3xl font-black mb-6 uppercase tracking-tighter"
                style={{ color: accentColor }}
            >
                {lang === "EN" ? "My Skills" : "مهاراتي"}
            </h3>
            <motion.div 
                ref={ref}
                onMouseMove={handleMouseMove}
                className="flex flex-wrap gap-3 relative group"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                style={{
                    '--mouse-x': `${mousePosition.x}px`,
                    '--mouse-y': `${mousePosition.y}px`,
                }}
            >
                <div 
                    className="pointer-events-none absolute -inset-px rounded-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                        background: `radial-gradient(300px at var(--mouse-x) var(--mouse-y), hsla(var(--primary), 0.15), transparent 80%)`,
                    }}
                />
                {skills.map((skill) => (
                    <motion.div
                        key={skill}
                        className="bg-secondary border-2 border-border text-foreground font-semibold py-2 px-4"
                        style={{ boxShadow: `3px 3px 0px ${shadowColor}` }}
                        variants={itemVariants}
                        whileHover={{ y: -3, x: 1 }}
                    >
                        {skill}
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};


export default function About() {
    const { theme } = useTheme();
    const accentColor = "hsl(var(--primary))";
    const shadowColor = "rgb(var(--shadow))";
    const canvasRef = useRef(null);
    const mousePos = useRef({ x: undefined, y: undefined });
    const ripples = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let particles = [];
        let animationFrameId;

        const getPrimaryColor = (alpha = 1) => {
            if (typeof window === 'undefined') return `rgba(59, 130, 246, ${alpha})`;
            const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
            return `rgba(${primaryColor}, ${alpha})`;
        };

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.originX = x;
                this.originY = y;
                this.vx = 0;
                this.vy = 0;
                this.radius = Math.random() * 1.5 + 1;
                this.spring = 0.01;
                this.friction = 0.9;
                this.mouseRepelStrength = 50;
            }

            update() {
                const dx = this.x - mousePos.current.x;
                const dy = this.y - mousePos.current.y;
                const dist = Math.hypot(dx, dy);
                
                if (dist < this.mouseRepelStrength) {
                    const angle = Math.atan2(dy, dx);
                    const force = (this.mouseRepelStrength - dist) / this.mouseRepelStrength;
                    this.vx += Math.cos(angle) * force * 0.2;
                    this.vy += Math.sin(angle) * force * 0.2;
                }

                ripples.current.forEach(ripple => {
                    const rippleDx = this.x - ripple.x;
                    const rippleDy = this.y - ripple.y;
                    const rippleDist = Math.hypot(rippleDx, rippleDy);
                    if (Math.abs(rippleDist - ripple.radius) < 10) { 
                        const rippleAngle = Math.atan2(rippleDy, rippleDx);
                        this.vx += Math.cos(rippleAngle) * ripple.strength;
                        this.vy += Math.sin(rippleAngle) * ripple.strength;
                    }
                });

                this.vx += (this.originX - this.x) * this.spring;
                this.vy += (this.originY - this.y) * this.spring;

                this.vx *= this.friction;
                this.vy *= this.friction;
                this.x += this.vx;
                this.y += this.vy;
            }
        }

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            createParticles();
        };

        const createParticles = () => {
            particles = [];
            const count = Math.floor(canvas.width * canvas.height / 12000);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            ripples.current.forEach((ripple, index) => {
                ripple.radius += 2.0;
                ripple.strength *= 0.97;

                ctx.beginPath();
                ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
                ctx.strokeStyle = getPrimaryColor(ripple.strength * 0.5);
                ctx.lineWidth = 2;
                ctx.stroke();
                
                if (ripple.strength < 0.01) {
                    ripples.current.splice(index, 1);
                }
            });

            particles.forEach(p => p.update());

            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                
                const distToMouse = Math.hypot(p1.x - mousePos.current.x, p1.y - mousePos.current.y);
                const mouseGlowAlpha = Math.max(0, 1 - distToMouse / 150);

                ctx.beginPath();
                ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
                ctx.fillStyle = getPrimaryColor(0.3 + mouseGlowAlpha * 0.7);
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = getPrimaryColor( (1 - (dist / 120)) * (0.1 + mouseGlowAlpha * 0.4) );
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };

        const handleMouseDown = (e) => {
            const rect = canvas.getBoundingClientRect();
            ripples.current.push({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
                radius: 0,
                strength: 1.0,
            });
        };

        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleMouseDown);
        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return (
        <div className="bg-background relative min-h-[80vh] w-full">
             <canvas ref={canvasRef} className="absolute inset-0 z-0" />
            <div className="relative z-10 flex items-center justify-center p-4 sm:p-8 min-h-[80vh]">
                <motion.div
                    className="w-full max-w-2xl space-y-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.section
                        variants={itemVariants}
                        className="bg-card-bg/90 backdrop-blur-lg text-foreground border-2 border-border rounded-none p-8 sm:p-12"
                        style={{ boxShadow: `8px 8px 0px ${accentColor}` }}
                    >
                        <h2 
                            className="text-3xl md:text-4xl font-black mb-6 uppercase tracking-tighter"
                            style={{ color: accentColor }}
                        >
                            {lang === "EN" ? "About Me" : "عني"}
                        </h2>
                        <div className="space-y-4 text-lg text-foreground/80">
                            <p>
                                {lang === "EN"
                                    ? "I'm Ali Haider, a passionate web developer building modern digital experiences with the latest technologies."
                                    : "أنا علي حيدر، مطور ويب شغوف ببناء تجارب رقمية حديثة وجذابة باستخدام أحدث التقنيات."
                                }
                            </p>
                            <p>
                                {lang === "EN"
                                    ? "I love programming and always strive to improve myself and help others in this exciting and challenging field."
                                    : "أحب البرمجة، وأطمح دائمًا لتطوير نفسي ومساعدة الآخرين في هذا المجال الممتع والمليء بالتحديات."
                                }
                            </p>
                        </div>
                    </motion.section>

                    <motion.div variants={itemVariants}>
                        <SkillsSection skills={skills} accentColor={accentColor} shadowColor={shadowColor} />
                    </motion.div>
                    
                    <motion.section
                        variants={itemVariants}
                        className="bg-card-bg/90 backdrop-blur-lg text-foreground border-2 border-border rounded-none p-8 sm:p-12"
                        style={{ boxShadow: `8px 8px 0px ${accentColor}` }}
                    >
                         <h3 
                            className="text-2xl md:text-3xl font-black mb-6 uppercase tracking-tighter"
                            style={{ color: accentColor }}
                        >
                            {lang === "EN" ? "My Principles" : "مبادئي"}
                        </h3>
                        <motion.div 
                            className="space-y-4"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            {principles.map((principle) => (
                                <motion.div
                                    key={principle.text}
                                    className="flex items-center gap-4 bg-secondary border-2 border-border p-4"
                                    style={{ boxShadow: `4px 4px 0px ${shadowColor}` }}
                                    variants={itemVariants}
                                >
                                    <div className="text-primary text-3xl">{principle.icon}</div>
                                    <span className="font-semibold text-lg">{principle.text}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.section>
                </motion.div>
            </div>
        </div>
    );
}
