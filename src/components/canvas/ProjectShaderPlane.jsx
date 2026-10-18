import React, { useRef, useState, useEffect } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollProgress } from '../../context/ScrollContext';

// ─────────────────────────────────────────────────────────────────────────────
// ProjectDistortMaterial — Custom Awwwards SOTD GLSL Shader
// Features:
// • Vertex: Dynamic Z-axis plane bending driven by scroll velocity + hover wave
// • Fragment: Interactive RGB chromatic aberration channel shift on scroll & hover
// ─────────────────────────────────────────────────────────────────────────────

const ProjectDistortMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uTime: 0,
    uHover: 0,
    uVelocity: 0,
    uHasTexture: 0.0,
  },
  // Vertex Shader: Scroll velocity bend + organic hover ripple
  /* glsl */ `
    uniform float uTime;
    uniform float uHover;
    uniform float uVelocity;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // Bend plane along Z based on scroll velocity (curving as you scroll past)
      float bend = sin(uv.y * 3.14159) * uVelocity * 0.45;
      
      // Subtle organic liquid ripple across the plane on hover
      float ripple = sin((uv.x * 6.0) + uTime * 3.0) * 0.06 * uHover;

      pos.z += bend + ripple;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader: RGB Chromatic Aberration Shift + Vignette
  /* glsl */ `
    uniform sampler2D uTexture;
    uniform float uHover;
    uniform float uVelocity;
    uniform float uHasTexture;
    varying vec2 vUv;

    void main() {
      if (uHasTexture < 0.5) {
        gl_FragColor = vec4(0.05, 0.07, 0.1, 1.0);
        return;
      }

      // Zoom UV slightly inward on hover for depth
      vec2 zoomedUv = (vUv - 0.5) * (1.0 - uHover * 0.06) + 0.5;
      float shift = (uHover * 0.012) + (abs(uVelocity) * 0.022);

      // Chromatic channel displacement
      float r = texture2D(uTexture, zoomedUv + vec2(shift, 0.0)).r;
      float g = texture2D(uTexture, zoomedUv).g;
      float b = texture2D(uTexture, zoomedUv - vec2(shift, 0.0)).b;

      // Subtle edge vignette
      vec2 uvEdge = abs(vUv - 0.5) * 2.0;
      float vignette = 1.0 - dot(uvEdge, uvEdge) * 0.15;

      gl_FragColor = vec4(vec3(r, g, b) * vignette, 1.0);
    }
  `
);

extend({ ProjectDistortMaterial });

export function ProjectShaderPlane({ imageUrl, position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1], onSelect }) {
  const materialRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState(null);
  const { scrollProgress } = useScrollProgress();
  const lastScroll = useRef(0);

  // Bulletproof texture loading
  useEffect(() => {
    if (imageUrl) {
      const loader = new THREE.TextureLoader();
      loader.load(
        imageUrl,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.minFilter = THREE.LinearFilter;
          tex.generateMipmaps = false;
          setTexture(tex);
        },
        undefined,
        (err) => console.warn('Could not load shader texture:', imageUrl, err)
      );
    }
  }, [imageUrl]);

  useFrame((state, delta) => {
    if (!materialRef.current) return;

    // Time elapsed
    materialRef.current.uTime = state.clock.elapsedTime;

    // Smooth hover interpolation
    materialRef.current.uHover = THREE.MathUtils.lerp(
      materialRef.current.uHover,
      hovered ? 1.0 : 0.0,
      1 - Math.exp(-8 * delta)
    );

    // Calculate velocity from scroll progress delta
    const currentScroll = scrollProgress?.current || 0;
    const scrollDelta = currentScroll - lastScroll.current;
    lastScroll.current = currentScroll;

    materialRef.current.uVelocity = THREE.MathUtils.lerp(
      materialRef.current.uVelocity,
      scrollDelta * 40,
      1 - Math.exp(-10 * delta)
    );

    // Bind loaded texture
    if (texture) {
      materialRef.current.uTexture = texture;
      materialRef.current.uHasTexture = 1.0;
    }
  });

  return (
    <mesh
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        setHovered(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
        setHovered(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (onSelect) onSelect();
      }}
    >
      <planeGeometry args={[3.8, 2.1, 32, 32]} />
      <projectDistortMaterial ref={materialRef} transparent />
    </mesh>
  );
}
