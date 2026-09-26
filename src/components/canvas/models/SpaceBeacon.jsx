import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollProgress } from '../../../context/ScrollContext';

export function SpaceBeacon({ position = [0, 0, -25] }) {
  const { theme, wireframeMode } = useScrollProgress();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const coreRef = useRef();

  const isObsidian = theme === 'obsidian';

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.4;
      ring1Ref.current.rotation.y = t * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.5;
      ring2Ref.current.rotation.z = t * 0.25;
    }
    if (coreRef.current) {
      coreRef.current.position.y = Math.sin(t * 1.5) * 0.08;
    }
  });

  const accentColor = wireframeMode
    ? '#00ff88'
    : isObsidian
    ? '#38bdf8'
    : '#d4af37';

  return (
    <group position={position}>
      {/* 1. Titanium Pedestal Monolith */}
      <mesh position={[0, -1.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.2, 1.8, 1.4, 32]} />
        <meshStandardMaterial
          color={wireframeMode ? '#002210' : (isObsidian ? '#101016' : '#f5f0e6')}
          metalness={0.92}
          roughness={isObsidian ? 0.15 : 0.2}
          wireframe={wireframeMode}
        />
      </mesh>

      {/* 2. Floating Central Holographic Core */}
      <group ref={coreRef} position={[0, 0.4, 0]}>
        <mesh>
          <octahedronGeometry args={[0.55, 2]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={isObsidian ? 0.8 : 0.4}
            metalness={0.95}
            roughness={0.1}
            wireframe={wireframeMode}
          />
        </mesh>

        {/* Outer Orbital Ring 1 */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[1.3, 0.025, 16, 64]} />
          <meshStandardMaterial
            color={accentColor}
            metalness={1.0}
            roughness={0.1}
            wireframe={wireframeMode}
          />
        </mesh>

        {/* Outer Orbital Ring 2 */}
        <mesh ref={ring2Ref}>
          <torusGeometry args={[1.65, 0.02, 16, 64]} />
          <meshStandardMaterial
            color={isObsidian ? '#ffffff' : '#b38b38'}
            metalness={1.0}
            roughness={0.1}
            wireframe={wireframeMode}
          />
        </mesh>
      </group>

      {/* 3. Floating 3D Uplink Typographic Ring */}
      <Text
        position={[0, 2.2, 0]}
        fontSize={0.22}
        color={isObsidian ? '#ffffff' : '#18181b'}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.15}
        fontWeight="bold"
      >
        ORBITAL UPLINK NODE
      </Text>
      <Text
        position={[0, 1.85, 0]}
        fontSize={0.11}
        color={isObsidian ? 'rgba(255,255,255,0.6)' : 'rgba(24,24,27,0.6)'}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        DIRECT TRANSMISSION READY // 2026
      </Text>
    </group>
  );
}
