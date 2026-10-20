// src/components/canvas/models/CityAvenueDistrict.jsx
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollProgress } from '../../../context/ScrollContext';
import { sound } from '../../../utils/soundEngine';

const TECH_PILLARS = [
  {
    name: 'DISTRIBUTED & QUEUES',
    desc: 'BullMQ • Redis • Event-Driven • Rate Limiting • Worker Pools',
    pos: [-5.2, 0, 1.0],
    height: 3.6,
    color: '#00add8',
  },
  {
    name: 'NODE.JS & BACKEND',
    desc: 'TypeScript • Express.js • Microservices • REST APIs',
    pos: [-2.4, 0, -2.0],
    height: 4.3,
    color: '#68a063',
  },
  {
    name: 'C++ & SYSTEMS CORE',
    desc: 'Memory Optimization • SIMD • OS Concurrency • DSA',
    pos: [0.0, 0, 0.5],
    height: 5.0,
    color: '#f34b7d',
  },
  {
    name: 'DOCKER & INFRA',
    desc: 'Docker Compose • CI/CD Workflows • Linux / Bash • Git',
    pos: [2.6, 0, -3.0],
    height: 4.1,
    color: '#2496ed',
  },
  {
    name: 'AWS CLOUD',
    desc: 'AWS EC2 • S3 Presigned Streams • Serverless Gateways',
    pos: [5.4, 0, 1.2],
    height: 3.4,
    color: '#ff9900',
  },
  {
    name: 'POSTGRES & VECTORS',
    desc: 'PostgreSQL • pgvector • TimescaleDB • Supabase RLS',
    pos: [-3.8, 0, 3.8],
    height: 3.1,
    color: '#336791',
  },
  {
    name: 'CLIENT & MV3 APIS',
    desc: 'React.js • Next.js • Chrome MV3 • Three.js / R3F / GLSL',
    pos: [3.8, 0, 3.8],
    height: 3.1,
    color: '#dc382d',
  },
];

export function CityAvenueDistrict({ position = [0, -1.2, -10.5] }) {
  const { theme, wireframeMode, setFocusedTarget } = useScrollProgress();
  const isObsidian = theme === 'obsidian';
  const groupRef = useRef();
  const [hoveredPillar, setHoveredPillar] = useState(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.02;
    }
  });

  const handleFocusPillar = (pillar, e) => {
    e.stopPropagation();
    sound.playHoloEngage();
    const wx = position[0] + pillar.pos[0];
    const wy = position[1] + pillar.height * 0.65;
    const wz = position[2] + pillar.pos[2];

    setFocusedTarget({
      title: `TECH MONOLITH // ${pillar.name}`,
      sub: pillar.desc,
      pos: [wx, wy, wz + 2.6],
      lookAt: [wx, wy, wz],
    });
  };

  return (
    <group position={position} ref={groupRef}>
      {/* 1. Urban Street Plaza Pavement */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 50]} />
        <meshStandardMaterial
          color={wireframeMode ? '#001a10' : isObsidian ? '#08090d' : '#d8d4cc'}
          metalness={isObsidian ? 0.7 : 0.2}
          roughness={isObsidian ? 0.4 : 0.7}
          wireframe={wireframeMode}
        />
      </mesh>

      {/* 2. Neon Cyber Boulevard Guidance Tracks */}
      {[-6.0, -2.0, 2.0, 6.0].map((x, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.02, 0]}>
          <planeGeometry args={[0.08, 48]} />
          <meshBasicMaterial
            color={wireframeMode ? '#00ff88' : isObsidian ? '#00f0ff' : '#d4af37'}
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

      {/* 4. Interactive Illuminated Tech Pillars Flanking the City Boulevard */}
      {TECH_PILLARS.map((pillar) => {
        const isHovered = hoveredPillar === pillar.name;
        return (
          <Float key={pillar.name} speed={1.2} rotationIntensity={0.08} floatIntensity={0.14}>
            <group
              position={pillar.pos}
              onClick={(e) => handleFocusPillar(pillar, e)}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = 'pointer';
                sound.playClick(1.3);
                setHoveredPillar(pillar.name);
              }}
              onPointerOut={() => {
                document.body.style.cursor = 'auto';
                setHoveredPillar(null);
              }}
            >
              {/* Structural Monolith Column */}
              <mesh castShadow receiveShadow position={[0, pillar.height / 2, 0]}>
                <boxGeometry args={[1.45, pillar.height, 0.4]} />
                <meshStandardMaterial
                  color={wireframeMode ? '#003318' : isObsidian ? '#0f1118' : '#f5f0e8'}
                  metalness={0.94}
                  roughness={isObsidian ? 0.12 : 0.18}
                  wireframe={wireframeMode}
                />
              </mesh>

              {/* Glowing Digital Screen Panel Facing the Avenue */}
              <mesh position={[0, pillar.height / 2, 0.21]}>
                <planeGeometry args={[1.35, pillar.height * 0.94]} />
                <meshBasicMaterial
                  color={wireframeMode ? '#00ff88' : isObsidian ? pillar.color : '#b38b38'}
                  transparent
                  opacity={isHovered ? 0.38 : 0.2}
                />
              </mesh>

              {/* Tech Domain Title */}
              <Text
                position={[0, pillar.height - 0.45, 0.23]}
                fontSize={0.13}
                color={isObsidian ? '#ffffff' : '#18181b'}
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.05}
                maxWidth={1.25}
                textAlign="center"
                fontWeight="bold"
              >
                {pillar.name}
              </Text>

              {/* Full Skill Stack Etched onto the 3D Monolith */}
              <Text
                position={[0, pillar.height - 1.15, 0.23]}
                fontSize={0.085}
                color={isObsidian ? '#e2e8f0' : '#18181b'}
                anchorX="center"
                anchorY="middle"
                maxWidth={1.2}
                lineHeight={1.45}
                textAlign="center"
              >
                {pillar.desc}
              </Text>

              {/* Click Prompt on Monolith */}
              <Text
                position={[0, 0.35, 0.23]}
                fontSize={0.075}
                color={isObsidian ? '#00f0ff' : '#b38b38'}
                anchorX="center"
                anchorY="middle"
                fontWeight="bold"
              >
                [CLICK PILLAR TO ZOOM]
              </Text>

              {/* Base Neon Foundation Ring */}
              <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.65, 0.95, 32]} />
                <meshBasicMaterial
                  color={wireframeMode ? '#00ff88' : isObsidian ? pillar.color : '#c5a059'}
                  transparent
                  opacity={isHovered ? 0.85 : 0.5}
                />
              </mesh>
            </group>
          </Float>
        );
      })}

      {/* 5. Cyber Street Lamp Beacons */}
      {[-7.5, 7.5].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          {[-15, -5, 5, 15].map((z, j) => (
            <group key={j} position={[0, 0, z]}>
              <mesh position={[0, 2.5, 0]}>
                <cylinderGeometry args={[0.04, 0.06, 5.0, 8]} />
                <meshStandardMaterial color={isObsidian ? '#181822' : '#888'} metalness={0.9} />
              </mesh>
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
