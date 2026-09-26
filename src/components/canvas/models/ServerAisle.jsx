import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const RACK_COUNT = 8;
const LEDS_PER_RACK = 14;
const TOTAL_LEDS = RACK_COUNT * LEDS_PER_RACK;

export function ServerAisle({ position = [0, 0, -8] }) {
  const ledMeshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);

  // Pre-calculate LED positions and seeds
  const ledTransforms = useMemo(() => {
    const transforms = [];
    for (let r = 0; r < RACK_COUNT; r++) {
      const isLeft = r % 2 === 0;
      const rackX = isLeft ? -3.0 : 3.0;
      const rackZ = -Math.floor(r / 2) * 4.2;

      for (let l = 0; l < LEDS_PER_RACK; l++) {
        transforms.push({
          pos: [
            rackX + (isLeft ? 0.48 : -0.48),
            0.6 + l * 0.22,
            rackZ + (l % 2 === 0 ? 0.35 : -0.35),
          ],
          freq: 2.0 + (l % 5) * 1.8,
          phase: (r * 11 + l * 7) % 30,
          colorType: (l + r) % 3 === 0 ? 'cyan' : (l + r) % 3 === 1 ? 'emerald' : 'magenta',
        });
      }
    }
    return transforms;
  }, []);

  useFrame(({ clock }) => {
    if (!ledMeshRef.current) return;
    const t = clock.getElapsedTime();

    ledTransforms.forEach((led, i) => {
      dummy.position.set(...led.pos);
      dummy.scale.setScalar(0.045);
      dummy.updateMatrix();
      ledMeshRef.current.setMatrixAt(i, dummy.matrix);

      // Procedural blink logic
      const blink = Math.sin(t * led.freq + led.phase) > 0.15 ? 1 : 0.08;
      const hex =
        led.colorType === 'cyan'
          ? '#00f0ff'
          : led.colorType === 'emerald'
          ? '#00ff88'
          : '#ff007f';

      tempColor.set(hex).multiplyScalar(blink * 2.2);
      ledMeshRef.current.setColorAt(i, tempColor);
    });

    ledMeshRef.current.instanceMatrix.needsUpdate = true;
    if (ledMeshRef.current.instanceColor) {
      ledMeshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <group position={position}>
      {/* 8 Server Rack Cabinets */}
      {Array.from({ length: RACK_COUNT }).map((_, r) => {
        const isLeft = r % 2 === 0;
        const rackX = isLeft ? -3.0 : 3.0;
        const rackZ = -Math.floor(r / 2) * 4.2;

        return (
          <group key={r} position={[rackX, 1.9, rackZ]}>
            {/* Outer Structural Cabinet Frame */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.05, 3.8, 1.4]} />
              <meshStandardMaterial
                color="#0c0f16"
                roughness={0.35}
                metalness={0.85}
              />
            </mesh>

            {/* Recessed server chassis slot details */}
            <mesh position={[isLeft ? 0.06 : -0.06, 0, 0]}>
              <boxGeometry args={[0.95, 3.65, 1.25]} />
              <meshStandardMaterial
                color="#131822"
                roughness={0.5}
                metalness={0.7}
              />
            </mesh>

            {/* Top Brand Status Header Bar */}
            <mesh position={[isLeft ? 0.5 : -0.5, 1.7, 0]}>
              <boxGeometry args={[0.04, 0.15, 1.1]} />
              <meshStandardMaterial
                color={r % 2 === 0 ? '#00f0ff' : '#00ff88'}
                emissive={r % 2 === 0 ? '#00f0ff' : '#00ff88'}
                emissiveIntensity={2.0}
                toneMapped={false}
              />
            </mesh>
          </group>
        );
      })}

      {/* 1 Draw Call for all 112 LEDs */}
      <instancedMesh ref={ledMeshRef} args={[null, null, TOTAL_LEDS]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </group>
  );
}
