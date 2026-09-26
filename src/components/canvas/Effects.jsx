import React from 'react';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';

export function Effects() {
  return (
    <EffectComposer multisampling={0} disableNormalPass>
      {/* Selective Mipmap Bloom for neon cyber glows */}
      <Bloom
        luminanceThreshold={0.8}
        luminanceSmoothing={0.35}
        intensity={1.25}
        mipmapBlur
      />
      {/* Cinematic Edge Chromatic Aberration */}
      <ChromaticAberration
        offset={new THREE.Vector2(0.001, 0.001)}
        radialModulation={true}
        modulationOffset={0.35}
      />
      {/* Focus Vignette */}
      <Vignette eskil={false} offset={0.18} darkness={1.15} />
    </EffectComposer>
  );
}
