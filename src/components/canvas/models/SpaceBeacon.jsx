import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollProgress } from '../../../context/ScrollContext';

// ─────────────────────────────────────────────────────────────────────────────
// CityRooftopBeacon (Contact Chapter Summit)
// Renders the rooftop observation deck & broadcast terminal of the central tower.
// Overlooks the city skyline at Z = -25 with an interactive transmission beacon.
// ─────────────────────────────────────────────────────────────────────────────

export function SpaceBeacon({ position = [0, 0, -25] }) {
  const { theme, wireframeMode } = useScrollProgress();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const coreRef = useRef();
  const spireRef = useRef();

  const isObsidian = theme === 'obsidian';

  useFrame((state) => {
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
      coreRef.current.position.y = 0.5 + Math.sin(t * 1.5) * 0.08;
    }
  });

  const accentColor = wireframeMode
    ? '#00ff88'
    : isObsidian
    ? '#38bdf8'
    : '#d4af37';

  return (
    <group position={position}>
      {/* 1. Rooftop Observation Deck Foundation (Skyscraper Summit Terrace) */}
      <mesh position={[0, -1.3, 0]} receiveShadow>
        <cylinderGeometry args={[4.5, 5.2, 0.4, 32]} />
        <meshStandardMaterial
          color={isObsidian ? '#0a0c12' : '#e6e0d5'}
          metalness={0.88}
          roughness={0.2}
          wireframe={wireframeMode}
        />
      </mesh>

      {/* 2. Outer Terrace Perimeter Deck with Landing Perimeter Lights */}
      <mesh position={[0, -1.08, 0]} receiveShadow>
        <ringGeometry args={[4.2, 4.48, 32]} />
        <meshBasicMaterial
          color={wireframeMode ? '#00ff88' : (isObsidian ? '#00f0ff' : '#d4af37')}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* 3. Central Transmission Terminal Pedestal */}
      <mesh position={[0, -0.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.3, 1.8, 1.0, 32]} />
        <meshStandardMaterial
          color={isObsidian ? '#12141c' : '#f5f0e6'}
          metalness={0.92}
          roughness={0.15}
          wireframe={wireframeMode}
        />
      </mesh>

      {/* 4. Glowing Holographic Uplink Core */}
      <group ref={coreRef} position={[0, 0.5, 0]}>
        <mesh>
          <octahedronGeometry args={[0.55, 2]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={isObsidian ? 0.9 : 0.45}
            metalness={0.95}
            roughness={0.1}
            wireframe={wireframeMode}
          />
        </mesh>

        {/* Gyroscopic Orbital Rings */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[1.35, 0.025, 16, 64]} />
          <meshStandardMaterial color={accentColor} metalness={1.0} roughness={0.1} wireframe={wireframeMode} />
        </mesh>
        <mesh ref={ring2Ref}>
          <torusGeometry args={[1.7, 0.02, 16, 64]} />
          <meshStandardMaterial color={isObsidian ? '#ffffff' : '#b38b38'} metalness={1.0} roughness={0.1} wireframe={wireframeMode} />
        </mesh>
      </group>

      {/* 5. Sky Broadcast Antenna Spire (Shooting beam into the clouds) */}
      <group ref={spireRef} position={[0, 3.2, 0]}>
        <mesh>
          <cylinderGeometry args={[0.04, 0.12, 4.2, 12]} />
          <meshStandardMaterial color={isObsidian ? '#2a2e3d' : '#8c8275'} metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Beacon Warning Red Strobe */}
        <mesh position={[0, 2.15, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#ff3344" />
        </mesh>
        {/* Signal Ray Beam */}
        <mesh position={[0, 4.0, 0]}>
          <cylinderGeometry args={[0.02, 0.15, 4.0, 12]} />
          <meshBasicMaterial color={accentColor} transparent opacity={isObsidian ? 0.25 : 0.15} />
        </mesh>
      </group>

      {/* 6. In-World Architectural Typography Etched in 3D Space */}
      <Text
        position={[0, 2.0, 0]}
        fontSize={0.22}
        color={isObsidian ? '#ffffff' : '#18181b'}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.15}
        fontWeight="bold"
      >
        SUMMIT BROADCAST TERMINAL
      </Text>
      <Text
        position={[0, 1.65, 0]}
        fontSize={0.11}
        color={isObsidian ? 'rgba(255,255,255,0.6)' : 'rgba(24,24,27,0.6)'}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        DIRECT TRANSMISSION NODE // TAHIR-CS // 2026
      </Text>
    </group>
  );
}
