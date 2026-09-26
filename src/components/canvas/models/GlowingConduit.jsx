import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function GlowingConduit({ points, color = '#00f0ff', radius = 0.035, pulseSpeed = 4.0 }) {
  const materialRef = useRef();

  const curve = useMemo(() => {
    const vectors = points.map((p) => new THREE.Vector3(...p));
    return new THREE.CatmullRomCurve3(vectors, false, 'catmullrom', 0.5);
  }, [points]);

  const geometry = useMemo(
    () => new THREE.TubeGeometry(curve, 96, radius, 8, false),
    [curve, radius]
  );

  const conduitShader = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
        uSpeed: { value: pulseSpeed },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;

        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uTime;
        uniform vec3 uColor;
        uniform float uSpeed;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewPosition);

          // Fresnel edge brightening
          float fresnel = pow(1.0 - abs(dot(viewDir, normal)), 2.2);

          // Traveling pulse along tube length
          float pulse1 = sin(vUv.x * 35.0 - uTime * uSpeed);
          float pulse = smoothstep(0.5, 0.98, pulse1);

          vec3 baseColor = uColor * 0.25;
          vec3 finalColor = mix(baseColor, uColor * 2.8, pulse) + (uColor * fresnel * 0.7);

          gl_FragColor = vec4(finalColor, 0.9);
        }
      `,
      transparent: true,
    }),
    [color, pulseSpeed]
  );

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh geometry={geometry}>
      <shaderMaterial ref={materialRef} args={[conduitShader]} />
    </mesh>
  );
}
