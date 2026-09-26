import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollProgress } from '../../../context/ScrollContext';
import { portfolioConfig } from '../../../config/portfolio.config';

function ProjectGlassSlab({ project, index, position, onSelect }) {
  const { theme, wireframeMode } = useScrollProgress();
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState(null);

  const isObsidian = theme === 'obsidian';

  // Load project image safely without violating rules of hooks
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

  useFrame(({ camera }, delta) => {
    if (!groupRef.current) return;

    // Calculate vertical distance from camera to slab
    const distY = camera.position.y - position[1];
    
    // Proximity factor: 1 when camera is level with slab, 0 when far
    const proximity = THREE.MathUtils.clamp(1 - Math.abs(distY) / 5.5, 0, 1);

    // Dynamic tilt angle and horizontal slide as camera plummets past
    const side = index % 2 === 0 ? 1 : -1;
    const targetRotX = (distY * 0.04) + (hovered ? 0.05 : 0);
    const targetRotZ = side * (0.04 + proximity * 0.05);
    const targetPosX = position[0] + (1 - proximity) * (side * 1.2) + (hovered ? side * 0.3 : 0);

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.1);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.1);
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX, 0.1);

    if (hovered) {
      groupRef.current.scale.lerp(new THREE.Vector3(1.04, 1.04, 1.04), 0.15);
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

      {/* 4. 3D Specular Typography Etched onto Glass */}
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

export function ProjectChasm({ position = [0, 0, 0], onSelectProject }) {
  const projects = (portfolioConfig.projects || []).slice(0, 4);

  // Staggered vertical heights for the free-fall descent
  const SLAB_CONFIGS = [
    { y: 10.0, x: -1.8, z: 0 },
    { y: 5.5,  x: 1.8,  z: -0.5 },
    { y: 1.0,  x: -1.6, z: 0.2 },
    { y: -3.5, x: 1.6,  z: -0.2 },
  ];

  return (
    <group position={position}>
      {/* Vertical Fall Guide Rail Beams */}
      <mesh position={[-4.2, 3.5, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 22, 16]} />
        <meshBasicMaterial color="rgba(255, 255, 255, 0.15)" transparent opacity={0.3} />
      </mesh>
      <mesh position={[4.2, 3.5, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 22, 16]} />
        <meshBasicMaterial color="rgba(255, 255, 255, 0.15)" transparent opacity={0.3} />
      </mesh>

      {/* Floating 3D Project Slabs */}
      {projects.map((proj, idx) => {
        const cfg = SLAB_CONFIGS[idx] || { y: -3 - idx * 4, x: 0, z: 0 };
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
