import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const CyberGridShader = {
  uniforms: {
    uTime: { value: 0 },
    uGridSize: { value: 2.0 },
    uMajorGridDiv: { value: 4.0 },
    uGridColor: { value: new THREE.Color('#00f0ff') },
    uMajorGridColor: { value: new THREE.Color('#0066ff') },
    uBgColor: { value: new THREE.Color('#07090e') },
    uLineWidth: { value: 1.0 },
    uFogDensity: { value: 0.035 },
  },
  vertexShader: /* glsl */ `
    varying vec3 vWorldPosition;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,
  fragmentShader: /* glsl */ `
    uniform float uTime;
    uniform float uGridSize;
    uniform float uMajorGridDiv;
    uniform vec3 uGridColor;
    uniform vec3 uMajorGridColor;
    uniform vec3 uBgColor;
    uniform float uLineWidth;
    uniform float uFogDensity;

    varying vec3 vWorldPosition;
    varying vec2 vUv;

    // Screen-Space Analytical Antialiasing for clean crisp lines at all distances
    float getGridLine(vec2 coord, float size, float lineWidth) {
      vec2 grid = coord / size;
      vec2 dGrid = fwidth(grid);
      vec2 gridFract = abs(fract(grid - 0.5) - 0.5);
      vec2 lineWeight = smoothstep(dGrid * lineWidth, vec2(0.0), gridFract);
      return max(lineWeight.x, lineWeight.y);
    }

    void main() {
      vec2 planeCoord = vWorldPosition.xz;

      // Minor and major grid calculations
      float minor = getGridLine(planeCoord, uGridSize, uLineWidth);
      float major = getGridLine(planeCoord, uGridSize * uMajorGridDiv, uLineWidth * 1.4);

      // Subtle traveling light pulse along grid
      float dist = length(planeCoord);
      float pulse = sin(dist * 0.3 - uTime * 2.0);
      pulse = smoothstep(0.85, 1.0, pulse) * 0.5;

      vec3 color = uBgColor;
      color = mix(color, uGridColor * 0.6, minor * 0.5);
      color = mix(color, uMajorGridColor * 1.2, major * 0.85);
      color += uGridColor * pulse * (minor + major);

      // Exponential Distance Fog
      float viewDist = length(vWorldPosition - cameraPosition);
      float fogFactor = 1.0 - exp(-pow(viewDist * uFogDensity, 2.0));
      vec3 finalColor = mix(color, uBgColor, clamp(fogFactor, 0.0, 1.0));

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};

export function CyberGridFloor({ size = 200, ...props }) {
  const matRef = useRef();
  const uniforms = useMemo(() => THREE.UniformsUtils.clone(CyberGridShader.uniforms), []);

  useFrame((_, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} {...props}>
      <planeGeometry args={[size, size, 2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={CyberGridShader.vertexShader}
        fragmentShader={CyberGridShader.fragmentShader}
        uniforms={uniforms}
        depthWrite
      />
    </mesh>
  );
}
