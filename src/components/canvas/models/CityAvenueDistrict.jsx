import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollProgress } from '../../../context/ScrollContext';

// ─────────────────────────────────────────────────────────────────────────────
// CityAvenueDistrict (Cyber-Architectural Boulevard)
// Provides the sleek urban avenue ground, neon lane guidance tracks,
// cross-grid pavement, and perimeter cyber beacons leading up to
// the Grand Architectural Skills & Tech Skyscraper Billboard.
// ─────────────────────────────────────────────────────────────────────────────

export function CityAvenueDistrict({ position = [0, -1.2, -11] }) {
  const { theme, wireframeMode } = useScrollProgress();
  const isObsidian = theme === 'obsidian';
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4) * 0.015;
    }
  });

  return (
    <group position={position} ref={groupRef}>
      {/* 1. Urban Street Plaza Pavement (Sleek Dark Asphalt Ground, Zero Water) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 50]} />
        <meshStandardMaterial
          color={wireframeMode ? '#001a10' : (isObsidian ? '#08090d' : '#d8d4cc')}
          metalness={isObsidian ? 0.7 : 0.2}
          roughness={isObsidian ? 0.4 : 0.7}
          wireframe={wireframeMode}
        />
      </mesh>

      {/* 2. Neon Cyber Boulevard Guidance Tracks (Street lane lighting) */}
      {[-6.0, -2.0, 2.0, 6.0].map((x, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.02, 0]}>
          <planeGeometry args={[0.08, 48]} />
          <meshBasicMaterial
            color={wireframeMode ? '#00ff88' : (isObsidian ? '#00f0ff' : '#d4af37')}
            transparent
            opacity={0.45}
          />
        </mesh>
      ))}

      {/* 3. Cross Street Grid Pattern */}
      <gridHelper
        args={[60, 30, isObsidian ? '#00f0ff' : '#d4af37', isObsidian ? '#182438' : '#bbb']}
        position={[0, 0.03, 0]}
      />

      {/* 4. Cyber Street Lamp Beacons along the pavement */}
      {[-7.5, 7.5].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          {[-15, -5, 5, 15].map((z, j) => (
            <group key={j} position={[0, 0, z]}>
              {/* Lamp Pole */}
              <mesh position={[0, 2.5, 0]}>
                <cylinderGeometry args={[0.04, 0.06, 5.0, 8]} />
                <meshStandardMaterial color={isObsidian ? '#181822' : '#888'} metalness={0.9} />
              </mesh>
              {/* Light Fixture */}
              <mesh position={[x > 0 ? -0.4 : 0.4, 4.9, 0]}>
                <boxGeometry args={[0.8, 0.12, 0.2]} />
                <meshStandardMaterial
                  color={isObsidian ? '#00f0ff' : '#ffe8a0'}
                  emissive={isObsidian ? '#00f0ff' : '#ffe8a0'}
                  emissiveIntensity={isObsidian ? 0.8 : 0.4}
                />
              </mesh>
            </group>
          ))}
        </group>
      ))}
    </group>
  );
}
