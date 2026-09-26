import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, Preload } from '@react-three/drei';
import { CameraRig } from './CameraRig';
import { Effects } from './Effects';
import { CyberGridFloor } from '../shaders/CyberGridFloor';
import { DataParticles } from './DataParticles';
import { BlastDoor } from './models/BlastDoor';
import { ControlRoom } from './models/ControlRoom';
import { ServerAisle } from './models/ServerAisle';
import { GlowingConduit } from './models/GlowingConduit';
import { ProjectConveyor } from './models/ProjectConveyor';
import { CommandTerminal } from './models/CommandTerminal';
import { useScrollProgress } from '../../context/ScrollContext';

function SceneContent() {
  const { scrollProgress, setSelectedProject, wireframeMode } = useScrollProgress();

  return (
    <>
      {/* Dynamic Camera Rig Driven by Scroll Splines */}
      <CameraRig />

      {/* Atmospheric Environment */}
      <CyberGridFloor />
      <DataParticles count={wireframeMode ? 900 : 650} />

      {/* Section 1: Hero Gateway Blast Door */}
      <BlastDoor
        progress={scrollProgress.current}
        position={[0, 0, 7.5]}
        wireframe={wireframeMode}
      />

      {/* Section 2: About Control Room */}
      <ControlRoom position={[-3.5, 0, 0]} wireframe={wireframeMode} />

      {/* Section 3: Skills Server Aisle */}
      <ServerAisle position={[0, 0, -8]} wireframe={wireframeMode} />

      {/* Inter-Rack Fiber Optic Data Conduits */}
      <GlowingConduit
        points={[
          [-3.0, 3.8, -8],
          [-1.5, 4.2, -7],
          [1.5, 4.0, -9],
          [3.0, 3.8, -8],
        ]}
        color={wireframeMode ? '#00ff88' : '#00f0ff'}
        pulseSpeed={3.5}
      />
      <GlowingConduit
        points={[
          [3.0, 3.8, -12],
          [1.0, 4.3, -11],
          [-1.0, 4.1, -13],
          [-3.0, 3.8, -12],
        ]}
        color={wireframeMode ? '#00ff44' : '#ff007f'}
        pulseSpeed={2.8}
      />
      <GlowingConduit
        points={[
          [-3.5, 3.0, 0],
          [-2.0, 3.8, -4],
          [0, 3.5, -8],
        ]}
        color="#00ff88"
        pulseSpeed={4.0}
      />

      {/* Section 4: Projects Deployment Pipeline */}
      <ProjectConveyor
        position={[4.0, 0, -15]}
        onSelectProject={(proj) => setSelectedProject(proj)}
      />

      {/* Section 5 & 6: Contact Command Terminal */}
      <CommandTerminal position={[0, 0, -25]} wireframe={wireframeMode} />

      {/* Postprocessing Pass */}
      <Effects />

      {/* Optimization Utilities */}
      <AdaptiveDpr pixelated />
      <Preload all />
    </>
  );
}

export function Scene() {
  const { wireframeMode } = useScrollProgress();
  const bgColor = wireframeMode ? '#020c08' : '#07090e';
  const fogColor = wireframeMode ? '#020c08' : '#07090e';

  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-screen h-screen">
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        camera={{ fov: 45, near: 0.1, far: 80, position: [0, 2.2, 13] }}
      >
        <color attach="background" args={[bgColor]} />
        <fog attach="fog" args={[fogColor, 10, 38]} />

        {/* Ambient & Rim Lighting */}
        <ambientLight intensity={wireframeMode ? 0.7 : 0.4} />
        <directionalLight
          position={[10, 15, 8]}
          intensity={0.8}
          color={wireframeMode ? '#00ff88' : '#4570ff'}
        />
        <pointLight
          position={[0, 3.5, 5]}
          intensity={wireframeMode ? 6.0 : 4.0}
          color={wireframeMode ? '#00ff88' : '#00f0ff'}
          distance={15}
        />
        <pointLight position={[-3.5, 3.0, 0]} intensity={3.5} color="#00ff88" distance={12} />
        <pointLight
          position={[0, 3.0, -10]}
          intensity={3.0}
          color={wireframeMode ? '#00ff88' : '#00f0ff'}
          distance={15}
        />
        <pointLight position={[4.0, 3.0, -16]} intensity={3.5} color="#ff007f" distance={14} />
        <pointLight position={[0, 3.0, -24]} intensity={4.5} color="#00f0ff" distance={12} />

        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
