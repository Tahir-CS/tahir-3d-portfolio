import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollProgress } from '../../../context/ScrollContext';
import { portfolioConfig } from '../../../config/portfolio.config';
import { ProjectShaderPlane } from '../ProjectShaderPlane';
import { sound } from '../../../utils/soundEngine';

function ProjectGlassSlab({ project, index, position, worldOffset, onSelect, onFocusSlab }) {
  const { theme, wireframeMode } = useScrollProgress();
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const isObsidian = theme === 'obsidian';

  useFrame(({ camera }) => {
    if (!groupRef.current) return;

    const distY = camera.position.y - (position[1] + worldOffset[1]);
    const proximity = THREE.MathUtils.clamp(1 - Math.abs(distY) / 4.5, 0, 1);
    const side = index % 2 === 0 ? 1 : -1;

    const targetRotX = distY * 0.025 + (hovered ? 0.04 : 0);
    const targetRotY = side * (0.06 + proximity * 0.04);

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.1);

    const targetScale = hovered ? 1.05 : 1.0;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
  });

  const handleClick = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    sound.playHoloEngage();
    onFocusSlab?.(project, position);
  };

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        sound.playClick(1.2);
        setHovered(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
        setHovered(false);
      }}
      onClick={handleClick}
    >
      {/* 1. Sleek Physical Glass Monolith Frame (Zero FBO transmission overhead) */}
      <mesh>
        <boxGeometry args={[4.4, 2.75, 0.14]} />
        <meshPhysicalMaterial
          roughness={isObsidian ? 0.08 : 0.14}
          metalness={isObsidian ? 0.45 : 0.2}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
          reflectivity={0.8}
          color={
            wireframeMode
              ? '#00ff88'
              : hovered
              ? isObsidian
                ? '#1e293b'
                : '#fff9ed'
              : isObsidian
              ? '#0d0f16'
              : '#f5efe4'
          }
          wireframe={wireframeMode}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* 2. Sleek Titanium Perimeter Bezel */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(4.42, 2.77, 0.15)]} />
        <lineBasicMaterial
          color={
            wireframeMode
              ? '#00ff88'
              : hovered
              ? isObsidian
                ? '#00f0ff'
                : '#b38b38'
              : isObsidian
              ? 'rgba(56,189,248,0.35)'
              : 'rgba(180,160,130,0.45)'
          }
        />
      </lineSegments>

      {/* 3. Project GLSL Distort Shader Display Quad */}
      {!wireframeMode && (
        <ProjectShaderPlane
          imageUrl={project.thumbnail}
          position={[0, 0.36, 0.085]}
          scale={[1, 1, 1]}
          onSelect={() => handleClick({ stopPropagation: () => {} })}
        />
      )}

      {/* 4. 3D Typography Etched onto Glass */}
      <Text
        position={[-1.95, -0.68, 0.09]}
        fontSize={0.17}
        color={isObsidian ? '#ffffff' : '#18181b'}
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.02}
        fontWeight="bold"
      >
        {`${project.index} // ${project.title.toUpperCase()}`}
      </Text>

      <Text
        position={[-1.95, -0.94, 0.09]}
        fontSize={0.095}
        color={isObsidian ? 'rgba(255,255,255,0.72)' : 'rgba(24,24,27,0.72)'}
        anchorX="left"
        anchorY="middle"
        maxWidth={3.1}
      >
        {project.description}
      </Text>

      {/* Action Pill on 3D Glass */}
      <Text
        position={[1.95, -0.68, 0.09]}
        fontSize={0.11}
        color={isObsidian ? '#00f0ff' : '#b38b38'}
        anchorX="right"
        anchorY="middle"
        fontWeight="bold"
      >
        CLICK 3D SLAB TO ZOOM ↗
      </Text>
    </group>
  );
}

export function ProjectChasm({ position = [0, 0, -18.5], onSelectProject }) {
  const { theme, wireframeMode, setFocusedTarget } = useScrollProgress();
  const isObsidian = theme === 'obsidian';

  // Render ALL 7 Projects from portfolio.config.js!
  const projects = portfolioConfig.projects || [];

  const SLAB_CONFIGS = [
    { y: 5.6,  x: -2.1, z: 1.2 },
    { y: 4.2,  x: 2.1,  z: 0.7 },
    { y: 2.8,  x: -2.0, z: 0.2 },
    { y: 1.4,  x: 2.0,  z: -0.3 },
    { y: 0.0,  x: -1.9, z: -0.8 },
    { y: -1.4, x: 1.9,  z: -1.3 },
    { y: -2.8, x: 0.0,  z: -1.7 },
  ];

  const handleFocusSlab = (proj, localPos) => {
    const worldX = position[0] + localPos[0];
    const worldY = position[1] + localPos[1];
    const worldZ = position[2] + localPos[2];

    // Fly camera 3.4 units directly in front of this 3D glass monolith
    setFocusedTarget({
      title: `${proj.index} // ${proj.title}`,
      sub: proj.category,
      pos: [worldX, worldY, worldZ + 3.4],
      lookAt: [worldX, worldY, worldZ],
      project: { ...proj, image: proj.thumbnail },
    });
  };

  return (
    <group position={position}>
      {/* 1. Architectural Showcase Skyscraper Tower Body */}
      <mesh position={[0, 1.5, -2.4]} receiveShadow>
        <boxGeometry args={[9.6, 18, 3.8]} />
        <meshStandardMaterial
          color={isObsidian ? '#0a0c14' : '#dedad2'}
          metalness={0.92}
          roughness={0.18}
          wireframe={wireframeMode}
        />
      </mesh>

      {/* 2. Glass Curtain Wall Edge Accents on Tower */}
      <mesh position={[0, 1.5, -0.45]}>
        <planeGeometry args={[9.2, 17.6]} />
        <meshStandardMaterial
          color={isObsidian ? '#002244' : '#bcd4e6'}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={isObsidian ? 0.35 : 0.2}
        />
      </mesh>

      {/* 3. All 7 Floating 3D Project Glass Slabs mounted on the skyscraper */}
      {projects.map((proj, idx) => {
        const cfg = SLAB_CONFIGS[idx] || { y: 4 - idx * 1.4, x: 0, z: 0 };
        return (
          <ProjectGlassSlab
            key={proj.index || idx}
            project={proj}
            index={idx}
            position={[cfg.x, cfg.y, cfg.z]}
            worldOffset={position}
            onSelect={onSelectProject}
            onFocusSlab={handleFocusSlab}
          />
        );
      })}
    </group>
  );
}
