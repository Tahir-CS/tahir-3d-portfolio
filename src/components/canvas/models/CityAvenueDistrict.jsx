import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollProgress } from '../../../context/ScrollContext';

// ─────────────────────────────────────────────────────────────────────────────
// CityAvenueDistrict (Skills & Distributed Systems Chapter)
// Replaces the old ocean with a cyber-architectural city avenue.
// Features 7 illuminated tech monolith pillars flanking the boulevard,
// street grid pavement, neon lane tracks, and atmospheric city depth.
// ─────────────────────────────────────────────────────────────────────────────

const TECH_PILLARS = [
  { name: 'GOLANG', desc: 'Concurrency & Runtimes', pos: [-5.2, 0, 1.0], height: 3.4, color: '#00add8' },
  { name: 'NODE.JS', desc: 'Microservices & Event Loops', pos: [-2.4, 0, -2.0], height: 4.2, color: '#68a063' },
  { name: 'C++ CORE', desc: 'Memory Optimization & SIMD', pos: [0.0, 0, 0.5], height: 5.0, color: '#f34b7d' },
  { name: 'DOCKER / K8S', desc: 'Cluster Mesh & Pod Orchestration', pos: [2.6, 0, -3.0], height: 4.0, color: '#2496ed' },
  { name: 'AWS CLOUD', desc: 'Serverless, S3 & API Gateway', pos: [5.4, 0, 1.2], height: 3.2, color: '#ff9900' },
  { name: 'POSTGRES', desc: 'ACID Transactions & PgVector', pos: [-3.8, 0, 3.8], height: 2.8, color: '#336791' },
  { name: 'REDIS', desc: 'Sub-ms In-Memory Caching', pos: [3.8, 0, 3.8], height: 2.8, color: '#dc382d' },
];

export function CityAvenueDistrict({ position = [0, -1.2, -11] }) {
  const { theme, wireframeMode } = useScrollProgress();
  const isObsidian = theme === 'obsidian';
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.02;
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

      {/* 4. Illuminated Tech Pillars Flanking the City Boulevard */}
      {TECH_PILLARS.map((pillar) => (
        <Float key={pillar.name} speed={1.2} rotationIntensity={0.1} floatIntensity={0.15}>
          <group position={pillar.pos}>
            {/* Structural Monolith Column */}
            <mesh castShadow receiveShadow position={[0, pillar.height / 2, 0]}>
              <boxGeometry args={[1.15, pillar.height, 0.38]} />
              <meshStandardMaterial
                color={wireframeMode ? '#003318' : (isObsidian ? '#0f1118' : '#f5f0e8')}
                metalness={0.94}
                roughness={isObsidian ? 0.12 : 0.18}
                wireframe={wireframeMode}
              />
            </mesh>

            {/* Glowing Digital Screen Panel Facing the Avenue */}
            <mesh position={[0, pillar.height / 2, 0.2]}>
              <planeGeometry args={[1.08, pillar.height * 0.94]} />
              <meshBasicMaterial
                color={wireframeMode ? '#00ff88' : (isObsidian ? pillar.color : '#b38b38')}
                transparent
                opacity={0.18}
              />
            </mesh>

            {/* Tech Title */}
            <Text
              position={[0, pillar.height - 0.42, 0.22]}
              fontSize={0.19}
              color={isObsidian ? '#ffffff' : '#18181b'}
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.08}
              fontWeight="bold"
            >
              {pillar.name}
            </Text>

            {/* Technical Descriptor */}
            <Text
              position={[0, pillar.height - 0.78, 0.22]}
              fontSize={0.085}
              color={isObsidian ? 'rgba(255,255,255,0.65)' : 'rgba(24,24,27,0.65)'}
              anchorX="center"
              anchorY="middle"
              maxWidth={0.96}
              textAlign="center"
            >
              {pillar.desc}
            </Text>

            {/* Base Neon Foundation Bracket (No water rings) */}
            <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.55, 0.85, 32]} />
              <meshBasicMaterial
                color={wireframeMode ? '#00ff88' : (isObsidian ? pillar.color : '#c5a059')}
                transparent
                opacity={0.5}
              />
            </mesh>
          </group>
        </Float>
      ))}

      {/* 5. Cyber Street Lamp Beacons along the pavement */}
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
