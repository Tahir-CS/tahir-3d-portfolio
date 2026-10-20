import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { damp3, damp } from 'maath/easing';
import { useScrollProgress } from '../../context/ScrollContext';

// ─────────────────────────────────────────────────────────────────────────────
// CameraRig — Cinematic City Story Flight Path + 3D Drag Orbit Free-Look
// ─────────────────────────────────────────────────────────────────────────────

const CAMERA_POSITIONS = [
  new THREE.Vector3(0, 1.7, 4.6),       // 0.00: Hero Penthouse (Pristine Workstation Framing)
  new THREE.Vector3(0, 1.35, 2.6),      // 0.12: Smooth glide framing dual displays
  new THREE.Vector3(0, 0.85, 0.85),     // 0.22: Diving tight into MacBook Pro terminal & code
  new THREE.Vector3(0, 0.85, -3.2),     // 0.32: Gliding through Refractive Certificate Vault (Z=-6.5)
  new THREE.Vector3(-1.8, 2.4, -6.5),   // 0.42: Flying through ServerAisle into City Avenue
  new THREE.Vector3(0.0, 4.6, -9.0),    // 0.52: Approaching Grand Architectural Skills Mega-Billboard
  new THREE.Vector3(-4.2, 4.2, -10.5),  // 0.62: Flanking West Skyscraper Outdoor Billboard (Experience)
  new THREE.Vector3(0.0, 4.8, -8.2),    // 0.72: ZOOMED-OUT Vista of ALL 7 Project Glass Monoliths
  new THREE.Vector3(0.0, 4.4, -9.0),    // 0.82: Expansive Zoomed-Out View of Project Amphitheater
  new THREE.Vector3(0.8, 2.6, -15.5),   // 0.90: Sweeping descent through Project Gallery toward Summit
  new THREE.Vector3(0.0, 1.45, -22.4),  // 1.00: Locking onto Rooftop Summit Command Terminal
];

const LOOKAT_TARGETS = [
  new THREE.Vector3(0, 0.52, 0),        // 0.00: Hero Workstation Center
  new THREE.Vector3(0.25, 0.55, -0.3),  // 0.12: Dual Displays
  new THREE.Vector3(0, 0.52, -0.74),    // 0.22: Directly into MacBook terminal code
  new THREE.Vector3(0, 0.4, -6.5),      // 0.32: Certificate Acrylic Slabs Gallery Arc
  new THREE.Vector3(0, 2.0, -13.5),     // 0.42: Looking down Cyber City Avenue & Server Racks
  new THREE.Vector3(0.0, 5.6, -13.8),   // 0.52: Central Skyscraper Grand Skills Mega-Billboard
  new THREE.Vector3(-7.5, 4.2, -14.2),  // 0.62: West Skyscraper Outdoor Billboard (Experience & Education)
  new THREE.Vector3(0.0, 1.5, -18.5),   // 0.72: Central Target of All 7 Projects Gallery Wall
  new THREE.Vector3(0.0, 1.3, -18.5),   // 0.82: Full Panoramic View of All 7 Projects
  new THREE.Vector3(0.0, 1.6, -21.5),   // 0.90: Transition to Terminal Summit
  new THREE.Vector3(0.0, 1.35, -25.0),  // 1.00: Rooftop Command Terminal Screen
];

export function CameraRig({ damping = 0.25, mouseParallax = 0.55 }) {
  const { camera, pointer } = useThree();
  const { scrollProgress, focusedTarget } = useScrollProgress();

  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const orbitYaw = useRef(0);
  const orbitPitch = useRef(0);
  const targetOrbitYaw = useRef(0);
  const targetOrbitPitch = useRef(0);

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

  // 3D Drag-to-Move / Free Orbit Interaction
  useEffect(() => {
    const handleMouseDown = (e) => {
      if (e.target.closest('button, a, input, select, textarea, [role="button"]')) return;
      isDragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      const dx = (e.clientX - dragStart.current.x) * 0.0035;
      const dy = (e.clientY - dragStart.current.y) * 0.0025;
      dragStart.current = { x: e.clientX, y: e.clientY };

      targetOrbitYaw.current += dx;
      targetOrbitPitch.current = THREE.MathUtils.clamp(
        targetOrbitPitch.current - dy,
        -0.85,
        0.85
      );
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        if (e.target.closest('button, a, input')) return;
        isDragging.current = true;
        dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e) => {
      if (!isDragging.current || e.touches.length !== 1) return;
      const dx = (e.touches[0].clientX - dragStart.current.x) * 0.0035;
      const dy = (e.touches[0].clientY - dragStart.current.y) * 0.0025;
      dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

      targetOrbitYaw.current += dx;
      targetOrbitPitch.current = THREE.MathUtils.clamp(
        targetOrbitPitch.current - dy,
        -0.85,
        0.85
      );
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  useFrame((state, delta) => {
    damp(orbitYaw, 'current', targetOrbitYaw.current, 0.2, delta);
    damp(orbitPitch, 'current', targetOrbitPitch.current, 0.2, delta);

    if (focusedTarget) {
      // CLICK-TO-ZOOM MODE: Fly camera directly in front of the clicked 3D model!
      targetCamPos.current.set(...focusedTarget.pos);
      targetLookAt.current.set(...focusedTarget.lookAt);

      // Subtle inspection parallax + 3D drag orbit inspection
      targetCamPos.current.x += pointer.x * 0.12 + Math.sin(orbitYaw.current) * 0.8;
      targetCamPos.current.y += pointer.y * 0.08 + orbitPitch.current * 0.5;
      targetLookAt.current.x += orbitYaw.current * 1.8;
      targetLookAt.current.y += orbitPitch.current * 1.4;

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

    // Apply 3D drag free-look orbit
    targetCamPos.current.x += Math.sin(orbitYaw.current) * 2.2;
    targetCamPos.current.y += orbitPitch.current * 1.6;
    targetLookAt.current.x += orbitYaw.current * 5.2;
    targetLookAt.current.y += orbitPitch.current * 4.0;

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
