import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, Preload, Environment } from '@react-three/drei';
import { CameraRig } from './CameraRig';
import { Effects } from './Effects';
import { DataParticles } from './DataParticles';
import { InteractiveWorkstation } from './models/InteractiveWorkstation';
import { LiquidChromeOcean } from './models/LiquidChromeOcean';
import { ProjectChasm } from './models/ProjectChasm';
import { SpaceBeacon } from './models/SpaceBeacon';
import { RealisticCity } from './models/RealisticCity';
import { useScrollProgress } from '../../context/ScrollContext';

class SceneErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.warn('3D Scene Error caught gracefully:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

function SceneLighting() {
  const { theme, wireframeMode } = useScrollProgress();
  const isObsidian = theme === 'obsidian';

  return (
    <>
      <ambientLight
        intensity={wireframeMode ? 0.7 : isObsidian ? 0.45 : 0.85}
        color={wireframeMode ? '#00ff88' : isObsidian ? '#0f1016' : '#fff7ed'}
      />
      <directionalLight
        position={[8, 14, 8]}
        intensity={isObsidian ? 1.8 : 1.4}
        color={wireframeMode ? '#00ff88' : isObsidian ? '#ffffff' : '#fffdfa'}
        castShadow
      />
      <spotLight
        position={[-8, 6, -6]}
        intensity={isObsidian ? 2.5 : 1.2}
        color={wireframeMode ? '#00ff88' : isObsidian ? '#38bdf8' : '#d4af37'}
        angle={0.6}
        penumbra={0.8}
      />
      <pointLight
        position={[0, 2.5, 2]}
        intensity={isObsidian ? 2.2 : 1.5}
        color={wireframeMode ? '#00ff88' : isObsidian ? '#38bdf8' : '#e2b35a'}
        distance={10}
      />
      <pointLight
        position={[0, 1.5, -11]}
        intensity={isObsidian ? 3.0 : 1.8}
        color={wireframeMode ? '#00ff88' : isObsidian ? '#ffffff' : '#f0e0c8'}
        distance={18}
      />
      <pointLight
        position={[0, 0.5, -25]}
        intensity={isObsidian ? 3.5 : 2.0}
        color={wireframeMode ? '#00ff88' : isObsidian ? '#38bdf8' : '#d4af37'}
        distance={15}
      />
    </>
  );
}

function SceneContent() {
  const { setSelectedProject, wireframeMode, theme } = useScrollProgress();

  return (
    <>
      {/* 11-Waypoint Camera Rig with Screen Dive & Banking Rolls */}
      <CameraRig />

      {/* Dynamic Lighting Setup */}
      <SceneLighting />

      {/* Apple Studio Environment Probe (Local offline HDR) */}
      <Environment files={theme === 'obsidian' ? '/models/city.hdr' : '/models/studio.hdr'} environmentIntensity={theme === 'obsidian' ? 0.9 : 0.6} />

      {/* Floating Starlight & Data Stream Atmosphere */}
      <DataParticles count={wireframeMode ? 700 : 450} />

      {/* Section 1 & 2: Realistic 3D MacBook Pro Workstation & Top-Down Screen Dive */}
      <InteractiveWorkstation position={[0, 0, 0]} />

      {/* Realistic 3D City & Sky-High Building Billboard Screens (allBuildings.glb) */}
      <RealisticCity position={[0, -1.5, -16]} />

      {/* Section 3: Liquid Chrome / Ocean Reflection Plane & Skill Monoliths */}
      <LiquidChromeOcean position={[0, -0.6, -11]} />

      {/* Section 4: Vertical Free-Fall Descent & 3D Glass Project Slabs */}
      <ProjectChasm
        position={[0, 0, 0]}
        onSelectProject={(proj) => setSelectedProject(proj)}
      />

      {/* Section 5: Deep Space Orbital Transmission Beacon */}
      <SpaceBeacon position={[0, 0, -25]} />

      {/* Postprocessing Pass */}
      <Effects />

      {/* Optimization Utilities */}
      <AdaptiveDpr pixelated />
      <Preload all />
    </>
  );
}

export function Scene() {
  const { wireframeMode, theme } = useScrollProgress();
  const isObsidian = theme === 'obsidian';

  const bgColor = wireframeMode
    ? '#020c08'
    : isObsidian
    ? '#050507'
    : '#f6f3eb';

  const fogColor = wireframeMode
    ? '#020c08'
    : isObsidian
    ? '#050507'
    : '#f6f3eb';

  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-screen h-screen">
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        camera={{ fov: 45, near: 0.1, far: 80, position: [0, 1.4, 5.2] }}
      >
        <color attach="background" args={[bgColor]} />
        <fog attach="fog" args={[fogColor, 8, 36]} />

        <Suspense fallback={null}>
          <SceneErrorBoundary>
            <SceneContent />
          </SceneErrorBoundary>
        </Suspense>
      </Canvas>
    </div>
  );
}
