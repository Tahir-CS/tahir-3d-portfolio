import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, Environment } from '@react-three/drei';
import { CameraRig } from './CameraRig';
import { Effects } from './Effects';
import { DataParticles } from './DataParticles';
import { InteractiveWorkstation } from './models/InteractiveWorkstation';
import { CityAvenueDistrict } from './models/CityAvenueDistrict';
import { ProjectChasm } from './models/ProjectChasm';
import { SpaceBeacon } from './models/SpaceBeacon';
import { RealisticCity } from './models/RealisticCity';
import { CityScape } from './models/CityScape';
import { useScrollProgress } from '../../context/ScrollContext';

// Isolated Error Boundary per model section so one model never breaks the scene
class ModelErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.warn('3D Model component warning:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
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
        intensity={wireframeMode ? 0.7 : isObsidian ? 0.5 : 0.9}
        color={wireframeMode ? '#00ff88' : isObsidian ? '#0f1016' : '#fff7ed'}
      />
      <directionalLight
        position={[8, 14, 8]}
        intensity={isObsidian ? 2.0 : 1.5}
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
        intensity={isObsidian ? 2.4 : 1.6}
        color={wireframeMode ? '#00ff88' : isObsidian ? '#38bdf8' : '#e2b35a'}
        distance={12}
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
  const isObsidian = theme === 'obsidian';

  return (
    <>
      {/* 1. Camera Choreography (Never blocked by Suspense) */}
      <CameraRig />

      {/* 2. Dynamic Lighting Engine (Instant frame 1 illumination) */}
      <SceneLighting />

      {/* 3. Floating Starlight & Data Stream Particles */}
      <DataParticles count={wireframeMode ? 700 : 450} />

      {/* 4. HDR Environment Probe (Isolated Suspense) */}
      <Suspense fallback={null}>
        <Environment
          files={isObsidian ? '/models/city.hdr' : '/models/studio.hdr'}
          environmentIntensity={isObsidian ? 0.9 : 0.6}
        />
      </Suspense>

      {/* 5. Section 1 & 2: Realistic Workstation (MacBook Pro + Studio Monitor) */}
      <ModelErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <InteractiveWorkstation position={[0, 0, 0]} />
        </Suspense>
      </ModelErrorBoundary>

      {/* 6. Realistic 3D City & Billboard Screens (allBuildings.glb & Sky-High Displays) */}
      <ModelErrorBoundary fallback={<CityScape position={[0, -1.5, -6]} />}>
        <Suspense fallback={<CityScape position={[0, -1.5, -6]} />}>
          <RealisticCity position={[0, -1.5, -15]} />
        </Suspense>
      </ModelErrorBoundary>

      {/* 7. Section 3: Cyber City Avenue & Tech Monolith Columns (Zero water) */}
      <ModelErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <CityAvenueDistrict position={[0, -1.2, -10.5]} />
        </Suspense>
      </ModelErrorBoundary>

      {/* 8. Section 4: Project Skyscraper Showcase Facade & Glass Displays */}
      <ModelErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <ProjectChasm
            position={[0, 0, -18.5]}
            onSelectProject={(proj) => setSelectedProject(proj)}
          />
        </Suspense>
      </ModelErrorBoundary>

      {/* 9. Section 5: Skyscraper Summit Observation Deck & Broadcast Terminal */}
      <ModelErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <SpaceBeacon position={[0, 0, -25]} />
        </Suspense>
      </ModelErrorBoundary>

      {/* 10. Postprocessing Pass */}
      <Effects />

      {/* 11. Dynamic Performance Scaling */}
      <AdaptiveDpr pixelated />
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

        <SceneContent />
      </Canvas>
    </div>
  );
}
