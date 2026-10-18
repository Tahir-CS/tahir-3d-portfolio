import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollProgress } from '../../../context/ScrollContext';
import { portfolioConfig } from '../../../config/portfolio.config';
import { CommandTerminal } from './CommandTerminal';
import { sound } from '../../../utils/soundEngine';
import { Send, Copy, Check, Sparkles } from 'lucide-react';

export function SpaceBeacon({ position = [0, 0, -25] }) {
  const { theme, wireframeMode, setFocusedTarget } = useScrollProgress();
  const { personal } = portfolioConfig;
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const coreRef = useRef();
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const isObsidian = theme === 'obsidian';

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.4;
      ring1Ref.current.rotation.y = t * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.5;
      ring2Ref.current.rotation.z = t * 0.25;
    }
    if (coreRef.current) {
      coreRef.current.position.y = 2.5 + Math.sin(t * 1.5) * 0.08;
    }
  });

  const accentColor = wireframeMode ? '#00ff88' : isObsidian ? '#38bdf8' : '#d4af37';

  const handleCopyEmail = (e) => {
    e.stopPropagation();
    sound.playClick(1.4);
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const focusTerminal = () => {
    sound.playHoloEngage();
    setFocusedTarget({
      title: 'SUMMIT BROADCAST TERMINAL // DIRECT UPLINK',
      sub: `${personal.email} // ${personal.phone}`,
      pos: [0, 1.45, -22.5],
      lookAt: [0, 1.35, -25.0],
    });
  };

  return (
    <group position={position}>
      {/* 1. Rooftop Observation Deck Foundation */}
      <mesh position={[0, -1.3, 0]} receiveShadow>
        <cylinderGeometry args={[4.8, 5.5, 0.4, 32]} />
        <meshStandardMaterial
          color={isObsidian ? '#0a0c12' : '#e6e0d5'}
          metalness={0.88}
          roughness={0.2}
          wireframe={wireframeMode}
        />
      </mesh>

      {/* 2. Outer Terrace Perimeter Landing Ring */}
      <mesh position={[0, -1.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.4, 4.7, 32]} />
        <meshBasicMaterial
          color={wireframeMode ? '#00ff88' : isObsidian ? '#00f0ff' : '#d4af37'}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* 3. Your 3D CommandTerminal Hardware Deck Mounted on the Rooftop */}
      <group position={[0, -1.1, 0]} onClick={focusTerminal}>
        <CommandTerminal position={[0, 0, 0]} wireframe={wireframeMode} />
      </group>

      {/* 4. Interactive 3D Contact Console Embedded Inside the Rooftop Command Terminal */}
      <Html
        transform
        distanceFactor={1.2}
        position={[0, 1.15, 0.15]}
        scale={0.115}
        className="pointer-events-auto select-none"
      >
        <div
          className={`w-[680px] h-[410px] rounded-xl border-2 p-5 shadow-2xl flex flex-col justify-between font-mono text-xs ${
            isObsidian
              ? 'bg-[#04070f]/95 border-cyan-400/70 text-white shadow-[0_0_60px_rgba(0,240,255,0.35)]'
              : 'bg-[#faf7f2]/95 border-amber-700/70 text-neutral-900'
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>ROOFTOP_UPLINK // TRANSMIT_PACKET.SH</span>
            </div>
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-[10px] text-cyan-300 cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'COPIED!' : personal.email}</span>
            </button>
          </div>

          {submitted ? (
            <div className="my-auto text-center space-y-3">
              <div className="text-2xl font-black text-emerald-400">● TRANSMISSION DISPATCHED</div>
              <p className="text-[11px] text-neutral-300">
                Packet routed to {personal.email}. Expect response within standard SLA.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-1.5 rounded bg-cyan-400 text-black font-bold text-[10px] cursor-pointer"
              >
                SEND ANOTHER PACKET
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sound.playHoloEngage();
                setSubmitted(true);
              }}
              className="grid grid-cols-2 gap-3 my-auto"
            >
              <div>
                <label className="text-[9px] text-neutral-400 block mb-1">[01] SENDER_NAME</label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => {
                    sound.playTypingBlip();
                    setFormState({ ...formState, name: e.target.value });
                  }}
                  placeholder="Alex Mercer"
                  className="w-full px-3 py-2 rounded bg-black/50 border border-white/20 text-white text-xs focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[9px] text-neutral-400 block mb-1">[02] RETURN_EMAIL</label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => {
                    sound.playTypingBlip();
                    setFormState({ ...formState, email: e.target.value });
                  }}
                  placeholder="alex@enterprise.io"
                  className="w-full px-3 py-2 rounded bg-black/50 border border-white/20 text-white text-xs focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div className="col-span-2">
                <label className="text-[9px] text-neutral-400 block mb-1">[03] PAYLOAD_MESSAGE</label>
                <textarea
                  rows={3}
                  required
                  value={formState.message}
                  onChange={(e) => {
                    sound.playTypingBlip();
                    setFormState({ ...formState, message: e.target.value });
                  }}
                  placeholder="Backend architecture role, distributed systems project, or collaboration..."
                  className="w-full px-3 py-2 rounded bg-black/50 border border-white/20 text-white text-xs focus:border-cyan-400 focus:outline-none resize-none"
                />
              </div>
              <div className="col-span-2 flex items-center justify-between pt-1">
                <div className="flex gap-3 text-[10px] text-cyan-300">
                  <a href={personal.social.github} target="_blank" rel="noreferrer" className="underline">GitHub ↗</a>
                  <a href={personal.social.linkedin} target="_blank" rel="noreferrer" className="underline">LinkedIn ↗</a>
                  <span>{personal.phone}</span>
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 rounded bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>TRANSMIT PAYLOAD</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </Html>

      {/* 5. Glowing Holographic Uplink Core Floating Above the Terminal */}
      <group ref={coreRef} position={[0, 2.5, 0]}>
        <mesh>
          <octahedronGeometry args={[0.45, 2]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={isObsidian ? 0.9 : 0.45}
            metalness={0.95}
            roughness={0.1}
            wireframe={wireframeMode}
          />
        </mesh>
        <mesh ref={ring1Ref}>
          <torusGeometry args={[1.1, 0.02, 16, 64]} />
          <meshStandardMaterial color={accentColor} metalness={1.0} roughness={0.1} wireframe={wireframeMode} />
        </mesh>
        <mesh ref={ring2Ref}>
          <torusGeometry args={[1.4, 0.018, 16, 64]} />
          <meshStandardMaterial color={isObsidian ? '#ffffff' : '#b38b38'} metalness={1.0} roughness={0.1} wireframe={wireframeMode} />
        </mesh>
      </group>

      {/* 6. In-World Architectural Typography */}
      <Text
        position={[0, 3.85, 0]}
        fontSize={0.22}
        color={isObsidian ? '#ffffff' : '#18181b'}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.15}
        fontWeight="bold"
      >
        SUMMIT BROADCAST TERMINAL
      </Text>
    </group>
  );
}
