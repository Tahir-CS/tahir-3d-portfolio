import React, { useRef, useEffect, useMemo } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import { shaderMaterial, Float, Text, useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollProgress } from '../../../context/ScrollContext';

// ── Gerstner Wave Ocean Material ─────────────────────────────────────────────
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

      // 4 layered waves
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

// ── Realistic 3D Animated Ocean Mesh Model (ocean_surface.glb) ───────────────
function RealOceanSurfaceModel({ isObsidian, wireframeMode }) {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/ocean_surface.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const activeAnim = Object.values(actions)[0];
      activeAnim?.reset().fadeIn(0.5).play();
    }
  }, [actions]);

  const clonedModel = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        child.receiveShadow = true;
        if (child.material) {
          child.material = child.material.clone();
          if (wireframeMode) {
            child.material.wireframe = true;
            child.material.color = new THREE.Color('#00ff88');
          } else if (isObsidian) {
            child.material.color = new THREE.Color('#021a30');
            child.material.metalness = 0.95;
            child.material.roughness = 0.08;
            child.material.transparent = true;
            child.material.opacity = 0.85;
          } else {
            child.material.color = new THREE.Color('#0a4d68');
            child.material.metalness = 0.85;
            child.material.roughness = 0.14;
            child.material.transparent = true;
            child.material.opacity = 0.82;
          }
        }
      }
    });
    return clone;
  }, [scene, isObsidian, wireframeMode]);

  return (
    <group ref={group} position={[0, 0.08, 0]}>
      <primitive
        object={clonedModel}
        scale={[0.42, 0.42, 0.42]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

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
  const { theme, wireframeMode } = useScrollProgress();
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
      {/* 1. Realistic Animated 3D Ocean Surface Model (ocean_surface.glb) */}
      <RealOceanSurfaceModel isObsidian={isObsidian} wireframeMode={wireframeMode} />

      {/* 2. Gerstner Wave Base Horizon with Physical Light Dispersion */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[95, 70, 192, 192]} />
        <gerstnerOceanMaterial
          ref={matRef}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 3. Deep Abyss Layer */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
        <planeGeometry args={[100, 75]} />
        <meshBasicMaterial color={isObsidian ? '#000810' : '#001525'} />
      </mesh>

      {/* 4. Tech Monoliths Rising from the Water */}
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

useGLTF.preload('/models/ocean_surface.glb');
