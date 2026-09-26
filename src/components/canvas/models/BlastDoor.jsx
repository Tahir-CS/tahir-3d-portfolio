import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { damp } from 'maath/easing';

export function BlastDoor({ progress = 0, position = [0, 0, 7.5], wireframe = false }) {
  const leftDoorRef = useRef();
  const rightDoorRef = useRef();
  const warningLightRef = useRef();

  useFrame((_, delta) => {
    // Open doors as scroll progress advances from 0.0 to 0.18
    const openFactor = THREE.MathUtils.clamp((progress - 0.01) / 0.14, 0, 1);
    const targetOffset = openFactor * 2.8;

    if (leftDoorRef.current) {
      damp(leftDoorRef.current.position, 'x', -1.25 - targetOffset, 0.2, delta);
    }
    if (rightDoorRef.current) {
      damp(rightDoorRef.current.position, 'x', 1.25 + targetOffset, 0.2, delta);
    }

    if (warningLightRef.current) {
      const flash = Math.sin(Date.now() * 0.005) > 0 ? 2.5 : 0.2;
      warningLightRef.current.material.emissiveIntensity = flash;
    }
  });

  return (
    <group position={position}>
      {/* Heavy Structural Archway Frame */}
      {/* Top Header Beam */}
      <mesh position={[0, 3.8, 0]}>
        <boxGeometry args={[6.2, 0.7, 0.6]} />
        <meshStandardMaterial
          color={wireframe ? '#00ff88' : '#0c0e14'}
          wireframe={wireframe}
          metalness={0.85}
          roughness={0.3}
        />
      </mesh>
      {/* Left Pillar */}
      <mesh position={[-2.8, 1.8, 0]}>
        <boxGeometry args={[0.7, 3.8, 0.6]} />
        <meshStandardMaterial
          color={wireframe ? '#00ff88' : '#0c0e14'}
          wireframe={wireframe}
          metalness={0.85}
          roughness={0.3}
        />
      </mesh>
      {/* Right Pillar */}
      <mesh position={[2.8, 1.8, 0]}>
        <boxGeometry args={[0.7, 3.8, 0.6]} />
        <meshStandardMaterial
          color={wireframe ? '#00ff88' : '#0c0e14'}
          wireframe={wireframe}
          metalness={0.85}
          roughness={0.3}
        />
      </mesh>

      {/* Warning Hazard Light */}
      <mesh ref={warningLightRef} position={[0, 4.25, 0.15]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color="#ffaa00"
          emissive="#ffaa00"
          emissiveIntensity={2.0}
          toneMapped={false}
        />
      </mesh>

      {/* Left Sliding Door Wing */}
      <group ref={leftDoorRef} position={[-1.25, 1.8, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.45, 3.6, 0.25]} />
          <meshStandardMaterial
            color={wireframe ? '#00ff88' : '#161b24'}
            wireframe={wireframe}
            metalness={0.9}
            roughness={0.25}
          />
        </mesh>
        {/* Reinforced Armor Plates */}
        <mesh position={[0, 0, 0.14]}>
          <boxGeometry args={[2.2, 3.3, 0.04]} />
          <meshStandardMaterial
            color={wireframe ? '#00ffaa' : '#212836'}
            wireframe={wireframe}
            metalness={0.75}
            roughness={0.4}
          />
        </mesh>
        {/* Cyan Indicator Edge Strip */}
        <mesh position={[1.15, 0, 0.15]}>
          <boxGeometry args={[0.06, 3.2, 0.03]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={1.8}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Right Sliding Door Wing */}
      <group ref={rightDoorRef} position={[1.25, 1.8, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.45, 3.6, 0.25]} />
          <meshStandardMaterial
            color={wireframe ? '#00ff88' : '#161b24'}
            wireframe={wireframe}
            metalness={0.9}
            roughness={0.25}
          />
        </mesh>
        {/* Reinforced Armor Plates */}
        <mesh position={[0, 0, 0.14]}>
          <boxGeometry args={[2.2, 3.3, 0.04]} />
          <meshStandardMaterial
            color={wireframe ? '#00ffaa' : '#212836'}
            wireframe={wireframe}
            metalness={0.75}
            roughness={0.4}
          />
        </mesh>
        {/* Cyan Indicator Edge Strip */}
        <mesh position={[-1.15, 0, 0.15]}>
          <boxGeometry args={[0.06, 3.2, 0.03]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={1.8}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}
