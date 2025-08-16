"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const DeveloperScene = ({ theme }) => {
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
    camera.position.set(5, 5, 8);

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
    const darkGray = 0x2d3748;
    const lightGray = 0x718096;

    // إنشاء اللابتوب
    const laptopGroup = new THREE.Group();

    // قاعدة اللابتوب
    const baseGeometry = new THREE.BoxGeometry(4, 0.3, 3);
    const baseMaterial = new THREE.MeshPhongMaterial({ 
      color: darkGray,
      shininess: 30
    });
    const laptopBase = new THREE.Mesh(baseGeometry, baseMaterial);
    laptopBase.position.y = -0.15;
    laptopBase.castShadow = true;
    laptopGroup.add(laptopBase);

    // شاشة اللابتوب
    const screenGeometry = new THREE.BoxGeometry(3.8, 2.5, 0.2);
    const screenMaterial = new THREE.MeshPhongMaterial({ 
      color: darkGray,
      shininess: 50
    });
    const laptopScreen = new THREE.Mesh(screenGeometry, screenMaterial);
    laptopScreen.position.set(0, 1.25, -1.4);
    laptopScreen.rotation.x = Math.PI * 0.1;
    laptopScreen.castShadow = true;
    laptopGroup.add(laptopScreen);

    // شاشة العرض (الكود)
    const displayGeometry = new THREE.PlaneGeometry(3.5, 2.2);
    
    // إنشاء texture للكود
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 320;
    const ctx = canvas.getContext('2d');
    
    const updateCodeDisplay = (time) => {
      ctx.fillStyle = theme === 'dark' ? '#1a1a1a' : '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = '14px "Courier New", monospace';
      
      const codeLines = [
        'const developer = {',
        '  name: "Ali Hayder",',
        '  skills: ["React", "Next.js", "Three.js"],',
        '  passion: "Building amazing apps",',
        '  status: "Coding..." + "⚡".repeat(' + Math.floor(time % 3 + 1) + '),',
        '};',
        '',
        'function createAwesome() {',
        '  return developer.skills.map(skill => {',
        '    return `${skill} + creativity`;',
        '  });',
        '}',
        '',
        '// ' + '█'.repeat(Math.floor(time % 20 + 1))
      ];

      codeLines.forEach((line, index) => {
        let color = theme === 'dark' ? '#ffffff' : '#000000';
        
        if (line.includes('const') || line.includes('function') || line.includes('return')) {
          color = '#3B82F6'; // أزرق للكلمات المفتاحية
        } else if (line.includes('"') || line.includes("'")) {
          color = '#10B981'; // أخضر للنصوص
        } else if (line.includes('//')) {
          color = '#6B7280'; // رمادي للتعليقات
        }
        
        ctx.fillStyle = color;
        ctx.fillText(line, 20, 30 + index * 20);
      });
    };

    const displayTexture = new THREE.CanvasTexture(canvas);
    const displayMaterial = new THREE.MeshBasicMaterial({ 
      map: displayTexture,
      transparent: true,
      opacity: 0.9
    });
    const laptopDisplay = new THREE.Mesh(displayGeometry, displayMaterial);
    laptopDisplay.position.set(0, 1.25, -1.25);
    laptopDisplay.rotation.x = Math.PI * 0.1;
    laptopGroup.add(laptopDisplay);

    // لوحة المفاتيح
    const keyboardGeometry = new THREE.BoxGeometry(3.2, 0.1, 2);
    const keyboardMaterial = new THREE.MeshPhongMaterial({ color: lightGray });
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
    keyboard.position.set(0, 0.05, 0.3);
    laptopGroup.add(keyboard);

    // مفاتيح صغيرة
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 12; col++) {
        const keyGeometry = new THREE.BoxGeometry(0.2, 0.1, 0.2);
        const keyMaterial = new THREE.MeshPhongMaterial({ 
          color: Math.random() > 0.9 ? primaryColor : 0xffffff 
        });
        const key = new THREE.Mesh(keyGeometry, keyMaterial);
        key.position.set(
          -1.4 + col * 0.25,
          0.15,
          -0.2 + row * 0.25
        );
        laptopGroup.add(key);
      }
    }

    scene.add(laptopGroup);

    // إنشاء رموز البرمجة العائمة
    const codeSymbols = [];
    const symbolTexts = ['<>', '{}', '[]', '()', '=>', '==', '!=', '&&', '||', 'fn', 'var', 'let', 'if', 'for'];
    
    symbolTexts.forEach((text, index) => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      
      ctx.fillStyle = theme === 'dark' ? 'rgba(59, 130, 246, 0.8)' : 'rgba(30, 64, 175, 0.8)';
      ctx.fillRect(0, 0, 128, 128);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 64, 64);
      
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.MeshBasicMaterial({ 
        map: texture, 
        transparent: true,
        alphaTest: 0.1
      });
      
      const geometry = new THREE.PlaneGeometry(1, 1);
      const symbol = new THREE.Mesh(geometry, material);
      
      symbol.position.set(
        (Math.random() - 0.5) * 15,
        Math.random() * 8 + 2,
        (Math.random() - 0.5) * 15
      );
      
      symbol.userData = {
        speed: Math.random() * 0.02 + 0.01,
        rotationSpeed: Math.random() * 0.05 + 0.01,
        floatAmplitude: Math.random() * 2 + 1,
        originalY: symbol.position.y
      };
      
      scene.add(symbol);
      codeSymbols.push(symbol);
    });

    // إنشاء جسيمات متحركة تمثل البيانات
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 30;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: primaryColor,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // إضافة إضاءة
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(primaryColor, 1, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(secondaryColor, 1, 20);
    pointLight2.position.set(-5, 5, -5);
    scene.add(pointLight2);

    // إضافة أرضية
    const floorGeometry = new THREE.PlaneGeometry(30, 30);
    const floorMaterial = new THREE.MeshLambertMaterial({ 
      color: theme === 'dark' ? 0x1a1a1a : 0xf0f0f0,
      transparent: true,
      opacity: 0.3
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2;
    floor.receiveShadow = true;
    scene.add(floor);

    // متغيرات التفاعل
    const mouse = new THREE.Vector2();

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
      updateCodeDisplay(time);
      displayTexture.needsUpdate = true;

      // تحريك اللابتوب
      laptopGroup.rotation.y = Math.sin(time * 0.3) * 0.2;
      laptopGroup.position.y = Math.sin(time * 0.5) * 0.3;

      // تحريك رموز البرمجة
      codeSymbols.forEach((symbol, index) => {
        symbol.position.y = symbol.userData.originalY + 
          Math.sin(time * symbol.userData.speed + index) * symbol.userData.floatAmplitude;
        symbol.rotation.y += symbol.userData.rotationSpeed;
        symbol.rotation.z = Math.sin(time + index) * 0.3;
        
        // تأثير الماوس
        const distance = symbol.position.distanceTo(
          new THREE.Vector3(mouse.x * 10, mouse.y * 5, 0)
        );
        if (distance < 5) {
          symbol.scale.setScalar(1 + (5 - distance) * 0.1);
        } else {
          symbol.scale.setScalar(1);
        }
      });

      // تدوير الجسيمات
      particlesMesh.rotation.y = time * 0.1;
      particlesMesh.rotation.x = time * 0.05;

      // تحريك الأضواء
      pointLight1.position.x = Math.sin(time) * 8;
      pointLight1.position.z = Math.cos(time) * 8;
      
      pointLight2.position.x = Math.cos(time * 0.7) * 8;
      pointLight2.position.z = Math.sin(time * 0.7) * 8;

      // تحريك الكاميرا بناءً على الماوس
      camera.position.x += (mouse.x * 3 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 2 + 5 - camera.position.y) * 0.02;
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

export default DeveloperScene;
