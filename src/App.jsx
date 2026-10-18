import React, { Suspense, useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  ScrollControls,
  useScroll,
  Html,
  Text,
  useTexture,
  RoundedBox,
  MeshReflectorMaterial,
  Float,
  Stars,
  Environment,
  Lightformer,
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';
import { sound } from './utils/soundEngine';

// ==========================================
// 1. YOUR EXACT REPO ASSETS & DATA
// ==========================================
const PROJECTS = [
  {
    id: 'careeros',
    title: 'CAREER OS',
    role: 'Full-Stack AI Career Platform',
    image: '/assets/careeros.png',
    position: [-6.5, 3.8, -8],
    rotation: [0, 0.35, 0],
    buildingHeight: 11,
    accent: '#38bdf8',
    liveUrl: 'https://careeros-beta.vercel.app/',
    githubUrl: 'https://github.com/Tahir-CS/CareerOS',
    tech: 'Next.js · BullMQ · Redis · PostgreSQL',
  },
  {
    id: 'sub-guardian',
    title: 'SUBSCRIPTION GUARDIAN',
    role: 'FinTech Recurring Tracker & Alerts',
    image: '/assets/subscription-guardian.png',
    position: [6.5, 4.2, -16],
    rotation: [0, -0.35, 0],
    buildingHeight: 13,
    accent: '#a855f7',
    liveUrl: 'https://subscription-guardian.vercel.app/',
    githubUrl: 'https://github.com/Tahir-CS/subscription-guardian',
    tech: 'Chrome Extension · WebCrypto · Privacy-First',
  },
  {
    id: 'uet-ocw',
    title: 'UET OCW PORTAL',
    role: 'OpenCourseWare Distributed Platform',
    image: '/assets/uet-ocw.png',
    position: [-6.5, 3.5, -24],
    rotation: [0, 0.35, 0],
    buildingHeight: 10,
    accent: '#22c55e',
    liveUrl: null,
    githubUrl: 'https://github.com/Tahir-CS',
    tech: 'Next.js · Laravel · PostgreSQL · AWS S3',
  },
  {
    id: 'yt-analysis',
    title: 'YOUTUBE TRACKER & AI',
    role: 'Analytics & Cost Estimator Engine',
    image: '/assets/yt-analysis.png',
    position: [6.5, 4.5, -32],
    rotation: [0, -0.35, 0],
    buildingHeight: 14,
    accent: '#ef4444',
    liveUrl: 'https://creatoriq-engine.vercel.app/',
    githubUrl: 'https://github.com/Tahir-CS/CreatorIQ',
    tech: 'React · FastAPI · YouTube v3 · TimescaleDB',
  },
  {
    id: 'trendvision',
    title: 'TRENDVISION',
    role: 'Predictive Analytics Dashboard',
    image: '/assets/trendvision.png',
    position: [-6.5, 4.0, -40],
    rotation: [0, 0.35, 0],
    buildingHeight: 12,
    accent: '#f59e0b',
    liveUrl: null,
    githubUrl: 'https://github.com/Tahir-CS',
    tech: 'Python · WebSocket Multiplexer · Redis Stream',
  },
  {
    id: 'ai-resume',
    title: 'AI RESUME ANALYZER',
    role: 'LLM ATS Scoring & Refactoring',
    image: '/assets/ai-resume-analyzer.png',
    position: [6.5, 3.8, -48],
    rotation: [0, -0.35, 0],
    buildingHeight: 11,
    accent: '#06b6d4',
    liveUrl: null,
    githubUrl: 'https://github.com/Tahir-CS',
    tech: 'PGVector · LangChain · OpenAI · Worker Threads',
  },
  {
    id: 'ecommerce',
    title: '3D E-COMMERCE STORE',
    role: 'High-Concurrency Retail Engine',
    image: '/assets/ecommerce-store.png',
    position: [-6.5, 4.2, -56],
    rotation: [0, 0.35, 0],
    buildingHeight: 13,
    accent: '#ec4899',
    liveUrl: 'https://e-commerse-store-eta.vercel.app/',
    githubUrl: 'https://github.com/Tahir-CS/E-commerse-store',
    tech: 'React · Supabase RLS · Stripe API · PostgreSQL',
  },
];

const CERTIFICATES = [
  { title: 'AWS CLOUD', image: '/assets/certificates/aws.png', pos: [-5.2, 2.2, -68], rot: [0, 0.5, 0] },
  { title: 'IBM BACKEND', image: '/assets/certificates/ibm-backend.png', pos: [-2.7, 2.2, -70], rot: [0, 0.25, 0] },
  { title: 'IBM DEVOPS', image: '/assets/certificates/ibm-devops.png', pos: [0, 2.2, -71], rot: [0, 0, 0] },
  { title: 'MERN STACK', image: '/assets/certificates/mern.png', pos: [2.7, 2.2, -70], rot: [0, -0.25, 0] },
  { title: 'META REACT', image: '/assets/certificates/meta-react.png', pos: [5.2, 2.2, -68], rot: [0, -0.5, 0] },
];

// ==========================================
// 2. DUAL-MODE 3D CAMERA RIG (SCROLL + CLICK ZOOM)
// ==========================================
function WorldCameraRig({ focusedTarget }) {
  const scroll = useScroll();
  const currentLookAt = useRef(new THREE.Vector3(0, 1.5, 0));

  // The 3D flight spline through your world
  const { posCurve, lookCurve } = useMemo(() => {
    const posCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 2.1, 4.2),   // Zone 1: Close-up on 3D Laptop Desk
      new THREE.Vector3(0, 3.5, -4),    // Lift off desk into the Cyber Street
      new THREE.Vector3(0, 3.8, -20),   // Flying between Project Buildings 1-3
      new THREE.Vector3(0, 3.8, -42),   // Flying between Project Buildings 4-6
      new THREE.Vector3(0, 3.5, -58),   // Passing Building 7
      new THREE.Vector3(0, 2.5, -63.5), // Zone 3: Entering Certificate Hologram Plaza
    ]);

    const lookCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 1.4, 0),     // Looking at 3D Laptop Screen
      new THREE.Vector3(-3, 3.5, -10),  // Looking toward first billboard
      new THREE.Vector3(2, 3.5, -26),
      new THREE.Vector3(-2, 3.5, -46),
      new THREE.Vector3(0, 2.8, -66),
      new THREE.Vector3(0, 2.2, -71),   // Looking at Certificate Vault
    ]);

    return { posCurve, lookCurve };
  }, []);

  useFrame((state, delta) => {
    let targetCamPos = new THREE.Vector3();
    let targetLookAt = new THREE.Vector3();

    if (focusedTarget) {
      // CLICKED A 3D OBJECT: Fly camera directly in front of that 3D screen/billboard!
      targetCamPos.copy(focusedTarget.camPos);
      targetLookAt.copy(focusedTarget.lookAt);
    } else {
      // SCROLL MODE: Fly along the 3D city spline
      const t = THREE.MathUtils.clamp(scroll.offset, 0, 1);
      targetCamPos.copy(posCurve.getPointAt(t));
      targetLookAt.copy(lookCurve.getPointAt(t));

      // Subtle mouse head-turn parallax
      targetCamPos.x += state.pointer.x * 0.4;
      targetCamPos.y += state.pointer.y * 0.25;
    }

    state.camera.position.lerp(targetCamPos, 1 - Math.exp(-4.5 * delta));
    currentLookAt.current.lerp(targetLookAt, 1 - Math.exp(-5.5 * delta));
    state.camera.lookAt(currentLookAt.current);
  });

  return null;
}

// ==========================================
// 3. ZONE 1: 3D WORKSTATION & LAPTOP WITH LIVE HTML SCREEN
// ==========================================
function RooftopWorkstation({ onFocusObject }) {
  const heroTex = useTexture('/assets/hero.png');

  const focusLaptop = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    sound.playHoloEngage();
    onFocusObject({
      title: 'TAHIR // COMMAND TERMINAL',
      role: 'Software & Backend Systems Engineer',
      camPos: new THREE.Vector3(0, 1.65, 1.65),
      lookAt: new THREE.Vector3(0, 1.45, 0),
      githubUrl: 'https://github.com/Tahir-CS',
      liveUrl: 'https://linkedin.com/in/tahir-butt-8345a5329',
    });
  };

  return (
    <group position={[0, 0, 0]}>
      {/* 3D Cyber Desk Table */}
      <RoundedBox args={[4.6, 0.12, 2.2]} position={[0, 0.8, 0]} radius={0.03}>
        <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
      </RoundedBox>
      {/* Desk Legs */}
      <mesh position={[-2.0, 0.4, 0]}>
        <boxGeometry args={[0.12, 0.8, 1.8]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} />
      </mesh>
      <mesh position={[2.0, 0.4, 0]}>
        <boxGeometry args={[0.12, 0.8, 1.8]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} />
      </mesh>
      {/* Neon Desk Underglow Strip */}
      <mesh position={[0, 0.81, -1.08]}>
        <boxGeometry args={[4.5, 0.03, 0.03]} />
        <meshBasicMaterial color="#38bdf8" toneMapped={false} />
      </mesh>

      {/* 3D Modeled Laptop Base */}
      <group position={[0, 0.87, 0.2]} onClick={focusLaptop}>
        <RoundedBox args={[1.6, 0.05, 1.1]} radius={0.02}>
          <meshStandardMaterial color="#334155" metalness={0.85} roughness={0.2} />
        </RoundedBox>

        {/* 3D Hinged Laptop Screen */}
        <group position={[0, 0.025, -0.52]} rotation={[-0.22, 0, 0]}>
          <RoundedBox args={[1.6, 1.05, 0.04]} position={[0, 0.52, 0]} radius={0.02}>
            <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.15} />
          </RoundedBox>

          {/* ACTUAL INTERACTIVE WEBSITE EMBEDDED INSIDE THE 3D LAPTOP SCREEN */}
          <Html
            transform
            occlude="blending"
            distanceFactor={1.15}
            position={[0, 0.52, 0.026]}
            style={{
              width: '520px',
              height: '330px',
              background: '#020617',
              borderRadius: '8px',
              border: '2px solid #38bdf8',
              padding: '20px',
              color: '#f8fafc',
              fontFamily: 'monospace',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
              userSelect: 'none',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '8px' }}>
              <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>tahir@arch-os:~</span>
              <span style={{ color: '#22c55e', fontSize: '12px' }}>● SYSTEM ONLINE (CLICK TO ZOOM)</span>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', margin: '12px 0' }}>
              <img
                src="/assets/me.jpg"
                alt="Tahir"
                style={{ width: '88px', height: '88px', borderRadius: '12px', objectFit: 'cover', border: '2px solid #38bdf8' }}
              />
              <div>
                <h1 style={{ margin: 0, fontSize: '22px', color: '#ffffff' }}>MUHAMMAD TAHIR</h1>
                <p style={{ margin: '4px 0', color: '#38bdf8', fontSize: '13px' }}>
                  Software & Backend Engineer • Distributed Systems
                </p>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '11px', lineHeight: 1.4 }}>
                  Node.js / TypeScript • PostgreSQL • BullMQ • Redis • Docker • React 3D
                </p>
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  <a
                    href="https://github.com/Tahir-CS"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#38bdf8', fontSize: '11px', textDecoration: 'underline' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    GitHub ↗
                  </a>
                  <a
                    href="https://linkedin.com/in/tahir-butt-8345a5329"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#38bdf8', fontSize: '11px', textDecoration: 'underline' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    LinkedIn ↗
                  </a>
                  <a
                    href="mailto:mtahirbutt1005@gmail.com"
                    style={{ color: '#38bdf8', fontSize: '11px', textDecoration: 'underline' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Email ↗
                  </a>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a', padding: '10px 12px', borderRadius: '6px' }}>
              <span style={{ fontSize: '11px', color: '#cbd5e1' }}>
                SCROLL DOWN TO FLY THROUGH THE 3D PROJECT CITY ↓
              </span>
              <button
                onClick={focusLaptop}
                style={{
                  background: '#38bdf8',
                  color: '#020617',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '11px',
                }}
              >
                FOCUS MONITOR
              </button>
            </div>
          </Html>
        </group>
      </group>

      {/* Secondary Vertical 3D Hologram Monitor on Desk showing hero.png */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <group position={[-1.55, 1.55, -0.2]} rotation={[0, 0.35, 0]}>
          <RoundedBox args={[1.1, 1.1, 0.05]} radius={0.02}>
            <meshStandardMaterial color="#0f172a" metalness={0.8} />
          </RoundedBox>
          <mesh position={[0, 0, 0.03]}>
            <planeGeometry args={[1.0, 1.0]} />
            <meshBasicMaterial map={heroTex} transparent toneMapped={false} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

// ==========================================
// 4. ZONE 2: 3D SKYSCRAPERS WITH GIANT PROJECT BILLBOARDS
// ==========================================
function ProjectBuildingBillboard({ project, onFocusObject }) {
  const texture = useTexture(project.image);
  const [hovered, setHovered] = useState(false);

  const isLeft = project.position[0] < 0;

  const handleBillboardClick = (e) => {
    e.stopPropagation();
    sound.playHoloEngage();
    // Calculate camera position directly in front of this building's 3D billboard
    const camX = isLeft ? project.position[0] + 4.2 : project.position[0] - 4.2;
    const camZ = project.position[2] + 2.2;
    onFocusObject({
      title: project.title,
      role: project.role,
      tech: project.tech,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      camPos: new THREE.Vector3(camX, project.position[1], camZ),
      lookAt: new THREE.Vector3(project.position[0], project.position[1], project.position[2]),
    });
  };

  return (
    <group position={[project.position[0], 0, project.position[2]]}>
      {/* 3D Skyscraper Building Structure */}
      <mesh position={[isLeft ? -2.2 : 2.2, project.buildingHeight / 2, -1]}>
        <boxGeometry args={[5.5, project.buildingHeight, 5.5]} />
        <meshStandardMaterial color="#090d16" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Glowing Architectural Building Edge Pillars */}
      <mesh position={[isLeft ? 0.56 : -0.56, project.buildingHeight / 2, 1.76]}>
        <boxGeometry args={[0.08, project.buildingHeight, 0.08]} />
        <meshBasicMaterial color={project.accent} toneMapped={false} />
      </mesh>

      {/* 3D Billboard Steel Frame mounted to the building */}
      <group
        position={[0, project.position[1], 0]}
        rotation={project.rotation}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
          sound.playClick(1.2);
          setHovered(true);
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
          setHovered(false);
        }}
        onClick={handleBillboardClick}
      >
        {/* Outer Neon Frame */}
        <RoundedBox args={[5.4, 3.4, 0.25]} radius={0.06}>
          <meshStandardMaterial
            color="#111827"
            emissive={project.accent}
            emissiveIntensity={hovered ? 1.8 : 0.4}
            metalness={0.9}
            roughness={0.2}
          />
        </RoundedBox>

        {/* The Giant Lit Billboard Screen with your Project Thumbnail */}
        <mesh position={[0, 0, 0.14]}>
          <planeGeometry args={[5.1, 3.1]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>

        {/* 3D Rooftop Neon Sign Above the Billboard */}
        <Text
          position={[-2.5, 2.05, 0.15]}
          anchorX="left"
          fontSize={0.34}
          color="#ffffff"
          outlineWidth={0.02}
          outlineColor={project.accent}
        >
          {project.title}
        </Text>

        <Text
          position={[-2.5, 1.68, 0.15]}
          anchorX="left"
          fontSize={0.18}
          color={project.accent}
        >
          {`${project.role}  [CLICK BILLBOARD TO INSPECT]`}
        </Text>
      </group>
    </group>
  );
}

// ==========================================
// 5. ZONE 3: HOLOGRAPHIC CERTIFICATE VAULT PILLARS
// ==========================================
function CertificatePillar({ cert, onFocusObject }) {
  const tex = useTexture(cert.image);
  const [hovered, setHovered] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    sound.playHoloEngage();
    onFocusObject({
      title: `CREDENTIAL // ${cert.title}`,
      role: 'Verified Industry Certification',
      camPos: new THREE.Vector3(cert.pos[0], cert.pos[1], cert.pos[2] + 3.2),
      lookAt: new THREE.Vector3(cert.pos[0], cert.pos[1], cert.pos[2]),
    });
  };

  return (
    <group position={cert.pos} rotation={cert.rot}>
      {/* 3D Pedestal Base */}
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[0.6, 0.8, 1.4, 6]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Floating 3D Hologram Certificate Plaque */}
      <Float speed={2.5} rotationIntensity={0.08} floatIntensity={0.25}>
        <group
          onClick={handleClick}
          onPointerOver={() => {
            document.body.style.cursor = 'pointer';
            sound.playClick(1.4);
            setHovered(true);
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'auto';
            setHovered(false);
          }}
        >
          <RoundedBox args={[2.3, 1.65, 0.1]} radius={0.04}>
            <meshStandardMaterial
              color="#1e293b"
              emissive="#38bdf8"
              emissiveIntensity={hovered ? 1.5 : 0.3}
            />
          </RoundedBox>
          <mesh position={[0, 0, 0.06]}>
            <planeGeometry args={[2.15, 1.5]} />
            <meshBasicMaterial map={tex} toneMapped={false} />
          </mesh>
          <Text position={[0, 1.05, 0]} fontSize={0.18} color="#38bdf8">
            {cert.title}
          </Text>
        </group>
      </Float>
    </group>
  );
}

// ==========================================
// 6. WET REFLECTIVE CYBERPUNK STREET & ENVIRONMENT
// ==========================================
function CyberCityEnvironment({ onFocusObject }) {
  return (
    <group>
      {/* Reflective Wet Asphalt Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, -35]}>
        <planeGeometry args={[60, 120]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={512}
          mixBlur={1}
          mixStrength={55}
          roughness={0.85}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050811"
          metalness={0.6}
        />
      </mesh>

      {/* Glowing Road Lane Guide Strips */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2.2, 0.01, -35]}>
        <planeGeometry args={[0.08, 90]} />
        <meshBasicMaterial color="#38bdf8" toneMapped={false} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2.2, 0.01, -35]}>
        <planeGeometry args={[0.08, 90]} />
        <meshBasicMaterial color="#a855f7" toneMapped={false} />
      </mesh>

      {/* Zone 1: Rooftop Command Desk & 3D Laptop */}
      <RooftopWorkstation onFocusObject={onFocusObject} />

      {/* Zone 2: The 7 Project Skyscraper Billboards */}
      {PROJECTS.map((proj) => (
        <ProjectBuildingBillboard
          key={proj.id}
          project={proj}
          onFocusObject={onFocusObject}
        />
      ))}

      {/* Zone 3: The 5 Certificate Hologram Pillars */}
      <Text position={[0, 4.5, -71]} fontSize={0.55} color="#ffffff">
        VERIFIED CREDENTIALS VAULT
      </Text>
      {CERTIFICATES.map((cert) => (
        <CertificatePillar
          key={cert.title}
          cert={cert}
          onFocusObject={onFocusObject}
        />
      ))}
    </group>
  );
}

// ==========================================
// 7. MASTER APPLICATION ENTRY
// ==========================================
export default function App() {
  const [focusedTarget, setFocusedTarget] = useState(null);
  const [muted, setMuted] = useState(true);

  // Allow pressing ESC to exit zoomed-in billboard/laptop view
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setFocusedTarget(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleSound = () => {
    const isMuted = sound.toggleMute();
    setMuted(isMuted);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#020617', overflow: 'hidden', position: 'relative' }}>
      {/* Top Controls Bar */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          left: '24px',
          right: '24px',
          zIndex: 50,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: '11px',
            color: '#38bdf8',
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            padding: '6px 14px',
            borderRadius: '999px',
            pointerEvents: 'auto',
          }}
        >
          ● 100% DIEGETIC 3D WORLD // TAHIR ARCH-OS
        </div>

        <button
          onClick={handleToggleSound}
          style={{
            fontFamily: 'monospace',
            fontSize: '11px',
            color: muted ? '#94a3b8' : '#22c55e',
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${muted ? 'rgba(148, 163, 184, 0.3)' : 'rgba(34, 197, 94, 0.4)'}`,
            padding: '6px 14px',
            borderRadius: '999px',
            cursor: 'pointer',
            pointerEvents: 'auto',
          }}
        >
          {muted ? 'SOUND: OFF [CLICK TO UNMUTE]' : 'SOUND: LIVE AMBIENT'}
        </button>
      </div>

      {/* Minimal HUD Overlay ONLY when zoomed into a 3D Billboard/Laptop */}
      {focusedTarget && (
        <div
          style={{
            position: 'fixed',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 50,
            background: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(16px)',
            border: '1px solid #38bdf8',
            padding: '14px 28px',
            borderRadius: '16px',
            color: '#fff',
            fontFamily: 'monospace',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 25px rgba(56, 189, 248, 0.25)',
            maxWidth: '90vw',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ fontSize: '12px' }}>
              INSPECTING: <strong style={{ color: '#38bdf8' }}>{focusedTarget.title}</strong>
              {focusedTarget.role && <span style={{ opacity: 0.7, marginLeft: '8px' }}>· {focusedTarget.role}</span>}
            </span>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              {focusedTarget.liveUrl && (
                <a
                  href={focusedTarget.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: '#22c55e',
                    color: '#020617',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    fontSize: '11px',
                  }}
                >
                  LIVE DEMO ↗
                </a>
              )}

              {focusedTarget.githubUrl && (
                <a
                  href={focusedTarget.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    fontSize: '11px',
                  }}
                >
                  GITHUB ↗
                </a>
              )}

              <button
                onClick={() => setFocusedTarget(null)}
                style={{
                  background: '#38bdf8',
                  color: '#020617',
                  border: 'none',
                  padding: '6px 16px',
                  borderRadius: '999px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '11px',
                }}
              >
                BACK TO 3D WORLD (ESC)
              </button>
            </div>
          </div>

          {focusedTarget.tech && (
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>
              STACK: {focusedTarget.tech}
            </div>
          )}
        </div>
      )}

      <Canvas camera={{ position: [0, 2.1, 4.2], fov: 50 }} gl={{ antialias: false, powerPreference: 'high-performance' }}>
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 12, 45]} />

        <Suspense fallback={null}>
          <Stars radius={80} depth={50} count={3500} factor={4} saturation={0} fade speed={1} />

          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 0, 1]}>
              <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
              <Lightformer form="ring" color="#38bdf8" intensity={3} position={[-5, 2, -1]} scale={3} />
              <Lightformer form="rect" color="#a855f7" intensity={2} position={[10, 1, 0]} rotation-y={-Math.PI / 2} scale={[10, 2, 1]} />
            </group>
          </Environment>

          <ScrollControls pages={8} damping={0.18}>
            <WorldCameraRig focusedTarget={focusedTarget} />
            <CyberCityEnvironment onFocusObject={setFocusedTarget} />
          </ScrollControls>

          <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={0.9} mipmapBlur intensity={0.65} />
            <Noise opacity={0.02} />
            <Vignette eskil={false} offset={0.15} darkness={0.8} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
