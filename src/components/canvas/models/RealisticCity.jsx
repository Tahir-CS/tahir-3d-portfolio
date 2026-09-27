import React, { useMemo, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollProgress } from '../../../context/ScrollContext';
import { BuildingScreens, SideBillboardScreen } from './BuildingScreens';
import { CityScape } from './CityScape';

// ─────────────────────────────────────────────────────────────────────────────
// RealisticCity
// Loads the user's authentic 3D buildings GLB (allBuildings.glb), integrates
// real architectural facades, mounts giant LED billboards on the skyscrapers,
// and complements with procedural skyline depth.
// ─────────────────────────────────────────────────────────────────────────────

export function RealisticCity({ position = [0, -1.6, -17], scale = 0.16 }) {
  const { theme, wireframeMode } = useScrollProgress();
  const isObsidian = theme === 'obsidian';
  const groupRef = useRef();

  // Load user's downloaded allBuildings.glb
  const { scene } = useGLTF('/models/allBuildings.glb');

  // Clone and calibrate materials
  const clonedCity = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          child.material = child.material.clone();
          if (wireframeMode) {
            child.material.wireframe = true;
            child.material.color = new THREE.Color('#00ff88');
          } else if (isObsidian) {
            // Obsidian Noir Night Skyline: deeper tones with sharp reflections
            child.material.roughness = Math.min(child.material.roughness || 0.5, 0.45);
            child.material.metalness = 0.65;
            child.material.envMapIntensity = 1.2;
          } else {
            // Cream Editorial: warm architectural daylight
            child.material.roughness = Math.max(child.material.roughness || 0.5, 0.35);
            child.material.metalness = 0.25;
            child.material.envMapIntensity = 0.8;
          }
        }
      }
    });
    return clone;
  }, [scene, isObsidian, wireframeMode]);

  // Very gentle atmospheric drift
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* 1. Real 3D Building City Block (allBuildings.glb) */}
      <primitive
        object={clonedCity}
        scale={scale}
        // Offset by -15 in X to center the street behind the camera
        position={[-15 * scale, 0, 0]}
        rotation={[0, 0, 0]}
      />

      {/* 2. Giant Central Mega-Display Billboard mounted on the skyline */}
      <BuildingScreens
        position={[0, 6.8, 1.2]}
        rotation={[0, 0, 0]}
        scale={0.155}
      />

      {/* 3. Secondary Vertical Telemetry Billboard on East Skyscraper */}
      <SideBillboardScreen
        position={[8.2, 5.6, 2.0]}
        rotation={[0, -0.28, 0]}
        scale={0.125}
      />

      {/* 4. Ambient Cyber Skyline Neon Illumination */}
      <pointLight
        position={[0, 7.5, 2.5]}
        color={isObsidian ? '#00f0ff' : '#d4af37'}
        intensity={isObsidian ? 3.5 : 1.8}
        distance={25}
        decay={2}
      />
      <pointLight
        position={[8.2, 6.0, 3.0]}
        color={isObsidian ? '#38bdf8' : '#e2b35a'}
        intensity={isObsidian ? 2.5 : 1.2}
        distance={20}
        decay={2}
      />

      {/* 5. Procedural Skyline Extensions on the Far Flanks */}
      <CityScape position={[0, 0, -6]} />
    </group>
  );
}

// Preload the building model
useGLTF.preload('/models/allBuildings.glb');
