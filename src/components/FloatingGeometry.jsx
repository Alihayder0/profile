"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const FloatingGeometry = ({ theme }) => {
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
    camera.position.set(0, 0, 10);

    // إعداد الرندر
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // إنشاء مواد مختلفة
    const primaryColor = theme === 'dark' ? 0x3B82F6 : 0x1E40AF;
    const secondaryColor = theme === 'dark' ? 0x10B981 : 0x059669;
    const accentColor = theme === 'dark' ? 0xF59E0B : 0xD97706;

    // مجموعة من الكائنات العائمة
    const floatingObjects = [];

    // إنشاء كرات صغيرة عائمة
    for (let i = 0; i < 50; i++) {
      const geometry = new THREE.SphereGeometry(0.1, 8, 6);
      const material = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? primaryColor : secondaryColor,
        transparent: true,
        opacity: 0.6
      });
      const sphere = new THREE.Mesh(geometry, material);
      
      sphere.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      
      sphere.userData = {
        originalY: sphere.position.y,
        speed: Math.random() * 0.02 + 0.01,
        amplitude: Math.random() * 2 + 0.5
      };
      
      scene.add(sphere);
      floatingObjects.push(sphere);
    }

    // إنشاء خطوط متصلة
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0.3
    });

    // إضافة ضوء محيطي
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    // إضافة أضواء ملونة
    const light1 = new THREE.PointLight(primaryColor, 0.5, 20);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(secondaryColor, 0.5, 20);
    light2.position.set(-5, -5, -5);
    scene.add(light2);

    // متغيرات التفاعل
    const mouse = { x: 0, y: 0 };
    let mouseInfluence = 0;

    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      mouseInfluence = 1;
    };

    const handleMouseLeave = () => {
      mouseInfluence = 0;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // حلقة الرسوم المتحركة
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // تحريك الكائنات العائمة
      floatingObjects.forEach((obj, index) => {
        // حركة عائمة
        obj.position.y = obj.userData.originalY + 
          Math.sin(time * obj.userData.speed + index) * obj.userData.amplitude;
        
        // تدوير
        obj.rotation.x = time * 0.5;
        obj.rotation.y = time * 0.3;
        
        // تأثير الماوس
        if (mouseInfluence > 0) {
          const distance = obj.position.distanceTo(
            new THREE.Vector3(mouse.x * 10, mouse.y * 10, 0)
          );
          if (distance < 5) {
            const force = (5 - distance) / 5;
            obj.position.x += (mouse.x * 2 - obj.position.x * 0.1) * force * 0.1;
            obj.position.z += (mouse.y * 2 - obj.position.z * 0.1) * force * 0.1;
          }
        }
      });

      // تحديث الخطوط المتصلة
      const positions = [];
      floatingObjects.forEach((obj1, i) => {
        floatingObjects.forEach((obj2, j) => {
          if (i < j && obj1.position.distanceTo(obj2.position) < 4) {
            positions.push(obj1.position.x, obj1.position.y, obj1.position.z);
            positions.push(obj2.position.x, obj2.position.y, obj2.position.z);
          }
        });
      });

      if (positions.length > 0) {
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        if (!scene.getObjectByName('connectionLines')) {
          const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
          lines.name = 'connectionLines';
          scene.add(lines);
        }
      }

      // تحريك الأضواء
      light1.position.x = Math.sin(time * 0.5) * 10;
      light1.position.z = Math.cos(time * 0.5) * 10;
      
      light2.position.x = Math.cos(time * 0.7) * 8;
      light2.position.z = Math.sin(time * 0.7) * 8;

      // تحريك الكاميرا تدريجياً
      camera.position.x += (mouse.x * 2 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      // تقليل تأثير الماوس تدريجياً
      mouseInfluence *= 0.95;

      renderer.render(scene, camera);
    };

    animate();

    // تنظيف الموارد
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // تنظيف الذاكرة
      floatingObjects.forEach(obj => {
        obj.geometry.dispose();
        obj.material.dispose();
      });
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 z-0 opacity-60" 
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default FloatingGeometry;
