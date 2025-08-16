"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CompactDeveloperScene = ({ theme }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // إعداد المشهد
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // إعداد الكاميرا مع مجال رؤية أضيق
    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(3, 4, 6);

    // إعداد الرندر
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // الألوان حسب السمة
    const primaryColor = theme === 'dark' ? 0x3B82F6 : 0x1E40AF;
    const secondaryColor = theme === 'dark' ? 0x10B981 : 0x059669;
    const darkGray = 0x2d3748;
    const lightGray = 0x718096;

    // إنشاء مكتب العمل المصغر
    const deskGroup = new THREE.Group();

    // سطح المكتب
    const deskGeometry = new THREE.BoxGeometry(6, 0.15, 3);
    const deskMaterial = new THREE.MeshPhongMaterial({ 
      color: theme === 'dark' ? 0x3a3a3a : 0x8B4513,
      shininess: 30
    });
    const desk = new THREE.Mesh(deskGeometry, deskMaterial);
    desk.position.y = -0.075;
    desk.castShadow = true;
    desk.receiveShadow = true;
    deskGroup.add(desk);

    // اللابتوب المحسن والمفصل
    const laptopGroup = new THREE.Group();

    // قاعدة اللابتوب الرئيسية
    const baseGeometry = new THREE.BoxGeometry(3, 0.25, 2.2);
    const baseMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2c3e50,
      shininess: 80,
      specular: 0x444444
    });
    const laptopBase = new THREE.Mesh(baseGeometry, baseMaterial);
    laptopBase.position.y = 0.125;
    laptopBase.castShadow = true;
    laptopGroup.add(laptopBase);

    // قاعدة سفلية للابتوب (مطاطية)
    const rubberBaseGeometry = new THREE.BoxGeometry(2.9, 0.05, 2.1);
    const rubberBaseMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x1a1a1a,
      shininess: 10
    });
    const rubberBase = new THREE.Mesh(rubberBaseGeometry, rubberBaseMaterial);
    rubberBase.position.y = 0.025;
    laptopGroup.add(rubberBase);

    // مفصلة اللابتوب (الجزء المتحرك)
    const hingeGeometry = new THREE.CylinderGeometry(0.03, 0.03, 2.8, 16);
    const hingeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x34495e,
      shininess: 100
    });
    const hinge = new THREE.Mesh(hingeGeometry, hingeMaterial);
    hinge.rotation.z = Math.PI / 2;
    hinge.position.set(0, 0.25, -1.1);
    laptopGroup.add(hinge);

    // شاشة اللابتوب الخارجية
    const screenOuterGeometry = new THREE.BoxGeometry(2.8, 2, 0.15);
    const screenOuterMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2c3e50,
      shininess: 90
    });
    const screenOuter = new THREE.Mesh(screenOuterGeometry, screenOuterMaterial);
    screenOuter.position.set(0, 1, -1.0);
    screenOuter.rotation.x = Math.PI * 0.12;
    screenOuter.castShadow = true;
    laptopGroup.add(screenOuter);

    // إطار الشاشة الداخلي (البلاستيك الأسود)
    const screenFrameGeometry = new THREE.BoxGeometry(2.6, 1.8, 0.12);
    const screenFrameMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x000000,
      shininess: 50
    });
    const screenFrame = new THREE.Mesh(screenFrameGeometry, screenFrameMaterial);
    screenFrame.position.set(0, 1, -0.95);
    screenFrame.rotation.x = Math.PI * 0.02; // نفس زاوية الشاشة الخارجية
    laptopGroup.add(screenFrame);

    // الكاميرا الصغيرة أعلى الشاشة
    const cameraGeometry = new THREE.SphereGeometry(0.02, 8, 6);
    const cameraMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x000000,
      shininess: 100
    });
    const webcam = new THREE.Mesh(cameraGeometry, cameraMaterial);
    webcam.position.set(0, 1.85, -0.94);
    webcam.rotation.x = Math.PI * 0.02;
    laptopGroup.add(webcam);

    // LED للكاميرا
    const ledGeometry = new THREE.SphereGeometry(0.008, 6, 4);
    const ledMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00ff00,
      transparent: true,
      opacity: 0.8
    });
    const led = new THREE.Mesh(ledGeometry, ledMaterial);
    led.position.set(0.1, 1.85, -0.94);
    led.rotation.x = Math.PI * 0.02;
    laptopGroup.add(led);

    // شاشة العرض مع الكود المحسن
    const displayGeometry = new THREE.PlaneGeometry(2.4, 1.6);
    
    const canvas = document.createElement('canvas');
    canvas.width = 480;
    canvas.height = 320;
    const ctx = canvas.getContext('2d');
    
    const codeLines = [
      '// 🌟 Ali Hayder Portfolio Website',
      '<!DOCTYPE html>',
      '<html lang="en">',
      '<head>',
      '  <title>Ali Hayder - Developer</title>',
      '  <meta charset="UTF-8">',
      '</head>',
      '<body>',
      '  <header className="navbar">',
      '    <h1>🚀 Ali Hayder</h1>',
      '    <nav>',
      '      <a href="#about">About</a>',
      '      <a href="#projects">Projects</a>',
      '      <a href="#contact">Contact</a>',
      '    </nav>',
      '  </header>',
      '',
      '  <main className="hero">',
      '    <h2>Full Stack Developer 💻</h2>',
      '    <p>Building amazing web experiences</p>',
      '    <div className="skills">',
      '      ⚛️ React | 🟢 Node.js | 🎨 Three.js',
      '    </div>',
      '  </main>',
      '',
      '  <section className="projects">',
      '    <h3>Recent Projects 📁</h3>',
      '    <div className="project-grid">',
      '      <ProjectCard title="Portfolio" />',
      '      <ProjectCard title="E-Commerce" />',
      '    </div>',
      '  </section>',
      '</body>',
      '</html>',
      '',
      '// Live at: ali-hayder.dev ✨'
    ];

    let codeIndex = 0;
    const updateCodeDisplay = (time) => {
      // خلفية الشاشة بتدرج جميل
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      if (theme === 'dark') {
        gradient.addColorStop(0, '#0f0f23');
        gradient.addColorStop(0.5, '#1a1a2e');
        gradient.addColorStop(1, '#16213e');
      } else {
        gradient.addColorStop(0, '#f8f9fb');
        gradient.addColorStop(0.5, '#e8eaed');
        gradient.addColorStop(1, '#dadce0');
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // إطار النافذة مع ظلال
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 8;
      ctx.strokeStyle = theme === 'dark' ? '#4285f4' : '#1a73e8';
      ctx.lineWidth = 3;
      ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);
      ctx.shadowBlur = 0;

      // شريط العنوان مع تدرج
      const headerGradient = ctx.createLinearGradient(0, 5, 0, 35);
      headerGradient.addColorStop(0, theme === 'dark' ? '#4285f4' : '#1a73e8');
      headerGradient.addColorStop(1, theme === 'dark' ? '#3367d6' : '#1557b0');
      ctx.fillStyle = headerGradient;
      ctx.fillRect(5, 5, canvas.width - 10, 30);

      // أزرار النافذة مع تفاصيل
      // زر الإغلاق
      ctx.fillStyle = '#ea4335';
      ctx.fillRect(canvas.width - 70, 12, 16, 16);
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('×', canvas.width - 62, 23);

      // زر التصغير
      ctx.fillStyle = '#fbbc04';
      ctx.fillRect(canvas.width - 50, 12, 16, 16);
      ctx.fillStyle = '#ffffff';
      ctx.fillText('–', canvas.width - 42, 23);

      // زر التكبير
      ctx.fillStyle = '#34a853';
      ctx.fillRect(canvas.width - 30, 12, 16, 16);
      ctx.fillStyle = '#ffffff';
      ctx.fillText('□', canvas.width - 22, 23);

      // عنوان النافذة مع أيقونة
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px "Segoe UI", Arial';
      ctx.textAlign = 'left';
      ctx.fillText('💻 VS Code - portfolio.jsx', 12, 25);

      // شريط علامات التبويب
      ctx.fillStyle = theme === 'dark' ? '#252526' : '#f3f3f3';
      ctx.fillRect(5, 35, canvas.width - 10, 25);
      
      // علامة تبويب نشطة
      ctx.fillStyle = theme === 'dark' ? '#1e1e1e' : '#ffffff';
      ctx.fillRect(8, 37, 120, 21);
      ctx.fillStyle = theme === 'dark' ? '#ffffff' : '#333333';
      ctx.font = '11px "Segoe UI"';
      ctx.fillText('📄 portfolio.jsx', 15, 50);

      // منطقة الكود
      ctx.fillStyle = theme === 'dark' ? '#1e1e1e' : '#ffffff';
      ctx.fillRect(5, 60, canvas.width - 10, canvas.height - 65);

      // الكود مع تلوين متقدم
      ctx.font = '10px "Fira Code", "Courier New", monospace';
      
      const visibleLines = Math.min(16, codeLines.length);
      const startIndex = Math.max(0, codeIndex - visibleLines + 1);
      
      for (let i = 0; i < visibleLines; i++) {
        const lineIndex = startIndex + i;
        if (lineIndex >= codeLines.length) break;
        
        const line = codeLines[lineIndex];
        const y = 80 + i * 15;
        
        // رقم السطر مع خلفية
        ctx.fillStyle = theme === 'dark' ? '#3c3c3c' : '#f0f0f0';
        ctx.fillRect(8, y - 12, 35, 14);
        ctx.fillStyle = theme === 'dark' ? '#858585' : '#666666';
        ctx.textAlign = 'center';
        ctx.fillText((lineIndex + 1).toString(), 25, y - 2);
        
        // الكود مع تلوين متقدم
        ctx.textAlign = 'left';
        let color = theme === 'dark' ? '#d4d4d4' : '#333333';
        
        if (line.includes('import') || line.includes('export') || line.includes('const') || line.includes('useState') || line.includes('useEffect')) {
          color = '#569cd6'; // أزرق للكلمات المفتاحية
        } else if (line.includes('"') || line.includes("'") || line.includes('`')) {
          color = '#ce9178'; // برتقالي للنصوص
        } else if (line.includes('//')) {
          color = '#6a9955'; // أخضر للتعليقات
        } else if (line.includes('<') || line.includes('>') || line.includes('className')) {
          color = '#4ec9b0'; // سماوي للـ JSX
        } else if (line.includes('React') || line.includes('THREE') || line.includes('useState')) {
          color = '#4fc1ff'; // أزرق فاتح للمكتبات
        }
        
        ctx.fillStyle = color;
        ctx.fillText(line, 50, y - 2);
        
        // مؤشر الكتابة المتحرك
        if (lineIndex === codeIndex && Math.floor(time * 2) % 2 === 0) {
          ctx.fillStyle = theme === 'dark' ? '#ffffff' : '#000000';
          ctx.fillRect(50 + ctx.measureText(line).width + 2, y - 10, 2, 12);
        }
      }

      // شريط الحالة السفلي
      ctx.fillStyle = theme === 'dark' ? '#007acc' : '#0078d4';
      ctx.fillRect(5, canvas.height - 20, canvas.width - 10, 15);
      ctx.fillStyle = '#ffffff';
      ctx.font = '9px "Segoe UI"';
      ctx.textAlign = 'left';
      ctx.fillText('⚡ TypeScript React', 10, canvas.height - 10);
      ctx.textAlign = 'right';
      ctx.fillText(`Ln ${codeIndex + 1}, Col 1`, canvas.width - 10, canvas.height - 10);
    };

    const displayTexture = new THREE.CanvasTexture(canvas);
    const displayMaterial = new THREE.MeshBasicMaterial({ 
      map: displayTexture,
      transparent: true,
      opacity: 0 // يبدأ شفاف
    });
    const laptopDisplay = new THREE.Mesh(displayGeometry, displayMaterial);
    laptopDisplay.position.set(0, 1, -0.9);
    laptopDisplay.rotation.x = Math.PI * 0.02;
    laptopGroup.add(laptopDisplay);

    // لوحة المفاتيح المفصلة
    const keyboardGeometry = new THREE.BoxGeometry(2.6, 0.1, 1.5);
    const keyboardMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x34495e,
      shininess: 40
    });
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
    keyboard.position.set(0, 0.3, 0.1);
    keyboard.castShadow = true;
    laptopGroup.add(keyboard);

    // إضافة مفاتيح مفصلة
    const keys = [];
    const keyRows = [
      ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
      ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'],
      ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'"],
      ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/']
    ];

    keyRows.forEach((row, rowIndex) => {
      row.forEach((keyText, colIndex) => {
        const keyGeometry = new THREE.BoxGeometry(0.15, 0.08, 0.15);
        let keyColor = 0xecf0f1;
        
        // مفاتيح خاصة بألوان مختلفة
        if (['Tab', 'Caps', 'Shift'].includes(keyText)) {
          keyColor = 0xbdc3c7;
        } else if (['F', 'J'].includes(keyText)) {
          keyColor = primaryColor; // مفاتيح التوجيه
        } else if (Math.random() > 0.95) {
          keyColor = secondaryColor; // مفاتيح عشوائية ملونة
        }
        
        const keyMaterial = new THREE.MeshPhongMaterial({ 
          color: keyColor,
          shininess: 60
        });
        const key = new THREE.Mesh(keyGeometry, keyMaterial);
        
        const startX = -1.2 + (rowIndex === 1 ? 0.1 : rowIndex === 2 ? 0.15 : rowIndex === 3 ? 0.2 : 0);
        key.position.set(
          startX + colIndex * 0.18,
          0.36,
          -0.4 + rowIndex * 0.18
        );
        key.castShadow = true;
        
        key.userData = {
          originalY: key.position.y,
          pressTime: Math.random() * 100,
          keyText: keyText
        };
        
        laptopGroup.add(key);
        keys.push(key);
      });
    });

    // شريط المسافة
    const spacebarGeometry = new THREE.BoxGeometry(1.2, 0.08, 0.15);
    const spacebarMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xecf0f1,
      shininess: 60
    });
    const spacebar = new THREE.Mesh(spacebarGeometry, spacebarMaterial);
    spacebar.position.set(0, 0.36, 0.3);
    spacebar.castShadow = true;
    spacebar.userData = { originalY: 0.36, pressTime: 0 };
    laptopGroup.add(spacebar);
    keys.push(spacebar);

    // لوحة اللمس (التراك باد)
    const trackpadGeometry = new THREE.BoxGeometry(0.8, 0.02, 0.6);
    const trackpadMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2c3e50,
      shininess: 100
    });
    const trackpad = new THREE.Mesh(trackpadGeometry, trackpadMaterial);
    trackpad.position.set(0, 0.32, 0.5);
    laptopGroup.add(trackpad);

    // زر التشغيل
    const powerButtonGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.02, 16);
    const powerButtonMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x27ae60,
      shininess: 100,
      emissive: 0x0d5d2b,
      emissiveIntensity: 0.2
    });
    const powerButton = new THREE.Mesh(powerButtonGeometry, powerButtonMaterial);
    powerButton.position.set(1.2, 0.37, -0.7);
    laptopGroup.add(powerButton);

    // منافذ الاتصال على الجانب
    // منفذ USB
    for (let i = 0; i < 2; i++) {
      const usbGeometry = new THREE.BoxGeometry(0.05, 0.02, 0.12);
      const usbMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x000000,
        shininess: 50
      });
      const usb = new THREE.Mesh(usbGeometry, usbMaterial);
      usb.position.set(-1.52, 0.2, -0.3 + i * 0.2);
      laptopGroup.add(usb);
    }

    // منفذ الشاحن
    const chargerPortGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.05, 8);
    const chargerPortMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x000000,
      shininess: 50
    });
    const chargerPort = new THREE.Mesh(chargerPortGeometry, chargerPortMaterial);
    chargerPort.rotation.z = Math.PI / 2;
    chargerPort.position.set(-1.52, 0.2, 0.3);
    laptopGroup.add(chargerPort);

    // شعار الشركة على الشاشة
    const logoGeometry = new THREE.RingGeometry(0.05, 0.08, 16);
    const logoMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0.3
    });
    const logo = new THREE.Mesh(logoGeometry, logoMaterial);
    logo.position.set(0, 0.5, -0.94);
    logo.rotation.x = Math.PI * 0.12;
    laptopGroup.add(logo);

    laptopGroup.position.set(1.5, -2, 0.5); // يبدأ من تحت
    laptopGroup.rotation.y = Math.PI * 0.3; // يبدأ مدور قليلاً
    deskGroup.add(laptopGroup);

    // إضافة كوب قهوة صغير
    const cupGeometry = new THREE.CylinderGeometry(0.25, 0.2, 0.5, 12);
    const cupMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x8B4513,
      shininess: 80
    });
    const cup = new THREE.Mesh(cupGeometry, cupMaterial);
    cup.position.set(3.2, 0.4, -0.5);
    cup.castShadow = true;
    deskGroup.add(cup);

    scene.add(deskGroup);

    // رموز البرمجة مصغرة
    const floatingIcons = [];
    const icons = [
      { text: 'JS', color: 0xf7df1e },
      { text: 'React', color: 0x61dafb },
      { text: 'CSS', color: 0x1572b6 },
      { text: 'HTML', color: 0xe34f26 }
    ];

    icons.forEach((icon, index) => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      
      // خلفية دائرية
      ctx.beginPath();
      ctx.arc(32, 32, 28, 0, Math.PI * 2);
      ctx.fillStyle = `#${icon.color.toString(16).padStart(6, '0')}`;
      ctx.fill();
      
      // النص
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(icon.text, 32, 32);
      
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.MeshBasicMaterial({ 
        map: texture, 
        transparent: true
      });
      
      const geometry = new THREE.PlaneGeometry(0.8, 0.8);
      const iconMesh = new THREE.Mesh(geometry, material);
      
      const angle = (index / icons.length) * Math.PI * 2;
      iconMesh.position.set(
        Math.cos(angle) * 4,
        Math.random() * 2 + 2,
        Math.sin(angle) * 4
      );
      
      iconMesh.userData = {
        speed: Math.random() * 0.015 + 0.01,
        radius: 4,
        angle: angle,
        originalY: iconMesh.position.y
      };
      
      scene.add(iconMesh);
      floatingIcons.push(iconMesh);
    });

    // جسيمات مصغرة
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: primaryColor,
      transparent: true,
      opacity: 0.4,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // إضاءة محسنة
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 0.7);
    mainLight.position.set(8, 10, 8);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    scene.add(mainLight);

    const blueLight = new THREE.PointLight(primaryColor, 1, 10);
    blueLight.position.set(-3, 3, 3);
    scene.add(blueLight);

    const greenLight = new THREE.PointLight(secondaryColor, 1, 10);
    greenLight.position.set(3, 3, -3);
    scene.add(greenLight);

    // متغيرات التفاعل
    const mouse = new THREE.Vector2();
    const targetMouse = new THREE.Vector2();
    const isLargeScreen = window.innerWidth >= 1024; // lg breakpoint

    const handleMouseMove = (event) => {
      if (!mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      targetMouse.set(x, y);
      console.log('Mouse move:', x, y); // للتأكد من عمل التتبع
    };

    const handleMouseEnter = () => {
      if (mountRef.current) {
        mountRef.current.style.cursor = 'grab';
      }
    };

    const handleMouseLeave = () => {
      targetMouse.set(0, 0);
      if (mountRef.current) {
        mountRef.current.style.cursor = 'default';
      }
    };

    const handleResize = () => {
      if (mountRef.current) {
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      }
    };

    // إضافة المستمعات بعد إضافة renderer للDOM
    setTimeout(() => {
      if (mountRef.current) {
        const element = mountRef.current;
        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
        element.style.pointerEvents = 'auto';
        console.log('Event listeners added successfully');
      }
    }, 100);
    
    // fallback - إضافة global mouse listener
    window.addEventListener('mousemove', (event) => {
      if (mountRef.current) {
        const rect = mountRef.current.getBoundingClientRect();
        const x = event.clientX;
        const y = event.clientY;
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
          const normalizedX = ((x - rect.left) / rect.width) * 2 - 1;
          const normalizedY = -((y - rect.top) / rect.height) * 2 + 1;
          targetMouse.set(normalizedX, normalizedY);
        }
      }
    });
    
    window.addEventListener('resize', handleResize);

    // حلقة الرسوم المتحركة
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // أنيميشن دخول اللابتوب
      const entryProgress = Math.min(1, time / 2); // يدخل في أول ثانيتين
      const laptopTargetY = -2 + (2 * entryProgress); // يرتفع من -2 إلى 0
      const targetRotationY = Math.PI * 0.3 * (1 - entryProgress); // يقل الدوران تدريجياً
      
      laptopGroup.position.y = THREE.MathUtils.lerp(laptopGroup.position.y, laptopTargetY, 0.02);
      laptopGroup.rotation.y = THREE.MathUtils.lerp(laptopGroup.rotation.y, targetRotationY, 0.02);

      // أنيميشن فتح اللابتوب
      const openProgress = Math.min(1, Math.max(0, (time - 1.5) / 2)); // يبدأ بعد 1.5 ثانية
      const targetRotation = Math.PI * 0.02 + (Math.PI * 0.10) * openProgress; // من مغلق إلى مفتوح
      
      screenOuter.rotation.x = THREE.MathUtils.lerp(screenOuter.rotation.x, targetRotation, 0.02);
      screenFrame.rotation.x = screenOuter.rotation.x;
      webcam.rotation.x = screenOuter.rotation.x;
      led.rotation.x = screenOuter.rotation.x;
      laptopDisplay.rotation.x = screenOuter.rotation.x;

      // أنيميشن ظهور الشاشة
      const screenOpacity = Math.min(1, Math.max(0, openProgress * 2)); // تظهر مع فتح اللابتوب
      displayMaterial.opacity = screenOpacity;

      // أنيميشن LED الكاميرا (يضيء بعد فتح اللابتوب)
      if (openProgress > 0.8) {
        const ledPulse = (Math.sin(time * 3) + 1) / 2;
        ledMaterial.opacity = 0.3 + ledPulse * 0.7;
      } else {
        ledMaterial.opacity = 0;
      }

      // تحديث mouse position مع interpolation
      mouse.lerp(targetMouse, 0.05);

      // تحديث شاشة الكود (يبدأ بعد فتح اللابتوب)
      if (openProgress > 0.5 && Math.floor(time * 1.5) % 60 === 0) {
        codeIndex = (codeIndex + 1) % codeLines.length;
      }
      updateCodeDisplay(time);
      displayTexture.needsUpdate = true;

      // تحريك اللابتوب بلطف
      laptopGroup.rotation.y = Math.sin(time * 0.2) * 0.08;
      laptopGroup.position.y = Math.sin(time * 0.3) * 0.03;

      // تحريك المفاتيح (محاكاة الكتابة)
      keys.forEach((key, index) => {
        key.userData.pressTime += 0.08;
        if (Math.sin(key.userData.pressTime) > 0.95) {
          key.position.y = key.userData.originalY - 0.015;
          // إضافة توهج خفيف للمفتاح المضغوط
          if (key.material.emissive) {
            key.material.emissiveIntensity = 0.3;
          }
        } else {
          key.position.y = key.userData.originalY;
          if (key.material.emissive) {
            key.material.emissiveIntensity = 0;
          }
        }
      });

      // تحريك LED الكاميرا
      led.material.opacity = 0.8 + Math.sin(time * 3) * 0.2;

      // تحريك الرموز العائمة
      floatingIcons.forEach((icon, index) => {
        icon.userData.angle += icon.userData.speed;
        icon.position.x = Math.cos(icon.userData.angle) * icon.userData.radius;
        icon.position.z = Math.sin(icon.userData.angle) * icon.userData.radius;
        icon.position.y = icon.userData.originalY + 
          Math.sin(time * 0.8 + index) * 0.8;
        icon.rotation.y += 0.02;
        
        // تأثير الماوس
        icon.lookAt(camera.position);
      });

      // تحريك الجسيمات
      particlesMesh.rotation.y = time * 0.05;

      // تحريك الأضواء
      blueLight.position.x = Math.sin(time * 0.5) * 6;
      blueLight.position.z = Math.cos(time * 0.5) * 6;
      
      greenLight.position.x = Math.cos(time * 0.7) * 6;
      greenLight.position.z = Math.sin(time * 0.7) * 6;

      // اللابتوب ثابت أثناء الأنيميشن، يتحرك مع الماوس بعد انتهاء الأنيميشن
      if (entryProgress >= 1 && openProgress >= 1) {
        // تحريك الكاميرا مع تفاعل أفضل
        const targetX = mouse.x * 2 + 3;
        const targetY = mouse.y * 2 + 4;
        const targetZ = mouse.x * 1 + 6;
        
        camera.position.x += (targetX - camera.position.x) * 0.1;
        camera.position.y += (targetY - camera.position.y) * 0.1;
        camera.position.z += (targetZ - camera.position.z) * 0.08;
        camera.lookAt(1.5, 0.5, 0.5);

        // تحريك اللابتوب قليلاً مع الماوس
        const mouseRotationY = mouse.x * 0.15;
        const mouseRotationX = mouse.y * 0.08;
        laptopGroup.rotation.y += (mouseRotationY - laptopGroup.rotation.y) * 0.05;
        laptopGroup.rotation.x += (mouseRotationX - laptopGroup.rotation.x) * 0.05;
      } else {
        // الكاميرا ثابتة أثناء الأنيميشن
        camera.lookAt(1.5, 0, 0.5);
      }

      renderer.render(scene, camera);
    };

    animate();

    // تنظيف الموارد
    return () => {
      // تنظيف event listeners
      if (mountRef.current) {
        const element = mountRef.current;
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
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
      className="w-full h-full cursor-pointer"
      style={{ 
        minHeight: '600px',
        pointerEvents: 'auto'
      }}
    />
  );
};

export default CompactDeveloperScene;
