import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollProgress } from '../../context/ScrollContext';
import { sound } from '../../utils/soundEngine';

// ─────────────────────────────────────────────────────────────────────────────
// CertificateSlab — Awwwards SOTD Refractive Glass Acrylic Monolith
// Features:
// • Inner high-resolution certificate texture
// • Outer physical refractive glass casing with chromatic dispersion & transmission
// • Floating hover tilt, specular rim & Click-to-Zoom camera focus
// ─────────────────────────────────────────────────────────────────────────────

export function CertificateSlab({
  cert,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  worldOffset = [0, 0, 0],
}) {
  const { theme, wireframeMode, setFocusedTarget } = useScrollProgress();
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState(null);

  const isObsidian = theme === 'obsidian';

  // Safe async texture loading
  useEffect(() => {
    if (cert.image) {
      const loader = new THREE.TextureLoader();
      loader.load(
        cert.image,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.generateMipmaps = false;
          tex.minFilter = THREE.LinearFilter;
          setTexture(tex);
        },
        undefined,
        (err) => console.warn('Could not load certificate texture:', cert.image, err)
      );
    }
  }, [cert.image]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Gentle physical float breathing
    const targetY = position[1] + Math.sin(t * 1.5 + position[0]) * 0.04;
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.1);

    // Hover response
    if (hovered) {
      groupRef.current.scale.lerp(new THREE.Vector3(1.06, 1.06, 1.06), 0.15);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotation[1] + 0.12, 0.1);
    } else {
      groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.15);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotation[1], 0.1);
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    sound.playHoloEngage();
    const worldX = worldOffset[0] + position[0];
    const worldY = worldOffset[1] + position[1];
    const worldZ = worldOffset[2] + position[2];
    setFocusedTarget({
      title: `CREDENTIAL // ${cert.title.toUpperCase()}`,
      sub: `${cert.issuer || 'VERIFIED CREDENTIAL'} // ${cert.date || '2024'}`,
      pos: [worldX, worldY, worldZ + 2.4],
      lookAt: [worldX, worldY, worldZ],
    });
  };

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        sound.playClick(1.3);
        setHovered(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
        setHovered(false);
      }}
    >
      {/* 1. Inner Certificate Document Plane */}
      {texture && !wireframeMode && (
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[2.2, 1.55]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      )}

      {/* 2. Outer Sleek Physical Acrylic Glass Slab (High-Performance, 0 FBO overhead) */}
      <RoundedBox args={[2.45, 1.8, 0.16]} radius={0.06} smoothness={2}>
        {wireframeMode ? (
          <meshBasicMaterial color="#00ff88" wireframe />
        ) : (
          <meshPhysicalMaterial
            roughness={isObsidian ? 0.06 : 0.12}
            metalness={isObsidian ? 0.25 : 0.1}
            color={isObsidian ? '#0e1626' : '#ffffff'}
            transparent
            opacity={0.84}
            reflectivity={0.9}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
          />
        )}
      </RoundedBox>

      {/* 3. Sleek Gold / Cyan Perimeter Bezel */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(2.46, 1.81, 0.17)]} />
        <lineBasicMaterial
          color={
            wireframeMode
              ? '#00ff88'
              : hovered
              ? (isObsidian ? '#00f0ff' : '#d4af37')
              : (isObsidian ? 'rgba(0, 240, 255, 0.25)' : 'rgba(180, 140, 60, 0.35)')
          }
        />
      </lineSegments>

      {/* 4. Typographic Certificate Badge Label */}
      <Text
        position={[0, -1.05, 0.1]}
        fontSize={0.11}
        color={isObsidian ? '#ffffff' : '#18181b'}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
        fontWeight="bold"
      >
        {cert.issuer ? `${cert.issuer.toUpperCase()} // ${cert.date || '2024'}` : 'VERIFIED CREDENTIAL'}
      </Text>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CertificatesVault — 5 Refractive Slabs in 3D Gallery Arc
// ─────────────────────────────────────────────────────────────────────────────

export function CertificatesVault({ position = [0, 0, -2.5], certificates = [] }) {
  const VAULT_OFFSETS = [
    { x: -3.6, y: 1.2, z: 0.4, rotY: 0.35 },
    { x: -1.8, y: -0.6, z: -0.2, rotY: 0.18 },
    { x: 0.0, y: 1.5, z: -0.6, rotY: 0.0 },
    { x: 1.8, y: -0.6, z: -0.2, rotY: -0.18 },
    { x: 3.6, y: 1.2, z: 0.4, rotY: -0.35 },
  ];

  return (
    <group position={position}>
      {certificates.slice(0, 5).map((cert, idx) => {
        const cfg = VAULT_OFFSETS[idx] || { x: idx * 2, y: 0, z: 0, rotY: 0 };
        return (
          <CertificateSlab
            key={idx}
            cert={cert}
            position={[cfg.x, cfg.y, cfg.z]}
            rotation={[0, cfg.rotY, 0]}
            scale={[0.85, 0.85, 0.85]}
            worldOffset={position}
          />
        );
      })}
    </group>
  );
}
