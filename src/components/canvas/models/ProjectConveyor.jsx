import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// 4 Featured Projects with real screenshots
const PROJECTS_DATA = [
  {
    title: 'CareerOS',
    category: 'CAREER WORKSPACE // VECTOR MATCH',
    image: '/assets/careeros.png',
    accent: '#00f0ff',
    pos: [0, 0, 0],
  },
  {
    title: 'CreatorIQ',
    category: 'CREATOR ANALYTICS // TIMESCALE',
    image: '/assets/yt-analysis.png',
    accent: '#ff007f',
    pos: [0, 0, -4.5],
  },
  {
    title: 'Subscription Guardian',
    category: 'BROWSER EXTENSION // MV3',
    image: '/assets/subscription-guardian.png',
    accent: '#00ff88',
    pos: [0, 0, -9.0],
  },
  {
    title: 'Modern E-Commerce Store',
    category: 'COMMERCE PLATFORM // SUPABASE',
    image: '/assets/ecommerse store thumbnail .png',
    accent: '#ffaa00',
    pos: [0, 0, -13.5],
  },
];

function ProjectCard({ project, onSelect }) {
  const meshRef = useRef();
  let texture;
  try {
    texture = useTexture(project.image);
  } catch {
    texture = null;
  }

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Gentle floating hover
      meshRef.current.position.y =
        1.8 + Math.sin(clock.getElapsedTime() * 1.5 + project.pos[2]) * 0.08;
    }
  });

  return (
    <group position={project.pos}>
      {/* Conveyor Rail Base Segment */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[4.2, 0.3, 3.8]} />
        <meshStandardMaterial color="#0c0e15" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Glowing Neon Rail Guides */}
      <mesh position={[-2.05, 0.32, 0]}>
        <boxGeometry args={[0.08, 0.08, 3.8]} />
        <meshStandardMaterial
          color={project.accent}
          emissive={project.accent}
          emissiveIntensity={2.0}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[2.05, 0.32, 0]}>
        <boxGeometry args={[0.08, 0.08, 3.8]} />
        <meshStandardMaterial
          color={project.accent}
          emissive={project.accent}
          emissiveIntensity={2.0}
          toneMapped={false}
        />
      </mesh>

      {/* Floating 3D Project Card Plaque */}
      <group
        ref={meshRef}
        position={[0, 1.8, 0]}
        rotation={[0, -0.2, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.(project);
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        {/* Backing Frame */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.2, 2.0, 0.1]} />
          <meshStandardMaterial color="#10141e" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Screenshot Front Face */}
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[3.0, 1.8]} />
          {texture ? (
            <meshBasicMaterial map={texture} />
          ) : (
            <meshStandardMaterial color="#1a2233" metalness={0.7} roughness={0.3} />
          )}
        </mesh>

        {/* Glowing Rim Border */}
        <mesh position={[0, 0, 0.055]}>
          <boxGeometry args={[3.08, 1.88, 0.02]} />
          <meshStandardMaterial
            color={project.accent}
            emissive={project.accent}
            emissiveIntensity={1.5}
            wireframe
          />
        </mesh>
      </group>
    </group>
  );
}

export function ProjectConveyor({ position = [4.5, 0, -15], onSelectProject }) {
  return (
    <group position={position}>
      {PROJECTS_DATA.map((project, idx) => (
        <ProjectCard key={idx} project={project} onSelect={onSelectProject} />
      ))}
    </group>
  );
}
