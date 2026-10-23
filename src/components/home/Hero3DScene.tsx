'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useLanguage } from '@/context/LanguageContext';

const HINT_I18N = {
  en: 'Drag or rotate 3D charcoal briquette with mouse / touch',
  id: 'Tarik atau putar briket arang 3D dengan mouse / sentuhan',
  ar: 'اسحب أو أدر مكعب الفحم ثلاثي الأبعاد بالماوس أو اللمس',
  zh: '按住鼠标或触控自由旋转 3D 椰炭块',
};

export default function Hero3DScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const { locale } = useLanguage();
  const titleHint = HINT_I18N[locale] || HINT_I18N.en;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 440;
    const height = container.clientHeight || 440;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    // Adjusted camera and elevated root group so briquette sits cleanly above bottom HUD
    camera.position.set(0, 0.22, 4.3);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL init failed:', e);
      return;
    }

    // Helper RNG
    function rng(a: number) {
      return function () {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }

    function createCanvas(w: number, h: number): HTMLCanvasElement {
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      return c;
    }

    function createTexture(c: HTMLCanvasElement, srgb = true): THREE.CanvasTexture {
      const t = new THREE.CanvasTexture(c);
      if (srgb) {
        t.colorSpace = THREE.SRGBColorSpace;
      }
      t.anisotropy = 4;
      return t;
    }

    // 1. Procedural Bump Map
    const R = rng(42);
    let bumpTex: THREE.CanvasTexture;
    {
      const c = createCanvas(512, 512);
      const ctx = c.getContext('2d')!;
      ctx.fillStyle = '#808080';
      ctx.fillRect(0, 0, 512, 512);

      // Compacted coconut shell micro-pores
      for (let i = 0; i < 3000; i++) {
        const v = (80 + R() * 90) | 0;
        ctx.fillStyle = `rgba(${v}, ${v}, ${v}, 0.4)`;
        ctx.fillRect(R() * 512, R() * 512, 1 + R() * 3, 1 + R() * 3);
      }
      // Hydraulic compression striations
      for (let i = 0; i < 512; i += 5) {
        const d = R() > 0.5 ? 25 : -25;
        ctx.fillStyle = `rgba(${128 + d}, ${128 + d}, ${128 + d}, 0.25)`;
        ctx.fillRect(0, i, 512, 2.5);
      }
      bumpTex = createTexture(c, false);
      bumpTex.wrapS = bumpTex.wrapT = THREE.RepeatWrapping;
    }

    // 2. Procedural Charcoal Albedo Map with Signature Ultra-Fine White Ash Layer (< 2.2% Ash)
    let charTex: THREE.CanvasTexture;
    {
      const c = createCanvas(512, 512);
      const ctx = c.getContext('2d')!;
      // Matte carbon base
      ctx.fillStyle = '#181513';
      ctx.fillRect(0, 0, 512, 512);

      // Hydraulic press lines
      for (let i = 0; i < 512; i += 4) {
        const l = 20 + (R() * 12) | 0;
        ctx.fillStyle = `rgba(${l}, ${l - 2}, ${l - 4}, 0.35)`;
        ctx.fillRect(0, i, 512, 2 + R() * 2);
      }

      // Coconut micro-flakes
      for (let i = 0; i < 2500; i++) {
        const v = (25 + R() * 25) | 0;
        ctx.fillStyle = `rgba(${v}, ${v}, ${v}, ${0.4 + R() * 0.4})`;
        ctx.fillRect(R() * 512, R() * 512, 1 + R() * 2, 1 + R() * 2);
      }

      // Powdery White Ash Layer along edges & corners
      const ashGrad = (x0: number, y0: number, x1: number, y1: number) => {
        const g = ctx.createLinearGradient(x0, y0, x1, y1);
        g.addColorStop(0, 'rgba(242, 240, 235, 0.7)');
        g.addColorStop(0.3, 'rgba(215, 210, 202, 0.4)');
        g.addColorStop(0.7, 'rgba(180, 175, 168, 0.15)');
        g.addColorStop(1, 'rgba(180, 175, 168, 0)');
        return g;
      };

      ctx.fillStyle = ashGrad(0, 0, 0, 70);
      ctx.fillRect(0, 0, 512, 70);
      ctx.fillStyle = ashGrad(0, 512, 0, 442);
      ctx.fillRect(0, 442, 512, 70);
      ctx.fillStyle = ashGrad(0, 0, 70, 0);
      ctx.fillRect(0, 0, 70, 512);
      ctx.fillStyle = ashGrad(512, 0, 442, 0);
      ctx.fillRect(442, 0, 70, 512);

      // Corner white ash accumulation
      const corners = [[0, 0], [512, 0], [0, 512], [512, 512], [140, 160], [370, 340]];
      corners.forEach(([cx, cy]) => {
        const rad = 40 + R() * 60;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, `rgba(245, 243, 238, ${0.65 + R() * 0.2})`);
        g.addColorStop(0.5, 'rgba(215, 212, 205, 0.25)');
        g.addColorStop(1, 'rgba(215, 212, 205, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.fill();
      });

      // Powdery micro-specks
      for (let i = 0; i < 800; i++) {
        const l = (220 + R() * 35) | 0;
        ctx.fillStyle = `rgba(${l}, ${l - 4}, ${l - 8}, ${0.3 + R() * 0.5})`;
        ctx.fillRect(R() * 512, R() * 512, 1 + R() * 2, 1 + R() * 2);
      }

      charTex = createTexture(c, true);
    }

    // 3. Incandescent Thermal Ember Fissure Map
    let fissureTex: THREE.CanvasTexture;
    {
      const c = createCanvas(512, 512);
      const ctx = c.getContext('2d')!;
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, 512, 512);

      // Draw thermal glowing cracks
      const origins = [
        { x: 160, y: 175 },
        { x: 360, y: 320 },
        { x: 250, y: 380 },
        { x: 380, y: 140 },
      ];

      origins.forEach((org) => {
        for (let branch = 0; branch < 4; branch++) {
          let currX = org.x;
          let currY = org.y;
          let angle = R() * Math.PI * 2;

          ctx.beginPath();
          ctx.moveTo(currX, currY);
          for (let step = 0; step < 7; step++) {
            angle += (R() - 0.5) * 0.9;
            const dist = 12 + R() * 20;
            currX += Math.cos(angle) * dist;
            currY += Math.sin(angle) * dist;
            ctx.lineTo(currX, currY);
          }

          // Molten glow gradient line
          ctx.strokeStyle = '#ff3a00';
          ctx.lineWidth = 4 + R() * 3;
          ctx.lineCap = 'round';
          ctx.stroke();

          // White-hot inner core
          ctx.strokeStyle = '#fff1b0';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      // Core ember radiant gradient
      const radG = ctx.createRadialGradient(256, 256, 10, 256, 256, 180);
      radG.addColorStop(0, 'rgba(255, 140, 20, 0.45)');
      radG.addColorStop(0.5, 'rgba(220, 50, 0, 0.25)');
      radG.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radG;
      ctx.fillRect(0, 0, 512, 512);

      fissureTex = createTexture(c, false);
    }

    // Lighting
    const amb = new THREE.AmbientLight(0xfff3e6, 0.9);
    scene.add(amb);

    const dirKey = new THREE.DirectionalLight(0xffeedd, 2.2);
    dirKey.position.set(3, 4, 4);
    scene.add(dirKey);

    const dirRim = new THREE.DirectionalLight(0x88bbff, 1.2);
    dirRim.position.set(-3, -2, -3);
    scene.add(dirRim);

    const emberLight = new THREE.PointLight(0xff5500, 3.8, 8);
    emberLight.position.set(0, 0.24, 0.5);
    scene.add(emberLight);

    // Root Pivot Group (Elevated slightly upward so it sits comfortably above bottom telemetry pill)
    const rootGroup = new THREE.Group();
    rootGroup.position.set(0, 0.24, 0);
    scene.add(rootGroup);

    // Main Briquette Mesh
    const boxGeom = new THREE.BoxGeometry(1.52, 1.52, 1.52, 16, 16, 16);
    const boxMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: charTex,
      bumpMap: bumpTex,
      bumpScale: 0.08,
      roughness: 0.88,
      metalness: 0.08,
      emissiveMap: fissureTex,
      emissive: new THREE.Color(0xff4400),
      emissiveIntensity: 1.4,
    });
    const briquetteMesh = new THREE.Mesh(boxGeom, boxMat);
    rootGroup.add(briquetteMesh);

    // Secondary Beveled Inner Glow
    const wireGeom = new THREE.BoxGeometry(1.54, 1.54, 1.54);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xff7722,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const wireMesh = new THREE.Mesh(wireGeom, wireMat);
    rootGroup.add(wireMesh);

    // Floating Ember Dust Particles
    const pCount = 70;
    const pPos = new Float32Array(pCount * 3);
    const pSpeed = new Float32Array(pCount);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 3.4;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 3.4;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 3.4;
      pSpeed[i] = 0.005 + Math.random() * 0.012;
    }
    const pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xffaa44,
      size: 0.05,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeom, pMat);
    scene.add(particles);

    // Interactive Drag to Rotate logic
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotY = 0.4;
    let targetRotX = 0.3;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      targetRotY += dx * 0.008;
      targetRotX += dy * 0.008;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches[0]) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || !e.touches[0]) return;
      const dx = e.touches[0].clientX - prevMouseX;
      const dy = e.touches[0].clientY - prevMouseY;
      targetRotY += dx * 0.008;
      targetRotX += dy * 0.008;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onMouseUp);

    // Animation Render Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!isDragging) {
        targetRotY += 0.005;
      }

      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.08;
      rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.08;

      // Ember point light breathing pulsation
      emberLight.intensity = 3.2 + Math.sin(elapsed * 3.5) * 0.9;
      boxMat.emissiveIntensity = 1.2 + Math.sin(elapsed * 2.8) * 0.35;

      // Particles float upward
      const posArr = pGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < pCount; i++) {
        posArr[i * 3 + 1] += pSpeed[i];
        if (posArr[i * 3 + 1] > 2.0) {
          posArr[i * 3 + 1] = -1.8;
          posArr[i * 3] = (Math.random() - 0.5) * 3.4;
          posArr[i * 3 + 2] = (Math.random() - 0.5) * 3.4;
        }
      }
      pGeom.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);

      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      boxGeom.dispose();
      boxMat.dispose();
      wireGeom.dispose();
      wireMat.dispose();
      pGeom.dispose();
      pMat.dispose();
      bumpTex.dispose();
      charTex.dispose();
      fissureTex.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[400px] cursor-grab active:cursor-grabbing"
      title={titleHint}
    />
  );
}
