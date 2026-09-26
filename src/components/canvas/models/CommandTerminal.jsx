import React from 'react';
import * as THREE from 'three';
import { HolographicMaterial } from '../../shaders/HolographicMaterial';

export function CommandTerminal({ position = [0, 0, -25] }) {
  return (
    <group position={position}>
      {/* Central Pedestal Column */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.55, 1.2, 8]} />
        <meshStandardMaterial color="#0c0f16" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Console Top Desk Surface */}
      <mesh position={[0, 1.2, 0.2]} rotation={[-0.22, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.08, 1.0]} />
        <meshStandardMaterial color="#141923" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Illuminated Cyber Keyboard / Deck Interface */}
      <mesh position={[0, 1.25, 0.2]} rotation={[-0.22, 0, 0]}>
        <planeGeometry args={[1.8, 0.55]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={1.5}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Main Curved Center Hologram Screen */}
      <mesh position={[0, 1.95, -0.1]} rotation={[0.06, 0, 0]}>
        <planeGeometry args={[2.0, 1.1]} />
        <HolographicMaterial color="#00f0ff" opacity={0.85} />
      </mesh>

      {/* Left Auxiliary Diagnostics Monitor */}
      <mesh position={[-1.4, 1.85, 0.1]} rotation={[0.06, 0.45, 0]}>
        <planeGeometry args={[1.0, 0.8]} />
        <HolographicMaterial color="#00ff88" opacity={0.7} />
      </mesh>

      {/* Right Auxiliary Network Monitor */}
      <mesh position={[1.4, 1.85, 0.1]} rotation={[0.06, -0.45, 0]}>
        <planeGeometry args={[1.0, 0.8]} />
        <HolographicMaterial color="#ff007f" opacity={0.7} />
      </mesh>

      {/* Ground Base Floor Anchor Plate */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.7, 1.6, 6]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={1.2}
          wireframe
        />
      </mesh>
    </group>
  );
}
