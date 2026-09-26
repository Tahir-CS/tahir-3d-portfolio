import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshReflectorMaterial, Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollProgress } from '../../../context/ScrollContext';

// Monoliths rising out of the liquid ocean
const MONOLITHS = [
  { name: 'GOLANG', desc: 'Concurrency & Distributed Runtimes', pos: [-5.0, 1.2, -10], height: 3.2, color: '#00add8' },
  { name: 'NODE.JS', desc: 'Microservices & Event Loops', pos: [-2.2, 1.6, -13], height: 4.0, color: '#68a063' },
  { name: 'C++ CORE', desc: 'Memory Management & SIMD', pos: [0.0, 2.0, -11], height: 4.8, color: '#f34b7d' },
  { name: 'DOCKER & K8S', desc: 'Cluster Orchestration & Pods', pos: [2.4, 1.5, -14], height: 3.8, color: '#2496ed' },
  { name: 'AWS CLOUD', desc: 'Serverless, S3 & API Gateway', pos: [5.2, 1.1, -10], height: 3.0, color: '#ff9900' },
  { name: 'POSTGRES', desc: 'ACID Transactions & Query Optimization', pos: [-3.8, 0.9, -7], height: 2.6, color: '#336791' },
  { name: 'REDIS', desc: 'Sub-millisecond In-Memory Caching', pos: [3.8, 0.9, -7], height: 2.6, color: '#dc382d' },
];

export function LiquidChromeOcean({ position = [0, -0.6, -11] }) {
  const { theme, wireframeMode } = useScrollProgress();
  const planeRef = useRef();
  const monolithGroupRef = useRef();

  useFrame((state, delta) => {
    if (monolithGroupRef.current) {
      // Gentle ocean bobbing for the pillars
      monolithGroupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    }
  });

  const isObsidian = theme === 'obsidian';

  return (
    <group position={position}>
      {/* 1. Reflective Liquid Chrome Water Surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow ref={planeRef}>
        <planeGeometry args={[65, 55, 64, 64]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={1024}
          mirror={isObsidian ? 0.92 : 0.82}
          mixBlur={1.2}
          mixStrength={isObsidian ? 35 : 22}
          roughness={isObsidian ? 0.06 : 0.12}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color={wireframeMode ? '#001a10' : (isObsidian ? '#08080c' : '#efe8dc')}
          metalness={isObsidian ? 0.98 : 0.86}
          distortion={0.35}
          wireframe={wireframeMode}
        />
      </mesh>

      {/* 2. Floating Infrastructure Monoliths rising from the chrome surface */}
      <group ref={monolithGroupRef}>
        {MONOLITHS.map((mono, idx) => (
          <Float key={mono.name} speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <group position={mono.pos}>
              {/* Titanium Monolith Body */}
              <mesh castShadow receiveShadow position={[0, mono.height / 2, 0]}>
                <boxGeometry args={[1.1, mono.height, 0.35]} />
                <meshStandardMaterial
                  color={wireframeMode ? '#003318' : (isObsidian ? '#141419' : '#fcfaf6')}
                  metalness={0.92}
                  roughness={isObsidian ? 0.12 : 0.18}
                  wireframe={wireframeMode}
                />
              </mesh>

              {/* Glowing Laser Inscription Edge */}
              <mesh position={[0, mono.height / 2, 0.18]}>
                <planeGeometry args={[1.06, mono.height * 0.96]} />
                <meshBasicMaterial
                  color={wireframeMode ? '#00ff88' : (isObsidian ? mono.color : '#b38b38')}
                  wireframe={wireframeMode}
                  transparent
                  opacity={0.12}
                />
              </mesh>

              {/* Monolith Typographic Label */}
              <Text
                position={[0, mono.height - 0.4, 0.2]}
                fontSize={0.2}
                color={isObsidian ? '#ffffff' : '#18181b'}
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.08}
              >
                {mono.name}
              </Text>

              {/* Technical Descriptor */}
              <Text
                position={[0, mono.height - 0.75, 0.2]}
                fontSize={0.09}
                color={isObsidian ? 'rgba(255,255,255,0.65)' : 'rgba(24,24,27,0.65)'}
                anchorX="center"
                anchorY="middle"
                maxWidth={0.95}
                textAlign="center"
              >
                {mono.desc}
              </Text>

              {/* Bottom Water Glow Ring */}
              <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.55, 0.85, 32]} />
                <meshBasicMaterial
                  color={wireframeMode ? '#00ff88' : (isObsidian ? mono.color : '#c5a059')}
                  transparent
                  opacity={0.35}
                />
              </mesh>
            </group>
          </Float>
        ))}
      </group>
    </group>
  );
}
