import React, { useRef } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import { shaderMaterial, Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollProgress } from '../../../context/ScrollContext';

// ── Gerstner Wave Ocean Material ─────────────────────────────────────────────
// Mathematically rigorous trochoidal waves (GPU Gems Ch.1) with:
// • True 3D vertex displacement (sharp crests, wide flat troughs)
// • Analytical normals computed in shader (perfect lighting at any camera angle)
// • Fresnel reflection + Blinn-Phong sun specular + foam at crests
const GerstnerOceanMaterial = shaderMaterial(
  {
    uTime: 0,
    uDeepColor: new THREE.Color('#01172a'),
    uShallowColor: new THREE.Color('#0a4d68'),
    uFoamColor: new THREE.Color('#cce8ff'),
    uSunDirection: new THREE.Vector3(0.6, 0.8, 0.4).normalize(),
    uSunColor: new THREE.Color('#ffffff'),
    uSkyColor: new THREE.Color('#4488cc'),
  },
  /* ── Vertex Shader ── */
  /* glsl */ `
    uniform float uTime;
    varying vec3 vWorldPosition;
    varying vec3 vNormal;
    varying float vWaveHeight;

    struct Wave {
      vec2  direction;
      float steepness;
      float wavelength;
      float amplitude;
      float speed;
    };

    vec3 gerstner(Wave w, vec3 p, inout vec3 tangent, inout vec3 binormal) {
      float k   = 6.28318 / w.wavelength;
      float c   = sqrt(9.81 / k) * w.speed;
      vec2  d   = normalize(w.direction);
      float f   = k * (dot(d, p.xz) - c * uTime);
      float a   = w.steepness / k;

      tangent  += vec3( -d.x*d.x*(w.steepness*sin(f)),  d.x*(w.steepness*cos(f)), -d.x*d.y*(w.steepness*sin(f)) );
      binormal += vec3( -d.x*d.y*(w.steepness*sin(f)),  d.y*(w.steepness*cos(f)), -d.y*d.y*(w.steepness*sin(f)) );

      return vec3( d.x*(a*cos(f)), w.amplitude*sin(f), d.y*(a*cos(f)) );
    }

    void main() {
      vec3 p = position;
      vec3 tangent  = vec3(1.0, 0.0, 0.0);
      vec3 binormal = vec3(0.0, 0.0, 1.0);

      // 4 layered waves — primary swell + cross-chop + high-freq detail
      p += gerstner(Wave(vec2( 1.0, 0.3), 0.38, 30.0, 1.1, 1.0 ), position, tangent, binormal);
      p += gerstner(Wave(vec2( 0.6, 0.8), 0.32, 17.0, 0.6, 1.2 ), position, tangent, binormal);
      p += gerstner(Wave(vec2(-0.3, 1.0), 0.26,  8.0, 0.3, 0.85), position, tangent, binormal);
      p += gerstner(Wave(vec2(-0.6, 0.5), 0.18,  3.5, 0.12,1.6 ), position, tangent, binormal);

      vNormal        = normalize(cross(binormal, tangent));
      vWaveHeight    = p.y;
      vec4 worldPos  = modelMatrix * vec4(p, 1.0);
      vWorldPosition = worldPos.xyz;

      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
  /* ── Fragment Shader ── */
  /* glsl */ `
    uniform vec3 uDeepColor;
    uniform vec3 uShallowColor;
    uniform vec3 uFoamColor;
    uniform vec3 uSunDirection;
    uniform vec3 uSunColor;
    uniform vec3 uSkyColor;

    varying vec3 vWorldPosition;
    varying vec3 vNormal;
    varying float vWaveHeight;

    void main() {
      vec3 viewDir = normalize(cameraPosition - vWorldPosition);
      vec3 N       = normalize(vNormal);

      // Fresnel (Schlick)
      float cosTheta = clamp(dot(viewDir, N), 0.0, 1.0);
      float fresnel  = 0.02 + 0.98 * pow(1.0 - cosTheta, 5.0);

      // Depth gradient
      float h = smoothstep(-1.4, 2.0, vWaveHeight);
      vec3 waterColor = mix(uDeepColor, uShallowColor, h);

      // Sun specular (Blinn-Phong)
      vec3  L    = normalize(uSunDirection);
      vec3  H    = normalize(L + viewDir);
      float spec = pow(max(dot(N, H), 0.0), 320.0) * 2.5;
      vec3 specColor = uSunColor * spec;

      // Crest foam
      float foam = smoothstep(1.05, 1.65, vWaveHeight);
      waterColor = mix(waterColor, uFoamColor, foam * 0.7);

      // Final: blend water & sky via fresnel
      vec3 final = mix(waterColor, uSkyColor, fresnel * 0.65) + specColor;
      gl_FragColor = vec4(final, 0.96);
    }
  `
);

extend({ GerstnerOceanMaterial });

// ── Tech Monoliths rising from the sea ───────────────────────────────────────
const MONOLITHS = [
  { name: 'GOLANG',     desc: 'Concurrency & Distributed Runtimes', pos: [-5.0, 0, -10], height: 3.2, color: '#00add8' },
  { name: 'NODE.JS',    desc: 'Microservices & Event Loops',        pos: [-2.2, 0, -13], height: 4.0, color: '#68a063' },
  { name: 'C++ CORE',   desc: 'Memory Management & SIMD',           pos: [0.0,  0, -11], height: 4.8, color: '#f34b7d' },
  { name: 'DOCKER/K8S', desc: 'Cluster Orchestration & Pods',       pos: [2.4,  0, -14], height: 3.8, color: '#2496ed' },
  { name: 'AWS CLOUD',  desc: 'Serverless, S3 & API Gateway',       pos: [5.2,  0, -10], height: 3.0, color: '#ff9900' },
  { name: 'POSTGRES',   desc: 'ACID Transactions & PGVector',       pos: [-3.8, 0, -7],  height: 2.6, color: '#336791' },
  { name: 'REDIS',      desc: 'Sub-ms In-Memory Caching',           pos: [3.8,  0, -7],  height: 2.6, color: '#dc382d' },
];

export function LiquidChromeOcean({ position = [0, -0.8, -11] }) {
  const { theme } = useScrollProgress();
  const isObsidian = theme === 'obsidian';
  const matRef   = useRef();
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (matRef.current) {
      matRef.current.uTime += delta;
      // Theme-shift colors reactively
      matRef.current.uDeepColor.set(isObsidian ? '#01172a' : '#003a5c');
      matRef.current.uShallowColor.set(isObsidian ? '#0a4d68' : '#1a7a9a');
      matRef.current.uSkyColor.set(isObsidian ? '#0a2244' : '#5599cc');
      matRef.current.uSunColor.set(isObsidian ? '#ffffff' : '#ffe8a0');
    }
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.04;
    }
  });

  return (
    <group position={position}>
      {/* ── Gerstner Wave Ocean ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[90, 65, 192, 192]} />
        <gerstnerOceanMaterial
          ref={matRef}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ── Deep underwater darkness below ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <planeGeometry args={[90, 65]} />
        <meshBasicMaterial color={isObsidian ? '#000a14' : '#001525'} />
      </mesh>

      {/* ── Monoliths ── */}
      <group ref={groupRef}>
        {MONOLITHS.map((mono) => (
          <Float key={mono.name} speed={1.2} rotationIntensity={0.12} floatIntensity={0.2}>
            <group position={mono.pos}>
              {/* Body */}
              <mesh castShadow receiveShadow position={[0, mono.height / 2, 0]}>
                <boxGeometry args={[1.1, mono.height, 0.35]} />
                <meshStandardMaterial
                  color={isObsidian ? '#0d0d12' : '#f5f0e8'}
                  metalness={0.96}
                  roughness={isObsidian ? 0.07 : 0.13}
                  envMapIntensity={1.8}
                />
              </mesh>
              {/* Colored glow stripe */}
              <mesh position={[0, mono.height / 2, 0.19]}>
                <planeGeometry args={[1.06, mono.height * 0.96]} />
                <meshBasicMaterial color={isObsidian ? mono.color : '#c09050'} transparent opacity={0.15} />
              </mesh>
              {/* Name */}
              <Text position={[0, mono.height - 0.4, 0.21]} fontSize={0.18} color={isObsidian ? '#fff' : '#18181b'} anchorX="center" anchorY="middle" letterSpacing={0.09}>
                {mono.name}
              </Text>
              {/* Desc */}
              <Text position={[0, mono.height - 0.72, 0.21]} fontSize={0.082} color={isObsidian ? 'rgba(255,255,255,0.55)' : 'rgba(24,24,27,0.6)'} anchorX="center" anchorY="middle" maxWidth={0.92} textAlign="center">
                {mono.desc}
              </Text>
              {/* Water glow ring */}
              <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.55, 0.9, 32]} />
                <meshBasicMaterial color={isObsidian ? mono.color : '#c5a059'} transparent opacity={0.45} />
              </mesh>
            </group>
          </Float>
        ))}
      </group>
    </group>
  );
}
