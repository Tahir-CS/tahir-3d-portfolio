import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { HolographicMaterial } from '../../shaders/HolographicMaterial';

export function ControlRoom({ position = [-3.5, 0, 0], wireframe = false }) {
  const centralHoloRef = useRef();

  useFrame((_, delta) => {
    if (centralHoloRef.current) {
      centralHoloRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group position={position}>
      {/* Central Holographic Tactical Projector Deck */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.0, 2.4, 0.5, 8]} />
        <meshStandardMaterial
          color={wireframe ? '#00ff88' : '#0d1118'}
          wireframe={wireframe}
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>

      {/* Recessed Emitter Ring */}
      <mesh position={[0, 0.51, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.4, 1.7, 32]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={2.5}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Rotating 3D Holographic Core (Icosahedron + Torus Rings) */}
      <group ref={centralHoloRef} position={[0, 1.8, 0]}>
        <mesh>
          <icosahedronGeometry args={[0.7, 1]} />
          <HolographicMaterial color="#00f0ff" rimColor="#0066ff" opacity={0.85} />
        </mesh>
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.2, 0.02, 16, 64]} />
          <meshBasicMaterial color="#00f0ff" wireframe />
        </mesh>
        <mesh rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
          <torusGeometry args={[1.4, 0.02, 16, 64]} />
          <meshBasicMaterial color="#00ff88" wireframe />
        </mesh>
      </group>

      {/* Semicircular Floating Holographic Terminal Displays */}
      {/* Screen 1: Left Bio Monitor */}
      <group position={[-2.2, 1.8, 0.8]} rotation={[0, 0.6, 0]}>
        <mesh>
          <planeGeometry args={[1.6, 1.0]} />
          <HolographicMaterial color="#00f0ff" opacity={0.7} />
        </mesh>
      </group>

      {/* Screen 2: Center Metrics Monitor */}
      <group position={[0, 2.2, -1.8]} rotation={[0, 0, 0]}>
        <mesh>
          <planeGeometry args={[2.0, 1.2]} />
          <HolographicMaterial color="#00ff88" opacity={0.75} />
        </mesh>
      </group>

      {/* Screen 3: Right Systems Monitor */}
      <group position={[2.2, 1.8, 0.8]} rotation={[0, -0.6, 0]}>
        <mesh>
          <planeGeometry args={[1.6, 1.0]} />
          <HolographicMaterial color="#ff007f" opacity={0.7} />
        </mesh>
      </group>
    </group>
  );
}
