"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeScene = ({ theme }) => {
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
    camera.position.z = 5;

    // إعداد الرندر
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // إنشاء الجسيمات الثلاثية الأبعاد
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 25;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // مادة الجسيمات مع تغيير اللون حسب السمة
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.008,
      color: theme === 'dark' ? '#3B82F6' : '#1E40AF',
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // إنشاء مجموعة من الأشكال الهندسية
    const geometries = [];
    
    // عقدة ثلاثية الأبعاد
    const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const torusKnotMaterial = new THREE.MeshPhongMaterial({
      color: theme === 'dark' ? '#3B82F6' : '#1E40AF',
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
    torusKnot.position.set(-3, 0, 0);
    scene.add(torusKnot);
    geometries.push(torusKnot);

    // كرة مثلثية
    const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 1);
    const icosahedronMaterial = new THREE.MeshPhongMaterial({
      color: theme === 'dark' ? '#10B981' : '#059669',
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
    icosahedron.position.set(3, 2, -2);
    scene.add(icosahedron);
    geometries.push(icosahedron);

    // مكعب دوار
    const boxGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const boxMaterial = new THREE.MeshPhongMaterial({
      color: theme === 'dark' ? '#F59E0B' : '#D97706',
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.set(0, -3, 1);
    scene.add(box);
    geometries.push(box);

    // إضافة إضاءة متقدمة
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(theme === 'dark' ? 0x3B82F6 : 0x1E40AF, 1, 10);
    pointLight1.position.set(-5, 0, 2);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(theme === 'dark' ? 0x10B981 : 0x059669, 1, 10);
    pointLight2.position.set(5, 0, -2);
    scene.add(pointLight2);

    // متغيرات للتفاعل مع الماوس
    const mouse = { x: 0, y: 0 };

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

      // تدوير الجسيمات
      particlesMesh.rotation.x = time * 0.1;
      particlesMesh.rotation.y = time * 0.15;

      // تحريك وتدوير الأشكال الهندسية
      geometries.forEach((geometry, index) => {
        geometry.rotation.x = time * (0.5 + index * 0.1);
        geometry.rotation.y = time * (0.3 + index * 0.1);
        geometry.rotation.z = time * (0.2 + index * 0.05);
        
        // حركة عائمة
        geometry.position.y += Math.sin(time + index) * 0.01;
        geometry.position.x += Math.cos(time * 0.5 + index) * 0.005;
      });

      // تحريك الأضواء
      pointLight1.position.x = Math.sin(time) * 5;
      pointLight1.position.z = Math.cos(time) * 5;
      
      pointLight2.position.x = Math.cos(time * 0.7) * 5;
      pointLight2.position.z = Math.sin(time * 0.7) * 5;

      // تحريك الكاميرا بناءً على موضع الماوس
      camera.position.x += (mouse.x * 3 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 3 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // تحديث لون الجسيمات بناءً على الوقت
      const hue = (time * 0.1) % 1;
      particlesMaterial.color.setHSL(hue, 0.6, theme === 'dark' ? 0.7 : 0.5);

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
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      torusKnotGeometry.dispose();
      torusKnotMaterial.dispose();
      icosahedronGeometry.dispose();
      icosahedronMaterial.dispose();
      boxGeometry.dispose();
      boxMaterial.dispose();
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

export default ThreeScene;
