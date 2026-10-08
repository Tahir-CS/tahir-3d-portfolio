import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollProgress } from '../../../context/ScrollContext';
import { portfolioConfig } from '../../../config/portfolio.config';

function ProjectGlassSlab({ project, index, position, onSelect }) {
  const { theme, wireframeMode } = useScrollProgress();
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState(null);

  const isObsidian = theme === 'obsidian';

  // Load project thumbnail safely
  useEffect(() => {
    if (project.thumbnail) {
      const loader = new THREE.TextureLoader();
      loader.load(
        project.thumbnail,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          setTexture(tex);
        },
        undefined,
        (err) => console.warn('Could not load project thumbnail:', project.thumbnail, err)
      );
    }
  }, [project.thumbnail]);

  useFrame(({ camera }) => {
    if (!groupRef.current) return;

    // Smooth subtle proximity tilt as camera glides past
    const distY = camera.position.y - (position[1] + groupRef.current.parent.position.y);
    const proximity = THREE.MathUtils.clamp(1 - Math.abs(distY) / 4.0, 0, 1);

    const side = index % 2 === 0 ? 1 : -1;
    const targetRotX = (distY * 0.03) + (hovered ? 0.05 : 0);
    const targetRotY = side * (0.05 + proximity * 0.04);

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.1);

    if (hovered) {
      groupRef.current.scale.lerp(new THREE.Vector3(1.05, 1.05, 1.05), 0.15);
    } else {
      groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.15);
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        if (onSelect) onSelect(project);
      }}
    >
      {/* 1. Frosted Physical Glass Monolith Frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[4.4, 2.7, 0.12]} />
        <meshPhysicalMaterial
          roughness={isObsidian ? 0.12 : 0.18}
          metalness={isObsidian ? 0.85 : 0.4}
          transmission={wireframeMode ? 0 : 0.75}
          ior={1.45}
          thickness={0.3}
          color={
            wireframeMode
              ? '#00ff88'
              : hovered
              ? (isObsidian ? '#1e2433' : '#fff9ed')
              : (isObsidian ? '#0d0f16' : '#f5efe4')
          }
          wireframe={wireframeMode}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* 2. Sleek Titanium Perimeter Bezel */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(4.42, 2.72, 0.13)]} />
        <lineBasicMaterial
          color={
            wireframeMode
              ? '#00ff88'
              : hovered
              ? (isObsidian ? '#38bdf8' : '#b38b38')
              : (isObsidian ? 'rgba(255,255,255,0.25)' : 'rgba(180,160,130,0.45)')
          }
        />
      </lineSegments>

      {/* 3. Project Screenshot Display Quad */}
      {texture && !wireframeMode && (
        <mesh position={[0, 0.35, 0.07]}>
          <planeGeometry args={[3.9, 1.6]} />
          <meshBasicMaterial map={texture} transparent opacity={0.95} />
        </mesh>
      )}

      {/* 4. 3D Typography Etched onto Glass */}
      <Text
        position={[-1.9, -0.65, 0.08]}
        fontSize={0.17}
        color={isObsidian ? '#ffffff' : '#18181b'}
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.02}
        fontWeight="bold"
      >
        {`0${index + 1} // ${project.title.toUpperCase()}`}
      </Text>

      <Text
        position={[-1.9, -0.92, 0.08]}
        fontSize={0.105}
        color={isObsidian ? 'rgba(255,255,255,0.7)' : 'rgba(24,24,27,0.7)'}
        anchorX="left"
        anchorY="middle"
        maxWidth={3.2}
      >
        {project.subtitle || project.description}
      </Text>

      {/* Highlight Metric Pill */}
      <Text
        position={[1.9, -0.65, 0.08]}
        fontSize={0.12}
        color={isObsidian ? '#38bdf8' : '#b38b38'}
        anchorX="right"
        anchorY="middle"
        fontWeight="bold"
      >
        {project.metrics ? project.metrics[0]?.value : 'INSPECT ARCH →'}
      </Text>
    </group>
  );
}

export function ProjectChasm({ position = [0, 0, -18.5], onSelectProject }) {
  const { theme, wireframeMode } = useScrollProgress();
  const isObsidian = theme === 'obsidian';
  const projects = (portfolioConfig.projects || []).slice(0, 4);

  // Positioned along the Skyscraper Showcase Facade in the City Plaza
  const SLAB_CONFIGS = [
    { y: 5.0,  x: -1.7, z: 0.6 },
    { y: 3.2,  x: 1.7,  z: 0.0 },
    { y: 1.2,  x: -1.5, z: -0.6 },
    { y: -0.8, x: 1.5,  z: -1.2 },
  ];

  return (
    <group position={position}>
      {/* 1. Architectural Showcase Skyscraper Tower Body */}
      <mesh position={[0, 2.2, -1.8]} receiveShadow>
        <boxGeometry args={[8.8, 15, 3.8]} />
        <meshStandardMaterial
          color={isObsidian ? '#0a0c14' : '#dedad2'}
          metalness={0.92}
          roughness={0.18}
          wireframe={wireframeMode}
        />
      </mesh>

      {/* 2. Glass Curtain Wall Edge Accents on Tower */}
      <mesh position={[0, 2.2, 0.12]}>
        <planeGeometry args={[8.6, 14.8]} />
        <meshStandardMaterial
          color={isObsidian ? '#002244' : '#bcd4e6'}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={isObsidian ? 0.35 : 0.2}
        />
      </mesh>

      {/* 3. Floating 3D Project Glass Slabs mounted on the skyscraper */}
      {projects.map((proj, idx) => {
        const cfg = SLAB_CONFIGS[idx] || { y: -idx * 2, x: 0, z: 0 };
        return (
          <ProjectGlassSlab
            key={proj.id}
            project={proj}
            index={idx}
            position={[cfg.x, cfg.y, cfg.z]}
            onSelect={onSelectProject}
          />
        );
      })}
    </group>
  );
}
