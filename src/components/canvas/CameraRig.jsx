import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { damp3, damp } from 'maath/easing';
import { useScrollProgress } from '../../context/ScrollContext';

// 11 Cinematic Spatial Waypoints covering Hero, Screen Dive, Sideways Ocean Flight, Vertical Free Fall, and Space Orbit
const CAMERA_POSITIONS = [
  new THREE.Vector3(0, 1.4, 5.2),      // 0.00: Hero Eye-Level Workstation
  new THREE.Vector3(0, 3.8, 3.0),      // 0.16: Ascending for Top-Down Swoop
  new THREE.Vector3(0, 1.15, 0.72),    // 0.28: Plunging into 3D MacBook Screen
  new THREE.Vector3(-6.8, 1.1, -7.5),  // 0.40: Banking Entry to Liquid Ocean
  new THREE.Vector3(0.0, 0.85, -11.0), // 0.50: Skimming Chrome Ocean Surface
  new THREE.Vector3(6.8, 1.2, -14.5),  // 0.60: Sideways Flight Ocean Exit
  new THREE.Vector3(0, 11.5, 3.4),     // 0.68: Projects Chasm Zenith (Looking Down)
  new THREE.Vector3(0, 3.5, 3.1),      // 0.76: Free-Falling through Glass Slabs
  new THREE.Vector3(0, -3.8, 2.8),     // 0.83: Chasm Floor Exit
  new THREE.Vector3(-4.2, 1.8, -21.0), // 0.92: Space Orbital Arc
  new THREE.Vector3(0.0, 0.85, -22.8), // 1.00: Orbital Space Beacon Lock
];

const LOOKAT_TARGETS = [
  new THREE.Vector3(0, 0.2, 0),        // 0.00: Laptop Center
  new THREE.Vector3(0, 0.9, 0.2),      // 0.16: Screen Bezel
  new THREE.Vector3(0, 1.12, 0),       // 0.28: Directly onto Screen Display
  new THREE.Vector3(-2.5, 1.3, -9.5),  // 0.40: Monolith Cluster West
  new THREE.Vector3(0.0, 1.6, -11.5),  // 0.50: Central Skill Monolith
  new THREE.Vector3(3.0, 1.3, -13.5),  // 0.60: Monolith Cluster East
  new THREE.Vector3(0, 8.0, 0),        // 0.68: Downward Fall Chasm
  new THREE.Vector3(0, 1.0, 0),        // 0.76: Mid Chasm Cards
  new THREE.Vector3(0, -6.5, 0),       // 0.83: Bottom Slab
  new THREE.Vector3(0, 0.4, -25.0),    // 0.92: Beacon Pedestal
  new THREE.Vector3(0, 0.85, -25.0),   // 1.00: Transmitting Core
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
  const smoothedLookAt = useRef(new THREE.Vector3(0, 0.2, 0));
  const smoothedProgress = useRef(0);

  useFrame((state, delta) => {
    // 1. Damped scroll interpolation
    damp(smoothedProgress, 'current', scrollProgress.current, damping, delta);
    const t = THREE.MathUtils.clamp(smoothedProgress.current, 0, 1);

    // 2. Sample 3D curves
    posSpline.getPointAt(t, targetCamPos.current);
    lookSpline.getPointAt(t, targetLookAt.current);

    // 3. Interactive mouse/gyro parallax (subtly dampened during deep zoom)
    const zoomSuppression = t >= 0.22 && t <= 0.34 ? 0.25 : 1.0;
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

    // 5. Cinematic Banking Roll during Sideways Flight (t: 0.36 to 0.62)
    if (t >= 0.36 && t <= 0.62) {
      const flightT = (t - 0.36) / 0.26;
      const bankAngle = Math.sin(flightT * Math.PI) * -0.15; // ~8.6 degree bank
      camera.rotation.z += bankAngle;
    }
  });

  return null;
}
