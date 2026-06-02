/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeSareeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 500;

    // 1. Scene, Camera, Renderer with luxury shadow setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Beautiful wave fabric geometry (Plane)
    const geometry = new THREE.PlaneGeometry(3.0, 4.2, 35, 35);

    // 3. Physical Material for Silk Luxury texture (Deep maroon burgundy with gold shimmer)
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x8B1E3F, // Luxury Maroon Burgundy
      roughness: 0.22,
      metalness: 0.4,
      clearcoat: 1.0,
      clearcoatRoughness: 0.12,
      sheen: 1.0,
      sheenRoughness: 0.18,
      sheenColor: new THREE.Color(0xD4AF37), // Royal Gold luster shimmer reflection
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);

    // 4. Luxury Wireframe Overlay matching Paithani border mesh
    const zariMaterial = new THREE.MeshBasicMaterial({
      color: 0xD4AF37,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const zariMesh = new THREE.Mesh(geometry, zariMaterial);
    zariMesh.position.z = 0.015;
    mesh.add(zariMesh);

    // 5. Interactive 3D Foreground Elements - Torus gold rings representing royal jewelry
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    const ringGeom = new THREE.TorusGeometry(0.35, 0.06, 12, 48);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xD4AF37, // Royal Gold
      roughness: 0.08,
      metalness: 0.95,
    });

    const goldRings: THREE.Mesh[] = [];
    const ringOffsets = [
      { x: -1.8, y: 1.2, z: 1.0, scale: 0.8 },
      { x: 1.9, y: -1.4, z: 1.2, scale: 0.95 },
      { x: -1.5, y: -1.6, z: 0.8, scale: 0.7 }
    ];

    ringOffsets.forEach((cfg) => {
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.position.set(cfg.x, cfg.y, cfg.z);
      ring.scale.setScalar(cfg.scale);
      ring.castShadow = true;
      ringGroup.add(ring);
      goldRings.push(ring);
    });

    // 6. Luxury Diamond-cut Gems floating in space (glowing burgundy crystal)
    const gemGroup = new THREE.Group();
    scene.add(gemGroup);

    const gemGeom = new THREE.OctahedronGeometry(0.24);
    const gemMat = new THREE.MeshPhysicalMaterial({
      color: 0x8B1E3F, // Deep ruby/burgundy match
      roughness: 0.05,
      metalness: 0.1,
      transparent: true,
      opacity: 0.9,
      transmission: 0.7,
      ior: 1.6,
      thickness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });

    const gems: THREE.Mesh[] = [];
    const gemOffsets = [
      { x: 1.7, y: 1.4, z: 0.9, rSpeed: 0.01 },
      { x: -1.9, y: -0.3, z: 1.4, rSpeed: -0.015 },
      { x: 2.1, y: 0.1, z: 1.1, rSpeed: 0.008 },
      { x: -0.8, y: 2.1, z: 0.5, rSpeed: 0.02 }
    ];

    gemOffsets.forEach((cfg) => {
      const gem = new THREE.Mesh(gemGeom, gemMat);
      gem.position.set(cfg.x, cfg.y, cfg.z);
      gemGroup.add(gem);
      gems.push(gem);
    });

    // 7. Dynamic Floating Sparkling Gold Dust System
    const particleCount = 180;
    const particlesGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const initialPositions = [];

    for (let i = 0; i < particleCount; i++) {
      const px = (Math.random() - 0.5) * 7;
      const py = (Math.random() - 0.5) * 6;
      const pz = (Math.random() - 0.5) * 3;
      positions[i * 3] = px;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = pz;
      initialPositions.push({ x: px, y: py, z: pz, speed: 0.005 + Math.random() * 0.01, wobble: Math.random() * 2 });
    }

    particlesGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Create soft star glow texture using canvas
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(212, 175, 55, 1)');
      grad.addColorStop(1, 'rgba(212, 175, 55, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.09,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xfff0b3,
    });

    const particleSystem = new THREE.Points(particlesGeom, particleMat);
    scene.add(particleSystem);

    // 8. Lights config - Dramatic golden studio lighting for maximum realism
    const ambientLight = new THREE.AmbientLight(0xfff3e3, 0.75);
    scene.add(ambientLight);

    const goldKeyLight = new THREE.DirectionalLight(0xD4AF37, 3.2); // Golden focus
    goldKeyLight.position.set(5, 5, 4);
    goldKeyLight.castShadow = true;
    goldKeyLight.shadow.mapSize.width = 1024;
    goldKeyLight.shadow.mapSize.height = 1024;
    scene.add(goldKeyLight);

    const rubyBackLight = new THREE.DirectionalLight(0x8B1E3F, 2.0); // Moody burgundy backlighting
    rubyBackLight.position.set(-5, -5, -2);
    scene.add(rubyBackLight);

    const spotLight = new THREE.SpotLight(0xffffff, 4.5);
    spotLight.position.set(0, 4, 3);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.8;
    scene.add(spotLight);

    setLoading(false);

    // 9. Interactive mouse tracking variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 10. Animation Loop
    let animationFrameId: number;
    let time = 0;

    const posAttr = geometry.attributes.position;
    const originalPositions = posAttr.clone();

    const animate = () => {
      time += 0.015;

      // Realistic cloth waving animation
      const pos = geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = originalPositions.getX(i);
        const y = originalPositions.getY(i);

        const zValue =
          Math.sin(x * 1.1 + time) * 0.22 * Math.cos(y * 0.7 + time * 0.4) +
          Math.cos(y * 1.3 + time * 0.9) * 0.12 +
          Math.sin((x + y) * 0.5 + time) * 0.08;

        pos.setZ(i, zValue);
      }
      pos.needsUpdate = true;
      geometry.computeVertexNormals();

      // Smooth mouse coordinate integration (damping)
      targetX += (mouseX - targetX) * 0.045;
      targetY += (mouseY - targetY) * 0.045;

      // 3D Parallax camera tilt effect
      camera.position.x = targetX * 1.8;
      camera.position.y = targetY * 1.8;
      camera.position.z = 6.5 + (Math.abs(targetX) + Math.abs(targetY)) * -0.5; // push depth on fast movement
      camera.lookAt(0, 0.1, 0);

      // Spin and tilt cloth mesh gently
      mesh.rotation.y = Math.sin(time * 0.3) * 0.05 + targetX * 0.18;
      mesh.rotation.x = Math.cos(time * 0.25) * 0.04 - targetY * 0.18;
      mesh.position.y = Math.sin(time * 0.4) * 0.08;

      // Spin and float the gold jewelry rings
      goldRings.forEach((ring, index) => {
        const offset = ringOffsets[index];
        ring.rotation.x += 0.012 + index * 0.004;
        ring.rotation.y += 0.008 + index * 0.003;
        ring.rotation.z += 0.005;
        
        // Gentle hover
        ring.position.y = offset.y + Math.sin(time * 0.8 + index) * 0.12;
        ring.position.x = offset.x + Math.cos(time * 0.6 + index) * 0.08;
        
        // React weakly to mouse pointer
        ring.position.x += targetX * 0.25;
        ring.position.y += targetY * 0.25;
      });

      // Spin and float the glass gems
      gems.forEach((gem, index) => {
        const offset = gemOffsets[index];
        gem.rotation.y += 0.015 + index * 0.003;
        gem.rotation.x += offset.rSpeed;
        gem.rotation.z += 0.004;
        
        // Gentle hover
        gem.position.y = offset.y + Math.cos(time * 0.75 + index) * 0.14;
        gem.position.x = offset.x + Math.sin(time * 0.5 + index) * 0.1;
        
        // React to mouse
        gem.position.x -= targetX * 0.18;
        gem.position.y -= targetY * 0.18;
      });

      // Update particle stars positions to rise and react to mouse
      const pPositions = particlesGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const info = initialPositions[i];
        
        // Move particle upward
        info.y += info.speed;
        
        // Wobble float
        const wobbleX = Math.sin(time + info.wobble) * 0.004;
        
        // Wrap around limits
        if (info.y > 3) {
          info.y = -3;
          info.x = (Math.random() - 0.5) * 7;
        }

        pPositions[i * 3] = info.x + wobbleX + targetX * 0.15;
        pPositions[i * 3 + 1] = info.y + targetY * 0.15;
      }
      particlesGeom.attributes.position.needsUpdate = true;

      // Render updated scene
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize container observer helper
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 500;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // Clean up all resources
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      zariMaterial.dispose();
      ringGeom.dispose();
      ringMat.dispose();
      gemGeom.dispose();
      gemMat.dispose();
      particlesGeom.dispose();
      particleMat.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div id="three-saree-canvas-container" className="relative w-full h-full min-h-[460px] md:min-h-[580px] flex items-center justify-center overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent">
          <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Absolute canvas mount target */}
      <div ref={containerRef} className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing z-0" />

      {/* Decorative luxury overlay sparks */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-55 z-10">
        <div className="absolute top-[15%] left-[25%] w-2 h-2 rounded-full bg-[#D4AF37] animate-ping duration-1500 delay-300"></div>
        <div className="absolute top-[75%] left-[12%] w-1.5 h-1.5 rounded-full bg-white opacity-50 animate-pulse duration-2000"></div>
        <div className="absolute top-[35%] right-[22%] w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-bounce duration-4000"></div>
        <div className="absolute bottom-[20%] right-[25%] w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse duration-1000"></div>
      </div>
    </div>
  );
}
