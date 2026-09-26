import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function DataParticles({ count = 800, area = [24, 12, 50] }) {
  const pointsRef = useRef();

  const [positions, speeds, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const ph = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * area[0];
      pos[i * 3 + 1] = Math.random() * area[1];
      pos[i * 3 + 2] = (Math.random() - 0.5) * area[2] - 10;
      spd[i] = 0.3 + Math.random() * 1.2;
      ph[i] = Math.random() * Math.PI * 2;
    }
    return [pos, spd, ph];
  }, [count, area]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const posArray = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += speeds[i] * delta;
      if (posArray[i * 3 + 1] > area[1]) {
        posArray[i * 3 + 1] = 0.1;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        color="#00f0ff"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
