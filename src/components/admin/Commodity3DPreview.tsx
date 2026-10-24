'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RotateCw, Sparkles, AlertCircle, RefreshCw, MousePointer } from 'lucide-react';

export interface Commodity3DPreviewProps {
  shapePreset: 'cube' | 'hexagonal' | 'cylinder' | 'pillow' | 'custom';
  fileUrl?: string;
  surfaceFinish: 'matte_charcoal' | 'porous_texture' | 'white_ash' | 'polished_agro';
  autoRotate: boolean;
  rotationSpeed?: number; // 0.2 to 3.0
  lightingIntensity?: number; // 0.5 to 2.5
  cameraDistance?: number; // 2.0 to 6.0
  height?: number; // in pixels, default 260
}

export default function Commodity3DPreview({
  shapePreset,
  fileUrl,
  surfaceFinish,
  autoRotate,
  rotationSpeed = 1.0,
  lightingIntensity = 1.0,
  cameraDistance = 3.8,
  height = 260,
}: Commodity3DPreviewProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // References for live updates without full scene recreation
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const lightsRef = useRef<{
    ambient: THREE.AmbientLight;
    dir1: THREE.DirectionalLight;
    dir2: THREE.DirectionalLight;
  } | null>(null);

  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  const targetRot = useRef({ x: 0.35, y: 0.65 });
  const currentRot = useRef({ x: 0.35, y: 0.65 });
  const animFrameId = useRef<number | null>(null);

  // Surface Finish Material Config
  const createMaterial = () => {
    switch (surfaceFinish) {
      case 'matte_charcoal':
        return new THREE.MeshStandardMaterial({
          color: 0x1f1d1b,
          roughness: 0.92,
          metalness: 0.05,
        });
      case 'porous_texture':
        return new THREE.MeshStandardMaterial({
          color: 0x2a2522,
          roughness: 0.88,
          metalness: 0.12,
        });
      case 'white_ash':
        return new THREE.MeshStandardMaterial({
          color: 0x8a8580,
          roughness: 0.96,
          metalness: 0.02,
        });
      case 'polished_agro':
        return new THREE.MeshStandardMaterial({
          color: 0x4a2e1b,
          roughness: 0.45,
          metalness: 0.25,
        });
      default:
        return new THREE.MeshStandardMaterial({
          color: 0x222222,
          roughness: 0.85,
        });
    }
  };

  // Build Procedural Mesh
  const buildProceduralMesh = () => {
    const material = createMaterial();
    let geometry: THREE.BufferGeometry;

    switch (shapePreset) {
      case 'hexagonal':
        // 6-sided cylinder for hexagonal charcoal briquette
        geometry = new THREE.CylinderGeometry(1.0, 1.0, 2.4, 6);
        break;
      case 'cylinder':
        // Stick / finger briquette
        geometry = new THREE.CylinderGeometry(0.65, 0.65, 2.8, 32);
        break;
      case 'pillow':
        // Pillow shape: squashed cylinder or rounded box
        geometry = new THREE.SphereGeometry(1.2, 32, 24);
        geometry.scale(1.2, 0.65, 0.95);
        break;
      case 'cube':
      default:
        // 25mm Shisha briquette cube
        geometry = new THREE.BoxGeometry(1.8, 1.8, 1.8);
        break;
    }

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    // Add subtle wireframe contour for high-tech CAD aesthetic
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xe8742a,
      transparent: true,
      opacity: 0.35,
    });
    const line = new THREE.LineSegments(edges, lineMaterial);
    mesh.add(line);

    return mesh;
  };

  // Mount Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    setLoadError(null);

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const aspect = container.clientWidth / height;
    const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 100);
    camera.position.set(0, 0, cameraDistance);
    cameraRef.current = camera;

    // 3. Renderer with antialiasing & transparent background
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.replaceChildren(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6 * lightingIntensity);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffecd6, 1.4 * lightingIntensity);
    dirLight1.position.set(4, 5, 4);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x406080, 0.8 * lightingIntensity);
    dirLight2.position.set(-4, -2, -3);
    scene.add(dirLight2);

    // Warm rim light for industrial kiln warmth
    const rimLight = new THREE.DirectionalLight(0xe8742a, 0.9 * lightingIntensity);
    rimLight.position.set(0, -4, 3);
    scene.add(rimLight);

    lightsRef.current = { ambient: ambientLight, dir1: dirLight1, dir2: dirLight2 };

    // 5. Mesh Group
    const meshGroup = new THREE.Group();
    scene.add(meshGroup);
    meshGroupRef.current = meshGroup;

    // Load custom model or procedural shape
    if (shapePreset === 'custom' && fileUrl) {
      setIsLoading(true);
      const loader = new GLTFLoader();
      loader.load(
        fileUrl,
        (gltf) => {
          setIsLoading(false);
          const root = gltf.scene;
          // Auto center and normalize scale
          const box = new THREE.Box3().setFromObject(root);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxAxis = Math.max(size.x, size.y, size.z);
          const scale = maxAxis > 0 ? 2.2 / maxAxis : 1;

          root.position.sub(center.multiplyScalar(scale));
          root.scale.setScalar(scale);

          meshGroup.clear();
          meshGroup.add(root);
        },
        undefined,
        (err) => {
          console.warn('Failed to load custom 3D model, falling back to procedural preset:', err);
          setIsLoading(false);
          setLoadError('Gagal memuat file 3D kustom, menampilkan preset geometri standar.');
          meshGroup.clear();
          meshGroup.add(buildProceduralMesh());
        }
      );
    } else {
      meshGroup.clear();
      meshGroup.add(buildProceduralMesh());
    }

    // 6. Interaction Handlers
    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      prevMouse.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - prevMouse.current.x;
      const dy = e.clientY - prevMouse.current.y;
      targetRot.current.y += dx * 0.008;
      targetRot.current.x += dy * 0.008;
      prevMouse.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    // Touch support for mobile devices
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        prevMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevMouse.current.x;
      const dy = e.touches[0].clientY - prevMouse.current.y;
      targetRot.current.y += dx * 0.008;
      targetRot.current.x += dy * 0.008;
      prevMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging.current = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    domElem.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 7. Animation Loop
    let lastTime = performance.now();
    const animate = () => {
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (autoRotate && !isDragging.current) {
        targetRot.current.y += 0.45 * rotationSpeed * dt;
      }

      // Smooth damping interpolation (Lerp)
      currentRot.current.x += (targetRot.current.x - currentRot.current.x) * 0.1;
      currentRot.current.y += (targetRot.current.y - currentRot.current.y) * 0.1;

      if (meshGroupRef.current) {
        meshGroupRef.current.rotation.x = currentRot.current.x;
        meshGroupRef.current.rotation.y = currentRot.current.y;
      }

      renderer.render(scene, camera);
      animFrameId.current = requestAnimationFrame(animate);
    };

    animFrameId.current = requestAnimationFrame(animate);

    // 8. Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newW = container.clientWidth;
      cameraRef.current.aspect = newW / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, height);
    });
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      resizeObserver.disconnect();

      domElem.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      domElem.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      renderer.dispose();
      container.replaceChildren();
    };
  }, [shapePreset, fileUrl, surfaceFinish, height]);

  // Handle Dynamic Slider Updates (Lights & Camera Distance) without rebuilding scene
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 0, cameraDistance);
    }
  }, [cameraDistance]);

  useEffect(() => {
    if (lightsRef.current) {
      lightsRef.current.ambient.intensity = 0.6 * lightingIntensity;
      lightsRef.current.dir1.intensity = 1.4 * lightingIntensity;
      lightsRef.current.dir2.intensity = 0.8 * lightingIntensity;
    }
  }, [lightingIntensity]);

  return (
    <div className="w-full relative rounded-xl bg-[#0E0B09] border border-outline-variant/30 overflow-hidden flex flex-col items-center justify-center">
      {/* 3D Viewport Badge */}
      <div className="absolute top-2.5 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 font-mono text-[10px] text-primary">
        <Sparkles className="w-3 h-3 animate-spin text-primary" />
        <span>3D VIEWPORT • {shapePreset.toUpperCase()}</span>
      </div>

      {/* Rotation Status Badge */}
      <div className="absolute top-2.5 right-3 z-10 flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 font-mono text-[9px] text-outline">
        <RotateCw className={`w-3 h-3 ${autoRotate ? 'text-tertiary animate-spin' : ''}`} />
        <span>{autoRotate ? `${rotationSpeed}x AUTO-SPIN` : 'INTERACTIVE DRAG'}</span>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 z-20 bg-black/70 flex flex-col items-center justify-center gap-2">
          <RefreshCw className="w-6 h-6 text-primary animate-spin" />
          <span className="font-mono text-xs text-on-surface">Memuat 3D Model Asset...</span>
        </div>
      )}

      {/* Error notification if any */}
      {loadError && (
        <div className="absolute bottom-2 left-3 right-3 z-10 p-2 rounded-lg bg-error-container/80 text-on-error-container font-mono text-[10px] flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{loadError}</span>
        </div>
      )}

      {/* Mount canvas container */}
      <div
        ref={mountRef}
        style={{ height: `${height}px` }}
        className="w-full cursor-grab active:cursor-grabbing flex items-center justify-center select-none"
        title="Tarik atau geser untuk memutar 3D model secara interaktif"
      />

      {/* Drag Hint Footer */}
      <div className="w-full py-1.5 bg-surface-container-lowest/80 border-t border-outline-variant/20 flex items-center justify-center gap-1.5 font-mono text-[10px] text-outline/80">
        <MousePointer className="w-3 h-3 text-outline" />
        <span>Klik & geser mouse atau sentuh layar untuk rotasi 360°</span>
      </div>
    </div>
  );
}
