import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { damp3, damp } from 'maath/easing';
import { useScrollProgress } from '../../context/ScrollContext';

// ─────────────────────────────────────────────────────────────────────────────
// CameraRig — Cinematic City Story Flight Path
// Continuous forward journey through the cyber architectural city:
// 1. Hero Penthouse Studio [Z: +5.2]
// 2. Zooming tight into MacBook & Studio Monitor Screen [Z: +0.72]
// 3. Flying through window down the neon City Avenue [Z: -4.5 to -9.0]
// 4. Banking alongside Skyscraper Facade Mega-Billboards [Z: -12.5]
// 5. Swooping down the Project Showcase Skyscraper Tower [Z: -15.5 to -18.8]
// 6. Ascending to the Rooftop Summit Broadcast Terminal [Z: -23.8 to -25.0]
// ─────────────────────────────────────────────────────────────────────────────

const CAMERA_POSITIONS = [
  new THREE.Vector3(0, 1.4, 5.2),       // 0.00: Hero Studio (Workstation Overlook)
  new THREE.Vector3(0, 2.2, 3.0),       // 0.12: Rising, framing workstation & city
  new THREE.Vector3(0, 1.15, 0.72),     // 0.24: Diving tight into MacBook terminal screen
  new THREE.Vector3(-2.8, 2.8, -4.5),   // 0.36: Flying through window into City Avenue
  new THREE.Vector3(0.0, 3.6, -9.0),    // 0.48: Approaching Times Square Mega-LED Billboards
  new THREE.Vector3(2.8, 4.2, -12.5),   // 0.58: Banking alongside the towering skyscraper displays
  new THREE.Vector3(0.0, 6.0, -15.5),   // 0.68: Gliding into the Project Skyscraper Plaza
  new THREE.Vector3(-1.8, 3.4, -17.2),  // 0.76: Swooping past Project Screen 1 & 2
  new THREE.Vector3(1.6, 1.4, -18.8),   // 0.84: Swooping past Project Screen 3 & 4
  new THREE.Vector3(-1.0, 2.4, -22.2),  // 0.92: Ascending to Rooftop Observation Deck
  new THREE.Vector3(0.0, 1.2, -23.8),   // 1.00: Locking onto Summit Broadcast Terminal Screen
];

const LOOKAT_TARGETS = [
  new THREE.Vector3(0, 0.4, 0),         // 0.00: Desk center
  new THREE.Vector3(0, 0.8, -0.2),      // 0.12: Monitor bezel
  new THREE.Vector3(0, 0.9, -0.6),      // 0.24: Directly into the screen code
  new THREE.Vector3(-0.8, 3.2, -9.5),   // 0.36: Looking down city avenue
  new THREE.Vector3(0.0, 5.2, -14.5),   // 0.48: Looking directly at central Mega-Billboard
  new THREE.Vector3(1.2, 4.2, -15.5),   // 0.58: Looking at skyscraper billboard facade
  new THREE.Vector3(0.0, 4.2, -18.5),   // 0.68: Looking at project showcase tower
  new THREE.Vector3(-0.5, 2.5, -18.5),  // 0.76: Looking at project screens
  new THREE.Vector3(0.5, 0.8, -20.0),   // 0.84: Looking at project screens
  new THREE.Vector3(0.0, 1.6, -25.0),   // 0.92: Looking up at Summit Broadcast Spire
  new THREE.Vector3(0.0, 1.0, -25.0),   // 1.00: Locking onto Rooftop Terminal Screen
];

export function CameraRig({ damping = 0.25, mouseParallax = 0.55 }) {
  const { camera, pointer } = useThree();
  const { scrollProgress } = useScrollProgress();

  // Create smooth CatmullRom splines
  const { posSpline, lookSpline } = useMemo(() => {
    return {
      posSpline: new THREE.CatmullRomCurve3(CAMERA_POSITIONS, false, 'centripetal'),
      lookSpline: new THREE.CatmullRomCurve3(LOOKAT_TARGETS, false, 'centripetal'),
    };
  }, []);

  // Scratch vectors to eliminate GC churn
  const targetCamPos = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());
  const smoothedLookAt = useRef(new THREE.Vector3(0, 0.4, 0));
  const smoothedProgress = useRef(0);

  useFrame((state, delta) => {
    // 1. Damped scroll interpolation
    damp(smoothedProgress, 'current', scrollProgress.current, damping, delta);
    const t = THREE.MathUtils.clamp(smoothedProgress.current, 0, 1);

    // 2. Sample 3D curves
    posSpline.getPointAt(t, targetCamPos.current);
    lookSpline.getPointAt(t, targetLookAt.current);

    // 3. Interactive mouse/gyro parallax (dampened during deep screen zoom)
    const zoomSuppression = (t >= 0.20 && t <= 0.28) || (t >= 0.96) ? 0.25 : 1.0;
    const px = pointer.x * mouseParallax * zoomSuppression;
    const py = pointer.y * (mouseParallax * 0.6) * zoomSuppression;

    targetCamPos.current.x += px * 0.45;
    targetCamPos.current.y += py * 0.35;
    targetLookAt.current.x += px * 0.2;
    targetLookAt.current.y += py * 0.15;

    // 4. Smooth camera positioning & lookAt
    damp3(camera.position, targetCamPos.current, damping, delta);
    damp3(smoothedLookAt.current, targetLookAt.current, damping, delta);
    camera.lookAt(smoothedLookAt.current);

    // 5. Cinematic Banking Roll during City Flight (t: 0.36 to 0.62)
    if (t >= 0.36 && t <= 0.62) {
      const flightT = (t - 0.36) / 0.26;
      const bankAngle = Math.sin(flightT * Math.PI) * -0.14; // Smooth ~8 degree bank
      camera.rotation.z += bankAngle;
    }
  });

  return null;
}
