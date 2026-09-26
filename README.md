# 🌐 Muhammad Tahir — 3D Command Center Portfolio

> An Awwwards-grade, 60 FPS 3D scrollytelling experience engineered with **React Three Fiber**, **Three.js**, **GSAP ScrollTrigger**, and **Lenis Smooth Scroll**.

![Command Center Preview](/assets/me.jpg)

---

## ⚡ The Architecture & Concept: "The Command Center"

Traditional portfolios are flat 2D image grids. This project turns Muhammad Tahir's backend and distributed systems portfolio into a physical 3D infrastructure journey:

| Scroll Range | Waypoint Node | 3D Environment | Narrative |
| :--- | :--- | :--- | :--- |
| **0%** | `BOOT SEQUENCE` | Interactive Terminal | Hardware diagnostics and Web Audio API synthesizer initialization. |
| **0% – 18%** | `NODE-01: GATEWAY` | Heavy Blast Door | Monumental headline. As the user scrolls, hydraulic blast doors split open to admit the camera. |
| **18% – 38%** | `NODE-02: CONTROL` | Circular Command Deck | Rotating holographic core, system specs, academic credentials, and sub-50ms queue response metrics. |
| **38% – 58%** | `NODE-03: SERVERS` | Server Rack Corridor | Instanced server cabinets with 112+ blinking LEDs (1 draw call) and glowing fiber-optic conduits. |
| **58% – 82%** | `NODE-04: PIPELINE` | Conveyor Belt | 3D floating project cards (CareerOS, CreatorIQ, Subscription Guardian, E-Commerce Store) with modal UI inspect. |
| **82% – 92%** | `NODE-05: CORRIDOR` | Career Timeline | University infrastructure production deliverables (KICS, UET OCW, AI Chatbot) and verified certifications. |
| **92% – 100%** | `NODE-06: UPLINK` | Workstation Console | CRT-styled command terminal, one-click email copy, and direct transmission payload form. |

---

## 🛠️ Tech Stack & Engineering Highlights

- **Rendering Engine:** `Three.js` + `@react-three/fiber` (R3F v9) + `@react-three/drei`
- **Post-Processing:** `@react-three/postprocessing` (Selective Bloom, Lens Chromatic Aberration, Vignette)
- **Scrollytelling Engine:** `GSAP (ScrollTrigger)` + `Lenis` synchronized to `gsap.ticker` to prevent frame desynchronization
- **Camera Path:** Mathematical `CatmullRomCurve3` centripetal spline with `maath/easing.damp3` exponential decay
- **Sound Design:** Built-in procedural `Web Audio API` synthesizer (ambient 55Hz lowpass fan drone, tactile key clicks, hologram whooshes) with zero external MP3 downloads (0 KB network overhead)
- **Custom GLSL Shaders:**
  - `HolographicMaterial.jsx`: Fresnel rim glow, animated horizontal scanlines, and stepped digital glitching
  - `CyberGridFloor.jsx`: Screen-space analytical derivative (`fwidth`) antialiasing with exponential horizon fog
  - `GlowingConduit.jsx`: Traveling energy pulses through curved 3D tube geometries
  - `DataParticles.jsx`: GPU-driven particle field streaming upward along aisles
- **Styling & UI:** Tailwind CSS + Lucide Icons + Custom Vector Tech Icons

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Local Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📦 Deployment to Vercel

```bash
npm i -g vercel
vercel
```

---

Built with precision for **Muhammad Tahir** — Backend & Distributed Systems Engineer.
