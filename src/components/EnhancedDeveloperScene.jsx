"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const EnhancedDeveloperScene = ({ theme }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // إعداد المشهد
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // إعداد الكاميرا
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(8, 6, 10);

    // إعداد الرندر
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // الألوان حسب السمة
    const primaryColor = theme === 'dark' ? 0x3B82F6 : 0x1E40AF;
    const secondaryColor = theme === 'dark' ? 0x10B981 : 0x059669;
    const accentColor = theme === 'dark' ? 0xF59E0B : 0xD97706;

    // إنشاء مكتب العمل
    const deskGroup = new THREE.Group();

    // سطح المكتب
    const deskGeometry = new THREE.BoxGeometry(8, 0.2, 4);
    const deskMaterial = new THREE.MeshPhongMaterial({ 
      color: theme === 'dark' ? 0x3a3a3a : 0x8B4513,
      shininess: 30
    });
    const desk = new THREE.Mesh(deskGeometry, deskMaterial);
    desk.position.y = -0.1;
    desk.castShadow = true;
    desk.receiveShadow = true;
    deskGroup.add(desk);

    // إنشاء اللابتوب المحسن
    const laptopGroup = new THREE.Group();

    // قاعدة اللابتوب
    const baseGeometry = new THREE.BoxGeometry(3.5, 0.25, 2.5);
    const baseMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2d3748,
      shininess: 50
    });
    const laptopBase = new THREE.Mesh(baseGeometry, baseMaterial);
    laptopBase.position.y = 0.125;
    laptopBase.castShadow = true;
    laptopGroup.add(laptopBase);

    // شاشة اللابتوب
    const screenGeometry = new THREE.BoxGeometry(3.3, 2.2, 0.15);
    const screenMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x1a1a1a,
      shininess: 100
    });
    const laptopScreen = new THREE.Mesh(screenGeometry, screenMaterial);
    laptopScreen.position.set(0, 1.1, -1.2);
    laptopScreen.rotation.x = Math.PI * 0.15;
    laptopScreen.castShadow = true;
    laptopGroup.add(laptopScreen);

    // شاشة العرض مع الكود المتحرك
    const displayGeometry = new THREE.PlaneGeometry(3.1, 2.0);
    
    const canvas = document.createElement('canvas');
    canvas.width = 620;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    const codeLines = [
      '// 🚀 Building Amazing Web Experiences',
      'import React from "react";',
      'import { motion } from "framer-motion";',
      '',
      'const AliHayder = () => {',
      '  const skills = [',
      '    "React & Next.js",',
      '    "Three.js & WebGL", ',
      '    "Node.js & Express",',
      '    "TypeScript & JavaScript"',
      '  ];',
      '',
      '  return (',
      '    <Developer',
      '      name="Ali Hayder"',
      '      passion="Creating Digital Magic"',
      '      status="Always Learning"',
      '      skills={skills}',
      '    />',
      '  );',
      '};'
    ];

    let codeIndex = 0;
    const updateCodeDisplay = (time) => {
      // خلفية الشاشة
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, theme === 'dark' ? '#0f172a' : '#f8fafc');
      gradient.addColorStop(1, theme === 'dark' ? '#1e293b' : '#e2e8f0');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // إطار النافذة
      ctx.strokeStyle = theme === 'dark' ? '#3b82f6' : '#1e40af';
      ctx.lineWidth = 2;
      ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

      // شريط العنوان
      ctx.fillStyle = theme === 'dark' ? '#3b82f6' : '#1e40af';
      ctx.fillRect(5, 5, canvas.width - 10, 30);

      // أزرار النافذة
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(canvas.width - 80, 12, 15, 15);
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(canvas.width - 60, 12, 15, 15);
      ctx.fillStyle = '#10b981';
      ctx.fillRect(canvas.width - 40, 12, 15, 15);

      // عنوان النافذة
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Arial';
      ctx.fillText('🚀 Ali Hayder - VS Code', 15, 25);

      // رقم السطر والكود
      ctx.font = '13px "Courier New", monospace';
      
      const visibleLines = Math.min(18, codeLines.length);
      const startIndex = Math.max(0, codeIndex - visibleLines + 1);
      
      for (let i = 0; i < visibleLines; i++) {
        const lineIndex = startIndex + i;
        if (lineIndex >= codeLines.length) break;
        
        const line = codeLines[lineIndex];
        const y = 55 + i * 18;
        
        // رقم السطر
        ctx.fillStyle = theme === 'dark' ? '#6b7280' : '#9ca3af';
        ctx.fillText((lineIndex + 1).toString().padStart(2, ' '), 15, y);
        
        // الكود مع تلوين الصياغة
        let color = theme === 'dark' ? '#e5e7eb' : '#374151';
        
        if (line.includes('import') || line.includes('const') || line.includes('return')) {
          color = '#3b82f6'; // أزرق للكلمات المفتاحية
        } else if (line.includes('"') || line.includes("'")) {
          color = '#10b981'; // أخضر للنصوص
        } else if (line.includes('//')) {
          color = '#6b7280'; // رمادي للتعليقات
        } else if (line.includes('<') || line.includes('>')) {
          color = '#f59e0b'; // أصفر للـ JSX
        }
        
        ctx.fillStyle = color;
        ctx.fillText(line, 45, y);
        
        // مؤشر الكتابة المتحرك
        if (lineIndex === codeIndex && Math.floor(time * 2) % 2 === 0) {
          ctx.fillStyle = theme === 'dark' ? '#3b82f6' : '#1e40af';
          ctx.fillRect(45 + ctx.measureText(line).width + 2, y - 12, 2, 14);
        }
      }
    };

    const displayTexture = new THREE.CanvasTexture(canvas);
    const displayMaterial = new THREE.MeshBasicMaterial({ 
      map: displayTexture,
      transparent: false
    });
    const laptopDisplay = new THREE.Mesh(displayGeometry, displayMaterial);
    laptopDisplay.position.set(0, 1.1, -1.125);
    laptopDisplay.rotation.x = Math.PI * 0.15;
    laptopGroup.add(laptopDisplay);

    // لوحة المفاتيح مع إضاءة
    const keyboardGeometry = new THREE.BoxGeometry(3, 0.1, 1.8);
    const keyboardMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x4a5568,
      shininess: 30
    });
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
    keyboard.position.set(0, 0.3, 0.2);
    keyboard.castShadow = true;
    laptopGroup.add(keyboard);

    // مفاتيح ملونة
    const keys = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 12; col++) {
        const keyGeometry = new THREE.BoxGeometry(0.18, 0.08, 0.18);
        let keyColor = 0xf7fafc;
        
        // مفاتيح خاصة ملونة
        if (Math.random() > 0.85) {
          keyColor = primaryColor;
        } else if (Math.random() > 0.9) {
          keyColor = secondaryColor;
        }
        
        const keyMaterial = new THREE.MeshPhongMaterial({ 
          color: keyColor,
          shininess: 50
        });
        const key = new THREE.Mesh(keyGeometry, keyMaterial);
        key.position.set(
          -1.3 + col * 0.22,
          0.35,
          -0.4 + row * 0.22
        );
        key.castShadow = true;
        
        key.userData = {
          originalY: key.position.y,
          pressTime: Math.random() * 100
        };
        
        laptopGroup.add(key);
        keys.push(key);
      }
    }

    laptopGroup.position.set(-1, 0, 0);
    deskGroup.add(laptopGroup);

    // إضافة ماوس الكمبيوتر
    const mouseGeometry = new THREE.CapsuleGeometry(0.3, 0.8, 4, 8);
    const mouseMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2d3748,
      shininess: 50
    });
    const computerMouse = new THREE.Mesh(mouseGeometry, mouseMaterial);
    computerMouse.position.set(2.5, 0.3, 0.5);
    computerMouse.rotation.z = Math.PI / 2;
    computerMouse.castShadow = true;
    deskGroup.add(computerMouse);

    // إضافة كوب قهوة
    const cupGeometry = new THREE.CylinderGeometry(0.4, 0.3, 0.8, 16);
    const cupMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x8B4513,
      shininess: 80
    });
    const cup = new THREE.Mesh(cupGeometry, cupMaterial);
    cup.position.set(3, 0.6, -1.5);
    cup.castShadow = true;
    deskGroup.add(cup);

    // سائل القهوة
    const coffeeGeometry = new THREE.CylinderGeometry(0.35, 0.28, 0.1, 16);
    const coffeeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x3e2723,
      transparent: true,
      opacity: 0.8
    });
    const coffee = new THREE.Mesh(coffeeGeometry, coffeeMaterial);
    coffee.position.set(3, 0.95, -1.5);
    deskGroup.add(coffee);

    scene.add(deskGroup);

    // رموز البرمجة المحدثة
    const floatingIcons = [];
    const icons = [
      { text: 'React', color: 0x61dafb },
      { text: 'JS', color: 0xf7df1e },
      { text: 'TS', color: 0x3178c6 },
      { text: 'Node', color: 0x68a063 },
      { text: 'CSS', color: 0x1572b6 },
      { text: 'HTML', color: 0xe34f26 },
      { text: 'Git', color: 0xf05032 },
      { text: 'NPM', color: 0xcb3837 }
    ];

    icons.forEach((icon, index) => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      
      // خلفية دائرية
      ctx.beginPath();
      ctx.arc(64, 64, 60, 0, Math.PI * 2);
      ctx.fillStyle = `#${icon.color.toString(16).padStart(6, '0')}`;
      ctx.fill();
      
      // النص
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(icon.text, 64, 64);
      
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.MeshBasicMaterial({ 
        map: texture, 
        transparent: true
      });
      
      const geometry = new THREE.PlaneGeometry(1.5, 1.5);
      const iconMesh = new THREE.Mesh(geometry, material);
      
      const angle = (index / icons.length) * Math.PI * 2;
      iconMesh.position.set(
        Math.cos(angle) * 8,
        Math.random() * 4 + 3,
        Math.sin(angle) * 8
      );
      
      iconMesh.userData = {
        speed: Math.random() * 0.02 + 0.01,
        radius: 8,
        angle: angle,
        floatSpeed: Math.random() * 0.03 + 0.02,
        originalY: iconMesh.position.y
      };
      
      scene.add(iconMesh);
      floatingIcons.push(iconMesh);
    });

    // جسيمات الكود
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 40;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: primaryColor,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // إضاءة محسنة
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(10, 15, 10);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.1;
    mainLight.shadow.camera.far = 50;
    mainLight.shadow.camera.left = -20;
    mainLight.shadow.camera.right = 20;
    mainLight.shadow.camera.top = 20;
    mainLight.shadow.camera.bottom = -20;
    scene.add(mainLight);

    // أضواء ملونة
    const blueLight = new THREE.PointLight(primaryColor, 1.5, 15);
    blueLight.position.set(-5, 5, 5);
    scene.add(blueLight);

    const greenLight = new THREE.PointLight(secondaryColor, 1.5, 15);
    greenLight.position.set(5, 5, -5);
    scene.add(greenLight);

    // أرضية محسنة
    const floorGeometry = new THREE.PlaneGeometry(50, 50);
    const floorMaterial = new THREE.MeshLambertMaterial({ 
      color: theme === 'dark' ? 0x1a1a1a : 0xf5f5f5,
      transparent: true,
      opacity: 0.8
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -3;
    floor.receiveShadow = true;
    scene.add(floor);

    // متغيرات التفاعل
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // حلقة الرسوم المتحركة
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // تحديث شاشة الكود
      if (Math.floor(time * 2) % 30 === 0) {
        codeIndex = (codeIndex + 1) % codeLines.length;
      }
      updateCodeDisplay(time);
      displayTexture.needsUpdate = true;

      // تحريك اللابتوب بلطف
      laptopGroup.rotation.y = Math.sin(time * 0.2) * 0.1;
      laptopGroup.position.y = Math.sin(time * 0.3) * 0.1;

      // تحريك المفاتيح (محاكاة الكتابة)
      keys.forEach((key, index) => {
        key.userData.pressTime += 0.1;
        if (Math.sin(key.userData.pressTime) > 0.9) {
          key.position.y = key.userData.originalY - 0.02;
        } else {
          key.position.y = key.userData.originalY;
        }
      });

      // تحريك الرموز العائمة
      floatingIcons.forEach((icon, index) => {
        icon.userData.angle += icon.userData.speed;
        icon.position.x = Math.cos(icon.userData.angle) * icon.userData.radius;
        icon.position.z = Math.sin(icon.userData.angle) * icon.userData.radius;
        icon.position.y = icon.userData.originalY + 
          Math.sin(time * icon.userData.floatSpeed + index) * 1.5;
        icon.rotation.y += 0.02;
        
        // تأثير الماوس
        const distance = icon.position.distanceTo(
          new THREE.Vector3(mouse.x * 10, mouse.y * 5, 0)
        );
        if (distance < 6) {
          icon.scale.setScalar(1.2 + Math.sin(time * 5) * 0.1);
        } else {
          icon.scale.setScalar(1);
        }
      });

      // تحريك الجسيمات
      particlesMesh.rotation.y = time * 0.05;
      particlesMesh.rotation.x = time * 0.02;

      // تحريك الأضواء
      blueLight.position.x = Math.sin(time * 0.5) * 10;
      blueLight.position.z = Math.cos(time * 0.5) * 10;
      
      greenLight.position.x = Math.cos(time * 0.7) * 10;
      greenLight.position.z = Math.sin(time * 0.7) * 10;

      // تحريك الكاميرا
      camera.position.x += (mouse.x * 5 + 8 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 3 + 6 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // تنظيف الموارد
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // تنظيف الذاكرة
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 z-0" 
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default EnhancedDeveloperScene;
