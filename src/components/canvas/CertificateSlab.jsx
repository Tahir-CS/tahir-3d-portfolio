// src/components/canvas/CertificateSlab.jsx
import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, MeshTransmissionMaterial, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollProgress } from '../../context/ScrollContext';
import { sound } from '../../utils/soundEngine';

export function CertificateSlab({
  cert,
  position = [0, 0, 0],
  vaultPosition = [0, -0.4, -2.5],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
}) {
  const { theme, wireframeMode, setFocusedTarget } = useScrollProgress();
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState(null);
  const isObsidian = theme === 'obsidian';

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

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    const targetY = position[1] + Math.sin(t * 1.5 + position[0]) * 0.04;
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.1);

    if (hovered) {
      groupRef.current.scale.lerp(new THREE.Vector3(1.06, 1.06, 1.06), 0.15);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        rotation[1] + 0.08,
        0.1
      );
    } else {
      groupRef.current.scale.lerp(new THREE.Vector3(scale[0], scale[1], scale[2]), 0.15);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        rotation[1],
        0.1
      );
    }
  });

  const handleFocusCertificate = (e) => {
    e.stopPropagation();
    sound.playHoloEngage();

    // Calculate world coordinates of this certificate slab
    const wx = vaultPosition[0] + position[0];
    const wy = vaultPosition[1] + position[1];
    const wz = vaultPosition[2] + position[2];

    // Offset camera 2.1 units along the slab's rotated front normal vector
    const rotY = rotation[1] || 0;
    const dist = 2.1;
    const camX = wx + Math.sin(rotY) * dist;
    const camZ = wz + Math.cos(rotY) * dist;

    setFocusedTarget({
      title: `VERIFIED CREDENTIAL // ${cert.title.toUpperCase()}`,
      sub: `${cert.issuer} (${cert.date}) — Click ESC to return`,
      pos: [camX, wy, camZ],
      lookAt: [wx, wy, wz],
    });
  };

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={handleFocusCertificate}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        sound.playClick(1.35);
        setHovered(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
        setHovered(false);
      }}
    >
      {/* 1. Inner High-Resolution Certificate Plane */}
      {texture && !wireframeMode && (
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[2.2, 1.55]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      )}

      {/* 2. Outer Refractive Physical Acrylic Glass Slab */}
      <RoundedBox args={[2.45, 1.8, 0.16]} radius={0.06} smoothness={4} castShadow receiveShadow>
        {wireframeMode ? (
          <meshBasicMaterial color="#00ff88" wireframe />
        ) : (
          <MeshTransmissionMaterial
            backside
            samples={6}
            thickness={0.25}
            chromaticAberration={0.04}
            anisotropy={0.2}
            distortion={0.08}
            distortionScale={0.2}
            temporalDistortion={0.08}
            ior={1.48}
            roughness={isObsidian ? 0.08 : 0.14}
            metalness={isObsidian ? 0.15 : 0.05}
            color={isObsidian ? '#0f172a' : '#f8fafc'}
            transparent
            opacity={0.92}
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
              ? isObsidian
                ? '#00f0ff'
                : '#d4af37'
              : isObsidian
              ? 'rgba(0, 240, 255, 0.35)'
              : 'rgba(180, 140, 60, 0.45)'
          }
        />
      </lineSegments>

      {/* 4. Top 3D Title Etched Above Slab */}
      <Text
        position={[0, 1.06, 0.1]}
        fontSize={0.11}
        color={isObsidian ? '#00f0ff' : '#b38b38'}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
        fontWeight="bold"
      >
        {cert.title ? cert.title.toUpperCase() : 'CERTIFICATE'}
      </Text>

      {/* 5. Bottom Issuer & Action Prompt */}
      <Text
        position={[0, -1.06, 0.1]}
        fontSize={0.095}
        color={isObsidian ? '#ffffff' : '#18181b'}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
        fontWeight="bold"
      >
        {`${cert.issuer ? cert.issuer.toUpperCase() : 'VERIFIED'} // ${cert.date || '2024'} [CLICK TO ZOOM]`}
      </Text>
    </group>
  );
}

export function CertificatesVault({ position = [0, -0.4, -2.5], certificates = [] }) {
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
            vaultPosition={position}
            rotation={[0, cfg.rotY, 0]}
            scale={[0.85, 0.85, 0.85]}
          />
        );
      })}
    </group>
  );
}
