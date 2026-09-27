import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollProgress } from '../../../context/ScrollContext';

// ──────────────────────────────────────────────────────────────────────────────
// CityScape — Procedural photorealistic-looking building skyline
// Uses seeded pseudo-random generation for deterministic layout.
// Each building: chamfered box body + glass window grid (emissive planes)
// + rooftop antennae/spires for iconic silhouette.
// ──────────────────────────────────────────────────────────────────────────────

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

// Building specs — each object produces a tower
const BUILDING_CONFIGS = [
  // Back row (far, tall skyscrapers)
  { seed: 1,  x: -14, z: -22, w: 1.8, d: 1.8, minH: 8,  maxH: 14, tier: 'skyscraper' },
  { seed: 2,  x: -10, z: -24, w: 1.4, d: 1.4, minH: 10, maxH: 16, tier: 'skyscraper' },
  { seed: 3,  x: -6,  z: -23, w: 2.0, d: 1.6, minH: 9,  maxH: 13, tier: 'skyscraper' },
  { seed: 4,  x: -2,  z: -25, w: 1.6, d: 2.0, minH: 12, maxH: 18, tier: 'landmark'   },
  { seed: 5,  x: 2,   z: -25, w: 2.0, d: 1.8, minH: 11, maxH: 17, tier: 'landmark'   },
  { seed: 6,  x: 6,   z: -23, w: 1.6, d: 1.6, minH: 9,  maxH: 13, tier: 'skyscraper' },
  { seed: 7,  x: 10,  z: -24, w: 1.4, d: 1.4, minH: 10, maxH: 15, tier: 'skyscraper' },
  { seed: 8,  x: 14,  z: -22, w: 1.8, d: 1.6, minH: 8,  maxH: 12, tier: 'skyscraper' },
  // Mid row (medium office towers)
  { seed: 9,  x: -12, z: -17, w: 1.6, d: 1.4, minH: 5,  maxH: 9,  tier: 'office'     },
  { seed: 10, x: -8,  z: -16, w: 1.8, d: 1.6, minH: 4,  maxH: 8,  tier: 'office'     },
  { seed: 11, x: -4,  z: -17, w: 1.4, d: 1.4, minH: 5,  maxH: 7,  tier: 'office'     },
  { seed: 12, x: 0,   z: -18, w: 2.0, d: 2.0, minH: 6,  maxH: 10, tier: 'office'     },
  { seed: 13, x: 4,   z: -17, w: 1.4, d: 1.4, minH: 5,  maxH: 7,  tier: 'office'     },
  { seed: 14, x: 8,   z: -16, w: 1.6, d: 1.6, minH: 4,  maxH: 8,  tier: 'office'     },
  { seed: 15, x: 12,  z: -17, w: 1.6, d: 1.4, minH: 5,  maxH: 9,  tier: 'office'     },
  // Front row (shorter buildings, partially visible)
  { seed: 16, x: -11, z: -12, w: 1.2, d: 1.2, minH: 2,  maxH: 5,  tier: 'low'        },
  { seed: 17, x: -7,  z: -11, w: 1.4, d: 1.2, minH: 2,  maxH: 4,  tier: 'low'        },
  { seed: 18, x: 7,   z: -11, w: 1.4, d: 1.2, minH: 2,  maxH: 4,  tier: 'low'        },
  { seed: 19, x: 11,  z: -12, w: 1.2, d: 1.2, minH: 2,  maxH: 5,  tier: 'low'        },
];

// One building tower — body + window grid + rooftop detail
function Building({ config, isObsidian }) {
  const rand = useMemo(() => seededRandom(config.seed), [config.seed]);
  const height = useMemo(() => config.minH + rand() * (config.maxH - config.minH), [config]);

  // Material colours by theme & tier
  const bodyColor = useMemo(() => {
    if (isObsidian) {
      const tier = config.tier;
      if (tier === 'landmark')   return new THREE.Color('#1a1a22');
      if (tier === 'skyscraper') return new THREE.Color('#141418');
      if (tier === 'office')     return new THREE.Color('#10100e');
      return new THREE.Color('#0c0c10');
    } else {
      return new THREE.Color('#d0ccc4');
    }
  }, [isObsidian, config.tier]);

  const glassColor = useMemo(() =>
    isObsidian ? new THREE.Color('#1c3a55') : new THREE.Color('#a8c8e0'),
    [isObsidian]
  );

  // Window emissive — simulates lit office windows
  const windowEmissive = useMemo(() =>
    isObsidian ? new THREE.Color('#204060') : new THREE.Color('#fffbe0'),
    [isObsidian]
  );

  // Rooftop spire (landmark towers only get a tall spire)
  const hasSpire = config.tier === 'landmark' || config.tier === 'skyscraper';
  const spireH   = hasSpire ? (config.tier === 'landmark' ? 2.5 : 1.2) : 0;

  return (
    <group position={[config.x, height / 2, config.z]}>
      {/* Main tower body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[config.w, height, config.d]} />
        <meshStandardMaterial
          color={bodyColor}
          metalness={isObsidian ? 0.9 : 0.3}
          roughness={isObsidian ? 0.25 : 0.6}
          envMapIntensity={0.8}
        />
      </mesh>

      {/* Glass curtain-wall face (front face only, gives that glass-tower look) */}
      <mesh position={[0, 0, config.d / 2 + 0.01]}>
        <planeGeometry args={[config.w * 0.9, height * 0.92, 4, Math.floor(height * 2)]} />
        <meshStandardMaterial
          color={glassColor}
          emissive={windowEmissive}
          emissiveIntensity={isObsidian ? 0.3 : 0.08}
          metalness={0.85}
          roughness={0.08}
          transparent
          opacity={0.72}
        />
      </mesh>

      {/* Side glass face */}
      <mesh position={[config.w / 2 + 0.01, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[config.d * 0.9, height * 0.92]} />
        <meshStandardMaterial
          color={glassColor}
          emissive={windowEmissive}
          emissiveIntensity={isObsidian ? 0.15 : 0.04}
          metalness={0.85}
          roughness={0.1}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Rooftop setback block */}
      {hasSpire && (
        <mesh position={[0, height / 2 + 0.6, 0]}>
          <boxGeometry args={[config.w * 0.55, 1.2, config.d * 0.55]} />
          <meshStandardMaterial color={bodyColor} metalness={0.95} roughness={0.15} />
        </mesh>
      )}

      {/* Spire */}
      {hasSpire && (
        <mesh position={[0, height / 2 + 1.2 + spireH / 2, 0]}>
          <cylinderGeometry args={[0.04, 0.1, spireH, 6]} />
          <meshStandardMaterial
            color={isObsidian ? '#334466' : '#aabbcc'}
            metalness={0.98}
            roughness={0.05}
            emissive={isObsidian ? '#00aaff' : '#fff8d0'}
            emissiveIntensity={isObsidian ? 0.6 : 0.1}
          />
        </mesh>
      )}

      {/* Rooftop antenna red blink light (skyscrapers) */}
      {config.tier !== 'low' && (
        <mesh position={[0, height / 2 + 1.2 + spireH + 0.05, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#ff3300" />
        </mesh>
      )}
    </group>
  );
}

// Ground plane / street level
function StreetGround({ isObsidian }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -17]} receiveShadow>
      <planeGeometry args={[50, 30]} />
      <meshStandardMaterial
        color={isObsidian ? '#0a0a0e' : '#c8c4bc'}
        metalness={isObsidian ? 0.5 : 0.1}
        roughness={0.9}
      />
    </mesh>
  );
}

export function CityScape({ position = [0, -1.5, 0] }) {
  const { theme } = useScrollProgress();
  const isObsidian = theme === 'obsidian';
  const groupRef = useRef();

  // Subtle city depth haze — lerp position for parallax with camera
  useFrame((state) => {
    if (groupRef.current) {
      // Very gentle sway to give depth feeling
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.003;
    }
  });

  return (
    <group position={position} ref={groupRef}>
      <StreetGround isObsidian={isObsidian} />
      {BUILDING_CONFIGS.map((cfg) => (
        <Building key={cfg.seed} config={cfg} isObsidian={isObsidian} />
      ))}
      {/* City-wide ambient glow from below (obsidian only) */}
      {isObsidian && (
        <pointLight position={[0, -0.5, -18]} color="#1133ff" intensity={4} distance={30} decay={2} />
      )}
      {isObsidian && (
        <pointLight position={[-8, 2, -18]} color="#ff4400" intensity={2} distance={20} decay={2} />
      )}
      {isObsidian && (
        <pointLight position={[8, 2, -18]} color="#00aaff" intensity={2} distance={20} decay={2} />
      )}
    </group>
  );
}
