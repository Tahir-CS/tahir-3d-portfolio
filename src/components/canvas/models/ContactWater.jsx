import React, { useRef } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollProgress } from '../../../context/ScrollContext';

// ─────────────────────────────────────────────────────────────────────────────
// ContactWater
// Renders an infinite reflective ocean surface beneath the Contact Orbital Node.
// Uses gentle, rhythmic Gerstner waves calibrated for reflection of the beacon core.
// ─────────────────────────────────────────────────────────────────────────────

const ContactSeaMaterial = shaderMaterial(
  {
    uTime: 0,
    uDeepColor: new THREE.Color('#011222'),
    uShallowColor: new THREE.Color('#083854'),
    uFoamColor: new THREE.Color('#cce8ff'),
    uBeaconColor: new THREE.Color('#38bdf8'),
    uSunDirection: new THREE.Vector3(0.0, 1.0, 0.4).normalize(),
    uBeaconPos: new THREE.Vector3(0, 0.4, -25),
  },
  /* ── Vertex Shader ── */
  /* glsl */ `
    uniform float uTime;
    varying vec3 vWorldPosition;
    varying vec3 vNormal;
    varying float vWaveHeight;

    struct Wave {
      vec2 direction;
      float steepness;
      float wavelength;
      float amplitude;
      float speed;
    };

    vec3 gerstner(Wave w, vec3 p, inout vec3 tangent, inout vec3 binormal) {
      float k = 6.28318 / w.wavelength;
      float c = sqrt(9.81 / k) * w.speed;
      vec2 d = normalize(w.direction);
      float f = k * (dot(d, p.xz) - c * uTime);
      float a = w.steepness / k;

      tangent += vec3(-d.x*d.x*(w.steepness*sin(f)), d.x*(w.steepness*cos(f)), -d.x*d.y*(w.steepness*sin(f)));
      binormal += vec3(-d.x*d.y*(w.steepness*sin(f)), d.y*(w.steepness*cos(f)), -d.y*d.y*(w.steepness*sin(f)));

      return vec3(d.x*(a*cos(f)), w.amplitude*sin(f), d.y*(a*cos(f)));
    }

    void main() {
      vec3 p = position;
      vec3 tangent = vec3(1.0, 0.0, 0.0);
      vec3 binormal = vec3(0.0, 0.0, 1.0);

      // Smooth, gentle ocean swells for the contact sanctuary
      p += gerstner(Wave(vec2(1.0, 0.2), 0.25, 24.0, 0.5, 0.7), position, tangent, binormal);
      p += gerstner(Wave(vec2(0.3, 0.9), 0.20, 14.0, 0.3, 0.9), position, tangent, binormal);
      p += gerstner(Wave(vec2(-0.5, 0.5), 0.15, 6.0, 0.12, 1.1), position, tangent, binormal);

      vNormal = normalize(cross(binormal, tangent));
      vWaveHeight = p.y;
      vec4 worldPos = modelMatrix * vec4(p, 1.0);
      vWorldPosition = worldPos.xyz;

      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
  /* ── Fragment Shader ── */
  /* glsl */ `
    uniform vec3 uDeepColor;
    uniform vec3 uShallowColor;
    uniform vec3 uFoamColor;
    uniform vec3 uBeaconColor;
    uniform vec3 uSunDirection;
    uniform vec3 uBeaconPos;

    varying vec3 vWorldPosition;
    varying vec3 vNormal;
    varying float vWaveHeight;

    void main() {
      vec3 viewDir = normalize(cameraPosition - vWorldPosition);
      vec3 N = normalize(vNormal);

      // 1. Fresnel Reflection
      float cosTheta = clamp(dot(viewDir, N), 0.0, 1.0);
      float fresnel = 0.04 + 0.96 * pow(1.0 - cosTheta, 5.0);

      // 2. Depth water color
      float h = smoothstep(-0.8, 1.0, vWaveHeight);
      vec3 waterColor = mix(uDeepColor, uShallowColor, h);

      // 3. Specular reflection of the floating beacon core
      vec3 toBeacon = normalize(uBeaconPos - vWorldPosition);
      vec3 H = normalize(toBeacon + viewDir);
      float beaconSpec = pow(max(dot(N, H), 0.0), 128.0) * 3.5;

      // Distance falloff from beacon
      float dist = length(uBeaconPos.xz - vWorldPosition.xz);
      float beaconGlow = exp(-dist * 0.15);

      // 4. Sky specular glint
      vec3 L = normalize(uSunDirection);
      vec3 Hsky = normalize(L + viewDir);
      float skySpec = pow(max(dot(N, Hsky), 0.0), 256.0) * 1.5;

      // Composition
      vec3 finalColor = waterColor + (uBeaconColor * beaconSpec * 1.8) + (uBeaconColor * beaconGlow * 0.25) + skySpec;
      finalColor = mix(finalColor, uBeaconColor, fresnel * 0.35);

      gl_FragColor = vec4(finalColor, 0.94);
    }
  `
);

extend({ ContactSeaMaterial });

export function ContactWater({ position = [0, -1.35, -25] }) {
  const { theme, wireframeMode } = useScrollProgress();
  const isObsidian = theme === 'obsidian';
  const matRef = useRef();

  useFrame((state, delta) => {
    if (matRef.current) {
      matRef.current.uTime += delta;
      if (isObsidian) {
        matRef.current.uDeepColor.set('#010e1c');
        matRef.current.uShallowColor.set('#062c44');
        matRef.current.uBeaconColor.set(wireframeMode ? '#00ff88' : '#38bdf8');
      } else {
        matRef.current.uDeepColor.set('#08283d');
        matRef.current.uShallowColor.set('#165b7e');
        matRef.current.uBeaconColor.set(wireframeMode ? '#00ff88' : '#d4af37');
      }
    }
  });

  return (
    <group position={position}>
      {/* 1. Vast End-Contact Ocean Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[95, 75, 160, 160]} />
        <contactSeaMaterial ref={matRef} transparent side={THREE.DoubleSide} />
      </mesh>

      {/* 2. Deep Undersea Fog Bed */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
        <planeGeometry args={[100, 80]} />
        <meshBasicMaterial color={isObsidian ? '#00060d' : '#00121f'} />
      </mesh>

      {/* 3. Expanding Beacon Water Ripple Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
        <ringGeometry args={[1.6, 2.5, 32]} />
        <meshBasicMaterial
          color={wireframeMode ? '#00ff88' : (isObsidian ? '#00f0ff' : '#d4af37')}
          transparent
          opacity={0.35}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <ringGeometry args={[2.8, 3.8, 32]} />
        <meshBasicMaterial
          color={wireframeMode ? '#00ff88' : (isObsidian ? '#00f0ff' : '#d4af37')}
          transparent
          opacity={0.18}
        />
      </mesh>
    </group>
  );
}
