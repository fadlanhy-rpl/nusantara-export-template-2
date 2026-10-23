'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3DScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(2.8, 2.2, 3.8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x2a1a14, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffeedd, 1.5);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    const emberPointLight = new THREE.PointLight(0xff5511, 4.0, 10);
    emberPointLight.position.set(0, 0, 0);
    scene.add(emberPointLight);

    // Charcoal Cube Group
    const cubeGroup = new THREE.Group();
    scene.add(cubeGroup);

    // Main Charcoal Cube
    const geom = new THREE.BoxGeometry(1.8, 1.8, 1.8, 8, 8, 8);
    const customMaterial = new THREE.MeshStandardMaterial({
      color: 0x181412,
      roughness: 0.85,
      metalness: 0.1,
      emissive: 0xc4440f,
      emissiveIntensity: 0.45,
    });
    const charcoalMesh = new THREE.Mesh(geom, customMaterial);
    cubeGroup.add(charcoalMesh);

    // Inner Glowing Core Wireframe
    const innerGeom = new THREE.BoxGeometry(1.68, 1.68, 1.68);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xff7722,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const innerMesh = new THREE.Mesh(innerGeom, innerMat);
    cubeGroup.add(innerMesh);

    // Floating Ember Points
    const emberCount = 80;
    const emberPositions = new Float32Array(emberCount * 3);
    for (let i = 0; i < emberCount; i++) {
      emberPositions[i * 3] = (Math.random() - 0.5) * 3.2;
      emberPositions[i * 3 + 1] = (Math.random() - 0.5) * 3.2;
      emberPositions[i * 3 + 2] = (Math.random() - 0.5) * 3.2;
    }
    const emberGeom = new THREE.BufferGeometry();
    emberGeom.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));
    const emberMat = new THREE.PointsMaterial({
      color: 0xff9944,
      size: 0.05,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const emberPoints = new THREE.Points(emberGeom, emberMat);
    scene.add(emberPoints);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      cubeGroup.rotation.y = elapsed * 0.35;
      cubeGroup.rotation.x = Math.sin(elapsed * 0.25) * 0.2;

      emberPoints.rotation.y = -elapsed * 0.15;
      emberPointLight.intensity = 3.5 + Math.sin(elapsed * 4.0) * 0.8;

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
      cancelAnimationFrame(animId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geom.dispose();
      customMaterial.dispose();
      innerGeom.dispose();
      innerMat.dispose();
      emberGeom.dispose();
      emberMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full min-h-[380px] cursor-grab active:cursor-grabbing" />;
}
