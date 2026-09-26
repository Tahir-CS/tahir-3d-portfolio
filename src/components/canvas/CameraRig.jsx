import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { damp3, damp } from 'maath/easing';
import { useScrollProgress } from '../../context/ScrollContext';

// 6 Spatial Waypoints throughout the Command Center
const CAMERA_WAYPOINTS = [
  new THREE.Vector3(0, 2.2, 13),      // 0.00: Outside Gateway Blast Door
  new THREE.Vector3(0, 1.9, 6.2),     // 0.15: Flying through Gateway
  new THREE.Vector3(-3.5, 2.2, 2.5),  // 0.30: Circular Control Room
  new THREE.Vector3(0, 1.7, -7.5),    // 0.50: Entering Server Aisle
  new THREE.Vector3(2.5, 2.2, -14.5), // 0.72: Conveyor Deployment Pipeline
  new THREE.Vector3(0, 1.75, -22.8),  // 0.95: Workstation Command Terminal
];

const LOOKAT_WAYPOINTS = [
  new THREE.Vector3(0, 2.0, 7.5),     // Facing Door
  new THREE.Vector3(0, 1.9, 1.0),     // Looking into corridor
  new THREE.Vector3(-3.5, 1.8, 0),    // Looking at Holographic Core
  new THREE.Vector3(0, 1.7, -13),     // Looking down server corridor
  new THREE.Vector3(4.5, 1.8, -17),   // Looking at project cards
  new THREE.Vector3(0, 1.7, -25.2),   // Looking directly at console screen
];

export function CameraRig({ damping = 0.22, mouseParallax = 0.7 }) {
  const { camera, pointer } = useThree();
  const { scrollProgress } = useScrollProgress();

  // Create smooth CatmullRom splines
  const { cameraSpline, lookAtSpline } = useMemo(() => {
    return {
      cameraSpline: new THREE.CatmullRomCurve3(CAMERA_WAYPOINTS, false, 'centripetal'),
      lookAtSpline: new THREE.CatmullRomCurve3(LOOKAT_WAYPOINTS, false, 'centripetal'),
    };
  }, []);

  // Pre-allocated scratch objects to eliminate Garbage Collection allocations in useFrame
  const targetCamPos = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());
  const smoothedLookAt = useRef(new THREE.Vector3(0, 2.0, 7.5));
  const smoothedProgress = useRef(0);

  useFrame((state, delta) => {
    // 1. Exponentially smooth scroll progress
    damp(smoothedProgress, 'current', scrollProgress.current, damping, delta);
    const t = THREE.MathUtils.clamp(smoothedProgress.current, 0, 1);

    // 2. Sample 3D splines at smoothed progress
    cameraSpline.getPointAt(t, targetCamPos.current);
    lookAtSpline.getPointAt(t, targetLookAt.current);

    // 3. Add subtle mouse parallax (blended in without displacing spline track)
    const px = pointer.x * mouseParallax;
    const py = pointer.y * (mouseParallax * 0.5);

    targetCamPos.current.x += px * 0.4;
    targetCamPos.current.y += py * 0.3;

    targetLookAt.current.x += px * 0.2;
    targetLookAt.current.y += py * 0.15;

    // 4. Smoothly damp camera position and lookAt target
    damp3(camera.position, targetCamPos.current, damping, delta);
    damp3(smoothedLookAt.current, targetLookAt.current, damping, delta);

    camera.lookAt(smoothedLookAt.current);

    // 5. Subtle banking Dutch-angle roll along curves
    const tangent = cameraSpline.getTangentAt(t);
    const bank = tangent.x * -0.08;
    camera.rotation.z += bank;
  });

  return null;
}
