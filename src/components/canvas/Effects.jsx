import React from 'react';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useScrollProgress } from '../../context/ScrollContext';

export function Effects() {
  const { theme, wireframeMode } = useScrollProgress();
  const isObsidian = theme === 'obsidian';

  return (
    <EffectComposer multisampling={0} disableNormalPass>
      {/* Selective Mipmap Bloom for specular highlights */}
      <Bloom
        luminanceThreshold={isObsidian ? 0.75 : 0.88}
        luminanceSmoothing={0.3}
        intensity={isObsidian ? 1.1 : 0.65}
        mipmapBlur
      />
      {/* Cinematic Edge Chromatic Aberration */}
      <ChromaticAberration
        offset={new THREE.Vector2(0.0008, 0.0008)}
        radialModulation={true}
        modulationOffset={0.4}
      />
      {/* Focus Vignette: Deep in Obsidian, Subtle warm gradient in Cream */}
      <Vignette
        eskil={false}
        offset={isObsidian ? 0.22 : 0.35}
        darkness={isObsidian ? 1.05 : 0.4}
      />
    </EffectComposer>
  );
}
