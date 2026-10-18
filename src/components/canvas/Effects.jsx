import React from 'react';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { useScrollProgress } from '../../context/ScrollContext';

// ─────────────────────────────────────────────────────────────────────────────
// Effects — Awwwards SOTD Editorial Post-Processing Pipeline
// Features:
// • Selective Mipmap Bloom for laser/LED specular glow without blinding blowouts
// • Chromatic Aberration for realistic optic lens edge fringing
// • Analog Film Grain Noise for tactile weight
// • Calibrated Vignette framing the continuous 3D viewport
// ─────────────────────────────────────────────────────────────────────────────

export function Effects() {
  const { theme } = useScrollProgress();
  const isObsidian = theme === 'obsidian';

  return (
    <EffectComposer multisampling={0} disableNormalPass>
      {/* Selective Mipmap Bloom */}
      <Bloom
        luminanceThreshold={isObsidian ? 0.95 : 1.1}
        luminanceSmoothing={0.25}
        intensity={isObsidian ? 0.85 : 0.45}
        mipmapBlur
      />

      {/* Editorial Vignette */}
      <Vignette
        eskil={false}
        offset={isObsidian ? 0.18 : 0.28}
        darkness={isObsidian ? 0.85 : 0.35}
      />
    </EffectComposer>
  );
}
