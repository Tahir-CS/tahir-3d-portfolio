import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const HologramShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#00f0ff') },
    uRimColor: { value: new THREE.Color('#0088ff') },
    uScanlineFreq: { value: 40.0 },
    uScanlineSpeed: { value: 2.2 },
    uGlitchStrength: { value: 0.12 },
    uFresnelPower: { value: 2.2 },
    uAlpha: { value: 0.8 },
  },
  vertexShader: /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vWorldPosition;
    varying vec3 vViewPosition;

    uniform float uTime;
    uniform float uGlitchStrength;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;

      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;

      // Subtle occasional glitch displacement
      float glitchTrigger = step(0.96, sin(uTime * 4.0) * hash(vec2(floor(position.y * 6.0), floor(uTime * 8.0))));
      vec3 displacedPos = position;
      displacedPos.x += (hash(vec2(uTime, position.y)) - 0.5) * uGlitchStrength * glitchTrigger;

      vec4 mvPosition = modelViewMatrix * vec4(displacedPos, 1.0);
      vViewPosition = -mvPosition.xyz;

      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: /* glsl */ `
    uniform vec3 uColor;
    uniform vec3 uRimColor;
    uniform float uTime;
    uniform float uScanlineFreq;
    uniform float uScanlineSpeed;
    uniform float uFresnelPower;
    uniform float uAlpha;

    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vWorldPosition;
    varying vec3 vViewPosition;

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);

      // 1. Fresnel Edge Glow (Rim Lighting)
      float NdotV = max(dot(normal, viewDir), 0.0);
      float fresnel = pow(1.0 - NdotV, uFresnelPower);

      // 2. High-Frequency Scanlines
      float scanline = sin((vWorldPosition.y + uTime * uScanlineSpeed) * uScanlineFreq) * 0.5 + 0.5;
      scanline = pow(scanline, 1.3);

      // 3. Moving Energy Sweep
      float sweepBand = sin(vWorldPosition.y * 2.5 - uTime * 3.5) * 0.5 + 0.5;
      sweepBand = smoothstep(0.75, 1.0, sweepBand) * 0.5;

      // 4. Color blending
      vec3 base = mix(uColor, uRimColor, fresnel * 0.6);
      vec3 finalColor = base * (0.5 + scanline * 0.4 + sweepBand + fresnel * 1.8);

      // 5. Alpha calculation: edges glow opaque, face center is translucent
      float alpha = clamp((fresnel * 0.85 + scanline * 0.3 + sweepBand * 0.4) * uAlpha, 0.05, 1.0);

      gl_FragColor = vec4(finalColor, alpha);
    }
  `
};

export function HolographicMaterial({ color = '#00f0ff', rimColor = '#0066ff', opacity = 0.8, ...props }) {
  const matRef = useRef();
  const uniforms = useMemo(() => {
    const u = THREE.UniformsUtils.clone(HologramShader.uniforms);
    u.uColor.value = new THREE.Color(color);
    u.uRimColor.value = new THREE.Color(rimColor);
    u.uAlpha.value = opacity;
    return u;
  }, [color, rimColor, opacity]);

  useFrame((_, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <shaderMaterial
      ref={matRef}
      vertexShader={HologramShader.vertexShader}
      fragmentShader={HologramShader.fragmentShader}
      uniforms={uniforms}
      transparent
      depthWrite={false}
      blending={THREE.AdditiveBlending}
      side={THREE.DoubleSide}
      {...props}
    />
  );
}
