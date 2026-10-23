'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, RotateCcw, Maximize2, Play, Pause, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const VIEWER_I18N = {
  en: {
    rotateHint: '360° INTERACTIVE ROTATION (DRAG / TOUCH)',
    canvasTitle: 'Drag or rotate 3D box with mouse or touch',
    autoSpin: 'Auto Spin',
    paused: 'Paused',
    autoSpinTitle: 'Toggle 3D auto rotation',
    resetTitle: 'Reset to front view',
    viewSideLabel: 'VIEW FACE:',
    faceFront: 'Front (Brand)',
    faceBarcode: 'Right (Barcode & Specs)',
    faceArabic: 'Left (Arabic GSO 2530)',
    faceBack: 'Back (Lab COA)',
    faceTop: 'Top (Lid)',
  },
  id: {
    rotateHint: 'PUTAR 360° (MOUSE / SENTUHAN)',
    canvasTitle: 'Tarik atau putar kotak 3D dengan mouse/sentuhan',
    autoSpin: 'Putar Otomatis',
    paused: 'Dijeda',
    autoSpinTitle: 'Alihkan putaran otomatis 3D',
    resetTitle: 'Reset ke tampilan depan',
    viewSideLabel: 'LIHAT SISI:',
    faceFront: 'Depan (Brand)',
    faceBarcode: 'Samping (Barcode)',
    faceArabic: 'Samping (Arab GSO)',
    faceBack: 'Belakang (Lab COA)',
    faceTop: 'Atas (Lid)',
  },
  ar: {
    rotateHint: 'تدوير تفاعلي 360° (سحب / لمس)',
    canvasTitle: 'اسحب أو أدر الصندوق ثلاثي الأبعاد بالماوس أو اللمس',
    autoSpin: 'دوران تلقائي',
    paused: 'إيقاف مؤقت',
    autoSpinTitle: 'تشغيل/إيقاف الدوران التلقائي 3D',
    resetTitle: 'إعادة التعيين إلى الواجهة الأمامية',
    viewSideLabel: 'معاينة الوجه:',
    faceFront: 'الأمام (العلامة التجارية)',
    faceBarcode: 'الجانب (الباركود والمواصفات)',
    faceArabic: 'الجانب (اللوائح الخليجية GSO)',
    faceBack: 'الخلف (شهادة المختبر COA)',
    faceTop: 'الأعلى (الغطاء)',
  },
  zh: {
    rotateHint: '360° 交互式自由旋转 (鼠标拖拽 / 触控)',
    canvasTitle: '按住鼠标或触控自由旋转 3D 包装盒',
    autoSpin: '自动旋转',
    paused: '已暂停',
    autoSpinTitle: '开启/暂停 3D 自动旋转',
    resetTitle: '复位至正面主视图',
    viewSideLabel: '切换视角:',
    faceFront: '正面 (品牌主标)',
    faceBarcode: '右侧 (条码与规格)',
    faceArabic: '左侧 (海湾 GCC 法规)',
    faceBack: '背面 (SGS 实验室指标)',
    faceTop: '顶盖 (开启封签)',
  },
};

export interface OemBox3DViewerProps {
  material: 'kraft' | 'matte_black' | 'white_duplex';
  packFormat: '1kg' | '2kg' | '10kg_bulk' | '20kg_bulk';
  brandName: string;
  tagline: string;
  goldFoil: boolean;
  matteUv: boolean;
  spotUv: boolean;
  arabicTextEnabled: boolean;
  barcodeEnabled: boolean;
  certLogosEnabled: boolean;
}

export default function OemBox3DViewer({
  material,
  packFormat,
  brandName,
  tagline,
  goldFoil,
  matteUv,
  spotUv,
  arabicTextEnabled,
  barcodeEnabled,
  certLogosEnabled,
}: OemBox3DViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const { locale } = useLanguage();
  const t = VIEWER_I18N[locale] || VIEWER_I18N.en;
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeFace, setActiveFace] = useState<string>('front');

  // Animation & Three.js references
  const animRef = useRef<number | null>(null);
  const targetRot = useRef({ x: 0.25, y: 0.45 });
  const currentRot = useRef({ x: 0.25, y: 0.45 });
  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  const boxMeshRef = useRef<THREE.Mesh | null>(null);
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  // Color schemes
  const getColors = () => {
    switch (material) {
      case 'kraft':
        return {
          bg: '#8B5A2B',
          bgDark: '#663F19',
          border: '#4A2F13',
          text: '#F5EBE1',
          accent: goldFoil ? '#F5D061' : '#FFB59C',
          badgeBg: '#663F19',
        };
      case 'white_duplex':
        return {
          bg: '#F4F1EB',
          bgDark: '#E2DCD2',
          border: '#C0B8AD',
          text: '#1C1917',
          accent: goldFoil ? '#B8860B' : '#C4440F',
          badgeBg: '#E2DCD2',
        };
      case 'matte_black':
      default:
        return {
          bg: '#181614',
          bgDark: '#0F0E0D',
          border: '#332E2A',
          text: '#F5F2EB',
          accent: goldFoil ? '#FFD700' : '#FF8A52',
          badgeBg: '#262320',
        };
    }
  };

  const colors = getColors();

  // Draw textures on 512x512 Canvas
  const generateFaceTexture = (face: 'front' | 'back' | 'right' | 'left' | 'top' | 'bottom') => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // 1. Base cardboard background
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, 512, 512);

    // Subtle paperboard micro-texture grain
    ctx.fillStyle = 'rgba(255, 255, 255, 0.025)';
    for (let i = 0; i < 400; i++) {
      ctx.fillRect(Math.random() * 512, Math.random() * 512, 1.5, 1.5);
    }

    // Outer die-cut margin border (inset 20px)
    ctx.strokeStyle = colors.border;
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, 472, 472);

    // Corner registration tick marks
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 2;
    const tickLen = 14;
    // Top-left
    ctx.beginPath(); ctx.moveTo(20, 20 + tickLen); ctx.lineTo(20, 20); ctx.lineTo(20 + tickLen, 20); ctx.stroke();
    // Top-right
    ctx.beginPath(); ctx.moveTo(492 - tickLen, 20); ctx.lineTo(492, 20); ctx.lineTo(492, 20 + tickLen); ctx.stroke();
    // Bottom-left
    ctx.beginPath(); ctx.moveTo(20, 492 - tickLen); ctx.lineTo(20, 492); ctx.lineTo(20 + tickLen, 492); ctx.stroke();
    // Bottom-right
    ctx.beginPath(); ctx.moveTo(492 - tickLen, 492); ctx.lineTo(492, 492); ctx.lineTo(492, 492 - tickLen); ctx.stroke();

    const netWeightText = packFormat.includes('1kg')
      ? '1.0 KG (2.2 LBS)'
      : packFormat.includes('2kg')
      ? '2.0 KG (4.4 LBS)'
      : packFormat.includes('10kg')
      ? '10.0 KG BULK MASTER'
      : '20.0 KG MASTER CARTON';

    if (face === 'front') {
      // FRONT MAIN DISPLAY FACE
      // Header Tagline
      ctx.fillStyle = colors.text;
      ctx.font = '600 13px Poppins, sans-serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '2px';
      ctx.fillText('100% PURE COCONUT CHARCOAL', 256, 75);

      // Decorative divider
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(170, 88);
      ctx.lineTo(342, 88);
      ctx.stroke();

      // Brand Headline (Auto-wrap & size so text NEVER exceeds box width)
      const rawBrand = brandName.trim() || 'AL-FAKHER CROWN';
      ctx.fillStyle = colors.accent;
      let fontSize = 28;
      if (rawBrand.length > 18) fontSize = 22;
      if (rawBrand.length > 25) fontSize = 18;
      ctx.font = `800 ${fontSize}px Poppins, sans-serif`;

      // Word wrapping if needed
      const words = rawBrand.split(' ');
      let line = '';
      const lines: string[] = [];
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > 420 && n > 0) {
          lines.push(line);
          line = words[n] + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line);

      let curY = 145;
      for (let k = 0; k < lines.length; k++) {
        ctx.fillText(lines[k].trim(), 256, curY);
        curY += fontSize + 6;
      }

      // Slogan / Tagline
      ctx.fillStyle = colors.text;
      ctx.font = '500 14px Poppins, sans-serif';
      ctx.globalAlpha = 0.85;
      const cleanTag = tagline.length > 36 ? tagline.substring(0, 36) + '...' : tagline;
      ctx.fillText(cleanTag, 256, curY + 10);
      ctx.globalAlpha = 1.0;

      // Net Weight Badge Pill
      const badgeY = curY + 50;
      ctx.fillStyle = colors.badgeBg;
      ctx.beginPath();
      ctx.roundRect(136, badgeY, 240, 42, 8);
      ctx.fill();
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = colors.accent;
      ctx.font = 'bold 15px monospace';
      ctx.fillText(`NET WT: ${netWeightText}`, 256, badgeY + 26);

      // Quality specs bullet row
      ctx.fillStyle = colors.text;
      ctx.font = '500 12px monospace';
      ctx.fillText('ASH < 2.2% • 2.5H BURN • SMOKELESS', 256, badgeY + 80);

      // Bottom certification pills
      if (certLogosEnabled) {
        ctx.fillStyle = colors.accent;
        ctx.font = 'bold 11px monospace';
        ctx.fillText('★ IMO NON-DG SP925 • SGS LAB PASSED ★', 256, 455);
      }
    } else if (face === 'right') {
      // RIGHT SIDE: BARCODE, BATCH & ENGLISH SPECS
      ctx.fillStyle = colors.text;
      ctx.font = '700 14px Poppins, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('PRODUCT SPECIFICATIONS', 256, 75);

      ctx.font = '12px monospace';
      ctx.textAlign = 'left';
      ctx.fillText('• Raw Material: 100% Coconut Shell', 60, 120);
      ctx.fillText('• Binder: 2.5% Organic Tapioca', 60, 150);
      ctx.fillText('• Calorific: > 7,500 kcal/kg', 60, 180);
      ctx.fillText('• Ash Color: Natural Pure White', 60, 210);
      ctx.fillText('• Origin: Gresik, East Java (SUB)', 60, 240);
      ctx.fillText('• Drop Test: 1.5m 3x Intact', 60, 270);

      // Barcode Box
      if (barcodeEnabled) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(116, 320, 280, 80);

        // Draw barcode bars
        ctx.fillStyle = '#000000';
        let barX = 136;
        const barPattern = [2, 1, 3, 1, 1, 2, 4, 1, 2, 3, 1, 2, 1, 4, 1, 2, 3, 2, 1, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 3];
        for (let b = 0; b < barPattern.length; b++) {
          const w = barPattern[b];
          if (b % 2 === 0) {
            ctx.fillRect(barX, 330, w * 3, 44);
          }
          barX += w * 3 + 2;
        }

        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('8 992109 837194', 256, 390);
      }

      ctx.fillStyle = colors.text;
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('EXPORT LOT: ID-SBY-2026-FCL', 256, 450);
    } else if (face === 'left') {
      // LEFT SIDE: ARABIC REGULATORY GSO 2530 & HALAL
      ctx.fillStyle = colors.accent;
      ctx.font = 'bold 16px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('فحم جوز هند طبيعي ممتاز', 256, 80);

      if (arabicTextEnabled) {
        ctx.fillStyle = colors.text;
        ctx.font = '13px Arial, sans-serif';
        ctx.fillText('صنع في إندونيسيا من قشور جوز الهند الطبيعية 100%', 256, 125);
        ctx.fillText('خالٍ من المواد الكيميائية والرائحة والدخان', 256, 160);
        ctx.fillText('مخصص للشيشة الفاخرة والشواء الراقي', 256, 195);
        ctx.fillText('حرارة عالية ثابتة تدوم أكثر من ساعتين ونصف', 256, 230);
        ctx.fillText('تحذير: لا يترك مشتعلاً دون مراقبة - يحفظ جافاً', 256, 265);
      }

      // Arabic Standard Badge
      ctx.fillStyle = colors.badgeBg;
      ctx.beginPath();
      ctx.roundRect(106, 320, 300, 48, 8);
      ctx.fill();
      ctx.strokeStyle = colors.accent;
      ctx.stroke();

      ctx.fillStyle = colors.accent;
      ctx.font = 'bold 13px monospace';
      ctx.fillText('مطابق للمواصفات الخليجية GSO 2530', 256, 350);

      ctx.fillStyle = colors.text;
      ctx.font = '11px monospace';
      ctx.fillText('HALAL INDONESIA ID0041000028819', 256, 450);
    } else if (face === 'top') {
      // TOP LID: MONOGRAM & OPENING LINE
      ctx.fillStyle = colors.accent;
      ctx.beginPath();
      ctx.arc(256, 220, 60, 0, Math.PI * 2);
      ctx.lineWidth = 3;
      ctx.strokeStyle = colors.accent;
      ctx.stroke();

      ctx.font = '800 36px Poppins, sans-serif';
      ctx.textAlign = 'center';
      const initial = (brandName.trim()[0] || 'N').toUpperCase();
      ctx.fillText(initial, 256, 233);

      ctx.font = '700 13px Poppins, sans-serif';
      ctx.fillStyle = colors.text;
      ctx.fillText('PREMIUM BRIQUETTES', 256, 315);
      ctx.font = '11px monospace';
      ctx.fillText('OPEN HERE / PULL TO OPEN', 256, 340);

      // Dotted tear line
      ctx.strokeStyle = colors.border;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(80, 400);
      ctx.lineTo(432, 400);
      ctx.stroke();
      ctx.setLineDash([]);
    } else if (face === 'bottom') {
      // BOTTOM BASE: RECYCLE & PACKAGING INFO
      ctx.fillStyle = colors.text;
      ctx.font = '600 12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('CORRUGATED DUPLEX / 100% RECYCLABLE', 256, 180);
      ctx.fillText('FSC-C104829 • PAP 20', 256, 220);
      ctx.fillText('KEEP AWAY FROM WATER & MOISTURE', 256, 260);

      ctx.fillStyle = colors.accent;
      ctx.font = 'bold 14px monospace';
      ctx.fillText(`MASTER PACK SIZE: ${netWeightText}`, 256, 340);
    } else if (face === 'back') {
      // BACK PANEL: COA LAB PROXIMATE DATA
      ctx.fillStyle = colors.text;
      ctx.font = '700 15px Poppins, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('LABORATORY ANALYSIS (ASTM D3174)', 256, 75);

      // Mini Table
      const tableRows = [
        ['Total Ash Content', '< 2.2% (Pure White)'],
        ['Moisture Content', '< 4.5% Kiln-Locked'],
        ['Fixed Carbon', '> 80.0% Non-Volatile'],
        ['Gross Calorific', '7,500 - 7,650 kcal/kg'],
        ['Burning Duration', '2.5 Hours Non-Stop'],
        ['Drop Impact Test', '1.5m 3x Concrete Intact'],
      ];

      let rowY = 130;
      ctx.font = '12px monospace';
      for (let r = 0; r < tableRows.length; r++) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.fillRect(50, rowY - 16, 412, 28);
        ctx.strokeStyle = colors.border;
        ctx.strokeRect(50, rowY - 16, 412, 28);

        ctx.fillStyle = colors.text;
        ctx.textAlign = 'left';
        ctx.fillText(tableRows[r][0], 65, rowY + 3);

        ctx.fillStyle = colors.accent;
        ctx.textAlign = 'right';
        ctx.fillText(tableRows[r][1], 445, rowY + 3);
        rowY += 36;
      }

      ctx.fillStyle = colors.text;
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('OFFICIAL SURVEYOR: SGS INDONESIA ACCREDITED', 256, 455);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    return texture;
  };

  // Dimensions based on packaging format
  const getBoxDimensions = () => {
    switch (packFormat) {
      case '2kg':
        return { w: 2.1, h: 1.5, d: 1.3 };
      case '10kg_bulk':
        return { w: 2.3, h: 1.7, d: 1.7 };
      case '20kg_bulk':
        return { w: 2.5, h: 1.9, d: 1.8 };
      case '1kg':
      default:
        return { w: 1.6, h: 1.6, d: 1.6 };
    }
  };

  // Initialize Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 460;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.1, 4.2);

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
      renderer.toneMappingExposure = 1.15;
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL init failed:', e);
      return;
    }

    // Studio Lighting
    const ambLight = new THREE.AmbientLight(0xfff6ea, 1.1);
    scene.add(ambLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.9);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x88aacc, 1.0);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    const topFill = new THREE.DirectionalLight(0xfff0dd, 0.7);
    topFill.position.set(0, 5, 0);
    scene.add(topFill);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Soft ground contact shadow plane
    const shadowGeom = new THREE.PlaneGeometry(3.5, 3.5);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d')!;
    const grad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 110);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
    grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.3)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 256, 256);
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);

    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.1;
    scene.add(shadowMesh);

    // Create 6 face materials
    const dims = getBoxDimensions();
    const boxGeom = new THREE.BoxGeometry(dims.w, dims.h, dims.d);

    // Three.js Box Face Order: [Right (+X), Left (-X), Top (+Y), Bottom (-Y), Front (+Z), Back (-Z)]
    const texRight = generateFaceTexture('right');
    const texLeft = generateFaceTexture('left');
    const texTop = generateFaceTexture('top');
    const texBottom = generateFaceTexture('bottom');
    const texFront = generateFaceTexture('front');
    const texBack = generateFaceTexture('back');

    const roughnessVal = material === 'white_duplex' ? 0.45 : material === 'kraft' ? 0.88 : 0.78;
    const metalnessVal = goldFoil ? 0.22 : 0.05;

    const materials = [
      new THREE.MeshStandardMaterial({ map: texRight, roughness: roughnessVal, metalness: metalnessVal }),
      new THREE.MeshStandardMaterial({ map: texLeft, roughness: roughnessVal, metalness: metalnessVal }),
      new THREE.MeshStandardMaterial({ map: texTop, roughness: roughnessVal, metalness: metalnessVal }),
      new THREE.MeshStandardMaterial({ map: texBottom, roughness: roughnessVal, metalness: metalnessVal }),
      new THREE.MeshStandardMaterial({ map: texFront, roughness: roughnessVal, metalness: metalnessVal }),
      new THREE.MeshStandardMaterial({ map: texBack, roughness: roughnessVal, metalness: metalnessVal }),
    ];
    materialsRef.current = materials;

    const boxMesh = new THREE.Mesh(boxGeom, materials);
    boxMeshRef.current = boxMesh;
    rootGroup.add(boxMesh);

    // Mouse & Touch Drag Interaction
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouse.current = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const dx = clientX - prevMouse.current.x;
      const dy = clientY - prevMouse.current.y;

      targetRot.current.y += dx * 0.008;
      targetRot.current.x += dy * 0.008;

      // Limit vertical tilt to prevent awkward flip
      targetRot.current.x = Math.max(-Math.PI / 2.3, Math.min(Math.PI / 2.3, targetRot.current.x));

      prevMouse.current = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDragging.current = false;
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('touchstart', onPointerDown);
    window.addEventListener('touchmove', onPointerMove);
    window.addEventListener('touchend', onPointerUp);

    // Render loop
    const animate = () => {
      animRef.current = requestAnimationFrame(animate);

      if (autoRotate && !isDragging.current) {
        targetRot.current.y += 0.004;
      }

      currentRot.current.y += (targetRot.current.y - currentRot.current.y) * 0.1;
      currentRot.current.x += (targetRot.current.x - currentRot.current.x) * 0.1;

      rootGroup.rotation.y = currentRot.current.y;
      rootGroup.rotation.x = currentRot.current.x;

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
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      boxGeom.dispose();
      shadowGeom.dispose();
      shadowTex.dispose();
      shadowMat.dispose();
      materials.forEach((m) => {
        if (m.map) m.map.dispose();
        m.dispose();
      });
      renderer.dispose();
    };
  }, [
    material,
    packFormat,
    brandName,
    tagline,
    goldFoil,
    matteUv,
    spotUv,
    arabicTextEnabled,
    barcodeEnabled,
    certLogosEnabled,
    autoRotate,
  ]);

  // Snap to specific face
  const snapToFace = (face: 'front' | 'right' | 'left' | 'back' | 'top') => {
    setAutoRotate(false);
    setActiveFace(face);
    switch (face) {
      case 'front':
        targetRot.current = { x: 0.1, y: 0 };
        break;
      case 'right':
        targetRot.current = { x: 0.1, y: -Math.PI / 2 };
        break;
      case 'left':
        targetRot.current = { x: 0.1, y: Math.PI / 2 };
        break;
      case 'back':
        targetRot.current = { x: 0.1, y: Math.PI };
        break;
      case 'top':
        targetRot.current = { x: Math.PI / 2.2, y: 0 };
        break;
    }
  };

  return (
    <div className="w-full flex flex-col items-center relative">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-[400px] sm:h-[450px] cursor-grab active:cursor-grabbing select-none"
        title={t.canvasTitle}
      />

      {/* Floating Interactive Controls Overlay */}
      <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-white font-mono text-[11px] shadow-lg pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span>{t.rotateHint}</span>
        </div>

        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-2.5 py-1.5 rounded-lg font-mono text-[11px] transition-all flex items-center gap-1.5 border cursor-pointer ${
              autoRotate
                ? 'bg-primary-container text-on-primary-container border-primary/50 shadow-md'
                : 'bg-black/75 text-white/80 border-white/10 hover:text-white'
            }`}
            title={t.autoSpinTitle}
          >
            {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{autoRotate ? t.autoSpin : t.paused}</span>
          </button>

          <button
            type="button"
            onClick={() => snapToFace('front')}
            className="p-1.5 rounded-lg bg-black/75 text-white/80 border border-white/10 hover:text-white transition-all cursor-pointer"
            title={t.resetTitle}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Quick-Face Jump Bar */}
      <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-surface-container-high/80 backdrop-blur-md rounded-xl border border-outline-variant/30">
        <span className="font-mono text-[10px] text-outline px-2 uppercase">{t.viewSideLabel}</span>
        <button
          type="button"
          onClick={() => snapToFace('front')}
          className={`px-2.5 py-1 rounded-lg font-headline text-[11px] font-semibold transition-all cursor-pointer ${
            activeFace === 'front' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface hover:bg-surface-container'
          }`}
        >
          {t.faceFront}
        </button>
        <button
          type="button"
          onClick={() => snapToFace('right')}
          className={`px-2.5 py-1 rounded-lg font-headline text-[11px] font-semibold transition-all cursor-pointer ${
            activeFace === 'right' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface hover:bg-surface-container'
          }`}
        >
          {t.faceBarcode}
        </button>
        <button
          type="button"
          onClick={() => snapToFace('left')}
          className={`px-2.5 py-1 rounded-lg font-headline text-[11px] font-semibold transition-all cursor-pointer ${
            activeFace === 'left' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface hover:bg-surface-container'
          }`}
        >
          {t.faceArabic}
        </button>
        <button
          type="button"
          onClick={() => snapToFace('back')}
          className={`px-2.5 py-1 rounded-lg font-headline text-[11px] font-semibold transition-all cursor-pointer ${
            activeFace === 'back' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface hover:bg-surface-container'
          }`}
        >
          {t.faceBack}
        </button>
        <button
          type="button"
          onClick={() => snapToFace('top')}
          className={`px-2.5 py-1 rounded-lg font-headline text-[11px] font-semibold transition-all cursor-pointer ${
            activeFace === 'top' ? 'bg-primary-container text-on-primary-container' : 'text-on-surface hover:bg-surface-container'
          }`}
        >
          {t.faceTop}
        </button>
      </div>
    </div>
  );
}
