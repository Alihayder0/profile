"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const WaveShaderScene = ({ theme }) => {
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
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // شادر مخصص للأمواج
    const vertexShader = `
      uniform float time;
      uniform vec2 mouse;
      varying vec2 vUv;
      varying vec3 vPosition;

      void main() {
        vUv = uv;
        vPosition = position;
        
        vec3 pos = position;
        
        // تأثير الأمواج
        float wave1 = sin(pos.x * 4.0 + time * 2.0) * 0.1;
        float wave2 = sin(pos.y * 6.0 + time * 1.5) * 0.05;
        float wave3 = sin((pos.x + pos.y) * 3.0 + time * 3.0) * 0.08;
        
        pos.z += wave1 + wave2 + wave3;
        
        // تأثير الماوس
        float mouseInfluence = distance(pos.xy, mouse) * 2.0;
        pos.z += sin(mouseInfluence * 10.0 - time * 5.0) * 0.1 * (1.0 - mouseInfluence);
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;
      uniform vec2 mouse;
      varying vec2 vUv;
      varying vec3 vPosition;

      void main() {
        vec2 uv = vUv;
        
        // إنشاء تدرجات لونية متحركة
        float noise1 = sin(uv.x * 10.0 + time) * 0.5 + 0.5;
        float noise2 = sin(uv.y * 8.0 + time * 1.2) * 0.5 + 0.5;
        float noise3 = sin((uv.x + uv.y) * 6.0 + time * 0.8) * 0.5 + 0.5;
        
        // مزج الألوان
        vec3 color = mix(color1, color2, noise1);
        color = mix(color, color3, noise2);
        
        // تأثير الماوس
        float mouseDistance = distance(uv, mouse);
        float mouseEffect = 1.0 - smoothstep(0.0, 0.5, mouseDistance);
        color += mouseEffect * 0.3;
        
        // تأثير الشفافية
        float alpha = 0.3 + noise3 * 0.4;
        
        gl_FragColor = vec4(color, alpha);
      }
    `;

    // إنشاء مادة الشادر
    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        mouse: { value: new THREE.Vector2(0, 0) },
        color1: { value: new THREE.Color(theme === 'dark' ? '#3B82F6' : '#1E40AF') },
        color2: { value: new THREE.Color(theme === 'dark' ? '#10B981' : '#059669') },
        color3: { value: new THREE.Color(theme === 'dark' ? '#F59E0B' : '#D97706') },
      },
      transparent: true,
      side: THREE.DoubleSide,
    });

    // إنشاء سطح مموج
    const planeGeometry = new THREE.PlaneGeometry(20, 20, 64, 64);
    const plane = new THREE.Mesh(planeGeometry, shaderMaterial);
    plane.rotation.x = -Math.PI / 6;
    scene.add(plane);

    // إنشاء كرات متحركة مع شادرز
    const spheres = [];
    for (let i = 0; i < 5; i++) {
      const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
      const sphereMaterial = new THREE.ShaderMaterial({
        vertexShader: `
          uniform float time;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 pos = position;
            pos += sin(pos * 8.0 + time * 2.0) * 0.05;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 color;
          varying vec2 vUv;
          void main() {
            vec2 center = vec2(0.5, 0.5);
            float dist = distance(vUv, center);
            float pulse = sin(time * 3.0) * 0.5 + 0.5;
            float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
            gl_FragColor = vec4(color, alpha * (0.5 + pulse * 0.5));
          }
        `,
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color() },
        },
        transparent: true,
      });

      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        Math.random() * 5
      );
      
      sphere.userData = {
        speed: Math.random() * 0.02 + 0.01,
        radius: Math.random() * 5 + 2,
        angle: Math.random() * Math.PI * 2,
      };

      spheres.push(sphere);
      scene.add(sphere);
    }

    // إضافة إضاءة
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 50);
    pointLight.position.set(0, 5, 5);
    scene.add(pointLight);

    // متغيرات التفاعل
    const mouse = new THREE.Vector2();

    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      shaderMaterial.uniforms.mouse.value.set(
        event.clientX / window.innerWidth,
        1.0 - event.clientY / window.innerHeight
      );
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

      // تحديث زمن الشادر
      shaderMaterial.uniforms.time.value = time;

      // تحريك الكرات
      spheres.forEach((sphere, index) => {
        sphere.userData.angle += sphere.userData.speed;
        sphere.position.x = Math.cos(sphere.userData.angle) * sphere.userData.radius;
        sphere.position.z = Math.sin(sphere.userData.angle) * sphere.userData.radius;
        sphere.position.y = Math.sin(time + index) * 2;

        // تحديث شادر الكرة
        sphere.material.uniforms.time.value = time;
        const hue = (time * 0.1 + index * 0.2) % 1;
        sphere.material.uniforms.color.value.setHSL(hue, 0.7, 0.6);
      });

      // تحريك الكاميرا
      camera.position.x += (mouse.x * 2 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

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
      planeGeometry.dispose();
      shaderMaterial.dispose();
      spheres.forEach(sphere => {
        sphere.geometry.dispose();
        sphere.material.dispose();
      });
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 z-0 opacity-70" 
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default WaveShaderScene;
