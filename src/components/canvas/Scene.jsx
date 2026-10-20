import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, Environment, ContactShadows } from '@react-three/drei';
import { CameraRig } from './CameraRig';
import { Effects } from './Effects';
import { DataParticles } from './DataParticles';
import { InteractiveWorkstation } from './models/InteractiveWorkstation';
import { CertificatesVault } from './CertificateSlab';
import { CityAvenueDistrict } from './models/CityAvenueDistrict';
import { ProjectChasm } from './models/ProjectChasm';
import { SpaceBeacon } from './models/SpaceBeacon';
import { RealisticCity } from './models/RealisticCity';
import { CityScape } from './models/CityScape';
import { ServerAisle } from './models/ServerAisle';
import { GlowingConduit } from './models/GlowingConduit';
import { useScrollProgress } from '../../context/ScrollContext';
import { portfolioConfig } from '../../config/portfolio.config';

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
        intensity={wireframeMode ? 0.7 : isObsidian ? 0.55 : 0.9}
        color={wireframeMode ? '#00ff88' : isObsidian ? '#0f1016' : '#fff7ed'}
      />
      <directionalLight
        position={[8, 14, 8]}
        intensity={isObsidian ? 2.0 : 1.5}
        color={wireframeMode ? '#00ff88' : isObsidian ? '#ffffff' : '#fffdfa'}
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
      {/* 1. Camera Choreography & Click-to-Zoom Engine */}
      <CameraRig />

      {/* 2. Dynamic Lighting Engine */}
      <SceneLighting />

      {/* 3. Floating Starlight & Data Stream Particles */}
      <DataParticles count={wireframeMode ? 700 : 500} />

      {/* 4. HDR Environment Probe */}
      <Suspense fallback={null}>
        <Environment
          files={isObsidian ? '/models/city.hdr' : '/models/studio.hdr'}
          environmentIntensity={isObsidian ? 0.9 : 0.6}
        />
      </Suspense>

      {/* Baked Workstation Ground Contact Shadows */}
      <ContactShadows
        position={[0, -1.78, 0]}
        opacity={isObsidian ? 0.6 : 0.4}
        scale={16}
        blur={2.4}
        far={4.5}
        frames={1}
      />

      {/* 5. Zone 1: Realistic Workstation (macbook.glb + studio_monitor.glb) Pristine Penthouse */}
      <ModelErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <InteractiveWorkstation position={[0, 0, 0]} />
        </Suspense>
      </ModelErrorBoundary>

      {/* 6. Zone 2: Refractive Acrylic Certificate Vault + 112-LED ServerAisle + GlowingConduits */}
      <ModelErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <CertificatesVault
            certificates={portfolioConfig.certifications}
            position={[0, 0.4, -6.5]}
          />
          <ServerAisle position={[0, -1.4, -8.8]} wireframe={wireframeMode} />
          <GlowingConduit
            points={[
              [-2.5, -1.2, -4.5],
              [-3.2, -1.0, -8.0],
              [-2.8, -0.5, -13.0],
              [-1.8, 1.0, -18.5],
              [0, 0.2, -25],
            ]}
            color="#00f0ff"
          />
          <GlowingConduit
            points={[
              [2.5, -1.2, -4.5],
              [3.2, -1.0, -8.0],
              [2.8, -0.5, -13.0],
              [1.8, 1.0, -18.5],
              [0, 0.2, -25],
            ]}
            color="#00ff88"
          />
        </Suspense>
      </ModelErrorBoundary>

      {/* 7. Zone 3: Authentic 3D Building City Block (allBuildings.glb + outdoor_billboard.glb + BuildingScreens) */}
      <ModelErrorBoundary fallback={<CityScape position={[0, -1.5, -6]} />}>
        <Suspense fallback={<CityScape position={[0, -1.5, -6]} />}>
          <RealisticCity position={[0, -1.5, -15]} />
        </Suspense>
      </ModelErrorBoundary>

      {/* 8. Zone 3b: Cyber City Avenue & 7 Illuminated Tech Monolith Pillars */}
      <ModelErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <CityAvenueDistrict position={[0, -1.2, -10.5]} />
        </Suspense>
      </ModelErrorBoundary>

      {/* 9. Zone 4: Project Skyscraper Showcase Facade (All 7 Glass Monoliths) */}
      <ModelErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <ProjectChasm
            position={[0, 0, -18.5]}
            onSelectProject={(proj) => setSelectedProject(proj)}
          />
        </Suspense>
      </ModelErrorBoundary>

      {/* 10. Zone 5: Skyscraper Summit Observation Deck + 3D CommandTerminal Contact Uplink */}
      <ModelErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <SpaceBeacon position={[0, 0, -25]} />
        </Suspense>
      </ModelErrorBoundary>

      {/* 11. Editorial Postprocessing Pass */}
      <Effects />

      {/* 12. Dynamic Performance Scaling */}
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
    <div className="fixed inset-0 z-0 pointer-events-auto w-screen h-screen">
      <Canvas
        dpr={[1, 1.25]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        camera={{ fov: 42, near: 0.1, far: 80, position: [0, 1.7, 4.6] }}
      >
        <color attach="background" args={[bgColor]} />
        <fog attach="fog" args={[fogColor, 8, 38]} />

        <SceneContent />
      </Canvas>
    </div>
  );
}
