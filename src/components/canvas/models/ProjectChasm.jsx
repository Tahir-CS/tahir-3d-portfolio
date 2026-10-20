import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollProgress } from '../../../context/ScrollContext';
import { portfolioConfig } from '../../../config/portfolio.config';
import { ProjectShaderPlane } from '../ProjectShaderPlane';
import { sound } from '../../../utils/soundEngine';

function ProjectGlassSlab({
  project,
  index,
  position,
  rotation = [0, 0, 0],
  worldOffset,
  onSelect,
  onFocusSlab,
}) {
  const { theme, wireframeMode } = useScrollProgress();
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const isObsidian = theme === 'obsidian';

  useFrame(() => {
    if (!groupRef.current) return;
    const baseRotY = rotation[1] || 0;
    const targetRotX = hovered ? 0.04 : 0;
    const targetRotY = baseRotY + (hovered ? 0.04 : 0);

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.12);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.12);

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
      position={[position[0], position[1], position[2]]}
      rotation={rotation}
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
      {/* 1. Heavy Industrial Cantilever Mounting Struts Anchoring into Skyscraper Wall */}
      {[-1.5, 1.5].map((sx, si) => (
        <group key={si} position={[sx, 0, -0.6]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 1.2, 8]} />
            <meshStandardMaterial color={isObsidian ? '#1a1d28' : '#555'} metalness={0.92} />
          </mesh>
          <mesh position={[0, 0, -0.6]}>
            <boxGeometry args={[0.22, 0.22, 0.06]} />
            <meshStandardMaterial color={isObsidian ? '#2c3345' : '#777'} metalness={0.9} />
          </mesh>
        </group>
      ))}

      {/* 2. Sleek Physical Acrylic Glass Monolith Frame (Zero FBO transmission overhead) */}
      <mesh>
        <boxGeometry args={[4.2, 2.7, 0.14]} />
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

      {/* 3. Sleek Titanium Perimeter Bezel */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(4.22, 2.72, 0.15)]} />
        <lineBasicMaterial
          color={
            wireframeMode
              ? '#00ff88'
              : hovered
              ? isObsidian
                ? '#00f0ff'
                : '#b38b38'
              : isObsidian
              ? 'rgba(56,189,248,0.45)'
              : 'rgba(180,160,130,0.45)'
          }
        />
      </lineSegments>

      {/* 4. Project GLSL Distort Shader Display Quad */}
      {!wireframeMode && (
        <ProjectShaderPlane
          imageUrl={project.thumbnail}
          position={[0, 0.42, 0.085]}
          scale={[0.92, 0.72, 1]}
          onSelect={() => handleClick({ stopPropagation: () => {} })}
        />
      )}

      {/* 5. 3D Typography Etched onto Glass */}
      <Text
        position={[-1.85, -0.62, 0.09]}
        fontSize={0.16}
        color={isObsidian ? '#ffffff' : '#18181b'}
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.03}
        fontWeight="bold"
      >
        {`${project.index} // ${project.title.toUpperCase()}`}
      </Text>

      <Text
        position={[-1.85, -0.88, 0.09]}
        fontSize={0.092}
        color={isObsidian ? 'rgba(255,255,255,0.72)' : 'rgba(24,24,27,0.72)'}
        anchorX="left"
        anchorY="middle"
        maxWidth={3.0}
      >
        {project.description}
      </Text>

      {/* Action Pill on 3D Glass */}
      <Text
        position={[1.85, -0.62, 0.09]}
        fontSize={0.105}
        color={isObsidian ? '#00f0ff' : '#b38b38'}
        anchorX="right"
        anchorY="middle"
        fontWeight="bold"
      >
        CLICK TO ZOOM ↗
      </Text>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ProjectChasm — Grand Realistic Skyscraper Canyon Showcase
// Mounts all 7 projects onto 3 towering realistic skyscrapers with illuminated
// window grids, rooftop spires, and skybridges — zero generic flat boxes!
// ─────────────────────────────────────────────────────────────────────────────

export function ProjectChasm({ position = [0, 0, -18.5], onSelectProject }) {
  const { theme, wireframeMode, setFocusedTarget } = useScrollProgress();
  const isObsidian = theme === 'obsidian';

  // Render ALL 7 Projects from portfolio.config.js
  const projects = portfolioConfig.projects || [];

  // Expansive 3-column amphitheater gallery wall layout: ZERO OVERLAPPING!
  const SLAB_CONFIGS = [
    // Left Skyscraper Wing:
    { x: -4.8, y: 3.8,  z: 0.0,  rotY: 0.22 },  // 01: CareerOS
    // Center Skyscraper Top:
    { x: 0.0,  y: 4.2,  z: -0.6, rotY: 0.00 },  // 02: Subscription Guardian
    // Right Skyscraper Wing:
    { x: 4.8,  y: 3.8,  z: 0.0,  rotY: -0.22 }, // 03: TrendVision Analytics
    // Left Skyscraper Mid:
    { x: -4.8, y: 0.8,  z: 0.0,  rotY: 0.22 },  // 04: AI Resume Analyzer
    // Center Skyscraper Mid:
    { x: 0.0,  y: 1.2,  z: -0.6, rotY: 0.00 },  // 05: YouTube Analysis Hub
    // Right Skyscraper Mid:
    { x: 4.8,  y: 0.8,  z: 0.0,  rotY: -0.22 }, // 06: UET OpenCourseWare
    // Center Skyscraper Plaza Base:
    { x: 0.0,  y: -1.8, z: -0.6, rotY: 0.00 },  // 07: Next.js E-Commerce Store
  ];

  const handleFocusSlab = (proj, localPos) => {
    const worldX = position[0] + localPos[0];
    const worldY = position[1] + localPos[1];
    const worldZ = position[2] + localPos[2];

    // Fly camera directly 2.8 units in front of this 3D glass monolith
    setFocusedTarget({
      title: `${proj.index} // ${proj.title}`,
      sub: `${proj.category} (Press ESC to return)`,
      pos: [worldX, worldY, worldZ + 2.8],
      lookAt: [worldX, worldY, worldZ],
      project: { ...proj, image: proj.thumbnail },
    });
  };

  return (
    <group position={position}>
      {/* ─────────────────────────────────────────────────────────────────────────────
          REALISTIC 3D SKYSCRAPER ARCHITECTURE (3 Towering Megastructures)
          ───────────────────────────────────────────────────────────────────────────── */}

      {/* 1. Center Landmark Skyscraper Tower */}
      <group position={[0, 1.5, -2.6]}>
        {/* Tower Body */}
        <mesh receiveShadow>
          <boxGeometry args={[6.2, 19.5, 4.2]} />
          <meshStandardMaterial
            color={isObsidian ? '#080a12' : '#dedad2'}
            metalness={0.94}
            roughness={0.18}
            wireframe={wireframeMode}
          />
        </mesh>
        {/* Illuminated Glass Curtain Wall (Front Facade) */}
        <mesh position={[0, 0, 2.12]}>
          <planeGeometry args={[5.8, 18.6, 8, 24]} />
          <meshStandardMaterial
            color={isObsidian ? '#002244' : '#bcd4e6'}
            emissive={isObsidian ? '#004488' : '#e8f0fe'}
            emissiveIntensity={isObsidian ? 0.35 : 0.15}
            metalness={0.88}
            roughness={0.12}
          />
        </mesh>
        {/* Rooftop Spire & Aircraft Warning Beacon */}
        <mesh position={[0, 10.8, 0]}>
          <cylinderGeometry args={[0.04, 0.16, 2.8, 8]} />
          <meshStandardMaterial
            color={isObsidian ? '#00f0ff' : '#d4af37'}
            emissive={isObsidian ? '#00f0ff' : '#d4af37'}
            emissiveIntensity={1.5}
          />
        </mesh>
      </group>

      {/* 2. Left Skyscraper Tower */}
      <group position={[-5.8, 1.2, -2.4]}>
        <mesh receiveShadow>
          <boxGeometry args={[5.0, 17.0, 3.8]} />
          <meshStandardMaterial
            color={isObsidian ? '#0c0f18' : '#cfcac0'}
            metalness={0.9}
            roughness={0.22}
            wireframe={wireframeMode}
          />
        </mesh>
        <mesh position={[0, 0, 1.92]}>
          <planeGeometry args={[4.6, 16.2, 6, 20]} />
          <meshStandardMaterial
            color={isObsidian ? '#003366' : '#a8c8e0'}
            emissive={isObsidian ? '#003366' : '#dce8f8'}
            emissiveIntensity={isObsidian ? 0.3 : 0.1}
            metalness={0.85}
          />
        </mesh>
        <mesh position={[0, 9.4, 0]}>
          <cylinderGeometry args={[0.03, 0.12, 2.0, 8]} />
          <meshStandardMaterial
            color={isObsidian ? '#00ff88' : '#b38b38'}
            emissive={isObsidian ? '#00ff88' : '#b38b38'}
            emissiveIntensity={1.2}
          />
        </mesh>
      </group>

      {/* 3. Right Skyscraper Tower */}
      <group position={[5.8, 1.2, -2.4]}>
        <mesh receiveShadow>
          <boxGeometry args={[5.0, 17.0, 3.8]} />
          <meshStandardMaterial
            color={isObsidian ? '#0c0f18' : '#cfcac0'}
            metalness={0.9}
            roughness={0.22}
            wireframe={wireframeMode}
          />
        </mesh>
        <mesh position={[0, 0, 1.92]}>
          <planeGeometry args={[4.6, 16.2, 6, 20]} />
          <meshStandardMaterial
            color={isObsidian ? '#003366' : '#a8c8e0'}
            emissive={isObsidian ? '#003366' : '#dce8f8'}
            emissiveIntensity={isObsidian ? 0.3 : 0.1}
            metalness={0.85}
          />
        </mesh>
        <mesh position={[0, 9.4, 0]}>
          <cylinderGeometry args={[0.03, 0.12, 2.0, 8]} />
          <meshStandardMaterial
            color={isObsidian ? '#00f0ff' : '#d4af37'}
            emissive={isObsidian ? '#00f0ff' : '#d4af37'}
            emissiveIntensity={1.2}
          />
        </mesh>
      </group>

      {/* Connecting Skybridges Between Towers */}
      {[-0.6, 6.8].map((bridgeY, bi) => (
        <group key={bi} position={[0, bridgeY, -1.8]}>
          <mesh position={[-3.0, 0, 0]}>
            <boxGeometry args={[1.6, 0.8, 1.2]} />
            <meshStandardMaterial color={isObsidian ? '#181b24' : '#555'} metalness={0.92} />
          </mesh>
          <mesh position={[3.0, 0, 0]}>
            <boxGeometry args={[1.6, 0.8, 1.2]} />
            <meshStandardMaterial color={isObsidian ? '#181b24' : '#555'} metalness={0.92} />
          </mesh>
        </group>
      ))}

      {/* Skyscraper Header Marquee Title */}
      <Text
        position={[0, 6.5, -0.32]}
        fontSize={0.34}
        color={isObsidian ? '#00f0ff' : '#18181b'}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.12}
        fontWeight="bold"
      >
        FEATURED SYSTEMS &amp; FULL-STACK DEPLOYMENTS
      </Text>

      <Text
        position={[0, 6.05, -0.32]}
        fontSize={0.14}
        color={isObsidian ? 'rgba(255,255,255,0.65)' : 'rgba(24,24,27,0.65)'}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        ARCHITECTED WITH HIGH CONCURRENCY, RESILIENT DATA LAYERS &amp; CLEAN SHADERS
      </Text>

      {/* 4. All 7 Floating 3D Project Glass Slabs mounted on the skyscraper facades */}
      {projects.map((proj, idx) => {
        const cfg = SLAB_CONFIGS[idx] || { x: 0, y: 0, z: 0, rotY: 0 };
        return (
          <ProjectGlassSlab
            key={proj.index || idx}
            project={proj}
            index={idx}
            position={[cfg.x, cfg.y, cfg.z]}
            rotation={[0, cfg.rotY, 0]}
            worldOffset={position}
            onSelect={onSelectProject}
            onFocusSlab={(p, pos) => handleFocusSlab(p, [cfg.x, cfg.y, cfg.z])}
          />
        );
      })}
    </group>
  );
}
