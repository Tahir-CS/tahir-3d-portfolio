import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { damp3, damp } from 'maath/easing';
import { useScrollProgress } from '../../context/ScrollContext';

// ─────────────────────────────────────────────────────────────────────────────
// CameraRig — Cinematic City Story Flight Path + Click-to-Zoom Camera Rig
// ─────────────────────────────────────────────────────────────────────────────

const CAMERA_POSITIONS = [
  new THREE.Vector3(0, 1.4, 5.2),       // 0.00: Hero Studio (Workstation Overlook)
  new THREE.Vector3(0, 2.0, 2.8),       // 0.12: Rising, framing MacBook + Studio Monitor
  new THREE.Vector3(0, 1.05, 0.68),     // 0.22: Diving tight into MacBook Pro 3D screen
  new THREE.Vector3(0, 0.2, -0.2),      // 0.32: Gliding through Refractive Certificate Vault
  new THREE.Vector3(-2.6, 2.6, -5.5),   // 0.42: Flying through ServerAisle into City Avenue
  new THREE.Vector3(0.0, 4.2, -9.2),    // 0.52: Approaching Times Square Mega-LED Billboards
  new THREE.Vector3(-2.8, 3.8, -11.8),  // 0.62: Banking toward West Outdoor Billboard (Experience)
  new THREE.Vector3(0.0, 5.8, -14.8),   // 0.72: Entering Project Skyscraper Canyon (Top Slabs)
  new THREE.Vector3(-1.6, 2.6, -16.8),  // 0.82: Swooping past Mid Project Glass Monoliths
  new THREE.Vector3(1.4, -0.4, -18.2),  // 0.90: Swooping past Lower Project Glass Monoliths
  new THREE.Vector3(0.0, 1.45, -22.4),  // 1.00: Locking onto Rooftop Summit Command Terminal
];

const LOOKAT_TARGETS = [
  new THREE.Vector3(0, 0.4, 0),         // 0.00: Desk center
  new THREE.Vector3(0.4, 0.7, -0.2),    // 0.12: MacBook + Studio Monitor
  new THREE.Vector3(0, 0.72, -0.92),    // 0.22: Directly into MacBook terminal code
  new THREE.Vector3(0, -0.2, -2.8),     // 0.32: Certificate Acrylic Slabs
  new THREE.Vector3(0, 2.2, -10.5),     // 0.42: Looking down Cyber City Avenue
  new THREE.Vector3(0.0, 5.4, -14.5),   // 0.52: Central Skyscraper Mega-Billboard
  new THREE.Vector3(-7.5, 3.7, -14.2),  // 0.62: West Skyscraper Outdoor Billboard (KICS Experience)
  new THREE.Vector3(0.0, 4.2, -18.5),   // 0.72: Project Showcase Tower Top
  new THREE.Vector3(-0.5, 1.8, -18.5),  // 0.82: Project Showcase Tower Mid
  new THREE.Vector3(0.5, -1.2, -19.5),  // 0.90: Project Showcase Tower Base
  new THREE.Vector3(0.0, 1.35, -25.0),  // 1.00: Rooftop Command Terminal Screen
];

export function CameraRig({ damping = 0.25, mouseParallax = 0.55 }) {
  const { camera, pointer } = useThree();
  const { scrollProgress, focusedTarget } = useScrollProgress();

  const { posSpline, lookSpline } = useMemo(() => {
    return {
      posSpline: new THREE.CatmullRomCurve3(CAMERA_POSITIONS, false, 'centripetal'),
      lookSpline: new THREE.CatmullRomCurve3(LOOKAT_TARGETS, false, 'centripetal'),
    };
  }, []);

  const targetCamPos = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());
  const smoothedLookAt = useRef(new THREE.Vector3(0, 0.4, 0));
  const smoothedProgress = useRef(0);

  useFrame((state, delta) => {
    if (focusedTarget) {
      // CLICK-TO-ZOOM MODE: Fly camera directly in front of the clicked 3D model!
      targetCamPos.current.set(...focusedTarget.pos);
      targetLookAt.current.set(...focusedTarget.lookAt);

      // Subtle inspection parallax while locked onto a 3D screen
      targetCamPos.current.x += pointer.x * 0.12;
      targetCamPos.current.y += pointer.y * 0.08;

      damp3(camera.position, targetCamPos.current, 0.18, delta);
      damp3(smoothedLookAt.current, targetLookAt.current, 0.18, delta);
      camera.lookAt(smoothedLookAt.current);
      return;
    }

    // SPLINE SCROLL FLIGHT MODE
    damp(smoothedProgress, 'current', scrollProgress.current, damping, delta);
    const t = THREE.MathUtils.clamp(smoothedProgress.current, 0, 1);

    posSpline.getPointAt(t, targetCamPos.current);
    lookSpline.getPointAt(t, targetLookAt.current);

    const zoomSuppression = (t >= 0.18 && t <= 0.26) || t >= 0.95 ? 0.22 : 1.0;
    const px = pointer.x * mouseParallax * zoomSuppression;
    const py = pointer.y * (mouseParallax * 0.6) * zoomSuppression;

    targetCamPos.current.x += px * 0.45;
    targetCamPos.current.y += py * 0.35;
    targetLookAt.current.x += px * 0.2;
    targetLookAt.current.y += py * 0.15;

    damp3(camera.position, targetCamPos.current, damping, delta);
    damp3(smoothedLookAt.current, targetLookAt.current, damping, delta);
    camera.lookAt(smoothedLookAt.current);

    // Cinematic Banking Roll during City Flight (t: 0.38 to 0.66)
    if (t >= 0.38 && t <= 0.66) {
      const flightT = (t - 0.38) / 0.28;
      const bankAngle = Math.sin(flightT * Math.PI * 2) * -0.11;
      camera.rotation.z += bankAngle;
    }
  });

  return null;
}
